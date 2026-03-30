'use client';

import { ThemeProvider } from '@/context/ThemeContext';
import { EventStoreProvider } from '@/context/EventStore';
import { TicketingProvider } from '@/context/TicketingStore';
import { PhoneFrame } from '@/components/PhoneFrame';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { ToastProvider } from '@/components/Toast';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <EventStoreProvider>
        <TicketingProvider>
          <ToastProvider>
            <PhoneFrame>
              <ErrorBoundary>
              {/* Fixed top area: status bar + header */}
              <div className="flex-shrink-0">
                <div className="status-bar-spacer" />
                <Header />
              </div>

              {/* Scrollable content area */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden hide-scrollbar">
                <main className="pb-4">{children}</main>
              </div>

              {/* Fixed bottom nav */}
              <div className="flex-shrink-0">
                <BottomNav />
              </div>
              </ErrorBoundary>
            </PhoneFrame>
          </ToastProvider>
        </TicketingProvider>
      </EventStoreProvider>
    </ThemeProvider>
  );
}
