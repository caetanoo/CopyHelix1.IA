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

  if (req.method === 'GET') {
    try {
      // Buscar estatísticas de contatos, reuniões e demos
      const [contactsResult, meetingsResult, demosResult] = await Promise.all([
        supabase.from('contacts').select('id', { count: 'exact' }),
        supabase.from('meetings').select('id', { count: 'exact' }),
        supabase.from('demos').select('id', { count: 'exact' })
      ]);

      const stats = {
        contacts: contactsResult.count || 0,
        meetings: meetingsResult.count || 0,
        demos: demosResult.count || 0,
        totalLeads: (contactsResult.count || 0) + (meetingsResult.count || 0) + (demosResult.count || 0)
      };

      return res.status(200).json({ 
        success: true, 
        stats 
      });

    } catch (error) {
      console.error('Erro no servidor:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}