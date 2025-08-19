-- Criar tabela demos se não existir
CREATE TABLE IF NOT EXISTS public.demos (
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

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_demos_status ON public.demos(status);
CREATE INDEX IF NOT EXISTS idx_demos_created_at ON public.demos(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_demos_email ON public.demos(email);

-- Comentários
COMMENT ON TABLE public.demos IS 'Tabela para armazenar solicitações específicas de demonstração';
COMMENT ON COLUMN public.demos.status IS 'Status da demo: pending, contacted, completed, cancelled';