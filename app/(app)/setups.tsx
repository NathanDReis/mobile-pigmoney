import {
    Container,
    CustomSwitch,
    DrawerSceneWrapper,
    Header
} from "@/components";
import { useAuth } from '@/context/AuthProvider';
import {
    Feather,
    Ionicons,
    MaterialIcons
} from '@expo/vector-icons';
import React, { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export default function Configuracoes() {
  const [vibrar, setVibrar] = useState(true);
  const [notificacoes, setNotificacoes] = useState(true);
  
  const { 
    biometricAvailable, 
    isBiometricEnabled, 
    enableBiometric, 
    disableBiometric 
  } = useAuth();

  const actionColor = "#1de9b6"; // ciano esverdeado

  const handleToggleBiometric = (value: boolean) => {
    if (!biometricAvailable) return;
    
    (async () => {
      try {
        if (value) {
          await enableBiometric();
          Alert.alert('Sucesso', 'Login biométrico habilitado');
        } else {
          await disableBiometric();
          Alert.alert('Sucesso', 'Login biométrico desabilitado');
        }
      } catch (error: any) {
        Alert.alert('Erro', error.message || 'Erro ao alterar configuração');
      }
    })();
  };

  return (
    <DrawerSceneWrapper>
      <Container>
        <Header page="Configurações" />

        {/* Switches de configurações - em cima */}
        <View style={styles.section}>
          <View style={styles.switchItem}>
            <Ionicons name="notifications-outline" size={24} color="#666" />
            <Text style={styles.switchText}>Notificações</Text>
            <CustomSwitch value={notificacoes} onValueChange={setNotificacoes} />
          </View>
          <View style={styles.switchItem}>
            <MaterialIcons name="vibration" size={24} color="#666" />
            <Text style={styles.switchText}>Vibrar</Text>
            <CustomSwitch value={vibrar} onValueChange={setVibrar} />
          </View>
          
          <View style={styles.switchItem}>
            <MaterialIcons name="fingerprint" size={24} color="#666" />
            <Text style={styles.switchText}>Login por biometria</Text>
            <CustomSwitch 
              value={biometricAvailable && isBiometricEnabled} 
              onValueChange={handleToggleBiometric}
            />
          </View>
        </View>

        {/* Ações principais com ícones - embaixo */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.actionItem}>
            <Ionicons name="person-circle-outline" size={28} color={actionColor} />
            <Text style={styles.actionText}>Deletar conta</Text>
            <Feather name="chevron-right" size={24} color="#888" style={styles.chevron} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <MaterialIcons name="lock-outline" size={28} color={actionColor} />
            <Text style={styles.actionText}>Configurar senha</Text>
            <Feather name="chevron-right" size={24} color="#888" style={styles.chevron} />
          </TouchableOpacity>
        </View>
      </Container>
    </DrawerSceneWrapper>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 24,
    marginBottom: 8,
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  actionText: {
    flex: 1,
    fontSize: 17,
    marginLeft: 14,
    color: "#222",
  },
  chevron: {
    marginLeft: 8,
  },
  switchItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  switchText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 14,
    color: "#222",
  },
});
