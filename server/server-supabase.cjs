const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Importar funções do Supabase
const {
  initializeTables,
  saveMeeting,
  saveContact,
  saveDemo,
  getMeetings,
  getContacts,
  getDemos,
  updateMeetingStatus,
  getStats
} = require('./supabase.cjs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

// Inicializar conexão com Supabase
initializeTables();

// ROTAS DA API

// 1. Agendar reunião
app.post('/api/meetings', async (req, res) => {
  try {
    const { 
      name, email, company, phone, message, preferred_date, preferred_time,
      role, company_size, main_challenge, monthly_investment, pricing_expectation, current_solution, feedback
    } = req.body;

    // Validação básica
    if (!name || !email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Nome e email são obrigatórios' 
      });
    }

    const meeting = await saveMeeting({
      name,
      email,
      company,
      phone,
      message,
      preferred_date,
      preferred_time,
      role,
      company_size,
      main_challenge,
      monthly_investment,
      pricing_expectation,
      current_solution,
      feedback,
      status: 'pending'
    });

    res.json({
      success: true,
      message: 'Reunião agendada com sucesso!',
      id: meeting.id,
      meeting
    });

  } catch (error) {
    console.error('Erro ao salvar reunião:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor',
      error: error.message 
    });
  }
});

// 2. Salvar contato geral
app.post('/api/contacts', async (req, res) => {
  try {
    const { 
      name, email, subject, message, priority, source,
      role, company_size, main_challenge, monthly_investment, pricing_expectation, current_solution, feedback
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Nome e email são obrigatórios' 
      });
    }

    const contact = await saveContact({
      name,
      email,
      subject,
      message,
      priority: priority || 'normal',
      source: source || 'contact_form',
      role,
      company_size,
      main_challenge,
      monthly_investment,
      pricing_expectation,
      current_solution,
      feedback,
      status: 'new'
    });

    res.json({
      success: true,
      message: 'Contato salvo com sucesso!',
      id: contact.id,
      contact
    });

  } catch (error) {
    console.error('Erro ao salvar contato:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor',
      error: error.message 
    });
  }
});

// 3. Salvar solicitação de demo (usando tabela contacts temporariamente)
app.post('/api/demos', async (req, res) => {
  try {
    const { 
      name, email, company, phone, message,
      role, company_size, main_challenge, monthly_investment, pricing_expectation, current_solution, feedback
    } = req.body;

    // Validação básica
    if (!name || !email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Nome e email são obrigatórios' 
      });
    }

    // Salvar como contato com source='demo_form' até a tabela demos ser criada
    const demo = await saveContact({
      name,
      email,
      subject: company ? `Demo para ${company}` : 'Solicitação de Demo',
      message: message || `Telefone: ${phone || 'Não informado'}`,
      priority: 'high', // Demos têm prioridade alta
      source: 'demo_form', // Identifica como demo
      role,
      company_size,
      main_challenge,
      monthly_investment,
      pricing_expectation,
      current_solution,
      feedback,
      status: 'new'
    });

    res.json({
      success: true,
      message: 'Demo solicitado com sucesso!',
      id: demo.id,
      demo
    });

  } catch (error) {
    console.error('Erro ao salvar demo:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor',
      error: error.message 
    });
  }
});

// 4. Listar demos (Dashboard) - buscando da tabela contacts temporariamente
app.get('/api/demos', async (req, res) => {
  try {
    const { status, limit = 50 } = req.query;
    
    // Buscar contacts com source='demo_form' para listar demos
    const demos = await getContacts({
      status,
      limit: parseInt(limit),
      source: 'demo_form'  // Filtrar apenas demos
    });

    res.json({
      success: true,
      demos
    });

  } catch (error) {
    console.error('Erro ao buscar demos:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor',
      error: error.message 
    });
  }
});

// 5. Listar reuniões (Dashboard)
app.get('/api/meetings', async (req, res) => {
  try {
    const { status, limit = 50 } = req.query;
    
    const meetings = await getMeetings({
      status,
      limit: parseInt(limit)
    });

    res.json({
      success: true,
      meetings
    });

  } catch (error) {
    console.error('Erro ao buscar reuniões:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor',
      error: error.message 
    });
  }
});

// 6. Listar contatos (Dashboard)
app.get('/api/contacts', async (req, res) => {
  try {
    const { status, limit = 50 } = req.query;
    
    const contacts = await getContacts({
      status,
      limit: parseInt(limit)
    });

    res.json({
      success: true,
      contacts
    });

  } catch (error) {
    console.error('Erro ao buscar contatos:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor',
      error: error.message 
    });
  }
});

// 7. Estatísticas do dashboard
app.get('/api/stats', async (req, res) => {
  try {
    const stats = await getStats();
    
    res.json({
      success: true,
      stats
    });

  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor',
      error: error.message 
    });
  }
});

// 8. Atualizar status de reunião
app.put('/api/meetings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status é obrigatório'
      });
    }

    const meeting = await updateMeetingStatus(parseInt(id), status);

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: 'Reunião não encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Status atualizado com sucesso!',
      meeting
    });

  } catch (error) {
    console.error('Erro ao atualizar reunião:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor',
      error: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Servidor funcionando com Supabase!',
    timestamp: new Date().toISOString(),
    database: 'supabase'
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
  console.log(`💾 Banco de dados: Supabase (PostgreSQL)`);
  console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Encerrando servidor...');
  console.log('✅ Conexões com Supabase fechadas.');
  process.exit(0);
});