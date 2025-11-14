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
  mustConsent: false,

  // Use a simple notice bar instead of modal
  noticeAsModal: false,

  // Hide the decline button - just show accept
  hideDeclineAll: true,
  
  // Hide the toggle button after consent
  hideLearnMore: false,

  // Language (can be 'en', 'de', 'fr', etc.)
  lang: 'en',

  // Consent notice configuration
  consentNotice: true,
  
  // Consent modal configuration  
  consentModal: true,

  // Privacy policy URL
  privacyPolicy: '/privacy-policy',

  // Styling with your brand colors - left-side notice
  css: `
    /* Left-side notice card */
    .klaro .cookie-notice {
      background: var(--primary, #011426) !important;
      color: white !important;
      padding: 1.5rem !important;
      border-radius: 0 12px 12px 0 !important;
      box-shadow: 4px 0 20px rgba(0, 0, 0, 0.2) !important;
      max-width: 380px !important;
      bottom: 2rem !important;
      left: 0 !important;
      right: auto !important;
      position: fixed !important;
      z-index: 9999 !important;
    }

    .klaro .cookie-notice .cn-body {
      display: flex !important;
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 1rem !important;
    }

    .klaro .cookie-notice p {
      margin: 0 !important;
      font-size: 0.9rem !important;
      line-height: 1.5 !important;
    }

    .klaro .cookie-notice .cn-buttons {
      display: flex !important;
      flex-direction: column !important;
      gap: 0.5rem !important;
      width: 100% !important;
    }
    
    .klaro .cookie-notice .cn-ok {
      background: var(--primaryLight, #3483C5) !important;
      color: white !important;
      border: none !important;
      border-radius: 8px !important;
      padding: 0.75rem 1.5rem !important;
      font-weight: 600 !important;
      cursor: pointer !important;
      transition: all 0.3s ease !important;
      font-size: 0.95rem !important;
      width: 100% !important;
      text-align: center !important;
    }

    .klaro .cookie-notice .cn-ok:hover {
      background: #2a6ba8 !important;
      transform: translateY(-2px) !important;
      box-shadow: 0 4px 12px rgba(52, 131, 197, 0.4) !important;
    }

    .klaro .cookie-notice .cn-learn-more {
      color: rgba(255, 255, 255, 0.9) !important;
      text-decoration: none !important;
      font-size: 0.85rem !important;
      background: transparent !important;
      border: 1px solid rgba(255, 255, 255, 0.3) !important;
      border-radius: 8px !important;
      cursor: pointer !important;
      padding: 0.6rem 1rem !important;
      width: 100% !important;
      text-align: center !important;
      transition: all 0.3s ease !important;
    }

    .klaro .cookie-notice .cn-learn-more:hover {
      background: rgba(255, 255, 255, 0.1) !important;
      border-color: rgba(255, 255, 255, 0.5) !important;
    }
    
    /* Modal styling (when Learn More is clicked) */
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
    
    /* Mobile responsive */
    @media (max-width: 768px) {
      .klaro .cookie-notice {
        max-width: 340px !important;
        bottom: 1rem !important;
        padding: 1.25rem !important;
        border-radius: 0 10px 10px 0 !important;
      }

      .klaro .cookie-notice p {
        font-size: 0.875rem !important;
      }

      .klaro .cookie-notice .cn-ok,
      .klaro .cookie-notice .cn-learn-more {
        font-size: 0.875rem !important;
        padding: 0.65rem 1rem !important;
      }
    }

    @media (max-width: 480px) {
      .klaro .cookie-notice {
        max-width: calc(100% - 1rem) !important;
        left: 0.5rem !important;
        border-radius: 10px !important;
      }
    }
  `,

  // Services configuration
  services: [
    {
      name: 'google-tag-manager',
      title: 'Google Tag Manager & Analytics',
      description: 'We use Google Tag Manager to manage website analytics and improve our services. This includes Google Analytics for understanding visitor behavior.',
      purposes: ['analytics', 'statistics'],
      required: false,
      optOut: false,
      onlyOnce: false,
      default: true,
      callback: function(consent, service) {
        // Initialize dataLayer if not exists
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        
        if (consent) {
          // User accepted - grant consent
          gtag('consent', 'update', {
            'analytics_storage': 'granted',
            'ad_storage': 'denied', // Keep ads denied unless you need them
            'ad_user_data': 'denied',
            'ad_personalization': 'denied'
          });
          
          // Push consent event to dataLayer
          window.dataLayer.push({
            'event': 'consent_granted',
            'consent_analytics': true
          });
          
          console.log('Google Tag Manager: Consent granted');
        } else {
          // User declined - keep consent denied
          gtag('consent', 'update', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied'
          });
          
          // Push consent event to dataLayer
          window.dataLayer.push({
            'event': 'consent_denied',
            'consent_analytics': false
          });
          
          console.log('Google Tag Manager: Consent denied');
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
        title: 'Google Tag Manager & Analytics',
        description: 'Helps us understand how visitors interact with our website and improve user experience.'
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