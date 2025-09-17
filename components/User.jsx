import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkTokenExpiration = async () => {
  const token = await AsyncStorage.getItem('userToken');
  if (token) {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Em segundos
    if (decodedToken.exp < currentTime) {
      // Token expirado
      await clearSession(); // Limpa sessão se expirado
      return false;
    }
    return true;
  }
  return false;
};


export const saveSession = async (token, name, id) => {
  try {
    await AsyncStorage.setItem('userToken', token);
    await AsyncStorage.setItem('UserName', name);
    await AsyncStorage.setItem('UserId', id);
  } catch (e) {
    console.error('Erro ao salvar o token', e);
  }
};

export const getUserInfo = async () => {

    checkTokenExpiration();
    try {
      const nome = await AsyncStorage.getItem('userName');
      const id = await AsyncStorage.getItem('userId');
      return { nome, id};
    } catch (e) {
      console.error('Erro ao recuperar o token', e);
      return null;
    }
};

const clearSession = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
    } catch (e) {
      console.error('Erro ao remover o token', e);
    }
  };
  