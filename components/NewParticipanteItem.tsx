import { Colors } from "../constants/Colors";
import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import axios from "axios";
import { Modal} from "react-native";
import * as config from '@/config';
import Participante from "./Participante";


export default function NewParticipanteItem(props: any) {


    // const showModalTemporarily = (message : string) => {
    //     setModalMessage(message);
    //     setModalVisible(true);
    //     setTimeout(() => {
    //       setModalVisible(false);
    //     }, 3000); // Modal will be visible for 3 seconds
    // };

    function close(){
        props.setNewi(false);
        props.refreshItems();
    }

    // const adicionarItem: any = async () => {
    //     try {

    //       const response = await axios.post('http://' + config.ip + config.port + "/cadastraritem", novoItem);
    //       props.setNewi(false)
    //       props.refreshItems();
    
    //       showModalTemporarily('Item adicionado com sucesso!');
    //     } catch (e) {
          
    //       setError(e instanceof Error ? e.message : String(e));
    //       console.error('Erro ao fazer a requisição:', e);
    //       showModalTemporarily('Erro ao adicionar item!');
    //     }
    //   };

    return(

        <View style={styles.fullitem}>
            <View key={props.index} style={styles.header}>
                
                <Text style={styles.textTitle}>Adicionar novo participante</Text>

                <Participante />

            </View>

            <Line/>

        </View>
    )
}

const styles = StyleSheet.create({
    fullitem: {
        flexDirection: 'column',
        backgroundColor: 'white',
        marginVertical: 6,
        borderRadius: 10,
        width: '60%',
        padding: 10,
    },

    header: {
        flexDirection: 'row',
        borderRadius: 10,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    textTitle :{
        fontSize: 18,
        color: Colors.light.text,
        fontFamily: 'MuseoModernoRegular',
        fontWeight: 'bold',
    },

    text: {
        fontSize: 15,
        color: Colors.light.text,
        fontFamily: 'MuseoModernoRegular',
        alignSelf: 'flex-start',
        marginRight: 10,
        marginTop: 4,
        marginLeft: 5,
    },

    info:{
        margin: 10,
    }

});

const Line = () => {
    return <View style={lineStyle}></View>;
};

const lineStyle: ViewStyle = {
    height: 1,
    width: '95%',
    backgroundColor: '#1F1300',
    alignSelf: "center",
    opacity: 0.4,
    
};