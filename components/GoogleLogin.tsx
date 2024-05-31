import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';

export default function GoogleLoginComponent() {

    const iosClientIdForGoogleSignin = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS;


    const configureGoogleSignIn = () => {
        GoogleSignin.configure({
          iosClientId: "117886049071-1mj5nfvlktrd4jo9dbspl1i3jl2eu1m8.apps.googleusercontent.com",
        });
      };

      useEffect(() => {
        // configureGoogleSignIn();
      });

    return (
        <View>
        <Text>GoogleLoginComponent</Text>
        </View>
    )
}