import { Colors } from '../constants/Colors';
import { View, ViewStyle, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Modal} from "react-native";
import { Link } from '@react-navigation/native';
import * as Config from '../config';

const estilo: ViewStyle = {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: 'relative',

    width: '100%',

    paddingVertical: 12, //ALtura do header
    paddingHorizontal: 20,
    backgroundColor: Colors.light.background,
};

const infoStyle: ViewStyle = {

  flexDirection: "column",
  alignSelf: 'flex-end',
  backgroundColor: 'white',
  margin: "7%",
  padding: 15,
  marginLeft: '30%',
  borderRadius: 20,

  shadowColor: Colors.light.contrast_backgroud,
  shadowRadius: 3,
};


const txt = "O aplicativo 'Divide Aí', desenvolvido para a disciplina de Planejamento e Gestão de Projetos, tem como objetivo facilitar a divisão de contas entre grupos de pessoas. Utilizando React Native, ele oferece uma interface intuitiva, permitindo que os usuários visualizem e manipulem comandas coletivas de forma prática."

export function Header( props : any) {

  const router = props.router;
  const currentUser = Config.currentUser;

  const exit = () => {
      // currentUser.id = -1;
      // currentUser.name = 'null';
      // currentUser.email = "null";
      router.push({ pathname: '../login'});
  }

  const [info, setinfo] = React.useState(false);

  return (
    
    <View style={estilo}> 

      <Modal
        animationType="fade"
        transparent={true}
        visible={info}
        onRequestClose={() => {
          setinfo(!info);
        }}>
        <View style={infoStyle}>
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <Text style={{color: Colors.light.text, fontSize: 20, fontFamily: 'MuseoModernoRegular', fontWeight: 'bold' }}>Sobre</Text>
            <Ionicons name="close" size={25} color={"black"} style={{alignSelf:"flex-end"}} onPress={() => {setinfo(!info)}} />
          </View>  
            <Text style={{ color: Colors.light.text, fontSize: 15, fontFamily: 'MuseoModernoRegular' }}>{txt}</Text>
            <Text style={{ color: Colors.light.text, fontSize: 15, fontFamily: 'MuseoModernoRegular' }}>By:</Text>
            <Link  to='https://github.com/LuizHRF'><Text style={{ color: Colors.light.text, fontSize: 15, fontFamily: 'MuseoModernoRegular' }}>Luiz Faccio</Text></Link>
            <Link  to='https://github.com/marcobalestrin'><Text style={{ color: Colors.light.text, fontSize: 15, fontFamily: 'MuseoModernoRegular' }}>Marco Antônio Balestrin</Text></Link>
            <Link to='https://github.com/joaohenalves'><Text style={{ color: Colors.light.text, fontSize: 15, fontFamily: 'MuseoModernoRegular' }}>João Henrique Alves dos Santos</Text></Link>
          </View>
      </Modal>

      <Ionicons name="information-circle-outline" size={40} color={Colors.light.icon} onPress={() => {setinfo(!info)}} />


      <View style={{flexDirection: 'column', maxWidth: '70%'}}>  
        <Text style={estiloTexto.textMain}>Bem Vindo, {props.user}</Text>
        <Text style={estiloTexto.textSec}>{props.tela}</Text>
      </View>

      <Ionicons name="exit-outline" size={40} color={Colors.light.icon} onPress={() => {exit}} />
      
    </View>
  );
}

const estiloTexto = StyleSheet.create({
  textMain: {
    color: Colors.light.text, 
    fontSize: 24,
    fontFamily: 'MuseoModernoRegular',
    alignSelf: 'center'
  },

  textSec: {
    color: Colors.light.faintText, 
    fontSize: 20,
    fontFamily: 'MuseoModernoRegular',
    alignSelf: 'center',
    lineHeight: 27
  }
}
  
)