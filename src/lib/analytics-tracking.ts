/**
 * Google Analytics 4 Tracking Functions for CopyHelix.ai
 * Centralized analytics tracking with Brazilian market focus
 */

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

/**
 * Helper to check if gtag is available
 */
const isGtagAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

/**
 * Helper to safely send events to gtag
 */
const safeGtagEvent = (eventName: string, parameters: any) => {
  if (isGtagAvailable()) {
    try {
      window.gtag('event', eventName, parameters);
      console.log(`📊 Analytics Event: ${eventName}`, parameters);
    } catch (error) {
      console.warn('Analytics tracking error:', error);
    }
  }
};

// ========================================
// 🎯 CONVERSION EVENTS (Primary KPIs)
// ========================================

/**
 * Track waitlist signup (Primary Conversion)
 * Triggered when user completes the main form in DemoSection
 */
export const trackWaitlistSignup = (data: {
  name: string;
  email: string;
  company: string;
  role: string;
  company_size: string;
  main_challenge: string;
  monthly_investment: string;
  pricing_expectation: string;
  current_solution?: string;
  phone?: string;
  feedback?: string;
}) => {
  // Main signup event
  safeGtagEvent('sign_up', {
    method: 'waitlist_form',
    user_segment: data.role || 'unknown',
    company_size: data.company_size || 'unknown',
    monthly_investment: data.monthly_investment || 'unknown',
    pricing_expectation: data.pricing_expectation || 'unknown',
    main_challenge: data.main_challenge || 'unknown',
    current_solution: data.current_solution || 'unknown',
    company_name: data.company,
    form_completion_source: 'dna_analysis_form',
    currency: 'BRL',
    value: 1,
    custom_event_category: 'lead_generation',
    custom_event_label: 'waitlist_conversion'
  });

  // Enhanced ecommerce - treat as "add to cart" for funnel analysis
  safeGtagEvent('add_to_cart', {
    currency: 'BRL',
    value: 0, // Free signup
    items: [{
      item_id: 'copyhelix_waitlist_access',
      item_name: 'CopyHelix Waitlist Access',
      item_category: 'beta_access',
      item_variant: 'founder_priority',
      quantity: 1,
      price: 0
    }]
  });

  // Generate lead event for conversion tracking
  safeGtagEvent('generate_lead', {
    value: 1,
    currency: 'BRL',
    lead_source: 'organic_website',
    lead_quality_score: calculateLeadScore(data),
    user_segment: data.role,
    investment_tier: data.monthly_investment
  });
};

/**
 * Track WhatsApp contact click (Immediate Conversion)
 * Triggered from various CTAs throughout the site
 */
export const trackWhatsAppContact = (data: {
  source: string; // e.g., 'sticky_cta', 'hero_button', 'waitlist_success'
  device_type?: string;
  page_location?: string;
  user_segment?: string;
}) => {
  safeGtagEvent('contact', {
    method: 'whatsapp',
    source: data.source,
    device_type: data.device_type || 'unknown',
    page_location: data.page_location || window.location.pathname,
    user_segment: data.user_segment || 'unknown',
    contact_intent: 'high',
    value: 2, // Higher value than form submission
    currency: 'BRL',
    custom_event_category: 'engagement',
    custom_event_label: 'whatsapp_click'
  });

  // Track as conversion for optimization
  safeGtagEvent('conversion', {
    send_to: 'G-17VB01E74G',
    event_category: 'contact',
    event_label: `whatsapp_${data.source}`,
    value: 2,
    currency: 'BRL'
  });
};

/**
 * Track meeting scheduling (High-Intent Conversion)
 * Triggered when MeetingScheduler form is completed
 */
