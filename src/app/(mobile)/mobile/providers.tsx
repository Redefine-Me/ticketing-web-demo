'use client';

import { ThemeProvider } from '@/contexts/mobile/ThemeContext';
import { EventStoreProvider } from '@/contexts/mobile/EventStore';
import { TicketingProvider } from '@/contexts/mobile/TicketingStore';
import { PhoneFrame } from '@/components/mobile/PhoneFrame';
import { Header } from '@/components/mobile/Header';
import { BottomNav } from '@/components/mobile/BottomNav';
import { ToastProvider } from '@/components/mobile/Toast';
import { ErrorBoundary } from '@/components/mobile/ErrorBoundary';

export function MobileProviders({ children }: { children: React.ReactNode }) {
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
