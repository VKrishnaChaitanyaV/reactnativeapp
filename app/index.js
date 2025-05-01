import { Redirect } from "expo-router";
import { Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DataStore from './services/store.service.js';
import { useEffect, useState } from "react";

export default function CheckLogin() {
    const [isUserLoggedIn, setUserLoggedIn] = useState();

    useEffect(()=>{
        checkUser();
    }, []);

    const checkUser = async () =>{
        let d = await DataStore.getMobileNumber();
        setUserLoggedIn(d);
    }

    return (
        <View>
            {isUserLoggedIn? <Redirect href="/registration"> </Redirect> : <Redirect href="/login"></Redirect> }
        </View>
    )
}



