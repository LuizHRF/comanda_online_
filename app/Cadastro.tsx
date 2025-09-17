import { Colors } from "@/constants/Colors";
import { Text, View, Image, TextInput, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import * as config from "@/config";
import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import axios from "axios";
import { set } from "date-fns";


export default function Cadastro() {

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  
  const [error, setError] = useState('');

  function mask(password : string){
    let masked = '';
    for (let i = 0; i < password.length; i++){
      masked += '*';
    }
    return masked;
  }

  const registarUser = async () => {
    try {

      const response = await axios.post(`http://${config.ip}${config.port}/cadastrarusuario`, {
        nome_usuario: username,
        email: email,
        senha: password
      });

      if (response.data.error) {
        setError(response.data.error);
        return;
      }

      config.currentUser.name = username;
      router.push({ pathname: '/login'});

    } catch (error) {
      setError('Erro ao cadastrar usuário.');
      console.error(error);
    }
  }

  const validateAndNavigate = () => {
    if (username.trim() === '') {
      setError('O campo nome não pode estar vazio.');
    } else if (email.trim() === '') {
        setError('O campo email não pode estar vazio.');
    } else if (password.trim() === '') {
        setError('O campo senha não pode estar vazio.');
    } else {
      setError('');

      registarUser();
      
    }
  };

  return (
    <View
      style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      }}
    > 
      <Image source={require('@/assets/images/splash_empty.png')} style={{ width: 200, height: 200, marginBottom: 50 }} />
      
      <View style={{flexDirection:'column', width: "80%"}}>
      <Text style={{ color: Colors.light.text , fontFamily: 'MuseoModernoLight', fontSize: 20, alignSelf: "flex-start",}}>Cadastro</Text>
      <View style={{height: 1, width: '45%', backgroundColor: Colors.light.contrast_backgroud, alignSelf: "flex-start"}}></View>

      {error ? <Text style={{color: 'red', marginTop: 3}}>{error}</Text> : null}

      <Text style={{ color: Colors.light.text , fontFamily: 'MuseoModernoLight', marginLeft: 10, marginTop: 15, fontSize: 15, alignSelf: "flex-start",}}>Nome de usuário</Text>
      <TextInput
        style={{height: '10%', width: '100%', borderRadius: 20, padding: 20, backgroundColor: Colors.light.background}}
        placeholder="Escreva aqui"
        placeholderTextColor={Colors.light.faintText}
        onChangeText={(value) => setUsername(value)}
        value={username}

      />

      <Text style={{ color: Colors.light.text , fontFamily: 'MuseoModernoLight', marginLeft: 10, marginTop: 10, fontSize: 15, alignSelf: "flex-start",}}>E-mail</Text>
      <TextInput
        style={{height: '10%', width: '100%', borderRadius: 20, padding: 20, backgroundColor: Colors.light.background}}
        placeholder="Escreva aqui"
        placeholderTextColor={Colors.light.faintText}
        onChangeText={(value) => setEmail(value)}
        value={email}
      />

      <Text style={{ color: Colors.light.text , fontFamily: 'MuseoModernoLight', marginLeft: 10, marginTop: 10, fontSize: 15, alignSelf: "flex-start",}}>Senha</Text>
      <TextInput
        
        style={{height: '10%', width: '100%', borderRadius: 20, padding: 20, backgroundColor: Colors.light.background}}
        placeholder="Escreva aqui"
        placeholderTextColor={Colors.light.faintText}
        onChangeText={(value) => setPassword(value)}
        value={mask(password)}
      />

      <CustomButton onPress={
      () => {
      validateAndNavigate();
      }} 
      title={"Continuar"}
      style={styles} 
      />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
    button: {
      backgroundColor: Colors.light.contrast_backgroud,
      padding: 5,
      borderRadius: 15,
      alignItems: 'center',
      marginTop: 15,
    },
    buttonText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
      fontFamily: 'MuseoModernoRegular',
    },
  });