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
          iosClientId: iosClientIdForGoogleSignin,
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