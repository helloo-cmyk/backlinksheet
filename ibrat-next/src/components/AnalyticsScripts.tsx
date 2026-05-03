"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";

const GA_MEASUREMENT_ID = "G-XEV70REQ21";
const ADSENSE_CLIENT_ID = "ca-pub-4083132987699578";
const CLARITY_ID = "w7xme9goii";

const AnalyticsScripts = () => {
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    // Check for the cookie set by react-cookie-consent
    const checkConsent = () => {
      const consentValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("ibrat_cookie_consent="))
        ?.split("=")[1];
      
      setConsent(consentValue === "true");
    };

    checkConsent();
    
    // Optional: listen for changes if needed, but the reload on accept handles most cases
  }, []);

  if (consent !== true) return null;

  return (
    <>
      {/* GA4 */}
      <Script
        id="ga-loader"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="ga-inline"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: true });
          `,
        }}
      />

      {/* AdSense */}
      {process.env.NODE_ENV === "production" && (
        <Script
          id="adsense-script"
          async
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
        />
      )}

      {/* Microsoft Clarity */}
      <Script
        id="clarity-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
          `,
        }}
      />
    </>
  );
};

export default AnalyticsScripts;
