import { Colors } from "../../constants/Colors";
import { ComandaBox } from "@/components/ComandaBox";
import React from "react";
import { View} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { useFetchComandas } from "@/hooks/useFetchComandas";

export default function Index() {

  const { comandas, triggerRefresh } = useFetchComandas();
  console.log(comandas)

  useFocusEffect(
    React.useCallback(() => {

      triggerRefresh();
    }, [])
  );

  return (
    
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.light.background,
        flexDirection: "column"
      }}
    >
     <ComandaBox comandas={comandas} active={0}/>
    </View>
  );
}
