import { SocietyGuard } from './SocietyGuard';

export default function SocietyIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SocietyGuard>{children}</SocietyGuard>;
}
