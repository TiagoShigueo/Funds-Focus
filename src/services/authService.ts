import { Alert, Platform } from "react-native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { setUserId } from "../utils/User";

const cleanUserId = async () => {
    try {
        if (Platform.OS === 'web'){
            localStorage.removeItem('userId');
        } else {
        await AsyncStorage.removeItem('userId')
        }
    } catch(error) {
        console.error('Erro ao limpar o ID do usuário: ', error);
    }
};

export const logout = async () => {
    try {
        await FIREBASE_AUTH.signOut();
        await cleanUserId();
    } catch (error) {
        console.error('Erro ao fazer logout: ', error);
    }
};

const auth = FIREBASE_AUTH;

export const signIn = async (email: string, password: string) => {
  if (!email || !password){
    Alert.alert("Campos vazios" ,"Favor preencher os campos e-mail e senha corretamente");
    return;
  }
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    setUserId(response.user.uid);
  } catch (error: any) {
    if (error.code === "auth/invalid-email"){
      Alert.alert("Erro ao realizar login", "E-mail ou senha inválido");
    } else if (error.code === "auth/invalid-credential"){
      Alert.alert("Erro ao realizar login", "E-mail ou senha inválido");
    } else {
      Alert.alert("Erro desconhecido de login", error.message);
    }
  } 
};

  export const signUp = async (email: string, password: string) => {
    if (!email || !password){
      Alert.alert("Campos vazios" ,"Favor preencher os campos e-mail e senha corretamente");
      return;
    }
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (error: any) {
      console.error(error.code);
      if (error.code === "auth/invalid-email"){
        Alert.alert("Erro ao cadastrar uma nova conta", "E-mail ou senha inválido");
      } else if (error.code === "auth/weak-password"){
        Alert.alert("Senha fraca", "A senha deve possuir no mínimo 6 caracteres");
      } else if (error.code === "auth/email-already-in-use") {
        Alert.alert("E-mail em uso", "O e-mail já foi registrado, favor informar outro e-mail");
      }
    } 
  };