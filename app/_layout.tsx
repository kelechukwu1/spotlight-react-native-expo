import InitialLayout from '@/components/InitialLayout';
import ClerkAndConvexProvider from '@/providers/ClerkAndConvexProvider';
import "../global.css";

export default function RootLayout() {
  return (
    <ClerkAndConvexProvider>
      <InitialLayout />
    </ClerkAndConvexProvider>
  );
}
