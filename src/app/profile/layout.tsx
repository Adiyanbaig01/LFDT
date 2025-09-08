import { AuthProvider } from '@/contexts/AuthContext';

export default function ProfileLayout({
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
