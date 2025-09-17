import { Colors } from "../../constants/Colors";
import { ComandaBox } from "@/components/ComandaBox";
import React from "react";
import { View} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { useFetchComandas } from "@/hooks/useFetchComandas";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Index() {

  const { comandas, triggerRefresh } = useFetchComandas();
  console.log(comandas)

  useFocusEffect(
    React.useCallback(() => {

      triggerRefresh();
    }, [])
  );

  return (
    <GestureHandlerRootView>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.light.background,
          flexDirection: "column"
        }}
      >
        <ComandaBox comandas={comandas} active={1} triggerRefresh={triggerRefresh}/>
      </View>
    </GestureHandlerRootView>
  );
}
