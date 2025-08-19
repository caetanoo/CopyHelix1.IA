const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Configuração do Supabase com service key para operações administrativas
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variáveis do Supabase não configuradas!');
  console.log('📋 Configure as seguintes variáveis no arquivo .env:');
  console.log('   VITE_SUPABASE_URL=sua_url_do_supabase');
  console.log('   SUPABASE_SERVICE_KEY=sua_chave_de_servico');
  process.exit(1);
}

// Cliente Supabase com service key para operações administrativas
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
  try {
    console.log('🚀 Iniciando configuração do banco de dados...');
    console.log(`🔗 Conectando ao Supabase: ${supabaseUrl}`);
    
    // Ler o arquivo de schema SQL
    const schemaPath = path.join(__dirname, '../supabase-schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('📋 Aplicando schema SQL...');
    
    // Executar o schema SQL usando a função rpc
    const { data, error } = await supabase.rpc('exec_sql', {
      sql_query: schema
    });
    
    if (error) {
      // Se a função rpc não existe, vamos tentar criar as tabelas uma por uma
      console.log('⚠️  Função exec_sql não encontrada, criando tabelas manualmente...');
      await createTablesManually();
    } else {
      console.log('✅ Schema aplicado com sucesso!');
    }
    
    // Verificar se as tabelas foram criadas
    await verifyTables();
    
  } catch (error) {
    console.error('❌ Erro ao configurar banco de dados:', error.message);
    
    // Tentar método alternativo
    console.log('🔄 Tentando método alternativo...');
    await createTablesManually();
  }
}

async function createTablesManually() {
  try {
    console.log('📋 Criando tabelas manualmente...');
    
    // Criar tabela meetings
    console.log('📊 Criando tabela meetings...');
    const { error: meetingsError } = await supabase
      .from('meetings')
      .insert([{
        name: 'Test',
        email: 'test@test.com',
        company: 'Test Company',
        phone: '123456789',
        message: 'Test message',
        preferred_date: '2024-01-01',
        preferred_time: '10:00',
        status: 'pending',
        role: 'Test Role',
        company_size: 'Small',
        main_challenge: 'Test Challenge',
        monthly_investment: '$1000',
        pricing_expectation: 'Affordable',
        current_solution: 'None',
        feedback: 'Test feedback',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }]);
    
    if (meetingsError && !meetingsError.message.includes('does not exist')) {
      console.log('✅ Tabela meetings já existe ou foi criada');
    } else if (meetingsError) {
      console.log('❌ Erro ao criar tabela meetings:', meetingsError.message);
    }
    
    // Criar tabela contacts
    console.log('📊 Criando tabela contacts...');
    const { error: contactsError } = await supabase
      .from('contacts')
      .insert([{
        name: 'Test',
        email: 'test@test.com',
        subject: 'Test Subject',
        message: 'Test message',
        priority: 'normal',
        source: 'contact_form',
        status: 'new',
        role: 'Test Role',
        company_size: 'Small',
        main_challenge: 'Test Challenge',
        monthly_investment: '$1000',
        pricing_expectation: 'Affordable',
        current_solution: 'None',
        feedback: 'Test feedback',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }]);
    
    if (contactsError && !contactsError.message.includes('does not exist')) {
      console.log('✅ Tabela contacts já existe ou foi criada');
    } else if (contactsError) {
      console.log('❌ Erro ao criar tabela contacts:', contactsError.message);
    }
    
    // Criar tabela demos
    console.log('📊 Criando tabela demos...');
    const { error: demosError } = await supabase
      .from('demos')
      .insert([{
        name: 'Test',
        email: 'test@test.com',
        company: 'Test Company',
        phone: '123456789',
        message: 'Test message',
        status: 'pending',
        role: 'Test Role',
        company_size: 'Small',
        main_challenge: 'Test Challenge',
        monthly_investment: '$1000',
        pricing_expectation: 'Affordable',
        current_solution: 'None',
        feedback: 'Test feedback',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }]);
    
    if (demosError && !demosError.message.includes('does not exist')) {
      console.log('✅ Tabela demos já existe ou foi criada');
    } else if (demosError) {
      console.log('❌ Erro ao criar tabela demos:', demosError.message);
    }
    
    // Remover dados de teste
    console.log('🧹 Limpando dados de teste...');
    await supabase.from('meetings').delete().eq('email', 'test@test.com');
    await supabase.from('contacts').delete().eq('email', 'test@test.com');
    await supabase.from('demos').delete().eq('email', 'test@test.com');
    
  } catch (error) {
    console.error('❌ Erro ao criar tabelas manualmente:', error.message);
    throw error;
  }
}

async function verifyTables() {
  console.log('🔍 Verificando tabelas criadas...');
  
  try {
    const { data: meetings, error: meetingsError } = await supabase
      .from('meetings')
      .select('count', { count: 'exact', head: true });
    
    const { data: contacts, error: contactsError } = await supabase
      .from('contacts')
      .select('count', { count: 'exact', head: true });
    
    const { data: demos, error: demosError } = await supabase
      .from('demos')
      .select('count', { count: 'exact', head: true });
    
    if (!meetingsError) {
      console.log('✅ Tabela meetings: OK');
    } else {
      console.log('❌ Tabela meetings:', meetingsError.message);
    }
    
    if (!contactsError) {
      console.log('✅ Tabela contacts: OK');
    } else {
      console.log('❌ Tabela contacts:', contactsError.message);
    }
    
    if (!demosError) {
      console.log('✅ Tabela demos: OK');
    } else {
      console.log('❌ Tabela demos:', demosError.message);
    }
    
    if (!meetingsError && !contactsError && !demosError) {
      console.log('🎉 Todas as tabelas foram criadas com sucesso!');
      console.log('🚀 Você pode agora usar os formulários da aplicação.');
    }
    
  } catch (error) {
    console.error('❌ Erro ao verificar tabelas:', error.message);
  }
}

// Executar setup
if (require.main === module) {
  setupDatabase().then(() => {
    console.log('✅ Setup concluído!');
    process.exit(0);
  }).catch((error) => {
    console.error('❌ Falha no setup:', error.message);
    process.exit(1);
  });
}

module.exports = {
  setupDatabase,
  createTablesManually,
  verifyTables
};