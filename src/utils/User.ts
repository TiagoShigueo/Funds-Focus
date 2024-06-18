import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

let userId: string | null = null;

export const setUserId = async (id: string) => {
    try {
        if (Platform. OS === 'web'){
            localStorage.setItem('userId', id);
        }
        else {
            await AsyncStorage.setItem('@userId', id);
        }
    } catch (error) {
        console.error('Erro ao salvar o Id do usuário: ', error);
    }
};

export const getUserId = async () => {
    try {
        if (Platform.OS === 'web') {
            userId = localStorage.getItem('userId');
            console.log(userId)
        } else {
            userId = await AsyncStorage.getItem('@userId');
        }
        if (userId !== null) {
            return userId;
        } else {
            console.log('Nenhum Id do usuário encontrado no armazenamento');
            return null;
        }
    } catch (error) {
        console.error('Erro ao recuperar Id do usuário: ', error);
        return null;
    }
};
