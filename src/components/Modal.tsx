"use client";
import { useEffect } from 'react';

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function Modal({ children, onClose }: ModalProps) {
  useEffect(() => {
    // Disable scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#0E1B2A] border border-blue-800/50 rounded-xl p-6 shadow-xl z-50">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          ×
        </button>
        
        {/* Modal content */}
        <div className="mt-2">
          {children}
        </div>
      </div>
    </>
  );
}
