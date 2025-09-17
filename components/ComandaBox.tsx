import { Colors } from '../constants/Colors';
import { View, ViewStyle, Text } from 'react-native';
import Comanda from './Comanda';
import { ScrollView } from 'native-base';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const estilo: ViewStyle = {

  flex: 1,
  flexGrow: 1,
  width: '100%',

};

const estiloConteiner: ViewStyle = {
  flex:1,

  flexDirection: "column",

  backgroundColor: 'white',
  position: 'relative',
  bottom: 0,

  width: '100%',

  borderTopEndRadius: 40,
  borderTopStartRadius: 40,
  padding: 40,
  paddingBottom: 0,

};


export function ComandaBox(props: any) {

  const validComandas = props.comandas.filter((comanda: any) => comanda.status_comanda == props.active);

  return (
    
      <View style={estiloConteiner}>
        <NativeBaseProvider >
          <GestureHandlerRootView>
          <ScrollView style={estilo} showsVerticalScrollIndicator={false} > 
            {validComandas.length === 0 ? (
              
              <View style={{flexDirection:'column', alignItems:'center'}}>
                <Text style={{ color: Colors.light.faintText , fontFamily: 'MuseoModernoRegular' }}>Não há comandas por aqui</Text>
                <View style={{height: 1, width: '170%', backgroundColor: '#F3F3F3', marginTop: 10}}></View>
              </View>

            ) : props.comandas.map((comanda: any) => ( 
                <Comanda key={comanda.id_comanda} comanda={comanda} active={props.active} triggerRefresh={props.triggerRefresh} ac={props.active}/>
              )
            )
            }
          </ScrollView>
          </GestureHandlerRootView>
        </NativeBaseProvider>
      </View>
    
  );
}
