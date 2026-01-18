'use client';

import Script from 'next/script';

export default function GoogleConsent() {
  return (
    <>
      {/* Google Consent Mode v2 - MUST load before GTM */}
      <Script
        id="google-consent-default"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            // Default consent mode
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied',
              'functionality_storage': 'denied',
              'personalization_storage': 'denied',
              'wait_for_update': 500
            });
            
            // Set ads data redaction
            gtag('set', 'ads_data_redaction', true);
            
            // Set URL passthrough to improve conversion tracking
            gtag('set', 'url_passthrough', true);
          `,
        }}
      />

      {/* Google Analytics */}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-YF08C7YVNN"
      />
      <Script
        id="google-analytics-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Configure GA4 with consent mode
            gtag('config', 'G-YF08C7YVNN', {
              'anonymize_ip': true,
              'cookie_flags': 'SameSite=None;Secure',
              'send_page_view': true
            });
          `,
        }}
      />

      {/* Google Tag Manager */}
      <Script
        id="google-tag-manager"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MQG28FPM');
          `,
        }}
      />

      {/* Google AdSense Script */}
      <Script
        id="google-adsense"
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9667530069853985"
        crossOrigin="anonymous"
        onError={(e) => {
          console.log('AdSense script failed to load:', e);
        }}
      />

      {/* Listen for consent updates */}
      <Script
        id="consent-listener"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('cookieConsentUpdated', function(e) {
              const consent = e.detail;

              // Update Google consent based on user choices
              gtag('consent', 'update', {
                'analytics_storage': consent.analytics ? 'granted' : 'denied',
                'ad_storage': consent.advertising ? 'granted' : 'denied',
                'ad_user_data': consent.advertising ? 'granted' : 'denied',
                'ad_personalization': consent.advertising ? 'granted' : 'denied'
              });

              // Update consent for Google services
              if (consent.advertising) {
                // Enable AdSense and other advertising
                window.adsbygoogle = window.adsbygoogle || [];

                // For Mediavine, trigger their consent update
                if (window.__tcfapi) {
                  window.__tcfapi('setConsent', 2, function() {}, {
                    gdprApplies: true,
                    purpose: {
                      consents: {
                        1: consent.advertising, // Store and/or access information
                        2: consent.advertising, // Personalization
                        3: consent.advertising, // Ad selection
                        4: consent.advertising, // Content selection
                        5: consent.advertising, // Measurement
                        7: consent.advertising, // Ad performance
                        9: consent.advertising, // Market research
                        10: consent.advertising // Product development
                      }
                    }
                  });
                }
              }
            });
          `,
        }}
      />
    </>
  );
}