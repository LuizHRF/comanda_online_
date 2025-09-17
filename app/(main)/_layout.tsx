import { Tabs } from 'expo-router';
import React from 'react';
import * as config from '@/config';
import { Header } from '@/components/Header';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  const router = useRouter();

  const [backgroundColor, setBackgroundColor] = React.useState(Colors[colorScheme ?? 'light'].background);
  const user = config.currentUser.name;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: backgroundColor}} edges={["top", 'left', 'right']} >
      <Tabs
        
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 100
          },
    
        }}>
        <Tabs.Screen
          name="index"
          key={1}
          options={{
          headerShown: true,
          title: 'Home',
          tabBarIcon: ({focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={Colors.light.icon} size={35}/>
          ),
          header(props) {
            return <Header router={router} user={user} tela={"Tela de controle (comandas ativas)"} {...props} />;
          },
        }}
        listeners={{
          tabPress: (e) => {
            setBackgroundColor(Colors[colorScheme ?? 'light'].background);
        },
          }}
        />
        <Tabs.Screen
          name="novaComanda"
          key={2}
          options={{
          headerShown: false,
          title: 'Nova Comanda',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'add-circle' : 'add-circle-outline'} color={Colors.light.icon} size={35}/>
          )
        }}
        listeners={{
          tabPress: (e) => {
            setBackgroundColor(Colors.light.contrast_backgroud);
        },
          }}
        />
        <Tabs.Screen
          name="Historico"
          key={1}
          options={{
          headerShown: true,
          title: 'Histórico',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'time' : 'time-outline'} color={Colors.light.icon} size={35}/>
          ),
          header(props) {
            return <Header router={router} user={user} tela={"Histórico de comandas"} {...props} />;
          },
        }}
        listeners={{
          tabPress: (e) => {
            setBackgroundColor(Colors[colorScheme ?? 'light'].background);
        },
          }}
        />
        <Tabs.Screen
          name="ParticiparComanda"
          key={2}
          options={{
          headerShown: false,
          title: 'Entrar em Comanda',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'log-in' : 'log-in-outline'} color={Colors.light.icon} size={35}/>
          )
        }}
        listeners={{
          tabPress: (e) => {
            setBackgroundColor(Colors.light.contrast_backgroud);
        },
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
