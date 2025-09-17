import { ScrollView } from 'native-base';
import { Colors } from '../constants/Colors';
import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Item from './Item';
import { Ionicons } from '@expo/vector-icons';
import { Modal} from "react-native";
import NewItem from './NewItem';

const lineStyle: ViewStyle = {
    height: 1,
    width: '100%',
    backgroundColor: '#1F1300',
    marginVertical:1,
    alignSelf: "center",
    opacity: 0.4,
    
};

export default function TabelaItens(props: any) {

    const itensEmpty = props.itens.length === 0;
    const [newi, setNewi] = React.useState(false);
    const maxH = props.desativada ? 180 : 220;

        return (
            <View style={styles.tableContainer}>
                {!itensEmpty ? <View>
                    <View style={styles.tableHeader}>
                        <Text style={styles.tableHeaderText}>Item</Text>
                        <Text style={styles.tableHeaderText}>Qtd.</Text>
                        <Text style={styles.tableHeaderText}>Valor</Text>
                        
                        {!props.desativada ? <Ionicons name="add-circle-outline" size={25} color={Colors.light.icon} style={{marginHorizontal: 10}} onPress={() => setNewi(!newi)} />
                            : <Ionicons name="trash" size={22} color="transparent" style={{marginHorizontal: 5}}/>}
                    </View>

                    <View style={lineStyle}></View>
                    
                    <ScrollView style={{maxHeight: maxH, width: '100%'}} showsVerticalScrollIndicator={false}>
                        {props.itens.map((item: any, index: number) => (
                            
                            <Item desativada={props.desativada} key={index} item={item} id_comanda={props.id_comanda} refreshItems={props.refreshItems}/>
                        ))}
                    </ScrollView>
                </View>
                : 
                    <View>
                        <Text style={{color: Colors.light.faintText, alignSelf: 'center' ,fontFamily: 'MuseoModernoRegular', fontSize: 14, margin: 5, marginTop: 0}}>Nenhum item adicionado</Text>

                        {!props.desativada ? <Text style={{color: Colors.light.text, alignSelf: 'center' ,fontFamily: 'MuseoModernoRegular', fontSize: 14, backgroundColor: 'white', paddingHorizontal: 15, borderRadius: 10, marginBottom: 10}} onPress={() => setNewi(!newi)}>Inserir Primeiro Item </Text>
                        : null }
                    </View>
                }      

                <View style={lineStyle}></View>


                <Modal
                    transparent={true}
                    visible={newi}
                    onRequestClose={() => {
                        setNewi(!newi);
                        props.refreshItems();
                    }}
                    >
                        <View style={{zIndex: -1, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", alignItems: 'center', justifyContent: "center"}}>

                            <NewItem id_comanda={props.id_comanda} setNewi={setNewi} refreshItems={props.refreshItems}/>

                        </View>

                    </Modal>

            </View>
        );
    }

    const styles = StyleSheet.create({
        tableContainer: {
            flex: 1,
            marginHorizontal: 5,
        },
        tableHeader: {
            width: '100%',
            flexDirection: 'row',
            alignContent: 'center',

        },
        tableHeaderText: {
            fontSize: 16,
            textAlign: 'left',
            fontFamily: 'MuseoModernoRegular',
            flex: 1,
        },
    });