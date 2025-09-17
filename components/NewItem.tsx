import { Colors } from "../constants/Colors";
import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import axios from "axios";
import { Modal} from "react-native";
import * as config from '@/config';


export default function NewItem(props: any) {

    const [nome, setNome] = React.useState('');
    const [quantidade, setQuantidade] = React.useState('');
    const [valor, setValor] = React.useState('');

    const [error, setError] = React.useState('');
    const [modalVisible, setModalVisible] = React.useState(false);
    const [modalMessage, setModalMessage] = React.useState('');

    const showModalTemporarily = (message : string) => {
        setModalMessage(message);
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 3000); // Modal will be visible for 3 seconds
    };

    let novoItem = {
        id_comanda: parseInt(props.id_comanda),
        nome_item: nome,
        quantidade: parseInt(quantidade),
        preco: parseFloat(valor), 
        id_usuario: config.currentUser.id,
    }

    function close(){
        props.setNewi(false);
        props.refreshItems();
    }

    const adicionarItem: any = async () => {
        try {

          const response = await axios.post('http://' + config.ip + config.port + "/cadastraritem", novoItem);
          props.setNewi(false)
          props.refreshItems();
    
          showModalTemporarily('Item adicionado com sucesso!');
        } catch (e) {
          
          setError(e instanceof Error ? e.message : String(e));
          console.error('Erro ao fazer a requisição:', e);
          showModalTemporarily('Erro ao adicionar item!');
        }
      };

    return(

        <View style={styles.fullitem}>
            <View key={props.index} style={styles.header}>
                
                <Text style={styles.textTitle}>Adicionar novo item</Text>

                <View style={{flexDirection: 'row'}}>
                    <Ionicons name="checkbox" size={22} color={Colors.light.icon} style={{marginHorizontal: 5}}  onPress={() => adicionarItem()}/>
                    <Ionicons name="close" size={22} color={Colors.light.icon} style={{marginHorizontal: 5}} onPress={() => close()}/>
                </View>

            </View>

            <Line/>

            <View>

                <View style={{flexDirection:'column', margin: 5}}>

                    <View style={styles.info}>
                        <Text style={[styles.text, {flex: 0}]}>Nome do item</Text>
                       
                        <TextInput
                            style={{ flex: 1, width: '100%', height: 30, borderRadius: 20, padding: 15, marginTop: 5, backgroundColor: Colors.light.background}}
                            placeholder="Nome"
                            placeholderTextColor={Colors.light.faintText}
                            onChangeText={(value) => setNome(value)}
                            value={nome}
                        />   
                    </View>   

                    <View style={{margin: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
                        <Text style={[styles.text, { width: '60%' }]}>Valor:   R$</Text>
                        
                        <TextInput
                            style={{flex:1, width: '100%', height: 30, borderRadius: 20, padding: 15, backgroundColor: Colors.light.background}}
                            placeholder="Valor"
                            placeholderTextColor={Colors.light.faintText}
                            onChangeText={(value) => setValor(value)}
                            value={valor}
                        />   
                    </View>   

                    <View style={{margin: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={[styles.text, {width: '50%'}]}>Quantidade:</Text>
                            
                            <TextInput
                                style={{flex: 1, width: '100%', height: 30, borderRadius: 20, padding: 15, backgroundColor: Colors.light.background}}
                                placeholder="Quantidade"
                                placeholderTextColor={Colors.light.faintText}
                                onChangeText={(value) => setQuantidade(value)}
                                value={quantidade}
                            />   

                    </View>
                        
                </View>

            </View>

            <Modal 
              animationType="slide" 
              transparent={true} 
              visible={modalVisible} 
              onRequestClose={() => {setModalVisible(!modalVisible);}}
            >
              <View style={{alignSelf: 'center', justifyContent: 'center', alignItems: 'center', width: "80%", height: 30, backgroundColor: 'white', position: 'absolute', bottom: "15%", borderRadius: 10, zIndex: -1}}>
                <Text style={{ color: Colors.light.text , fontFamily: 'MuseoModernoLight', fontSize: 20}}>{modalMessage}</Text>
              </View>
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    fullitem: {
        flexDirection: 'column',
        backgroundColor: 'white',
        marginVertical: 6,
        borderRadius: 10,
        width: '75%',
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
        flex: 1,
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