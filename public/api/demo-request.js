// API endpoint para processar solicitações de demo
// Para produção, substitua por endpoint real do seu backend

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, company, phone } = req.body;

    // Validação básica
    if (!name || !email || !company) {
      return res.status(400).json({ 
        error: 'Nome, email e empresa são obrigatórios' 
      });
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Email inválido' 
      });
    }

    // Simular processamento (em produção, integre com seu CRM/email)
    const leadData = {
      name,
      email,
      company,
      phone: phone || '',
      timestamp: new Date().toISOString(),
      source: 'landing_page_demo',
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      userAgent: req.headers['user-agent']
    };

    // TODO: Integrar com seu sistema
    // - Enviar para CRM (HubSpot, Salesforce, etc.)
    // - Disparar email de confirmação
    // - Notificar equipe de vendas
    // - Salvar em banco de dados
    
    console.log('Nova solicitação de demo:', leadData);

    // Simular delay de processamento
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Em produção, aqui você faria:
    // 1. Salvar no banco de dados
    // 2. Enviar email de confirmação
    // 3. Notificar equipe de vendas
    // 4. Integrar com CRM

    return res.status(200).json({ 
      success: true, 
      message: 'Solicitação recebida com sucesso',
      leadId: `demo_${Date.now()}`
    });

  } catch (error) {
    console.error('Erro ao processar solicitação de demo:', error);
    
    return res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
}

// Para usar em desenvolvimento local com Vite
if (typeof window === 'undefined' && process.env.NODE_ENV === 'development') {
  // Mock para desenvolvimento
  window.mockDemoAPI = async (formData) => {
    console.log('Mock API - Demo request:', formData);
    
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simular erro ocasional (10% das vezes)
    if (Math.random() < 0.1) {
      throw new Error('Erro simulado para teste');
    }
    
    return {
      success: true,
      message: 'Demo solicitada com sucesso (modo desenvolvimento)',
      leadId: `dev_demo_${Date.now()}`
    };
  };
}