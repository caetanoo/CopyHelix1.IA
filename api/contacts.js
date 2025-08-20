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
      const { name, email, subject, message, phone } = req.body;

      // Validação básica
      if (!name || !email) {
        return res.status(400).json({ error: 'Nome e email são obrigatórios' });
      }

      const { data, error } = await supabase
        .from('contacts')
        .insert([{
          name,
          email,
          subject: subject || 'Contato via site',
          message: message || '',
          phone: phone || ''
        }])
        .select()
        .single();

      if (error) {
        console.error('Erro Supabase:', error);
        return res.status(500).json({ error: 'Erro ao salvar contato' });
      }

      return res.status(200).json({ 
        success: true, 
        message: 'Contato enviado com sucesso!',
        contact: data
      });

    } catch (error) {
      console.error('Erro no servidor:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro Supabase:', error);
        return res.status(500).json({ error: 'Erro ao buscar contatos' });
      }

      return res.status(200).json({ contacts: data });

    } catch (error) {
      console.error('Erro no servidor:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}