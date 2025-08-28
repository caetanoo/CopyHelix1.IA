#!/bin/bash

echo "🚀 Instalando dependências para gráficos CopyHelix.ai..."

# Verificar se Python está instalado
if command -v python3 &> /dev/null; then
    echo "✅ Python3 encontrado"
else
    echo "❌ Python3 não encontrado. Instale Python primeiro."
    exit 1
fi

# Atualizar pip
echo "📦 Atualizando pip..."
python3 -m pip install --upgrade pip

# Instalar dependências
echo "📊 Instalando matplotlib..."
python3 -m pip install matplotlib

echo "📈 Instalando seaborn..."
python3 -m pip install seaborn

echo "🔢 Instalando numpy..."
python3 -m pip install numpy

echo "✅ Instalação concluída!"
echo ""
echo "Para executar o gráfico:"
echo "python3 pitch_graph_copyhelix.py"