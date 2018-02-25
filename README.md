# Druido Forum APP

A simple forum APP.

## Getting Started (USER)

- Download the `druido.apk` file in /apk.
- Enable the unknown sources in your android: https://goo.gl/j8dGSU
- Move the `druido.apk` to your Android.
- In your Android touch the apk file and install it. You can use a File Explorer App to find the file.

## Getting Started (DEV)

- First git clone the project or download it.
- Install NodeJS on your machine.
- Install Java JDK 1.8
- Install the Android SDK Manager 25.2.5.
- Install the last version of Android Studio.
- Set the ANDROID_HOME and JAVA_HOME in your system environments.
- Open a terminal/cmd as Administrator and call `android`. That will open the Android SDK Manager.
- Download and install the android packages, including the package of your Android version.
- In terminal/cmd install ionic globally. `npm install -g cordova ionic`
- Now execute `npm install` in project folder.

### Executing on browser (DEV)

- After Getting Started (DEV)...
- Now use the command `ionic serve` to run the application locally.
- That will open in your browser the application, resize your page to a mobile resolution.
- You can inspect the errors and logs in your browser.

### Executing on Android (DEV)

- After Getting Started (DEV)...
- Enable in your Android the Developer options and set the USB debugging. https://goo.gl/bc6JM4
- Unlock your Android and connect it to your machine by USB.
- Now use the command `ionic cordova run android` to run the application.
- - Sometimes it throws permission errors, if it happens try again.
- If you want to build the .apk file use `ionic cordova build android`

### Prerequisites (USER)

- Android cellphone

### Prerequisites (DEV)

- Node JS v8.9.4
- Android SDK Manager 25.2.5
- Android Studio
- Java JDK 1.8.x
- Ionic JS (The project is a template from Ionic v1.3.4)
- Android cellphone

### Observations

- Developed and tested using Lenovo Moto G4 Plus
- The public online API is on AWS EC2 Ubuntu (t2.micro)
- - The database is on AWS RDS

## Using the API

Check the API code of Druido App: https://github.com/davidwr/druido_forum_app_api
