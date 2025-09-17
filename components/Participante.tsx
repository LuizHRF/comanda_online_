import { Colors } from "../constants/Colors";
import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from "native-base";
import { useFetchPartComanda } from '@/hooks/useFetchPartComanda';
import { useFtechValorIndividual } from "@/hooks/useFetchValorIndividual";
import axios from 'axios';
import * as config from '@/config';

export default function Participante(props: any) {

    const {participantesComanda, triggerRefreshPartComanda} = useFetchPartComanda(parseInt(props.id_comanda));
    const participantes = participantesComanda;


    const RemoverParticipante = async (user : number) => {

        try {

            await axios.delete('http://' + config.ip + config.port + "/removerpartcomanda", {
                params: {id_usuario: user, 
                id_comanda: props.id_comanda}
            });

            triggerRefreshPartComanda();
            console.log('Participante removido com sucesso!');

        } catch (e) {
            console.error('Erro ao remover participação na comanda:', e);
        }

    }


    return(

        <ScrollView style={{maxHeight: 120}} showsVerticalScrollIndicator={false}>
                        
            {participantes.map((participante: any, index: any) => (

                

                <View key={participante.id_usuario} style={{flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-evenly'}}>
                    

                    <View key={participante.id_usuario} style={styles.tableRow}>

                        <Text style={styles.tableRowText}>{participante.nome_usuario}</Text>
                        <Text style={styles.tableRowText}>{participante.valortotalpessoa}</Text>
                        <Text style={styles.tableRowText}>ID: {participante.id_usuario}</Text>

                    </View>

                    {!props.desativada ? <Ionicons name="person-remove-outline" style={{width: "10%", marginHorizontal: 5}}size={25} color={Colors.light.icon} onPress={() => RemoverParticipante(participante.id_usuario)} />
                        : null}
                </View>
                ))
            }
        </ScrollView>
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
        paddingVertical: 5,
        margin: 5,
        alignContent: 'center',
        justifyContent: 'space-between',
        width: '85%',

    },
    tableRowText: {
        fontSize: 14,
        fontFamily: 'MuseoModernoRegular',
    }
});

