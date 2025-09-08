import { AuthProvider } from '@/contexts/AuthContext';

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
