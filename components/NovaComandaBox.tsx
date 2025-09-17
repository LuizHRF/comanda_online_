import { Colors } from '../constants/Colors';
import { View, ViewStyle, Text, TextInput } from 'react-native';
import * as config from '@/config';
import React, { useState } from 'react';
import { currentUser } from '@/config';
import CustomButton from './CustomButton';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import { Modal} from "react-native";

const estiloOuter: ViewStyle = {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,

    height: '70%',
    width: '100%',
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    padding: 35,
    paddingBottom: 10,
};

const estiloInner: ViewStyle = {
  flexDirection: "column",

  justifyContent: "space-between",
  width: '100%',

};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.contrast_backgroud,
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    alignSelf: 'baseline',
    marginTop: 15,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'MuseoModernoRegular',
  },
});



export function NovaComandaBox() {

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const showModalTemporarily = (message : string) => {
    setModalMessage(message);
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 3000); // Modal will be visible for 3 seconds
  };

  const [titulo, setTitulo] = useState('');
  const [senha, setSenha] = useState('');

  const [error, setError] = useState('');

  const validar_e_cadastrar = () => {
    if (titulo === '') {
      setError('Título não pode ser vazio!');
    } else {
      cadastrar_comanda();
    }
  }

  const cadastrar_comanda: any = async () => {
    try {
      const response = await axios.post('http://' + config.ip + config.port + "/cadastrarcomanda", {
        id_dono: currentUser.id,
        titulo: titulo,
        senha_comanda: senha,
      });
  
      console.log('Resposta do servidor:', response.data);

      showModalTemporarily('Comanda criada com sucesso!');
      setTitulo('');
      setSenha('');
    } catch (e) {
      
      setError(e instanceof Error ? e.message : String(e));
      console.error('Erro ao fazer a requisição:', e);
      showModalTemporarily('Erro ao criar comanda!');
    }
  };

  return (
      <View style={estiloOuter}> 

        <View style={estiloInner}> 

              <View style={{flexDirection:'column', width: "100%",}}>
                <Text style={{ color: Colors.light.text , fontFamily: 'MuseoModernoSemiBold', fontSize: 32, alignSelf: "center", marginBottom: 20 }}>Criar nova comanda</Text>
                <Text style={{ color: Colors.light.faintText , fontFamily: 'MuseoModernoRegular', fontSize: 20 , alignSelf: "flex-end"}}>Proprietário:</Text>
                <Text style={{ color: Colors.light.text , fontFamily: 'MuseoModernoRegular', fontSize: 28 , alignSelf: "flex-end", marginTop: -10}}>{currentUser.name}</Text>          
              </View>

              <View style={{height: 1, width: '100%', backgroundColor: '#F3F3F3', marginVertical: 10}}></View>

              <View style={{flexDirection:'column', width: "100%"}}>
                <Text style={{ color: Colors.light.text , fontFamily: 'MuseoModernoLight', fontSize: 20, alignSelf: "flex-start",}}>Título:</Text>
                <View style={{height: 1, width: '13%', backgroundColor: Colors.light.contrast_backgroud, alignSelf: "flex-start"}}></View>

                <TextInput
                      style={{ height: 40, width: '100%', borderRadius: 20, padding: 15, marginTop: 10, backgroundColor: Colors.light.background}}
                      placeholder="Título"
                      placeholderTextColor={Colors.light.faintText}
                      onChangeText={(value) => setTitulo(value)}
                      value={titulo}
                />         
              </View>

              <View style={{height: 1, width: '100%', backgroundColor: '#F3F3F3', marginVertical: 10}}></View>

              <View style={{flexDirection:'column', width: "100%"}}>
                <Text style={{ color: Colors.light.text , fontFamily: 'MuseoModernoLight', fontSize: 20, alignSelf: "flex-start",}}>Senha:</Text>
                <View style={{height: 1, width: '16%', backgroundColor: Colors.light.contrast_backgroud, alignSelf: "flex-start"}}></View>

                <TextInput
                      style={{ height: 40, width: '100%', borderRadius: 20, padding: 15, marginTop: 10, backgroundColor: Colors.light.background}}
                      placeholder="Opcional"
                      placeholderTextColor={Colors.light.faintText}
                      onChangeText={(value) => setSenha(value)}
                      value={senha}
                />         
              </View>

              
          </View>    

          <View style={estiloInner}> 

            <View style={{height: 1, width: '100%', backgroundColor: '#F3F3F3'}}></View>
            {error ? <Text style={{color: 'red', marginTop: 3}}>{error}</Text> : null}
            <CustomButton style={styles} onPress={validar_e_cadastrar} title="Criar comanda" />


          </View>

          <Modal 
              animationType="slide" 
              transparent={true} 
              visible={modalVisible} 
              onRequestClose={() => {setModalVisible(!modalVisible);}}
            >
              <View style={{alignSelf: 'center', justifyContent: 'center', alignItems: 'center', width: "80%", height: 30, backgroundColor: '#D3D3D3', position: 'absolute', bottom: "20%", borderRadius: 10, zIndex: -1}}>
                <Text style={{ color: Colors.light.text , fontFamily: 'MuseoModernoLight', fontSize: 20}}>{modalMessage}</Text>
              </View>
            </Modal>
      </View>
  );
}
