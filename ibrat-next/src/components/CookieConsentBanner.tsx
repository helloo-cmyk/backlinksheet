"use client";

import React from "react";
import CookieConsent from "react-cookie-consent";
import Link from "next/link";

const CookieConsentBanner = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept All"
      declineButtonText="Decline"
      enableDeclineButton
      cookieName="ibrat_cookie_consent"
      style={{
        background: "#111111",
        color: "#ffffff",
        fontSize: "14px",
        padding: "15px 20px",
        alignItems: "center",
        borderTop: "1px solid #333",
        boxShadow: "0 -4px 10px rgba(0,0,0,0.1)",
      }}
      buttonStyle={{
        background: "#CCFF00",
        color: "#000",
        fontSize: "13px",
        fontWeight: "bold",
        borderRadius: "8px",
        padding: "10px 24px",
        margin: "10px 5px",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
      }}
      declineButtonStyle={{
        background: "transparent",
        color: "#aaa",
        fontSize: "13px",
        fontWeight: "500",
        borderRadius: "8px",
        padding: "10px 24px",
        margin: "10px 5px",
        border: "1px solid #444",
      }}
      expires={150}
      onAccept={() => {
        // Trigger page refresh to load scripts if needed, 
        // or handled by the AnalyticsScripts component
        window.location.reload();
      }}
    >
      We use cookies to enhance your experience, analyze site traffic, and serve personalized ads via Google AdSense. 
      By clicking "Accept All", you consent to our use of cookies as described in our{" "}
      <Link href="/privacy-policy" style={{ color: "#CCFF00", textDecoration: "underline" }}>
        Privacy Policy
      </Link>.
    </CookieConsent>
  );
};

export default CookieConsentBanner;
