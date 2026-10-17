import React from 'react';
import { PLACEHOLDERS } from '../data/placeholders';

export const WhatsAppFloatingButton: React.FC = () => {
  const whatsappUrl = `https://wa.me/${PLACEHOLDERS.WHATSAPP_DEMO_NUMBER}?text=Hi%20Simply%20Talk!%20I'd%20like%20to%20try%20the%20WhatsApp%20chatbot%20demo.`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Try Simply Talk on WhatsApp"
      className="fixed bottom-6 left-6 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl flex items-center justify-center transition-transform duration-300 hover:scale-110 active:scale-95 z-50 cursor-pointer focus:outline-hidden focus:ring-4 focus:ring-emerald-400/40"
      title="Try WhatsApp Demo"
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="drop-shadow-xs"
        aria-hidden="true"
      >
        <path d="M12.031 2C6.516 2 2.031 6.484 2.031 12c0 1.996.586 3.863 1.602 5.437L2 22l4.742-1.57A9.946 9.946 0 0012.03 22c5.516 0 10-4.484 10-10s-4.484-10-10-10zm0 18.25c-1.637 0-3.172-.457-4.492-1.258l-.324-.191-2.98.988.996-2.906-.21-.336A8.17 8.17 0 013.78 12c0-4.55 3.7-8.25 8.25-8.25s8.25 3.7 8.25 8.25-3.7 8.25-8.25 8.25zm4.52-6.172c-.246-.125-1.465-.723-1.691-.805-.23-.082-.395-.125-.562.125-.164.246-.645.805-.79 1-.148.191-.293.21-.54.086-.246-.125-1.04-.383-1.98-1.223-.73-.652-1.223-1.457-1.367-1.703-.145-.246-.016-.38.109-.504.11-.11.246-.29.37-.434.12-.144.163-.246.245-.41.082-.164.04-.309-.02-.434-.062-.125-.562-1.355-.77-1.855-.203-.49-.41-.422-.562-.43-.145-.008-.31-.01-.477-.01-.164 0-.434.063-.66.309-.23.246-.87.852-.87 2.078 0 1.227.894 2.41 1.019 2.574.125.164 1.76 2.688 4.262 3.77.594.258 1.058.41 1.422.527.6.191 1.145.164 1.578.1.48-.074 1.465-.6 1.672-1.18.207-.582.207-1.082.145-1.183-.063-.102-.23-.164-.477-.289z" />
      </svg>
      <span className="sr-only">Try WhatsApp Demo</span>
    </a>
  );
};
