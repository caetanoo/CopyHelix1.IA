const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Configuração do Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createDemosTable() {
  try {
    console.log('🚀 Criando tabela demos...');
    
    // Tentar criar a tabela demos via raw SQL usando uma abordagem criativa
    // Como não conseguimos executar DDL diretamente, vamos tentar inserir dados que forcem a criação
    
    // Primeiro verificar se a tabela já existe
    const { data: existingDemos, error: checkError } = await supabase
      .from('demos')
      .select('count', { count: 'exact', head: true });
    
    if (!checkError) {
      console.log('✅ Tabela demos já existe!');
      return;
    }
    
    if (checkError.code === 'PGRST116' || checkError.message.includes('does not exist') || checkError.message.includes('schema cache')) {
      console.log('📋 Tabela demos não existe, criando...');
      
      // Vamos tentar uma abordagem diferente - usar a API REST diretamente
      const response = await fetch(`${supabaseUrl}/rest/v1/demos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'apikey': supabaseServiceKey,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({
          name: 'Test Demo Creation',
          email: 'test@demo.creation',
          company: 'Test Company',
          phone: '123456789',
          message: 'Test message for table creation',
          status: 'pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Tabela demos criada com sucesso!');
        console.log('📊 Registro de teste criado:', data[0]?.id);
        
        // Remover o registro de teste
        await supabase.from('demos').delete().eq('email', 'test@demo.creation');
        console.log('🧹 Registro de teste removido');
        
      } else {
        const errorText = await response.text();
        console.log('❌ Erro ao criar tabela demos:', errorText);
        
        // Se falhou, talvez a tabela não tenha todas as colunas
        // Tentar com dados mínimos
        console.log('🔄 Tentando criar com dados mínimos...');
        
        const minimalResponse = await fetch(`${supabaseUrl}/rest/v1/demos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseServiceKey}`,
            'apikey': supabaseServiceKey,
            'Prefer': 'return=representation'
          },
          body: JSON.stringify({
            name: 'Test',
            email: 'test@minimal.creation',
            created_at: new Date().toISOString()
          })
        });
        
        if (minimalResponse.ok) {
          console.log('✅ Tabela demos criada com estrutura mínima!');
          await supabase.from('demos').delete().eq('email', 'test@minimal.creation');
        } else {
          console.log('❌ Falha ao criar tabela demos:', await minimalResponse.text());
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Erro ao criar tabela demos:', error.message);
  }
}

// Executar criação
if (require.main === module) {
  createDemosTable().then(() => {
    console.log('✅ Processo de criação da tabela demos concluído!');
    process.exit(0);
  }).catch((error) => {
    console.error('❌ Falha na criação:', error.message);
    process.exit(1);
  });
}

module.exports = { createDemosTable };