import React from 'react'
import { ThemedView } from './ThemedView'
import * as AppleAuthentication from 'expo-apple-authentication';
import { StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';

export default function AppleLoginComponent() {


  // Login with Apple
  const loginWithApple = async () =>{
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      // signed in
      console.log(credential)
    } catch (e : any) {
    console.log("error")
      if (e.code === 'ERR_REQUEST_CANCELED') {
        // handle that the user canceled the sign-in flow
      } else {
        // handle other errors
      }
    }
  }

  return (
    <ThemedView style={styles.container}>
        <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={styles.button}
        onPress={()=>loginWithApple()}
        />
    </ThemedView>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      width: 200,
      height: 44,
    },
  });