const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Configuração do Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variáveis do Supabase não configuradas!');
  console.log('📋 Configure as seguintes variáveis no arquivo .env:');
  console.log('   VITE_SUPABASE_URL=sua_url_do_supabase');
  console.log('   VITE_SUPABASE_ANON_KEY=sua_chave_anonima');
  console.log('   SUPABASE_SERVICE_KEY=sua_chave_de_servico (opcional)');
  process.exit(1);
}

// Cliente Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

// Função para criar as tabelas se não existirem
async function initializeTables() {
  try {
    // Verificar se as tabelas já existem
    const { data: meetings, error: meetingsError } = await supabase
      .from('meetings')
      .select('count', { count: 'exact', head: true });

    const { data: contacts, error: contactsError } = await supabase
      .from('contacts')
      .select('count', { count: 'exact', head: true });

    const { data: demos, error: demosError } = await supabase
      .from('demos')
      .select('count', { count: 'exact', head: true });

    if (meetingsError && meetingsError.code === 'PGRST116') {
      console.log('📋 Tabela "meetings" não encontrada. Será criada automaticamente no primeiro insert.');
    }

    if (contactsError && contactsError.code === 'PGRST116') {
      console.log('📋 Tabela "contacts" não encontrada. Será criada automaticamente no primeiro insert.');
    }

    if (demosError && demosError.code === 'PGRST116') {
      console.log('📋 Tabela "demos" não encontrada. Será criada automaticamente no primeiro insert.');
    }

    console.log('✅ Supabase conectado com sucesso!');
    console.log(`🔗 URL: ${supabaseUrl}`);
    
  } catch (error) {
    console.error('❌ Erro ao conectar com Supabase:', error.message);
  }
}

// Funções utilitárias para as operações do banco

/**
 * Salvar uma nova reunião
 */
