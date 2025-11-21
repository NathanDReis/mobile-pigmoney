import { api } from '@/services/api';
import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';
import { jwtDecode } from 'jwt-decode';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

type User = {
  email: string,
  fullName: string,
  userName: string,
  telephone: string,
  perfil: string,
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  signIn: (email: string, senha: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  biometricAvailable: boolean;
  isBiometricEnabled: boolean;
  rememberMeSave: boolean;
  emailSave: string;
  updateUser: (newUserData: any) => Promise<void>;
  enableBiometric: () => Promise<void>;
  disableBiometric: () => Promise<void>;
  signInWithBiometric: () => Promise<void>;
  tryBiometricOnce: () => Promise<void>;
};

type TokenPayload = {
  exp: number;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [rememberMeSave, setRememberMeSave] = useState(false);
  const [emailSave, setEmailSave] = useState<string>('');

  // Verifica disponibilidade de biometria
  useEffect(() => {
    async function checkBiometric() {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      setBiometricAvailable(compatible && enrolled);
    }
    checkBiometric();
  }, []);

  // Carregamento inicial
  useEffect(() => {
    async function loadStoredAuth() {
      try {
        const storedToken = await SecureStore.getItemAsync('token');
        const storedUser = await SecureStore.getItemAsync('user');
        const biometricEnabled = await SecureStore.getItemAsync('biometric_enabled');
        const isRememberMe = await SecureStore.getItemAsync('is_remember_me_email');
        
        setIsBiometricEnabled(biometricEnabled === 'true');
        
        if (!!isRememberMe && isRememberMe == 'true') {
          const rememberMe = await SecureStore.getItemAsync('remember_me_email');
          setRememberMeSave(true)
          setEmailSave(rememberMe?.toString() ? rememberMe?.toString().replace(/['"]/g, '') : '');
        }
        
        if (storedToken) {
          const isValid = validateToken(storedToken);
          if (!isValid) {
            await signOut();
            return;
          }

          api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        }
      } catch (error) {
        console.error('Erro ao carregar autenticação:', error);
      } finally {
        setLoading(false);
      }
    }
    loadStoredAuth();
  }, []);

  // Interceptor em useEffect separado
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      response => response,
      async error => {
        if (error.response?.status === 401) {
          await signOut();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const token = response.data.token;
      const userData = response.data.user;

      await SecureStore.setItemAsync('token', token);
      await SecureStore.setItemAsync('user', JSON.stringify(userData));
      
      const rememberMe = await SecureStore.getItemAsync('is_remember_me_email');
      if (!!rememberMe && rememberMe == 'true') {
        await SecureStore.setItemAsync('remember_me_email', email);
      } else {
        await SecureStore.deleteItemAsync('remember_me_email');
      }

      // Se biometria estiver habilitada, salvar credenciais
      if (isBiometricEnabled) {
        await SecureStore.setItemAsync('biometric_email', email);
        await SecureStore.setItemAsync('biometric_password', password);
      }

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
    } catch (error) {
      console.error(error)
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await SecureStore.deleteItemAsync('token');
      await SecureStore.deleteItemAsync('user');
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const enableBiometric = async () => {
    if (!biometricAvailable) {
      throw new Error('Biometria não disponível neste dispositivo');
    }

    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Autentique-se para habilitar o login biométrico',
        fallbackLabel: 'Usar senha',
        cancelLabel: 'Cancelar',
      });

      if (result.success) {
        await SecureStore.setItemAsync('biometric_enabled', 'true');
        setIsBiometricEnabled(true);
      } else {
        throw new Error('Autenticação biométrica falhou');
      }
    } catch (error) {
      console.error('Erro ao habilitar biometria:', error);
      throw error;
    }
  };

  const disableBiometric = async () => {
    try {
      await SecureStore.deleteItemAsync('biometric_enabled');
      setIsBiometricEnabled(false);
    } catch (error) {
      console.error('Erro ao desabilitar biometria:', error);
      throw error;
    }
  };

  const signInWithBiometric = async () => {
    if (!biometricAvailable || !isBiometricEnabled) {
      throw new Error('Login biométrico não está habilitado');
    }

    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Faça login com sua biometria',
        fallbackLabel: 'Usar senha',
        cancelLabel: 'Cancelar',
      });

      if (result.success) {
        // Recupera credenciais e faz login real
        const email = await SecureStore.getItemAsync('biometric_email');
        const password = await SecureStore.getItemAsync('biometric_password');
        
        if (email && password) {
          await signIn(email, password);
        } else {
          throw new Error('Credenciais não encontradas');
        }
      }
    } catch (error) {
      console.error('Erro no login biométrico:', error);
      throw error;
    }
  };

  const biometricAttemptedRef = useRef(false);

  const tryBiometricOnce = async () => {
    if (biometricAttemptedRef.current) return;
    if (!biometricAvailable || !isBiometricEnabled) return;

    biometricAttemptedRef.current = true;
    return signInWithBiometric();
  };


  function validateToken(token: string) {
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  const updateUser = async (newUserData: any) => {
    try {
      setUser(newUserData);
      await SecureStore.setItemAsync('user', JSON.stringify(newUserData));
    } catch (error) {
      console.error('Erro ao atualizar usuário no contexto:', error);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        signIn, 
        signOut, 
        isAuthenticated: !!user,
        biometricAvailable,
        isBiometricEnabled,
        enableBiometric,
        disableBiometric,
        signInWithBiometric,
        tryBiometricOnce,
        emailSave,
        rememberMeSave,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
