'use client';

import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { CheckIcon, XIcon } from './icons';

interface ToastMessage {
  id: number;
  text: string;
  type: 'success' | 'error';
}

interface ToastContextType {
  showToast: (text: string, type?: 'success' | 'error') => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

let toastId = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((text: string, type: 'success' | 'error' = 'success') => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, text, type }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.length > 0 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-[60] flex flex-col gap-2 pointer-events-none">
          {toasts.map(t => (
            <ToastItem key={t.id} toast={t} onDone={() => removeToast(t.id)} />
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onDone }: { toast: ToastMessage; onDone: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 300);
    }, 2500);
    return () => clearTimeout(timer);
  }, [onDone]);

  const isSuccess = toast.type === 'success';

  return (
    <div
      className={`pointer-events-auto flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-lg text-sm font-medium whitespace-nowrap transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      } ${
        isSuccess
          ? 'bg-emerald-500 text-white'
          : 'bg-red-500 text-white'
      }`}
    >
      {isSuccess ? <CheckIcon className="w-4 h-4" /> : <XIcon className="w-4 h-4" />}
      {toast.text}
    </div>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
