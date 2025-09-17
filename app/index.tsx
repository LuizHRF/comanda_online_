import React from "react";
import Login from "@/app/login";
import { NativeBaseProvider } from "native-base";
import { useRouter } from "expo-router";


export default function Index() {

  const router = useRouter();
  
  return (

    <NativeBaseProvider>
        <Login router={router}/>
    </NativeBaseProvider>
  );
}
