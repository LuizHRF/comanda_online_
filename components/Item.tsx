import { Colors } from "../constants/Colors";
import React from 'react';
import { View, Text, StyleSheet, ViewStyle, Touchable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFetchPartItem } from "@/hooks/useFetchPartItem";
import axios from "axios";
import * as config from '@/config';
import { useFetchPartComanda } from "@/hooks/useFetchPartComanda";
import { Modal} from "react-native";
import { ScrollView } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Item(props: any) {

    const item = props.item;
    const [expanded, setExpanded] = React.useState(false);

    const [novoParticipante, setNovoparticipante] = React.useState(false);

    const {participantes, triggerRefreshPartItem} = useFetchPartItem(item.id_item);
    const {participantesComanda, triggerRefreshPartComanda} = useFetchPartComanda(parseInt(props.id_comanda));
    
    const possiveisParticipantes = participantesComanda.filter((participante: any) => !participantes.some((part: any) => part.id_usuario === participante.id_usuario));

    const inserirParticipacaoItem = async (id_usuario: number) => {

        try {
            const response = await axios.post('http://' + config.ip + config.port + "/cadastrarpartitem", {
                id_usuario: id_usuario, 
                id_item: item.id_item
            });
            triggerRefreshPartItem();
            setNovoparticipante(!novoParticipante);
            triggerRefreshPartComanda();

        } catch (e) {
            console.error('Erro ao fazer o cadastro de patrticipação no item:', e);
        }

    }

    const excluirParticipante = async (id_usuario: number) => {

        try {
            const response = await axios.delete('http://' + config.ip + config.port + "/removerpartitem", {
                params: {id_usuario: id_usuario, 
                id_item: item.id_item}
                });
            triggerRefreshPartItem();
            triggerRefreshPartComanda();

        } catch (e) {
            console.error('Erro ao fazer a requisição:', e);
        }

    }

    const removerItem = async () => {
            
            try {

                await axios.delete('http://' + config.ip + config.port + "/deletaritem", {
                    params: {id_item: item.id_item}
                });

                props.refreshItems();
                triggerRefreshPartComanda();
    
            } catch (e) {
                console.error('Erro ao fazer a requisição:', e);
            }
    }

    return(

        <View style={styles.fullitem}>
            <View key={props.index} style={styles.tableRow}>
                <Text style={styles.tableRowText}>{item.nome_item}</Text>
                <Text style={styles.tableRowText}>{item.quantidade}</Text>
                <Text style={styles.tableRowText}>{item.preco}</Text>
                 
                {expanded ? <Ionicons name="chevron-up" size={22} color={Colors.light.icon} style={{marginHorizontal: 5}} onPress={() => setExpanded(!expanded)} />
                : <Ionicons name="chevron-down" size={22} color={Colors.light.icon} style={{marginHorizontal: 5}} onPress={() => setExpanded(!expanded)} />
                }

            </View>


            {expanded &&

                <View>
                    <Line/>                

                    {!props.desativada ? <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 15}}>

                        <View style={{flexDirection: 'row', alignItems: 'center', width: '60%',}}>
                            <Ionicons name="add" size={15} color={"black"} style={{margin: 5}} onPress={() => setNovoparticipante(!novoParticipante)}/>
                            <Text style={[styles.tableRowText, {fontSize: 11}]} onPress={() => setNovoparticipante(!novoParticipante)}>Inserir novo participante</Text>
                        </View>

                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Ionicons name="trash-outline" size={17} color={"black"} style={{margin: 5}} onPress={() => removerItem()}/>
                            <Text style={[styles.tableRowText, {fontSize: 11}]} onPress={() => removerItem()}>Remover Item</Text>
                        </View>

                    </View>
                    : null}

                    <Line/>

                    <View style={{justifyContent: "center"}}>

                    {participantes.map((dividendo: any, index: number) => (
                        <View style={styles.personRow} key={dividendo.id_usuario}>
                            <Text style={styles.tableRowText} >{dividendo.id_usuario}</Text>
                            <Text style={styles.tableRowText} >{dividendo.nome_usuario}</Text>
                            
                            {!props.desativada ? <Ionicons name="remove-circle-outline" size={18} color={"black"} style={{marginVertical: 5}} onPress={() => excluirParticipante(dividendo.id_usuario)}/>
                                : <Ionicons name="remove-circle-outline" size={18} color={"transparent"} style={{marginVertical: 5}} /> }
                        </View>
                        ))}
                </View>

                <Modal
                    visible={novoParticipante}
                    transparent={true}
                    onRequestClose={() => setNovoparticipante(!novoParticipante)}
                    
                >
                    <View style={{zIndex: -1, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.8)", alignItems: 'center', justifyContent: "center"}}>

                        <View style={{padding: 10, width: "70%", backgroundColor: 'white', borderRadius: 20, flexDirection: 'column', alignContent: "center", justifyContent: "center" }}>
                            
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Text style={{margin: 10, fontFamily: 'MuseoModernoSemiBold'}}>Selecione o novo participante</Text>
                                <Ionicons name="close" size={22} color={Colors.light.icon} style={{marginHorizontal: 10}}onPress={() => setNovoparticipante(!novoParticipante)} />
                            </View>
                            
                            {possiveisParticipantes.length > 0 ?
                                <ScrollView style={{maxHeight: 120}} showsVerticalScrollIndicator={false}>
                            
                                    {possiveisParticipantes.map((participante: any, index: any) => (
                                        <TouchableOpacity key={participante.id_usuario} style={styles.tableRow} onPress={() => inserirParticipacaoItem(participante.id_usuario)}>

                                            <Text style={styles.tableRowText}>{participante.id_usuario}</Text>
                                            <Text style={styles.tableRowText}>{participante.nome_usuario}</Text>

                                        </TouchableOpacity>
                                        ))
                                    }
                                </ScrollView>
                            : <Text style={{color: Colors.light.faintText, alignSelf: 'center' ,fontFamily: 'MuseoModernoRegular', fontSize: 14, margin: 5, marginTop: 0}}>Nenhum participante disponível</Text>}
                        </View>
                    </View>
                </Modal>

                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    fullitem: {
        flexDirection: 'column',
        backgroundColor: 'white',
        marginVertical: 6,
        borderRadius: 10,
    },

    tableRow: {

        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        alignContent: 'center',
    },
    tableRowText: {
        flex: 1,
        textAlign: 'left',
        fontSize: 14,
        fontFamily: 'MuseoModernoRegular',
    },
    personRow: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginVertical: 5,
        borderRadius: 10,
        paddingHorizontal: 10,
        width: '95%',
        alignSelf: 'center',
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