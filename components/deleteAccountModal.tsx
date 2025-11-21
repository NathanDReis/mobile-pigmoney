import React, { useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface DeleteAccountModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  username: string;
}

export default function DeleteAccountModal({
  visible,
  onClose,
  onConfirm,
  username,
}: DeleteAccountModalProps) {
  const [inputUsername, setInputUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (inputUsername.trim() !== username) {
      Alert.alert('Erro', 'Nome de usuário não corresponde');
      return;
    }

    setLoading(true);
    try {
      await onConfirm();
      setInputUsername('');
      onClose();
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao deletar conta');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setInputUsername('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="warning" size={48} color="#ff3b30" />
          </View>

          <Text style={styles.title}>Deletar Conta</Text>
          <Text style={styles.description}>
            Esta ação é irreversível. Todos os seus dados serão permanentemente
            removidos.
          </Text>

          <Text style={styles.label}>
            Digite seu nome de usuário para confirmar:
          </Text>
          <Text style={styles.usernameDisplay}>{username}</Text>

          <TextInput
            style={styles.input}
            value={inputUsername}
            onChangeText={setInputUsername}
            placeholder="Nome de usuário"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!loading}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleClose}
              disabled={loading}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.deleteButton,
                (loading || inputUsername.trim() !== username) &&
                  styles.disabledButton,
              ]}
              onPress={handleConfirm}
              disabled={loading || inputUsername.trim() !== username}
            >
              <Text style={styles.deleteButtonText}>
                {loading ? 'Deletando...' : 'Deletar'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  label: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },
  usernameDisplay: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1de9b6',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 24,
    color: '#222',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  disabledButton: {
    opacity: 0.5,
  },
});