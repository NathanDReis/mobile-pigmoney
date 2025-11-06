import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function Login() {
  const { signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await signOut();
      router.replace('/');
    })();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});