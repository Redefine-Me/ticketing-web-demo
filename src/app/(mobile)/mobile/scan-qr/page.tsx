'use client';

import { BackButton } from '@/components/mobile/BackButton';
import { QRCodeIcon } from '@/components/mobile/icons';
import { useToast } from '@/components/mobile/Toast';

export default function ScanQRPage() {
  const { showToast } = useToast();

  function handleScan() {
    showToast('QR scanning coming soon', 'success');
  }

  return (
    <div className="fixed inset-0 bg-black flex flex-col">
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-[70px] pb-2">
        <BackButton />
        <h1 className="text-lg font-semibold text-primary-500 absolute left-1/2 -translate-x-1/2">
          Scan Tickets
        </h1>
        <div className="w-10" />
      </div>

      {/* Scanner viewport */}
      <div className="flex-1 flex items-center justify-center relative">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Scanner square */}
        <div
          className="relative z-10 rounded-2xl border border-primary-500 overflow-hidden"
          style={{ width: 'min(70vw, 250px)', height: 'min(70vw, 250px)' }}
        >
          {/* Scan line animation */}
          <div
            className="absolute inset-x-0 h-0.5 bg-primary-500/60 animate-scan-line"
            style={{
              boxShadow: '0 0 8px var(--color-primary-500, #C04138)',
            }}
          />
        </div>
      </div>

      {/* Scan button */}
      <div className="relative z-10 flex justify-center mb-12">
        <button
          onClick={handleScan}
          className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center shadow-lg active:scale-95 transition-transform"
        >
          <QRCodeIcon className="w-7 h-7 text-white" />
        </button>
      </div>
    </div>
  );
}
