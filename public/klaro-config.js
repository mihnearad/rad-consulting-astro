// Klaro Cookie Consent Configuration
// Documentation: https://klaro.kiprotect.com/docs

window.klaroConfig = {
  // Version of the configuration
  version: 1,

  // Element ID where Klaro will be rendered (optional)
  elementID: 'klaro',

  // Styling configuration
  styling: {
    theme: ['light'],
  },

  // Whether to show the banner on page load
  mustConsent: true,

  // Language (can be 'en', 'de', 'fr', etc.)
  lang: 'en',

  // Consent notice configuration
  consentNotice: true,
  
  // Consent modal configuration  
  consentModal: true,

  // Privacy policy URL
  privacyPolicy: '/privacy-policy',

  // Styling with your brand colors
  css: `
    .klaro .cm-modal {
      background: var(--bodyTextColorWhite, #fafbfc) !important;
      color: var(--bodyTextColor, #4a5568) !important;
      border-radius: 8px !important;
      box-shadow: 0 10px 25px rgba(1, 20, 38, 0.2) !important;
    }
    
    .klaro .cm-modal .title {
      color: var(--primary, #011426) !important;
      font-weight: 700 !important;
    }
    
    .klaro .cm-btn {
      border-radius: 6px !important;
      font-weight: 600 !important;
      transition: all 0.3s ease !important;
    }
    
    .klaro .cm-btn.cm-btn-success {
      background: var(--primary, #011426) !important;
      border-color: var(--primary, #011426) !important;
    }
    
    .klaro .cm-btn.cm-btn-success:hover {
      background: var(--primaryLight, #3483C5) !important;
      border-color: var(--primaryLight, #3483C5) !important;
    }
    
    .klaro .cm-btn.cm-btn-info {
      background: transparent !important;
      border-color: var(--primary, #011426) !important;
      color: var(--primary, #011426) !important;
    }
    
    .klaro .cm-btn.cm-btn-info:hover {
      background: var(--primary, #011426) !important;
      color: white !important;
    }
    
    .klaro .cn-notice {
      background: var(--primary, #011426) !important;
      color: white !important;
      border-radius: 8px !important;
      box-shadow: 0 4px 15px rgba(1, 20, 38, 0.3) !important;
    }
    
    .klaro .cn-notice .cn-ok {
      background: var(--primaryLight, #3483C5) !important;
      border-radius: 6px !important;
      font-weight: 600 !important;
    }
    
    .klaro .cn-notice .cn-learn-more {
      color: var(--primaryLight, #3483C5) !important;
      text-decoration: underline !important;
    }
  `,

  // Services configuration
  services: [
    {
      name: 'google-analytics',
      title: 'Google Analytics',
      description: 'We use Google Analytics to analyze website usage and improve our services.',
      purposes: ['analytics', 'statistics'],
      required: false,
      optOut: false,
      onlyOnce: false,
      default: false,
      callback: function(consent, service) {
        if (consent) {
          // Enable Google Analytics
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-HW0BVWR14C', {
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure'
          });
          
          // Load the script
          const script = document.createElement('script');
          script.async = true;
          script.src = 'https://www.googletagmanager.com/gtag/js?id=G-HW0BVWR14C';
          document.head.appendChild(script);
          
          console.log('Google Analytics enabled');
        } else {
          // Disable Google Analytics
          window['ga-disable-G-HW0BVWR14C'] = true;
          console.log('Google Analytics disabled');
        }
      }
    }
  ],

  // Translations
  translations: {
    en: {
      consentNotice: {
        title: 'Cookie Settings',
        description: 'We use cookies to personalize content, analyze website traffic, and improve your experience. You can accept all cookies or customize your preferences.',
        learnMore: 'Learn more',
        changeDescription: 'You can change your cookie preferences anytime.'
      },
      consentModal: {
        title: 'Cookie Preferences',
        description: 'Here you can see and customize the information that we collect about you.',
        privacyPolicy: {
          name: 'Privacy Policy',
          text: 'To learn more, please read our {privacyPolicy}.'
        }
      },
      googleAnalytics: {
        title: 'Google Analytics',
        description: 'Google Analytics helps us understand how visitors interact with our website.'
      },
      purposes: {
        analytics: 'Analytics',
        statistics: 'Statistics',
        functional: 'Functional',
        marketing: 'Marketing'
      },
      ok: 'Accept All',
      save: 'Save Settings',
      decline: 'Decline All',
      acceptAll: 'Accept All',
      acceptSelected: 'Accept Selected',
      close: 'Close',
      service: {
        disableAll: {
          title: 'Enable/Disable all services',
          description: 'Use this switch to enable/disable all services.'
        },
        optOut: {
          title: '(opt-out)',
          description: 'This service is loaded by default (but you can opt out)'
        },
        required: {
          title: '(always required)',
          description: 'This service is always required'
        },
        purposes: 'Purposes',
        purpose: 'Purpose'
      }
    }
  }
};