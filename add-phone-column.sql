-- Migração para adicionar coluna 'phone' na tabela contacts
-- Execute este SQL no editor SQL do seu projeto Supabase

-- Adicionar coluna phone na tabela contacts
ALTER TABLE contacts 
ADD COLUMN IF NOT EXISTS phone TEXT;

-- Criar índice para a nova coluna phone (opcional, para performance em buscas)
CREATE INDEX IF NOT EXISTS idx_contacts_phone ON contacts(phone);

-- Comentário na nova coluna
COMMENT ON COLUMN contacts.phone IS 'Telefone/WhatsApp do contato (opcional)';

-- Verificar se a coluna foi adicionada corretamente
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'contacts' 
AND column_name = 'phone';