import { Colors } from '../constants/Colors';
import { View, ViewStyle, Text } from 'react-native';
import { format } from 'date-fns';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import React from 'react';
import { Modal} from "react-native";
import ComandaExpanded from './ComandaExpanded';
import { useFetchComandas } from '@/hooks/useFetchComandas';

const estiloShrinked: ViewStyle = {

    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",

    marginVertical: 5,

    width: '100%',
    flex: 1,

    padding: 15,

    borderRadius: 15, 

    backgroundColor: Colors.light.background,
    zIndex: -1,
    
};



const estiloExtra = {
    titulo : {
      color: Colors.light.text,
      fontSize: 24,
      fontFamily: 'MuseoModernoRegular',
    },
    
    texto: { 
      color: Colors.light.text,
      fontFamily: 'MuseoModernoRegular',
      fontSize: 18,
      margin: 3,
    },

    campos :{  
      color: Colors.light.faintText,
      fontFamily: 'MuseoModernoRegular',
      fontSize: 18,
      margin: 3,
    },

    camposInput: {  
      color: Colors.light.faintText,
      fontFamily: 'MuseoModernoRegular',
      fontSize: 18,
      margin: 3,
    },
}

const lineStyle: ViewStyle = {
    height: 1,
    width: '100%',
    backgroundColor: '#1F1300',
    margin:10,
    alignSelf: "center",
    opacity: 0.4,
    
};


const Line = () => {
    return <View style={lineStyle}></View>;
}


const Comanda = (props : any) => {

    const comanda = props.comanda;
    //console.log(comanda)

    const [expanded, setExpanded] = React.useState(false);


    const dataFormatada = format(new Date(comanda.data_hora), 'dd/MM/yyyy HH:mm');


    if (comanda.status_comanda == props.active) {
    return ( 
        <TouchableOpacity style={estiloShrinked} activeOpacity={0.85} onPress={() => {setExpanded(!expanded)}}>
            
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: "100%"}}>

                <Text style={estiloExtra.titulo}>Comanda {comanda.id_comanda}</Text>
            
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  
                  
                </View>

            </View>
            
          <Line />
    
          <View style={{ flexDirection: 'row' }}>
            <Text style={estiloExtra.campos}>Proprietário:</Text>
            <Text style={estiloExtra.texto}>{comanda.nome_dono}</Text>
          </View>
    
          <View style={{ flexDirection: 'row' }}>
            <Text style={estiloExtra.campos}>Data de criação: </Text>
            <Text style={estiloExtra.texto}>{dataFormatada}</Text>
          </View>
    
          <Line />

            <Modal
              transparent={true}
              visible={expanded}
              onRequestClose={() => {
                setExpanded(!expanded)
                props.triggerRefresh();
              }}
            >
                <View style={{zIndex: -1, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", alignItems: 'center', justifyContent: "center"}}>

                  <ComandaExpanded ac={props.ac} comanda={comanda} close={setExpanded} triggerRefresh={props.triggerRefresh}/>

                </View>

            </Modal>
    

        </TouchableOpacity>
      );}
      else {
        return (
          <View></View>
        )
      }
}

export default Comanda;