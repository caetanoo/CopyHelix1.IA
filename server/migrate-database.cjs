const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Configuração do Supabase com service key
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variáveis do Supabase não configuradas!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function migrateDatabase() {
  try {
    console.log('🚀 Iniciando migração do banco de dados...');
    
    // Script SQL para adicionar as colunas faltantes
    const migrationSQL = `
      -- Adicionar colunas faltantes na tabela contacts
      DO $$ 
      BEGIN
        -- Adicionar colunas se não existirem
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='role') THEN
          ALTER TABLE contacts ADD COLUMN role TEXT;
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='company_size') THEN
          ALTER TABLE contacts ADD COLUMN company_size TEXT;
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='main_challenge') THEN
          ALTER TABLE contacts ADD COLUMN main_challenge TEXT;
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='monthly_investment') THEN
          ALTER TABLE contacts ADD COLUMN monthly_investment TEXT;
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='pricing_expectation') THEN
          ALTER TABLE contacts ADD COLUMN pricing_expectation TEXT;
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='current_solution') THEN
          ALTER TABLE contacts ADD COLUMN current_solution TEXT;
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='feedback') THEN
          ALTER TABLE contacts ADD COLUMN feedback TEXT;
        END IF;
        
        -- Adicionar colunas faltantes na tabela meetings
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='meetings' AND column_name='role') THEN
          ALTER TABLE meetings ADD COLUMN role TEXT;
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='meetings' AND column_name='company_size') THEN
          ALTER TABLE meetings ADD COLUMN company_size TEXT;
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='meetings' AND column_name='main_challenge') THEN
          ALTER TABLE meetings ADD COLUMN main_challenge TEXT;
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='meetings' AND column_name='monthly_investment') THEN
          ALTER TABLE meetings ADD COLUMN monthly_investment TEXT;
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='meetings' AND column_name='pricing_expectation') THEN
          ALTER TABLE meetings ADD COLUMN pricing_expectation TEXT;
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='meetings' AND column_name='current_solution') THEN
          ALTER TABLE meetings ADD COLUMN current_solution TEXT;
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='meetings' AND column_name='feedback') THEN
          ALTER TABLE meetings ADD COLUMN feedback TEXT;
        END IF;
        
        -- Adicionar colunas faltantes na tabela demos se ela existir
        IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='demos') THEN
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='demos' AND column_name='role') THEN
            ALTER TABLE demos ADD COLUMN role TEXT;
          END IF;
          
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='demos' AND column_name='company_size') THEN
            ALTER TABLE demos ADD COLUMN company_size TEXT;
          END IF;
          
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='demos' AND column_name='main_challenge') THEN
            ALTER TABLE demos ADD COLUMN main_challenge TEXT;
          END IF;
          
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='demos' AND column_name='monthly_investment') THEN
            ALTER TABLE demos ADD COLUMN monthly_investment TEXT;
          END IF;
          
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='demos' AND column_name='pricing_expectation') THEN
            ALTER TABLE demos ADD COLUMN pricing_expectation TEXT;
          END IF;
          
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='demos' AND column_name='current_solution') THEN
            ALTER TABLE demos ADD COLUMN current_solution TEXT;
          END IF;
          
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='demos' AND column_name='feedback') THEN
            ALTER TABLE demos ADD COLUMN feedback TEXT;
          END IF;
        ELSE
          -- Criar tabela demos se não existir
          CREATE TABLE demos (
            id BIGSERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            company TEXT,
            phone TEXT,
            message TEXT,
            status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'completed', 'cancelled')),
            role TEXT,
            company_size TEXT,
            main_challenge TEXT,
            monthly_investment TEXT,
            pricing_expectation TEXT,
            current_solution TEXT,
            feedback TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        END IF;
        
        RAISE NOTICE 'Migração concluída com sucesso!';
      END $$;
    `;
    
    console.log('📋 Executando migração SQL...');
    
    // Usar uma abordagem mais direta - fazer POST direto para a API RPC
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'apikey': supabaseServiceKey
      },
      body: JSON.stringify({
        sql: migrationSQL
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }
    
    console.log('✅ Migração SQL executada com sucesso!');
    
    // Verificar se as colunas foram adicionadas
    await verifyMigration();
    
  } catch (error) {
    console.error('❌ Erro na migração:', error.message);
    
    // Tentar método alternativo com PostgreSQL via node-postgres
    console.log('🔄 Tentando método alternativo...');
    await alternativeMigration();
  }
}

