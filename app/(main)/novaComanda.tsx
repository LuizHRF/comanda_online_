import { Text, View, ViewStyle } from "react-native";
import { Colors } from "../../constants/Colors";
import { NovaComandaBox } from "@/components/NovaComandaBox";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from '@/hooks/useColorScheme';

const estilo_header: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  position: 'absolute',
  top: 0,

  height: '30%',
  width: '100%',

  padding: 25,

  backgroundColor: "transparent",
};

export default function Index() {

  const colorScheme = useColorScheme();

  return (
    
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.light.contrast_backgroud,
        }}
      >
        <View style={estilo_header}> 
          <Ionicons name="receipt" size={120} color={"white"}/>
          <Text style={{ color: "white", fontSize: 100, fontFamily: 'MuseoModernoSemiBold', marginLeft:20 }}>+</Text>
        </View>

        <NovaComandaBox />
        
      </View>
  );
}
