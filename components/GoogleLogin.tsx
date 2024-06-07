import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as WebBrowser from "expo-web-browser";
import * as Linking from 'expo-linking';
import queryString from 'query-string';

import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { router } from 'expo-router';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleLoginComponent() {

  const GOOGLE_SIGNIN_URL = "https://truetalk.netlify.app/auth/google"
  const REDIRECT_URL = 'socialauth://' //#This is the scheme URL that is set on the app.json file. This URL can be changed to any /path in the app

  const [email, setEmail] = useState<string>("");

  const openGoogleLoginWebPage = async () => {
    let signInUrl =`${GOOGLE_SIGNIN_URL}?redirectUrl=${REDIRECT_URL}`
    await WebBrowser.openBrowserAsync(signInUrl);
  };

    // Get user google account details
    const getUserGoogleAccountCredentials = (parsedUrl : any) =>{
      let credentials : any= {}
      credentials.email= parsedUrl.query.email;
      credentials.fullName = parsedUrl.query.fullname;
      WebBrowser.dismissBrowser()
      router.canGoBack() ? router.back() : null
      console.log(credentials)
      setEmail(credentials.email)
    }

  useEffect(() => {

    //Check for URL change on google login
      const handleUrlChange = (event : any) => {
        const { url } = event;
        const parsedUrl = queryString.parseUrl(url);
        getUserGoogleAccountCredentials(parsedUrl)
      };
      // Link event listener
      Linking.addEventListener('url', handleUrlChange);
      return () => {};
    }, []);


  return (
    <ThemedView>
      <TouchableOpacity style={styles.button} onPress={() =>openGoogleLoginWebPage()}>
        <ThemedText style={styles.buttonText}>Login with Google</ThemedText>
      </TouchableOpacity>
      { email &&  <ThemedText>Logged in as {email}</ThemedText>}
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