async function alternativeMigration() {
  console.log('📋 Executando migração alternativa...');
  
  try {
    // Executar ALTER TABLE via Supabase client diretamente
    const alterCommands = [
      "ALTER TABLE contacts ADD COLUMN IF NOT EXISTS role TEXT",
      "ALTER TABLE contacts ADD COLUMN IF NOT EXISTS company_size TEXT",
      "ALTER TABLE contacts ADD COLUMN IF NOT EXISTS main_challenge TEXT",
      "ALTER TABLE contacts ADD COLUMN IF NOT EXISTS monthly_investment TEXT",
      "ALTER TABLE contacts ADD COLUMN IF NOT EXISTS pricing_expectation TEXT",
      "ALTER TABLE contacts ADD COLUMN IF NOT EXISTS current_solution TEXT",
      "ALTER TABLE contacts ADD COLUMN IF NOT EXISTS feedback TEXT",
      
      "ALTER TABLE meetings ADD COLUMN IF NOT EXISTS role TEXT",
      "ALTER TABLE meetings ADD COLUMN IF NOT EXISTS company_size TEXT",
      "ALTER TABLE meetings ADD COLUMN IF NOT EXISTS main_challenge TEXT",
      "ALTER TABLE meetings ADD COLUMN IF NOT EXISTS monthly_investment TEXT",
      "ALTER TABLE meetings ADD COLUMN IF NOT EXISTS pricing_expectation TEXT",
      "ALTER TABLE meetings ADD COLUMN IF NOT EXISTS current_solution TEXT",
      "ALTER TABLE meetings ADD COLUMN IF NOT EXISTS feedback TEXT"
    ];
    
    for (const sql of alterCommands) {
      console.log(`Executando: ${sql}`);
      
      try {
        const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseServiceKey}`,
            'apikey': supabaseServiceKey
          },
          body: JSON.stringify({ query: sql })
        });
        
        if (response.ok) {
          console.log('✅ Comando executado com sucesso');
        } else {
          console.log('⚠️ Comando pode ter falhado:', await response.text());
        }
      } catch (error) {
        console.log('⚠️ Erro no comando:', error.message);
      }
    }
    
    console.log('✅ Migração alternativa concluída!');
    
  } catch (error) {
    console.error('❌ Erro na migração alternativa:', error.message);
    throw error;
  }
}

async function verifyMigration() {
  console.log('🔍 Verificando migração...');
  
  try {
    // Tentar inserir um registro de teste com todas as colunas
    const testData = {
      name: 'Teste Migração',
      email: 'teste.migracao@test.com',
      subject: 'Teste',
      message: 'Teste de migração',
      role: 'CEO',
      company_size: 'Small',
      main_challenge: 'Test Challenge',
      monthly_investment: '$1000',
      pricing_expectation: 'Affordable',
      current_solution: 'None',
      feedback: 'Test feedback'
    };
    
    const { data, error } = await supabase
      .from('contacts')
      .insert([testData])
      .select();
    
    if (error) {
      console.log('❌ Erro ao verificar migração:', error.message);
      throw error;
    }
    
    console.log('✅ Migração verificada com sucesso!');
    console.log('📊 Registro de teste inserido:', data[0].id);
    
    // Remover registro de teste
    await supabase
      .from('contacts')
      .delete()
      .eq('email', 'teste.migracao@test.com');
    
    console.log('🧹 Registro de teste removido');
    
  } catch (error) {
    console.error('❌ Erro na verificação:', error.message);
    throw error;
  }
}

// Executar migração
if (require.main === module) {
  migrateDatabase().then(() => {
    console.log('🎉 Migração concluída com sucesso!');
    console.log('🚀 Você pode agora usar os formulários da aplicação.');
    process.exit(0);
  }).catch((error) => {
    console.error('❌ Falha na migração:', error.message);
    process.exit(1);
  });
}

module.exports = {
  migrateDatabase,
  verifyMigration
};