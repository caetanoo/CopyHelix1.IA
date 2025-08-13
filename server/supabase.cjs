const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Configuração do Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variáveis do Supabase não configuradas!');
  console.log('📋 Configure as seguintes variáveis no arquivo .env:');
  console.log('   SUPABASE_URL=sua_url_do_supabase');
  console.log('   SUPABASE_ANON_KEY=sua_chave_anonima');
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

    if (meetingsError && meetingsError.code === 'PGRST116') {
      console.log('📋 Tabela "meetings" não encontrada. Será criada automaticamente no primeiro insert.');
    }

    if (contactsError && contactsError.code === 'PGRST116') {
      console.log('📋 Tabela "contacts" não encontrada. Será criada automaticamente no primeiro insert.');
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
  const { data, error } = await supabase
    .from('meetings')
    .insert([{
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
    }])
    .select();

  if (error) throw error;
  return data[0];
}

/**
 * Salvar um novo contato
 */
async function saveContact(contactData) {
  const { data, error } = await supabase
    .from('contacts')
    .insert([{
      name: contactData.name,
      email: contactData.email,
      subject: contactData.subject,
      message: contactData.message,
      priority: contactData.priority || 'normal',
      source: contactData.source || 'contact_form',
      status: contactData.status || 'new',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }])
    .select();

  if (error) throw error;
  return data[0];
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
 * Buscar estatísticas
 */
async function getStats() {
  try {
    const [
      { count: totalMeetings },
      { count: pendingMeetings },
      { count: totalContacts },
      { count: newContacts }
    ] = await Promise.all([
      supabase.from('meetings').select('*', { count: 'exact', head: true }),
      supabase.from('meetings').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('contacts').select('*', { count: 'exact', head: true }),
      supabase.from('contacts').select('*', { count: 'exact', head: true }).eq('status', 'new')
    ]);

    return {
      totalMeetings: totalMeetings || 0,
      pendingMeetings: pendingMeetings || 0,
      totalContacts: totalContacts || 0,
      newContacts: newContacts || 0
    };
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    return {
      totalMeetings: 0,
      pendingMeetings: 0,
      totalContacts: 0,
      newContacts: 0
    };
  }
}

module.exports = {
  supabase,
  initializeTables,
  saveMeeting,
  saveContact,
  getMeetings,
  getContacts,
  updateMeetingStatus,
  getStats
};