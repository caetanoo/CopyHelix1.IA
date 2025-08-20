import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { 
        name, 
        email, 
        phone, 
        company, 
        meetingDate, 
        meetingTime, 
        timezone,
        description 
      } = req.body;

      // Validação básica
      if (!name || !email || !meetingDate || !meetingTime) {
        return res.status(400).json({ error: 'Campos obrigatórios faltando' });
      }

      const { data, error } = await supabase
        .from('meetings')
        .insert([{
          name,
          email,
          phone: phone || '',
          company: company || '',
          meeting_date: meetingDate,
          meeting_time: meetingTime,
          timezone: timezone || 'America/Sao_Paulo',
          description: description || '',
          status: 'agendada',
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        console.error('Erro Supabase:', error);
        return res.status(500).json({ error: 'Erro ao agendar reunião' });
      }

      return res.status(200).json({ 
        success: true, 
        message: 'Reunião agendada com sucesso!',
        meeting: data
      });

    } catch (error) {
      console.error('Erro no servidor:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('meetings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro Supabase:', error);
        return res.status(500).json({ error: 'Erro ao buscar reuniões' });
      }

      return res.status(200).json({ meetings: data });

    } catch (error) {
      console.error('Erro no servidor:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const meetingId = req.url.split('/').pop();
      const { status } = req.body;

      const { data, error } = await supabase
        .from('meetings')
        .update({ status })
        .eq('id', meetingId)
        .select()
        .single();

      if (error) {
        console.error('Erro Supabase:', error);
        return res.status(500).json({ error: 'Erro ao atualizar reunião' });
      }

      return res.status(200).json({ 
        success: true, 
        meeting: data
      });

    } catch (error) {
      console.error('Erro no servidor:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}