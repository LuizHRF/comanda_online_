import { Text, View, ViewStyle } from "react-native";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import axios from "axios";
import * as config from "../../config";
import { Modal} from "react-native";
import { StyleSheet } from "react-native";
import CustomButton from "@/components/CustomButton";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Index() {

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const showModalTemporarily = (message : string) => {
    setModalMessage(message);
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 3000); // Modal will be visible for 3 seconds
  };

  const currentUser = config.currentUser;
  const [idComanda, setIdComanda] = useState('');
  const [senha, setSenha] = useState('');

  const [error, setError] = useState('');

  const entrar_comanda: any = async () => {
    try {
      const response = await axios.post('http://' + config.ip + config.port + "/cadastrarpartcomanda", {
        id_usuario: currentUser.id,
        id_comanda: idComanda,
        senha_comanda: senha,
      });
  
      console.log('Resposta do servidor:', response.data);

      showModalTemporarily('Participação cadastrada com sucesso!');
      setIdComanda('');
      setSenha('');
    } catch (e) {
      
      setError("Comanda inexistente ou senha incorreta.");
      console.error('Erro ao fazer a requisição:', e);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <GestureHandlerRootView>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.light.contrast_backgroud,
        }}
      >
        <View style={estilo_header}> 
          <Ionicons name="arrow-redo-sharp" size={100} color={"white"}/>
          <Ionicons name="receipt" size={120} color={"white"}/>
        </View>


          <View style={estiloOuter}> 

          
          <View style={estiloInner}> 

                <View style={{flexDirection:'column', width: "100%",}}>
                  <Text style={{ color: Colors.light.text , fontFamily: 'MuseoModernoSemiBold', fontSize: 32, alignSelf: "center", marginBottom: 20 }}>Participar de uma comanda</Text>
                </View>

                <View style={{height: 1, width: '100%', backgroundColor: '#F3F3F3', marginVertical: 10}}></View>

                <View style={{flexDirection:'column', width: "100%"}}>
                  <Text style={{ color: Colors.light.text , fontFamily: 'MuseoModernoLight', fontSize: 20, alignSelf: "flex-start",}}>ID da comanda:</Text>
                  <View style={{height: 1, width: '35%', backgroundColor: Colors.light.contrast_backgroud, alignSelf: "flex-start"}}></View>

                  <TextInput
                        style={{ height: 40, width: '100%', borderRadius: 20, padding: 15, marginTop: 10, backgroundColor: Colors.light.background}}
                        placeholder="ID"
                        placeholderTextColor={Colors.light.faintText}
                        onChangeText={(value) => setIdComanda(value)}
                        value={idComanda}
                  />         
                </View>

                <View style={{height: 1, width: '100%', backgroundColor: '#F3F3F3', marginVertical: 10}}></View>

                <View style={{flexDirection:'column', width: "100%"}}>
                  <Text style={{ color: Colors.light.text , fontFamily: 'MuseoModernoLight', fontSize: 20, alignSelf: "flex-start",}}>Senha:</Text>
                  <View style={{height: 1, width: '16%', backgroundColor: Colors.light.contrast_backgroud, alignSelf: "flex-start"}}></View>

                  <TextInput
                        style={{ height: 40, width: '100%', borderRadius: 20, padding: 15, marginTop: 10, backgroundColor: Colors.light.background}}
                        placeholder="Senha"
                        placeholderTextColor={Colors.light.faintText}
                        onChangeText={(value) => setSenha(value)}
                        value={senha}
                  />         
                </View>

                
            </View>    

            <View style={estiloInner}> 

              <View style={{height: 1, width: '100%', backgroundColor: '#F3F3F3'}}></View>
              {error ? <Text style={{color: 'red', marginTop: 3}}>{error}</Text> : null}
              <CustomButton style={styles} onPress={entrar_comanda} title="Entrar na comanda" />


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

        
        
      </View>
      </GestureHandlerRootView>
  );
}

const estilo_header: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  position: 'absolute',
  top: 0,

  height: '30%',
  width: '100%',

  padding: 25,

  backgroundColor: "transparent",
};

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