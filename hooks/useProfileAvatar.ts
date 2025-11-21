import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PROFILE_IMAGE_KEY = '@profile_image';

export const useProfileAvatar = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfileImage();
  }, []);

  const loadProfileImage = async () => {
    try {
      const savedImage = await AsyncStorage.getItem(PROFILE_IMAGE_KEY);
      setProfileImage(savedImage);
    } catch (error) {
      console.error('Erro ao carregar imagem de perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshAvatar = () => {
    loadProfileImage();
  };

  return {
    profileImage,
    loading,
    refreshAvatar,
  };
};