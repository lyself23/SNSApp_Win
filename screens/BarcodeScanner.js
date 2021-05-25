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
 
let camera;
 
function BarcodeScanner({navigation, route}) {
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
    //Operation after scanning the code
    console.log("scan : " + data);
    //alert(data);
    if(route.params.flag === 'S') {
      navigation.navigate("Stock", {barcodeNo : data})
    } else if (route.params.flag === 'M') {
      navigation.navigate("Move", {barcodeNo : data})
    }
  };
 
  return (
    <View style={styles.container}>
      <RNCamera
        ref={(ref) => {
          camera = ref;
        }}
        autoFocus={RNCamera.Constants.AutoFocus.on} /*Auto Focus*/
        style={[styles.preview]}
        type={RNCamera.Constants.Type.back} /*Switch front and rear cameras front, back and back*/
        flashMode={RNCamera.Constants.FlashMode.off} /*Camera flash mode*/
        onBarCodeRead={onBarCodeRead}>
        <View
          style={{
            width: 500,
            height: 220,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        />
 
        <View style={[{flexDirection: 'row'}]}>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              height: 200,
              width: 200,
            }}
          />
          <ImageBackground
           // source={require('./assets/qrcode_bg.png')}
            style={{width: 200, height: 200}}>
            <Animated.View
              style={[styles.border, {transform: [{translateY: moveAnim}]}]}
            />
          </ImageBackground>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              height: 200,
              width: 200,
            }}
          />
        </View>
 
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            width: 500,
            alignItems: 'center',
          }}>
          <Text style={styles.rectangleText}>
                         Put the QR code in the box and it will scan automatically
          </Text>
        </View>
      </RNCamera>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
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
    marginTop: 10,
  },
  border: {
    flex: 0,
    width: 196,
    height: 2,
    backgroundColor: '#fcb602',
    borderRadius: 50,
  },
});
 
export default BarcodeScanner;






// import React, { PureComponent } from 'react';
// import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, ImageBackground, Animated } from 'react-native';
//  import { RNCamera } from 'react-native-camera';
//  import Icon from 'react-native-vector-icons/FontAwesome';

//  const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       flexDirection: 'column',
//       backgroundColor: 'black',
//     },
//     preview: {
//       flex: 1,
//       justifyContent: 'flex-end',
//       alignItems: 'center',
//     },
//     capture: {
//       flex: 0,
//       backgroundColor: '#fff',
//       borderRadius: 5,
//       padding: 15,
//       paddingHorizontal: 20,
//       alignSelf: 'center',
//       margin: 20,
//     },
//     centerText: {
//         flex: 1,
//         fontSize: 18,
//         padding: 32,
//         color: '#777'
//       },
//       textBold: {
//         fontWeight: '500',
//         color: '#000'
//       },
//       buttonText: {
//         fontSize: 21,
//         color: 'rgb(0,122,255)'
//       },
//       buttonTouchable: {
//         padding: 16
//       }
//   });


  // class  BarcodeScanner extends React.PureComponent {

  //   constructor(props) 
  //   { 
  //       super(props); 
  //       this.camera = null; 
  //       this.state = { 
  //           barcodeType: '', 
  //           barcodeData: '', 
  //           type: RNCamera.Constants.Type.back,}; 
  //   }

   

  //   onBarCodeRead(scanResult) { 
  //       console.log(scanResult.type); 
  //       console.log(scanResult.data); 
  //       if (scanResult.data !== null) { 
  //           this.setState({ barcodeType: scanResult.type, barcodeData: scanResult.data, }); 
  //       }
  //       return;
  //   }


  //   // state = {
  //   //   type: RNCamera.Constants.Type.back,
  //   // };
  
  //   // flipCamera = () =>
  //   //   this.setState({
  //   //     type:
  //   //       this.state.type === RNCamera.Constants.Type.back
  //   //         ? RNCamera.Constants.Type.front
  //   //         : RNCamera.Constants.Type.back,
  //   //   });
  
  //   //   onBarCodeRead(scanResult) {
  //   //     console.warn(scanResult.type);
  //   //     console.warn(scanResult.data);
  //   //     // if (scanResult.data != null) {
  //   //     //     if (!this.barcodeCodes.includes(scanResult.data)) {
  //   //     //         this.barcodeCodes.push(scanResult.data);
  //   //     //         console.warn('onBarCodeRead call');
  //   //     //     }
  //   //     // }
  //   //     return;
  //   // }


  //   takePhoto = async () => {
  //     const { onTakePhoto } = this.props;
  //     const options = {
  //       quality: 0.5,
  //       base64: true,
  //       width: 300,
  //       height: 300,
  //     };
  //     const data = await this.camera.takePictureAsync(options);
  //     onTakePhoto(data.base64);
  //   };
  //   render() {
      
  //     const { type } = this.state;
      

  //     return (
  //       <View style={styles.container}>
  //         <RNCamera
  //           ref={cam => {
  //             this.camera = cam;
  //           }}
  //           autoFocus={RNCamera.Constants.AutoFocus.on}
  //           onBarCodeRead = {this.onBarCodeRead.bind(this)}
  //           type={type}
  //           style={styles.preview}
  //         >
  //           <View
  //             style={{
  //               width: 500,
  //               height: 220,
  //               backgroundColor: 'rgba(0,0,0,0.5)',
  //             }}
  //           />
    
  //           <View style={[{flexDirection: 'row'}]}>
  //             <View
  //               style={{
  //                 backgroundColor: 'rgba(0,0,0,0.5)',
  //                 height: 200,
  //                 width: 200,
  //               }}
  //             />
  //             <ImageBackground
  //               // source={require('./assets/qrcode_bg.png')}
  //               style={{width: 200, height: 200}}>
  //               <Animated.View
  //                 style={[styles.border, {transform: [{translateY: moveAnim}]}]}
  //               />
  //             </ImageBackground>
  //             <View
  //               style={{
  //                 backgroundColor: 'rgba(0,0,0,0.5)',
  //                 height: 200,
  //                 width: 200,
  //               }}
  //             />
  //           </View>
    
  //           <View
  //             style={{
  //               flex: 1,
  //               backgroundColor: 'rgba(0, 0, 0, 0.5)',
  //               width: 500,
  //               alignItems: 'center',
  //             }}>
  //             <Text style={styles.rectangleText}>
  //                           Put the QR code in the box and it will scan automatically
  //             </Text>
  //           </View>
  //         </RNCamera>

  //           {
  //               this.state.barcodeData !== "" ? (
  //                   <>
  //                       {this.props.navigation.navigate("Stock", {barcodeNo : this.state.barcodeData})}
  //                   </>
  //               ) : (
  //                   <>
  //                   </>
  //               )
  //           }




  //         {/* <View style={styles.topButtons}>
  //           <TouchableOpacity onPress={this.flipCamera} style={styles.flipButton}>
  //             <Icon name="refresh" size={35} color="orange" />
  //           </TouchableOpacity>
  //         </View>
  //         <View style={styles.bottomButtons}>
  //           <TouchableOpacity onPress={this.takePhoto} style={styles.recordingButton}>
  //             <Icon name="camera" size={50} color="orange" />
  //           </TouchableOpacity>
  //         </View> */}
  //       </View>
  //     );
  //   }
  // }
  
  // export default BarcodeScanner;
