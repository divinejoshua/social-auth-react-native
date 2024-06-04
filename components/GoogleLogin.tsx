import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import {
    GoogleSignin,
    isErrorWithCode,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

export default function GoogleLoginComponent() {

    const iosClientIdForGoogleSignin = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS;
    const webClientIdForGoogleSignin = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB;

    const configureGoogleSignIn = () => {
        GoogleSignin.configure({
          iosClientId: iosClientIdForGoogleSignin,
          webClientId :webClientIdForGoogleSignin,
        });
      };

          // Somewhere in your code
    const signInWithGoogle = async () => {
      // GoogleSignin.signOut(); //Signout by default
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log(userInfo)
      } catch (error) {
        console.log("Error signing in with Google")
        if (isErrorWithCode(error)) {
          switch (error.code) {
            case statusCodes.SIGN_IN_CANCELLED:
              // user cancelled the login flow
              break;
            case statusCodes.IN_PROGRESS:
              // operation (eg. sign in) already in progress
              break;
            case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
              // play services not available or outdated
              break;
            default:
            // some other error happened
          }
        } else {
          // an error that's not related to google sign in occurred
        }
      }
    }
    useEffect(() => {
      configureGoogleSignIn();
      GoogleSignin.signOut();
    }, [])
    

    return (
        <ThemedView>
          <TouchableOpacity style={styles.button} onPress={signInWithGoogle}>
            <ThemedText style={styles.buttonText}>Login with Google</ThemedText>
          </TouchableOpacity>
        </ThemedView>
    )
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
