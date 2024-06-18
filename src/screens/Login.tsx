import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import React, { useState } from "react";
import { signIn, signUp } from "../services/authService";
import Idv from "../constants/Idv";
import { useNavigation } from "@react-navigation/native";
import Register from "./Register";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const navigation = useNavigation();

  const navigateToScreenRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={Idv.container}>
      <View style={Idv.centralizedContainer}>
        <KeyboardAvoidingView behavior="padding">
          <Image
            style={Idv.logo}
            source={require("../../assets/logo.png")}
            resizeMode="contain"
          />
          <TextInput
            style={Idv.input}
            value={email}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={Idv.input}
            secureTextEntry={true}
            value={password}
            placeholder="Password"
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}
          />

          {loading ? (
            <ActivityIndicator size="large" color="#000080" />
          ) : (
            <>
              <TouchableOpacity
                style={Idv.button}
                onPress={() => signIn(email, password)}
              >
                <Text style={Idv.buttonTextWhite}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={Idv.button}
                onPress={() => navigateToScreenRegister()}
              >
                <Text style={Idv.buttonTextWhite}>Criar conta</Text>
              </TouchableOpacity>
            </>
          )}
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default Login;
