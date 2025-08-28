/**
 * Google Analytics 4 Tracking Functions for CopyHelix.ai
 * Centralized analytics tracking with Brazilian market focus
 * 
 * SIMPLIFIED FORM TRACKING - 5 Essential Fields Only:
 * 1. name (string) - obrigatório
 * 2. email (string) - obrigatório  
 * 3. phone (string) - opcional
 * 4. role (string) - obrigatório
 * 5. main_challenge (string) - obrigatório
 * 
 * Form Progress Sections:
 * - basic_info (20%): name, email collected
 * - contact_role (40%): phone, role added  
 * - challenge_complete (60%): main_challenge completed
 * - validation (80%): form validation passed
 * - submission (100%): successful form submission
 * 
 * Main Functions for Form Integration:
 * - trackWaitlistSignup(data): Track completed form submission
 * - trackFormStart(formType): Track when user starts filling form
 * - trackFormProgress(data): Track form completion progress
 * - trackFormAbandonment(data): Track when user abandons form
 * - getFormProgressData(completedFields): Helper to calculate progress
 * - setUserProperties({role, main_challenge}): Set user segmentation
 * 
 * Removed Fields: company, company_size, monthly_investment, pricing_expectation,
 * current_solution, acquisition_channel, urgency, feedback
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
  phone?: string;
  role: string;
  main_challenge: string;
}) => {
  // Main signup event
  safeGtagEvent('sign_up', {
    method: 'waitlist_form',
    user_segment: data.role || 'unknown',
    main_challenge: data.main_challenge || 'unknown',
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
    user_segment: data.role
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
  phone?: string;
  role: string;
  main_challenge: string;
  preferred_date: string;
  preferred_time: string;
}) => {
  safeGtagEvent('schedule_meeting', {
    method: 'meeting_form',
    user_segment: data.role || 'unknown',
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
 * Progress sections: basic_info (20%), contact_role (40%), challenge_complete (60%), validation (80%), submission (100%)
 */
export const trackFormProgress = (data: {
  form_type: 'waitlist' | 'meeting' | 'demo';
  progress_percentage: 20 | 40 | 60 | 80 | 100;
  completed_sections: ('basic_info' | 'contact_role' | 'challenge_complete')[];
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
 * Get form progress data for simplified 5-field form
 */
export const getFormProgressData = (completedFields: string[]): {
  progress_percentage: 20 | 40 | 60 | 80 | 100;
  completed_sections: ('basic_info' | 'contact_role' | 'challenge_complete')[];
} => {
  const sections: ('basic_info' | 'contact_role' | 'challenge_complete')[] = [];
  let progress: 20 | 40 | 60 | 80 | 100 = 20;

  // Basic info section (name, email)
  if (completedFields.includes('name') && completedFields.includes('email')) {
    sections.push('basic_info');
    progress = 20;
  }

  // Contact role section (phone, role)
  if (completedFields.includes('role')) {
    sections.push('contact_role');
    progress = 40;
  }

  // Challenge complete section (main_challenge)
  if (completedFields.includes('main_challenge')) {
    sections.push('challenge_complete');
    progress = 60;
  }

  // Validation passed
  if (sections.length === 3) {
    progress = 80;
  }

  // Form submitted (this should be set externally when form is actually submitted)
  // progress = 100; // Set this when form submission is successful

  return { progress_percentage: progress, completed_sections: sections };
};

/**
 * Calculate lead quality score based on simplified user data
 * Simplified scoring based only on role and main_challenge
 */
const calculateLeadScore = (data: { role?: string; main_challenge?: string }): number => {
  let score = 0;
  
  // Role scoring (more important weight since we have fewer fields)
  const roleScores: { [key: string]: number } = {
    'ceo-founder': 25,
    'diretor-marketing': 20,
    'gestor-trafego': 18,
    'infoprodutor': 18,
    'social-media': 12,
    'freelancer': 12,
    'analista': 10,
    'designer': 10
  };
  score += roleScores[data.role || ''] || 8;

  // Challenge urgency scoring (indicates immediate need)
  const challengeScores: { [key: string]: number } = {
    'baixa-conversao': 25,     // High urgency - direct revenue impact
    'falta-tempo': 20,         // High urgency - operational pain
    'conteudo-generico': 18,   // Medium-high urgency - competitive issue
    'sem-estrategia': 15,      // Medium urgency - foundational need
    'custos-altos': 22,        // High urgency - financial pressure
    'equipe-limitada': 17,     // Medium urgency - resource constraint
    'resultados-lentos': 20,   // High urgency - performance issue
    'outros': 10               // Low urgency - unclear need
  };
  score += challengeScores[data.main_challenge || ''] || 10;

  // Bonus for having both key fields (completeness indicator)
  if (data.role && data.main_challenge) {
    score += 15;
  }

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
 * Simplified to track only essential properties: role and main_challenge
 */
export const setUserProperties = (properties: {
  role?: string;
  main_challenge?: string;
  is_returning_visitor?: boolean;
}) => {
  if (isGtagAvailable()) {
    window.gtag('config', 'G-17VB01E74G', {
      custom_map: {
        'user_segment': 'custom_parameter_1',
        'main_challenge': 'custom_parameter_2'
      }
    });

    // Set user properties
    window.gtag('set', {
      user_properties: {
        user_segment: properties.role || 'unknown',
        main_challenge: properties.main_challenge || 'unknown',
        is_returning_visitor: properties.is_returning_visitor || false
      }
    });
  }
};

// ========================================
// 🎯 INITIALIZATION
// ========================================

/**
 * Initialize analytics with Brazilian market configuration
 * Simplified configuration for essential tracking only
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
      
      // Simplified custom parameter mapping for essential fields only
      custom_map: {
        'user_segment': 'custom_parameter_1',
        'main_challenge': 'custom_parameter_2'
      }
    });
    
    console.log('📊 CopyHelix Analytics initialized for Brazilian market (Simplified Version)');
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