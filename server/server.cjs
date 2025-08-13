const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

// Garantir que o diretório do banco existe
const dbDir = path.join(__dirname, 'database');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Configuração do banco de dados SQLite
const dbPath = path.join(dbDir, 'copyhelix.db');
const db = new sqlite3.Database(dbPath);

// Criar tabelas se não existirem
db.serialize(() => {
  // Tabela para agendamentos de reunião
  db.run(`
    CREATE TABLE IF NOT EXISTS meetings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT,
      phone TEXT,
      message TEXT,
      preferred_date TEXT,
      preferred_time TEXT,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabela para leads de contato geral
  db.run(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT,
      message TEXT,
      priority TEXT DEFAULT 'normal',
      source TEXT DEFAULT 'contact_form',
      status TEXT DEFAULT 'new',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// ROTAS DA API

// 1. Agendar reunião
app.post('/api/meetings', (req, res) => {
  const { name, email, company, phone, message, preferred_date, preferred_time } = req.body;

  // Validação básica
  if (!name || !email) {
    return res.status(400).json({ 
      success: false, 
      message: 'Nome e email são obrigatórios' 
    });
  }

  const sql = `
    INSERT INTO meetings (name, email, company, phone, message, preferred_date, preferred_time)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(sql, [name, email, company, phone, message, preferred_date, preferred_time], function(err) {
    if (err) {
      console.error('Erro ao salvar reunião:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Erro interno do servidor' 
      });
    }

    res.json({
      success: true,
      message: 'Reunião agendada com sucesso!',
      id: this.lastID
    });
  });
});

// 2. Salvar contato geral
app.post('/api/contacts', (req, res) => {
  const { name, email, subject, message, priority, source } = req.body;

  if (!name || !email) {
    return res.status(400).json({ 
      success: false, 
      message: 'Nome e email são obrigatórios' 
    });
  }

  const sql = `
    INSERT INTO contacts (name, email, subject, message, priority, source)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(sql, [name, email, subject, message, priority || 'normal', source || 'contact_form'], function(err) {
    if (err) {
      console.error('Erro ao salvar contato:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Erro interno do servidor' 
      });
    }

    res.json({
      success: true,
      message: 'Contato salvo com sucesso!',
      id: this.lastID
    });
  });
});

// 3. Listar reuniões (Dashboard)
app.get('/api/meetings', (req, res) => {
  const { status, limit = 50 } = req.query;
  
  let sql = 'SELECT * FROM meetings';
  const params = [];

  if (status) {
    sql += ' WHERE status = ?';
    params.push(status);
  }

  sql += ' ORDER BY created_at DESC LIMIT ?';
  params.push(parseInt(limit));

  db.all(sql, params, (err, rows) => {
    if (err) {
      console.error('Erro ao buscar reuniões:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Erro interno do servidor' 
      });
    }

    res.json({
      success: true,
      meetings: rows
    });
  });
});

// 4. Listar contatos (Dashboard)
app.get('/api/contacts', (req, res) => {
  const { status, limit = 50 } = req.query;
  
  let sql = 'SELECT * FROM contacts';
  const params = [];

  if (status) {
    sql += ' WHERE status = ?';
    params.push(status);
  }

  sql += ' ORDER BY created_at DESC LIMIT ?';
  params.push(parseInt(limit));

  db.all(sql, params, (err, rows) => {
    if (err) {
      console.error('Erro ao buscar contatos:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Erro interno do servidor' 
      });
    }

    res.json({
      success: true,
      contacts: rows
    });
  });
});

// 5. Estatísticas do dashboard
app.get('/api/stats', (req, res) => {
  const queries = {
    totalMeetings: 'SELECT COUNT(*) as count FROM meetings',
    pendingMeetings: 'SELECT COUNT(*) as count FROM meetings WHERE status = "pending"',
    totalContacts: 'SELECT COUNT(*) as count FROM contacts',
    newContacts: 'SELECT COUNT(*) as count FROM contacts WHERE status = "new"'
  };

  const stats = {};
  let completed = 0;
  const totalQueries = Object.keys(queries).length;

  Object.entries(queries).forEach(([key, sql]) => {
    db.get(sql, (err, row) => {
      if (!err) {
        stats[key] = row.count;
      }
      completed++;
      
      if (completed === totalQueries) {
        res.json({
          success: true,
          stats
        });
      }
    });
  });
});

// 6. Atualizar status de reunião
app.put('/api/meetings/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const sql = 'UPDATE meetings SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
  
  db.run(sql, [status, id], function(err) {
    if (err) {
      console.error('Erro ao atualizar reunião:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Erro interno do servidor' 
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({
        success: false,
        message: 'Reunião não encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Status atualizado com sucesso!'
    });
  });
});

// Servir arquivos estáticos em produção
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}/dashboard`);
  console.log(`💾 Banco de dados: ${dbPath}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Encerrando servidor...');
  db.close((err) => {
    if (err) {
      console.error('Erro ao fechar banco:', err);
    } else {
      console.log('✅ Banco de dados fechado.');
    }
    process.exit(0);
  });
});