export const trackMeetingScheduled = (data: {
  name: string;
  email: string;
  company: string;
  role: string;
  company_size: string;
  main_challenge: string;
  monthly_investment: string;
  pricing_expectation: string;
  preferred_date: string;
  preferred_time: string;
  phone?: string;
}) => {
  safeGtagEvent('schedule_meeting', {
    method: 'meeting_form',
    user_segment: data.role || 'unknown',
    company_size: data.company_size || 'unknown',
    monthly_investment: data.monthly_investment || 'unknown',
    pricing_expectation: data.pricing_expectation || 'unknown',
    main_challenge: data.main_challenge || 'unknown',
    meeting_date: data.preferred_date,
    meeting_time: data.preferred_time,
    lead_quality_score: calculateLeadScore(data),
    value: 5, // Highest value - direct sales intent
    currency: 'BRL',
    custom_event_category: 'conversion',
    custom_event_label: 'meeting_scheduled'
  });

  // Track as high-value lead
  safeGtagEvent('generate_lead', {
    value: 5,
    currency: 'BRL',
    lead_source: 'direct_meeting_request',
    lead_quality_score: calculateLeadScore(data),
    user_segment: data.role,
    investment_tier: data.monthly_investment,
    intent_level: 'very_high'
  });
};

// ========================================
// 📝 FORM INTERACTION EVENTS
// ========================================

/**
 * Track form start (User begins filling form)
 */
export const trackFormStart = (formType: 'waitlist' | 'meeting' | 'demo') => {
  safeGtagEvent('form_start', {
    form_type: formType,
    device_type: getDeviceType(),
    page_location: window.location.pathname,
    custom_event_category: 'engagement',
    custom_event_label: `${formType}_form_start`
  });
};

/**
 * Track form progress (User completes form sections)
 */
export const trackFormProgress = (data: {
  form_type: 'waitlist' | 'meeting' | 'demo';
  progress_percentage: number;
  completed_sections: string[];
  time_spent_seconds?: number;
}) => {
  safeGtagEvent('form_progress', {
    form_type: data.form_type,
    progress_percentage: data.progress_percentage,
    completed_sections: data.completed_sections.join(','),
    time_spent: data.time_spent_seconds || 0,
    device_type: getDeviceType(),
    custom_event_category: 'engagement',
    custom_event_label: `${data.form_type}_progress_${data.progress_percentage}`
  });
};

/**
 * Track form abandonment (User leaves without completing)
 */
export const trackFormAbandonment = (data: {
  form_type: 'waitlist' | 'meeting' | 'demo';
  last_completed_field: string;
  progress_percentage: number;
  time_spent_seconds: number;
}) => {
  safeGtagEvent('form_abandon', {
    form_type: data.form_type,
    last_completed_field: data.last_completed_field,
    progress_percentage: data.progress_percentage,
    time_spent: data.time_spent_seconds,
    abandonment_point: data.last_completed_field,
    device_type: getDeviceType(),
    custom_event_category: 'abandonment',
    custom_event_label: `${data.form_type}_abandon_${data.progress_percentage}`
  });
};

// ========================================
// 🎯 CTA AND INTERACTION EVENTS
// ========================================

/**
 * Track CTA button clicks throughout the site
 */
export const trackCTAClick = (data: {
  button_text: string;
  position: string; // e.g., 'hero_section', 'sticky_mobile', 'footer'
  destination: string; // e.g., 'contact_form', 'whatsapp', 'meeting_scheduler'
  device_type?: string;
}) => {
  safeGtagEvent('click', {
    element_type: 'cta_button',
    button_text: data.button_text,
    position: data.position,
    destination: data.destination,
    device_type: data.device_type || getDeviceType(),
    page_location: window.location.pathname,
    custom_event_category: 'engagement',
    custom_event_label: `cta_${data.position}_${data.destination}`
  });
};

/**
 * Track page scroll depth for engagement measurement
 */
export const trackScrollDepth = (depth: number) => {
  safeGtagEvent('scroll', {
    scroll_depth: depth,
    page_location: window.location.pathname,
    device_type: getDeviceType(),
    custom_event_category: 'engagement',
    custom_event_label: `scroll_${depth}percent`
  });
};

/**
 * Track time spent on page
 */
export const trackTimeOnPage = (timeSeconds: number) => {
  safeGtagEvent('timing_complete', {
    name: 'page_engagement',
    value: timeSeconds * 1000, // Convert to milliseconds
    event_category: 'engagement',
    event_label: window.location.pathname
  });
};

// ========================================
// 🔍 HELPER FUNCTIONS
// ========================================

/**
 * Calculate lead quality score based on user data
 */
