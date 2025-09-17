import { Colors } from "@/constants/Colors";
import { Text, View, Image, TextInput, StyleSheet } from "react-native";
import * as config from "@/config";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { saveSession } from "@/components/User"
import axios from "axios";

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

function mask(password : string){
  let masked = '';
  for (let i = 0; i < password.length; i++){
    masked += '*';
  }
  return masked;
}

export default function Login(props: any) {
  const router = useRouter();


  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  
  const [error, setError] = useState('');

  const validar = async () => {
    try {

      const response = await axios.post(`http://${config.ip}${config.port}/validarusuario`, { 
        email: email,
        senha: senha
      });

      console.log(response.data.nome_usuario);

      if (response.data.error) {
        setError(response.data.error);
        return;
      }

      if (response.data.length === 0) {
        setError("Usuário não encontrado.");
        return;
      }

      config.currentUser.name = response.data.nome_usuario;
      config.currentUser.email = response.data.email;
      config.currentUser.id= response.data.id_usuario;

      router.push({ pathname: '/(main)'});

    } catch (error) {
      setError('Erro ao realizar login.');
      console.error(error);
    }
  }

  const validateAndNavigate = () => {
    if (senha.trim() === '') {
      setError('O campo senha não pode estar vazio.');
    } else if (email.trim() === '') {
      setError('O campo e-mail não pode estar vazio.');
    }else {
      setError('');

      validar();
      
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
        <Text style={{ color: Colors.light.text , fontFamily: 'MuseoModernoLight', fontSize: 20, alignSelf: "flex-start",}}>Ralize seu login:</Text>
        {error ? <Text style={{color: 'red', marginTop: 3}}>{error}</Text> : null}
      <View style={{height: 1, width: '45%', backgroundColor: Colors.light.contrast_backgroud, alignSelf: "flex-start"}}></View>
      
      <Text style={{ color: Colors.light.text , fontFamily: 'MuseoModernoLight', marginLeft: 10, marginTop: 15, fontSize: 15, alignSelf: "flex-start",}}>Email</Text>
      <TextInput
        style={{height: '10%', width: '100%', borderRadius: 20, padding: 20, backgroundColor: Colors.light.background}}
        placeholder="Escreva aqui"
        placeholderTextColor={Colors.light.faintText}
        onChangeText={(value) => setEmail(value)}
        value={email}

      />

      <Text style={{ color: Colors.light.text , fontFamily: 'MuseoModernoLight', marginLeft: 10, marginTop: 5, fontSize: 15, alignSelf: "flex-start",}}>Senha</Text>
      <TextInput
        
        style={{height: '10%', width: '100%', borderRadius: 20, padding: 20, backgroundColor: Colors.light.background}}
        placeholder="Escreva aqui"
        placeholderTextColor={Colors.light.faintText}
        onChangeText={(value) => setSenha(value)}
        value={mask(senha)}

      />
      <View>
        <CustomButton onPress={
        () => {
        validateAndNavigate();
        }} 
        title={"Continuar"}
        style={styles} 
        />
        </View>

        <Text 
          onPress={() => router.push({ pathname: '/Cadastro'})} 
          style={{ color: Colors.light.text , 
                    fontFamily: 'MuseoModernoLight', 
                    fontSize: 15, 
                    alignSelf: "center",
                    marginVertical: 15,
                    borderBottomColor: Colors.light.contrast_backgroud,
                    borderBottomWidth: 1,
                    }}>Ainda não tenho cadastro
          </Text>
        </View>
      
    </View>
  );
}
