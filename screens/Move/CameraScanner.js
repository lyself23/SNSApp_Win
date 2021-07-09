import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, {useEffect, useRef} from 'react';
import { NavigationEvents } from 'react-navigation';
import {
  StyleSheet,
  Animated,
  PermissionsAndroid,
  default as Easing,
  ImageBackground,
  View,
  Text,
} from 'react-native';
import {  Box} from 'native-base';
import { marginBottom } from 'styled-system';
  
 
let camera;

function CameraScanner(){
    const moveAnim = useRef(new Animated.Value(-2)).current;

    useEffect(() => {
        requestCameraPermission();
        startAnimation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
     
      //Method of requesting permission
      const requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                         title:'Apply for camera permission',
                         message:'Scanning the QR code requires camera permission',
                         buttonNeutral:'Ask me again later',
                         buttonNegative:'No way',
                         buttonPositive:'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                     console.log('Now you have the camera permission');
          } else {
                     console.log('User does not allow camera permission');
          }
        } catch (err) {
          console.warn(err);
        }
      };

         /** Scanning frame animation*/
        const startAnimation = () => {
            Animated.sequence([
            Animated.timing(moveAnim, {
                toValue: 200,
                duration: 1500,
                easing: Easing.linear,
                useNativeDriver: false,
            }),
            Animated.timing(moveAnim, {
                toValue: -1,
                duration: 1500,
                easing: Easing.linear,
                useNativeDriver: false,
            }),
            ]).start(() => startAnimation());
        };

      const onBarCodeRead = (result) => {
        const {data} = result; //Just get data
        alert(data)
        //Operation after scanning the code
      };


    return ( 
   
    <View style = {styles.container}>
        <RNCamera
            style={{width: 80, height: 10}}
            autoFocus={RNCamera.Constants.AutoFocus.on} /*Auto Focus*/
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.off} /*Camera flash mode*/
            captureAudio={false}
            onBarCodeRead={onBarCodeRead}
        />  
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      marginTop : 30,
      marginBottom : 100
    },
    preview: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    rectangleContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    rectangle: {
      height: 200,
      width: 200,
      borderWidth: 1,
      borderColor: '#fcb602',
      backgroundColor: 'transparent',
      borderRadius: 10,
    },
    rectangleText: {
      flex: 0,
      color: '#fff',
      marginTop: 3,
    },
    border: {
      flex: 0,
      width: 196,
      height: 2,
      backgroundColor: '#fcb602',
      borderRadius: 50,
    },
  });

export default CameraScanner;