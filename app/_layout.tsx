import { AuthProvider, useAuth } from '@/context/AuthProvider';
import { PerfilInterfaceResponse } from '@/models/perfil.interface';
import { PerfilService } from '@/services/perfil.service';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

function AppContent() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const perfilValid = async () => {
      const perfil: PerfilInterfaceResponse | null = user && user?.perfil ? (await PerfilService.findOne(user.perfil)) : null;

      const inAuthGroup = segments.length >= 2 && segments[1] === '(auth)';
      if (!user && !inAuthGroup) {
        router.replace('/(app)/(auth)/login');
      } else if (user && inAuthGroup) {
        router.replace('/(app)/(tabs)/home');
      }

      if (inAuthGroup || perfil?.permissions.includes('admin')) return;

      const lastSegmentPosition = segments.length - 1;
      const lastSegment = segments[lastSegmentPosition];
      console.log("\x1b[2J");
      console.log(perfil);
      console.log(lastSegment);
      if (!perfil?.permissions || !perfil?.permissions.includes(lastSegment)) {
        console.log("lhe falta permissões")
      }
    }

    perfilValid();    
  }, [user, segments, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1d1f25' }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