async function saveMeeting(meetingData) {
  try {
    // Primeiro, tentar inserir com todas as colunas
    const fullData = {
      name: meetingData.name,
      email: meetingData.email,
      company: meetingData.company,
      phone: meetingData.phone,
      message: meetingData.message,
      preferred_date: meetingData.preferred_date,
      preferred_time: meetingData.preferred_time,
      status: meetingData.status || 'pending',
      role: meetingData.role,
      company_size: meetingData.company_size,
      main_challenge: meetingData.main_challenge,
      monthly_investment: meetingData.monthly_investment,
      pricing_expectation: meetingData.pricing_expectation,
      current_solution: meetingData.current_solution,
      feedback: meetingData.feedback,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('meetings')
      .insert([fullData])
      .select();

    if (error) {
      // Se houver erro de coluna não encontrada, tentar com dados básicos
      if (error.message.includes('column') && (error.message.includes('does not exist') || error.message.includes('schema cache'))) {
        console.log('⚠️ Algumas colunas não existem na tabela meetings, tentando com dados básicos...');
        
        const basicData = {
          name: meetingData.name,
          email: meetingData.email,
          company: meetingData.company,
          phone: meetingData.phone,
          message: meetingData.message,
          preferred_date: meetingData.preferred_date,
          preferred_time: meetingData.preferred_time,
          status: meetingData.status || 'pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        const { data: basicResult, error: basicError } = await supabase
          .from('meetings')
          .insert([basicData])
          .select();

        if (basicError) throw basicError;
        
        console.log('✅ Reunião salva com dados básicos no Supabase:', {
          id: basicResult[0].id,
          name: meetingData.name,
          email: meetingData.email,
          company: meetingData.company
        });
        
        return basicResult[0];
      } else {
        throw error;
      }
    }
    
    console.log('✅ Reunião salva no Supabase:', {
      id: data[0].id,
      name: meetingData.name,
      email: meetingData.email,
      company: meetingData.company,
      role: meetingData.role,
      company_size: meetingData.company_size
    });
    
    return data[0];
    
  } catch (error) {
    console.error('❌ Erro ao salvar reunião:', error.message);
    throw error;
  }
}

/**
 * Salvar um novo contato (otimizado para formulário simplificado)
 */
async function saveContact(contactData) {
  try {
    // Sanitizar e validar dados de entrada
    const sanitizedData = {
      name: contactData.name?.trim(),
      email: contactData.email?.toLowerCase().trim(),
      phone: contactData.phone?.trim() || null,
      subject: contactData.subject?.trim(),
      message: contactData.message?.trim(),
      priority: contactData.priority || 'normal',
      source: contactData.source || 'contact_form',
      status: contactData.status || 'new',
      role: contactData.role?.trim(),
      company_size: contactData.company_size,
      main_challenge: contactData.main_challenge?.trim(),
      monthly_investment: contactData.monthly_investment,
      pricing_expectation: contactData.pricing_expectation,
      current_solution: contactData.current_solution,
      feedback: contactData.feedback,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Remover campos undefined/null para otimização
    Object.keys(sanitizedData).forEach(key => {
      if (sanitizedData[key] === undefined || sanitizedData[key] === '') {
        delete sanitizedData[key];
      }
    });

    const { data, error } = await supabase
      .from('contacts')
      .insert([sanitizedData])
      .select();

    if (error) {
      // Se houver erro de coluna não encontrada, tentar com dados essenciais
      if (error.message.includes('column') && (error.message.includes('does not exist') || error.message.includes('schema cache'))) {
        console.log('⚠️ Algumas colunas não existem, tentando com dados essenciais...');
        
        const essentialData = {
          name: sanitizedData.name,
          email: sanitizedData.email,
          subject: sanitizedData.subject,
          message: sanitizedData.message,
          priority: sanitizedData.priority,
          source: sanitizedData.source,
          status: sanitizedData.status,
          created_at: sanitizedData.created_at,
          updated_at: sanitizedData.updated_at
        };

        // Remover campos undefined/null
        Object.keys(essentialData).forEach(key => {
          if (essentialData[key] === undefined || essentialData[key] === null) {
            delete essentialData[key];
          }
        });

        const { data: basicResult, error: basicError } = await supabase
          .from('contacts')
          .insert([essentialData])
          .select();

        if (basicError) throw basicError;
        
        console.log('✅ Contato salvo com dados essenciais no Supabase:', {
          id: basicResult[0].id,
          name: sanitizedData.name,
          email: sanitizedData.email,
          source: sanitizedData.source
        });
        
        return basicResult[0];
      } else {
        throw error;
      }
    }
    
    console.log('✅ Contato salvo no Supabase:', {
      id: data[0].id,
      name: sanitizedData.name,
      email: sanitizedData.email,
      role: sanitizedData.role,
      main_challenge: sanitizedData.main_challenge,
      source: sanitizedData.source
    });
    
    return data[0];
    
  } catch (error) {
    console.error('❌ Erro ao salvar contato:', error.message);
    throw error;
  }
}

/**
 * Buscar reuniões com filtros
 */
async function getMeetings(filters = {}) {
  let query = supabase
    .from('meetings')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters.status) {
    query = query.eq('status', filters.status);
  }

  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

/**
 * Buscar contatos com filtros
 */
async function getContacts(filters = {}) {
  let query = supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters.status) {
    query = query.eq('status', filters.status);
  }

  if (filters.source) {
    query = query.eq('source', filters.source);
  }

  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

/**
 * Atualizar status de reunião
 */
async function updateMeetingStatus(id, status) {
  const { data, error } = await supabase
    .from('meetings')
    .update({ 
      status: status, 
      updated_at: new Date().toISOString() 
    })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data[0];
}

/**
 * Salvar uma nova solicitação de demo
 */
async function saveDemo(demoData) {
  try {
    // Primeiro, tentar inserir com todas as colunas
    const fullData = {
      name: demoData.name,
      email: demoData.email,
      company: demoData.company,
      phone: demoData.phone,
      message: demoData.message,
      status: demoData.status || 'pending',
      role: demoData.role,
      company_size: demoData.company_size,
      main_challenge: demoData.main_challenge,
      monthly_investment: demoData.monthly_investment,
      pricing_expectation: demoData.pricing_expectation,
      current_solution: demoData.current_solution,
      feedback: demoData.feedback,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('demos')
      .insert([fullData])
      .select();

    if (error) {
      // Se houver erro de coluna não encontrada, tentar com dados básicos
      if (error.message.includes('column') && (error.message.includes('does not exist') || error.message.includes('schema cache'))) {
        console.log('⚠️ Algumas colunas não existem na tabela demos, tentando com dados básicos...');
        
        const basicData = {
          name: demoData.name,
          email: demoData.email,
          company: demoData.company,
          phone: demoData.phone,
          message: demoData.message,
          status: demoData.status || 'pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        const { data: basicResult, error: basicError } = await supabase
          .from('demos')
          .insert([basicData])
          .select();

        if (basicError) throw basicError;
        
        console.log('✅ Demo salvo com dados básicos no Supabase:', {
          id: basicResult[0].id,
          name: demoData.name,
          email: demoData.email,
          company: demoData.company
        });
        
        return basicResult[0];
      } else {
        throw error;
      }
    }
    
    console.log('✅ Demo salvo no Supabase:', {
      id: data[0].id,
      name: demoData.name,
      email: demoData.email,
      company: demoData.company,
      role: demoData.role,
      company_size: demoData.company_size
    });
    
    return data[0];
    
  } catch (error) {
    console.error('❌ Erro ao salvar demo:', error.message);
    
    // Se a tabela demos não existir, tentar criá-la
    if (error.code === 'PGRST205' || error.message.includes('table') && error.message.includes('schema cache')) {
      console.log('🔧 Tabela demos não existe, tentando criar...');
      
      try {
        // Tentar criar a tabela demos via insert que força criação
        const createTableData = {
          name: demoData.name,
          email: demoData.email,
          company: demoData.company || null,
          phone: demoData.phone || null,
          message: demoData.message || null,
          status: 'pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        // Tentar inserir diretamente via API REST para forçar criação da tabela
        const response = await fetch(`${supabaseUrl}/rest/v1/demos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseKey}`,
            'apikey': supabaseKey,
            'Prefer': 'return=representation'
          },
          body: JSON.stringify(createTableData)
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('✅ Tabela demos criada e demo salvo:', data[0]?.id);
          return data[0];
        } else {
          console.log('❌ Falha ao criar tabela demos:', await response.text());
          throw new Error('Tabela demos não existe e não foi possível criá-la. Por favor, execute o schema SQL no Supabase.');
        }
        
      } catch (createError) {
        console.error('❌ Erro ao criar tabela demos:', createError.message);
        throw new Error('Tabela demos não existe. Por favor, execute o schema SQL no Supabase dashboard.');
      }
    }
    
    throw error;
  }
}

/**
 * Buscar demos com filtros
 */
async function getDemos(filters = {}) {
  let query = supabase
    .from('demos')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters.status) {
    query = query.eq('status', filters.status);
  }

  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

/**
 * Buscar estatísticas
 */
async function getStats() {
  try {
    const [
      { count: totalMeetings },
      { count: pendingMeetings },
      { count: totalContacts },
      { count: newContacts },
      { count: totalDemos },
      { count: pendingDemos }
    ] = await Promise.all([
      supabase.from('meetings').select('*', { count: 'exact', head: true }),
      supabase.from('meetings').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('contacts').select('*', { count: 'exact', head: true }),
      supabase.from('contacts').select('*', { count: 'exact', head: true }).eq('status', 'new'),
      supabase.from('demos').select('*', { count: 'exact', head: true }),
      supabase.from('demos').select('*', { count: 'exact', head: true }).eq('status', 'pending')
    ]);

    return {
      totalMeetings: totalMeetings || 0,
      pendingMeetings: pendingMeetings || 0,
      totalContacts: totalContacts || 0,
      newContacts: newContacts || 0,
      totalDemos: totalDemos || 0,
      pendingDemos: pendingDemos || 0
    };
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    return {
      totalMeetings: 0,
      pendingMeetings: 0,
      totalContacts: 0,
      newContacts: 0,
      totalDemos: 0,
      pendingDemos: 0
    };
  }
}

module.exports = {
  supabase,
  initializeTables,
  saveMeeting,
  saveContact,
  saveDemo,
  getMeetings,
  getContacts,
  getDemos,
  updateMeetingStatus,
  getStats
};