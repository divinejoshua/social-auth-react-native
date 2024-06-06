import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import {
    GoogleSignin,
    isErrorWithCode,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "../firebase.config";

import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

WebBrowser.maybeCompleteAuthSession();


export default function GoogleLoginComponent() {

  const [userInfo, setUserInfo] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID,
  });

  // const getLocalUser = async () => {
  //   try {
  //     setLoading(true);
  //     // const userJSON = await AsyncStorage.getItem("@user");
  //     // const userData = userJSON ? JSON.parse(userJSON) : null;
  //     setUserInfo(userData);
  //     console.log(userData)
  //   } catch (e) {
  //     console.log(e, "Error getting local user");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
      console.log(credential)
      console.log(auth)
    }
  }, [response]);

  useEffect(() => {
    // getLocalUser();
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // await AsyncStorage.setItem("@user", JSON.stringify(user));
        console.log(JSON.stringify(user, null, 2));
        //@ts-ignore
        setUserInfo(user);
        console.log(user)
      } else {
        console.log("user not authenticated");
      }
    });
    return () => unsub();
  }, []);

  return (
    <ThemedView>
      <TouchableOpacity style={styles.button} onPress={() =>promptAsync()}>
        <ThemedText style={styles.buttonText}>Login with Google (firebase)</ThemedText>
      </TouchableOpacity>
    </ThemedView>
)


    // const iosClientIdForGoogleSignin = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS;
    // const webClientIdForGoogleSignin = "695187430342-8apfprq2tr4t6stj8ketn2eje4tbmap2.apps.googleusercontent.com";
    // const androidClientIdForGoogleSignin = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID;

    // const configureGoogleSignIn = () => {
    //     GoogleSignin.configure({
    //       webClientId : "695187430342-8apfprq2tr4t6stj8ketn2eje4tbmap2.apps.googleusercontent.com",
    //     });
    //   };

    //       // Somewhere in your code
    // const signInWithGoogle = async () => {
    //   // GoogleSignin.signOut(); //Signout by default
    //   try {
    //     await GoogleSignin.hasPlayServices();
    //     const userInfo = await GoogleSignin.signIn();
    //     console.log(userInfo)
    //   } catch (error) {
    //     console.log(error)
    //     if (isErrorWithCode(error)) {
    //       switch (error.code) {
    //         case statusCodes.SIGN_IN_CANCELLED:
    //           // user cancelled the login flow
    //           break;
    //         case statusCodes.IN_PROGRESS:
    //           // operation (eg. sign in) already in progress
    //           break;
    //         case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
    //           // play services not available or outdated
    //           break;
    //         default:
    //         // some other error happened
    //       }
    //     } else {
    //       // an error that's not related to google sign in occurred
    //     }
    //   }
    // }
    // useEffect(() => {
    //   GoogleSignin.revokeAccess();
    //   configureGoogleSignIn();
    //   GoogleSignin.signOut();
    // }, [])
    

    // return (
    //     <ThemedView>
    //       <TouchableOpacity style={styles.button} onPress={signInWithGoogle}>
    //         <ThemedText style={styles.buttonText}>Login with Google (IOS)</ThemedText>
    //       </TouchableOpacity>
    //     </ThemedView>
    // )

    
}

const styles = StyleSheet.create({

  button: {
    // width: '80%',
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
