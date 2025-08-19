import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
}

const defaultSEO = {
  title: "CopyHelix.ai - Ferramenta IA para Criar Criativos | Templates Infoprodutos",
  description: "🧬 A primeira IA que decodifica o DNA dos seus criativos vencedores. Crie templates para infoprodutos, criativos para anúncios e réplicas que convertem. Para infoprodutores brasileiros.",
  keywords: "ferramenta ia criativos, templates infoprodutos, como criar criativos, criativos para infoprodutos, ia para criação conteúdo, dna criativo, templates criativos, infoprodutores brasil",
  image: "https://copyhelix.ai/og-image.jpg",
  type: "website"
};

const seoConfig: { [key: string]: SEOData } = {
  "/": defaultSEO,
  "/sobre": {
    title: "Sobre a CopyHelix.ai - Ferramenta IA para Criativos | História da Empresa",
    description: "Conheça a história da CopyHelix.ai, a primeira ferramenta de IA que decodifica criativos vencedores para infoprodutores brasileiros. Nossa missão e visão.",
    keywords: "copyhelix ai empresa, sobre copyhelix, ferramenta ia brasileira, criativos inteligencia artificial, dna criativo historia"
  },
  "/blog": {
    title: "Blog CopyHelix - Como Criar Criativos com IA | Templates Infoprodutos",
    description: "Blog especializado em criação de criativos com IA. Aprenda como criar templates para infoprodutos, anúncios que convertem e estratégias de marketing digital.",
    keywords: "blog criativos ia, como criar criativos, templates infoprodutos blog, marketing digital brasil, criacao conteudo ia"
  },
  "/blog/dna-criativo-performance-marketing-2025": {
    title: "Como Criar Criativos com IA: DNA dos Anúncios que Convertem em 2025",
    description: "Descubra como usar IA para criar criativos que convertem. Aprenda a decodificar o DNA dos anúncios vencedores e aumentar ROI em até 300%.",
    keywords: "como criar criativos com ia, anuncios que convertem, dna criativos, performance marketing 2025, roi criativos"
  },
  "/blog/5-padroes-dna-infoprodutor-brasileiro": {
    title: "Templates para Infoprodutos: 5 Padrões de Criativos que Convertem",
    description: "Conheça os 5 padrões de templates para infoprodutos que mais convertem no Brasil. Análise exclusiva baseada em 10.000+ campanhas analisadas.",
    keywords: "templates infoprodutos, padroes criativos brasil, infoprodutores templates, criativos que convertem, templates anuncios"
  },
  "/ajuda": {
    title: "Central de Ajuda CopyHelix - Suporte | Como Usar IA para Criativos",
    description: "Precisa de ajuda com a CopyHelix? Encontre tutoriais, perguntas frequentes e suporte sobre como usar nossa ferramenta de IA para criar criativos.",
    keywords: "copyhelix ajuda, suporte ia criativos, como usar copyhelix, tutorial ferramenta ia, help criativos"
  }
};

export const useSEO = (customSEO?: SEOData) => {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    const seoData = customSEO || seoConfig[pathname] || defaultSEO;

    // Update title
    if (seoData.title) {
      document.title = seoData.title;
    }

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && seoData.description) {
      metaDescription.setAttribute('content', seoData.description);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && seoData.keywords) {
      metaKeywords.setAttribute('content', seoData.keywords);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && seoData.title) {
      ogTitle.setAttribute('content', seoData.title);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription && seoData.description) {
      ogDescription.setAttribute('content', seoData.description);
    }

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage && seoData.image) {
      ogImage.setAttribute('content', seoData.image);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', `https://copyhelix.ai${pathname}`);
    }

    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle && seoData.title) {
      twitterTitle.setAttribute('content', seoData.title);
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription && seoData.description) {
      twitterDescription.setAttribute('content', seoData.description);
    }

    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage && seoData.image) {
      twitterImage.setAttribute('content', seoData.image);
    }

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://copyhelix.ai${pathname}`);

  }, [location.pathname, customSEO]);
};