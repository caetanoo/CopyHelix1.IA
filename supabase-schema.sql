-- CopyHelix.ai - Supabase Schema
-- Execute este SQL no editor SQL do seu projeto Supabase

-- Tabela para agendamentos de reunião
CREATE TABLE IF NOT EXISTS meetings (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  message TEXT,
  preferred_date DATE,
  preferred_time TIME,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  -- Novos campos de validação
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

-- Tabela para leads de contato geral
CREATE TABLE IF NOT EXISTS contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT,
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  source TEXT DEFAULT 'contact_form',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed')),
  -- Novos campos de validação
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

-- Tabela para solicitações de demo
CREATE TABLE IF NOT EXISTS demos (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'completed', 'cancelled')),
  -- Campos de validação
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

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_meetings_status ON meetings(status);
CREATE INDEX IF NOT EXISTS idx_meetings_created_at ON meetings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_meetings_email ON meetings(email);

CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_priority ON contacts(priority);
CREATE INDEX IF NOT EXISTS idx_contacts_source ON contacts(source);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);

CREATE INDEX IF NOT EXISTS idx_demos_status ON demos(status);
CREATE INDEX IF NOT EXISTS idx_demos_created_at ON demos(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_demos_email ON demos(email);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar o trigger nas tabelas
CREATE TRIGGER update_meetings_updated_at 
  BEFORE UPDATE ON meetings 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contacts_updated_at 
  BEFORE UPDATE ON contacts 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_demos_updated_at 
  BEFORE UPDATE ON demos 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Políticas RLS (Row Level Security) - opcional, mas recomendado para segurança
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE demos ENABLE ROW LEVEL SECURITY;

-- Política para permitir acesso total ao service role (seu servidor)
CREATE POLICY "Service role can manage meetings" ON meetings
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage contacts" ON contacts
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage demos" ON demos
  FOR ALL USING (auth.role() = 'service_role');

-- Se você quiser permitir leitura pública (opcional)
-- CREATE POLICY "Public can view meetings" ON meetings
--   FOR SELECT USING (true);

-- CREATE POLICY "Public can view contacts" ON contacts
--   FOR SELECT USING (true);

-- Comentários nas tabelas para documentação
COMMENT ON TABLE meetings IS 'Tabela para armazenar agendamentos de reuniões dos leads';
COMMENT ON TABLE contacts IS 'Tabela para armazenar contatos gerais e solicitações de informação';
COMMENT ON TABLE demos IS 'Tabela para armazenar solicitações específicas de demonstração';

COMMENT ON COLUMN meetings.status IS 'Status do agendamento: pending, confirmed, completed, cancelled';
COMMENT ON COLUMN contacts.priority IS 'Prioridade do contato: low, normal, high, urgent';
COMMENT ON COLUMN contacts.source IS 'Origem do lead: contact_form, demo_form, etc.';
COMMENT ON COLUMN demos.status IS 'Status da demo: pending, contacted, completed, cancelled';

-- Inserir alguns dados de exemplo (opcional)
-- INSERT INTO meetings (name, email, company, preferred_date, preferred_time, message) VALUES
-- ('João Silva', 'joao@exemplo.com', 'Empresa ABC', '2024-01-15', '14:00', 'Gostaria de conhecer a plataforma');

-- INSERT INTO contacts (name, email, subject, message, priority, source) VALUES
-- ('Maria Santos', 'maria@exemplo.com', 'Demonstração CopyHelix', 'Interesse em conhecer a solução', 'high', 'demo_form');