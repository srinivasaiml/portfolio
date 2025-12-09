// @ts-nocheck
import React from "react";
import { Heart, Coffee } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <style>{`
        .footer-light-root {
          width: 100%;
          padding: 1.75rem 1.5rem 1.5rem;
          background: linear-gradient(120deg, #fde68a, #bfdbfe, #e9d5ff);
          background-size: 200% 200%;
          animation: footerGradientShift 12s ease-in-out infinite;
          color: #1f2933;
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(148, 163, 184, 0.4);
        }

        @keyframes footerGradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .footer-light-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          flex-wrap: wrap;
          font-size: 0.9rem;
        }

        .footer-light-left {
          opacity: 0.9;
        }

        .footer-light-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .footer-made {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          white-space: nowrap;
        }

        .heart-icon {
          color: #fb7185;
          animation: heartbeat 1.5s ease-in-out infinite;
        }

        .coffee-icon {
          color: #ea580c;
        }

        .footer-chip {
          padding: 0.3rem 0.7rem;
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 184, 0.7);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #4b5563;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(4px);
        }

        /* Slight shimmer on the learning text */
        .footer-chip span {
          background: linear-gradient(90deg, #f97316, #ec4899, #6366f1);
          background-size: 250% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: chipGradient 6s ease-in-out infinite;
        }

        @keyframes chipGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          10%, 30% { transform: scale(1.15); }
          20%, 40% { transform: scale(1); }
        }

        @media (max-width: 640px) {
          .footer-light-root {
            padding: 1.5rem 1.25rem 1.25rem;
          }

          .footer-light-inner {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <footer className="footer-light-root">
        <div className="footer-light-inner">
          <span className="footer-light-left">
            © {currentYear} Patchipala Srinivas. All rights reserved.
          </span>

          <div className="footer-light-right">
            <span className="footer-made">
              Made with
              <Heart size={16} className="heart-icon" />
              and lots of coffee
              <Coffee size={16} className="coffee-icon" />
            </span>

            <span className="footer-chip">
              <span>Currently learning · React &amp; DSA</span>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
