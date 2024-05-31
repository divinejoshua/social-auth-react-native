# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

3. Set up Login with apple

   ```bash
    Follow the expo docs
   ```

4. Set up Login with google

   ```bash
    Follow the expo docs with any external packages
   ```


5. Set up simulator

   NOTE: Login with google does not work in expo. It needs to run on the IOS simulator from Xcode. Here is a step by step procedure

   Source:

   https://react-native-google-signin.github.io/docs/setting-up/expo

  

   ```bash
   Install the google login dependency
   ```
    ```bash
   Update the necessary credentials in app.json (ClientId etc)
   ```

   After installing and setting up the code, then create a dev build on expo. Follow this link on how to create a build.
    https://docs.expo.dev/develop/development-builds/create-a-build/
   ```bash
   $ eas build --profile development --platform ios
   ```

   - This will take a while. This will upload your code to **expo.dev** and build it.

   - Once the build is done, download it, unzip it

   - Open your IOS simulator (You can open this from running IOS simulator in your expo project)

   - Drag the newly downloaded app into the simulator

   - Once it launches your app, you can now be able to login with Google