const calculateLeadScore = (data: any): number => {
  let score = 0;
  
  // Role scoring
  const roleScores: { [key: string]: number } = {
    'ceo-founder': 10,
    'diretor-marketing': 8,
    'gestor-trafego': 7,
    'infoprodutor': 7,
    'social-media': 5,
    'freelancer': 5,
    'analista': 4,
    'designer': 4
  };
  score += roleScores[data.role] || 3;

  // Investment tier scoring
  const investmentScores: { [key: string]: number } = {
    'mais-100k': 15,
    '50k-100k': 12,
    '15k-50k': 10,
    '5k-15k': 7,
    'ate-5k': 4
  };
  score += investmentScores[data.monthly_investment] || 2;

  // Company size scoring
  const sizeScores: { [key: string]: number } = {
    'agencia-grande': 10,
    'agencia-media': 8,
    'empresa': 8,
    'agencia-pequena': 6,
    'startup': 5,
    'freelancer': 3
  };
  score += sizeScores[data.company_size] || 2;

  // Pricing expectation scoring
  const pricingScores: { [key: string]: number } = {
    'mais-997': 10,
    '597-997': 8,
    '297-597': 7,
    '97-297': 5,
    'ate-97': 3,
    'nao-pagaria': 0
  };
  score += pricingScores[data.pricing_expectation] || 2;

  return Math.min(score, 100); // Cap at 100
};

/**
 * Detect device type
 */
const getDeviceType = (): string => {
  if (typeof window === 'undefined') return 'unknown';
  
  const userAgent = navigator.userAgent || navigator.vendor;
  
  if (/iPad|iPhone|iPod/.test(userAgent)) return 'mobile_ios';
  if (/android/i.test(userAgent)) return 'mobile_android';
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
    return 'mobile_other';
  }
  return 'desktop';
};

/**
 * Track page view with enhanced data
 */
export const trackPageView = (pagePath?: string) => {
  safeGtagEvent('page_view', {
    page_path: pagePath || window.location.pathname,
    device_type: getDeviceType(),
    page_title: document.title,
    page_language: 'pt-BR'
  });
};

/**
 * Set user properties for better segmentation
 */
export const setUserProperties = (properties: {
  user_segment?: string;
  company_size?: string;
  monthly_investment?: string;
  main_challenge?: string;
  is_returning_visitor?: boolean;
}) => {
  if (isGtagAvailable()) {
    window.gtag('config', 'G-17VB01E74G', {
      custom_map: {
        'user_segment': 'custom_parameter_1',
        'monthly_investment': 'custom_parameter_2',  
        'company_size': 'custom_parameter_3',
        'main_challenge': 'custom_parameter_4'
      }
    });

    // Set user properties
    window.gtag('set', {
      user_properties: {
        user_segment: properties.user_segment || 'unknown',
        company_size: properties.company_size || 'unknown',
        monthly_investment: properties.monthly_investment || 'unknown',
        main_challenge: properties.main_challenge || 'unknown'
      }
    });
  }
};

// ========================================
// 🎯 INITIALIZATION
// ========================================

/**
 * Initialize analytics with Brazilian market configuration
 */
export const initializeAnalytics = () => {
  if (isGtagAvailable()) {
    // Set Brazilian locale and currency
    window.gtag('config', 'G-17VB01E74G', {
      country: 'BR',
      currency: 'BRL',
      language: 'pt-br',
      time_zone: 'America/Sao_Paulo',
      send_page_view: true,
      
      // Custom parameter mapping
      custom_map: {
        'user_segment': 'custom_parameter_1',
        'monthly_investment': 'custom_parameter_2',
        'company_size': 'custom_parameter_3',
        'main_challenge': 'custom_parameter_4',
        'pricing_expectation': 'custom_parameter_5'
      }
    });
    
    console.log('📊 CopyHelix Analytics initialized for Brazilian market');
  }
};

// Auto-initialize when module loads
if (typeof window !== 'undefined') {
  // Wait for gtag to be available
  const checkGtag = () => {
    if (window.gtag) {
      initializeAnalytics();
    } else {
      setTimeout(checkGtag, 100);
    }
  };
  checkGtag();
}