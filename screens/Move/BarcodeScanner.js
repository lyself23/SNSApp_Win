import {RNCamera} from 'react-native-camera';
import React, {useEffect, useRef} from 'react';
import LoginInfo from '../../common/LoginInfo';
import ServerInfo from '../../common/ServerInfo';
import axios from 'axios';
import {
  StyleSheet,
  Animated,
  PermissionsAndroid,
  default as Easing,
  ImageBackground,
  View,
  Text,
} from 'react-native';
import {  useToast, Button } from 'native-base';
 
let camera;
let lotList = [];

function getLotData(cameraData, warehousecode) {
  if(cameraData === '') {
      alert('LOTNO를 스캔해주세요');
  } else {
    let url = ServerInfo.serverURL + '/api/scanMoveList/';
    url += LoginInfo.fac_cd + '/';
    url += cameraData + '/' + warehousecode + '/2/\'\'';
    
    axios.get(url)
    .then( response => {
        if(response.data.name === 'ERROR') {
            alert(response.data.message);
        } else {                        
          lotList.push(response.data)   
          console.log('1. lotList', lotList);
        }          
    })
    .catch ( error => {
      alert("창고에러 : " + error.message);
    });
  }
}

function BarcodeScanner({navigation, route}) {
  const toast = useToast();
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
    //하나의 코드만 스캔할 경우는 이전 화면으로 이동
     if(route.params.ismultiScan === false) {
      navigation.navigate({
        name: route.params.screenName,
        params: { barcodeNo: data },
        merge: true,
      })
    } else {  
      let url = ServerInfo.serverURL + '/api/scanMoveList/';
      url += LoginInfo.fac_cd + '/';
      url += result.data + '/' + route.params.whCode + '/2/\'\'';
      axios.get(url)
      .then( response => {
          if(response.data.name === 'ERROR') {
              alert(response.data.message);
          } else {       
              const {data} = result;
              console.log('길이 : ', lotList.length)
              if(lotList.length <= 0) {
                lotList.push(response.data[0])   
                toast.show({title: data,  placement: "top",})
                // console.log('1. lotList', lotList);
              } else {
                console.log('data : ', data);
                let arrIndex = lotList.findIndex(ele => ele.mng_no === data)
                // console.log('arrIndex : ', arrIndex);
                if(arrIndex === -1) {
                  // console.log('ele.mng_no : ', ele.mng_no)
                  // console.log('data : ', data)
                  lotList.push(response.data[0])   
                  toast.show({title: data,  placement: "top",})
                  // console.log('2. lotList', lotList);
                }
              }
        }
      })          
      .catch ( error => {
        alert("창고에러 : " + error.message);
      });   
    }

    // console.log('onBarcodeRead', result);
    // const {data} = result; //Just get data
    // // setBarcode(data)
    // console.log('data', data)
    // //Operation after scanning the code
    // //하나의 코드만 스캔할 경우는 이전 화면으로 이동
    // if(route.params.ismultiScan === false) {
    //   navigation.navigate({
    //     name: route.params.screenName,
    //     params: { barcodeNo: data },
    //     merge: true,
    //   })
    // } else {     
    //   // let test = lotList.some(ele => {
    //   //   console.log('ele.mng_no', ele.mng_no)
    //   //   console.log('result.data', result.data)
    //   //   return ele.mng_no === result.data
    //   // })
    

    //   // console.log('test', test)
    //   // getLotData(data);

    //   // if(!test) {        
    //   //   setLotList(lotList.concat(scanData));     
    //   // }
     
    //   // console.log('lotList 2', lotList.length)
    //   // if(lotList.findIndex(obj => obj.mng_no == data) === -1) {
    //   //   console.log('진입');
    //   //   getLotData(data);
    //   //   setLotList(lotList.concat(scanData));     
    //   //   toast.show({title: data,  placement: "top",})
    //   // }
    // }
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
       // barCodeTypes={barCodeTypes}    
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
          <Text style={styles.rectangleText}>바코드를 스캔해주세요</Text>
          <Button size = "xs" 
            colorScheme="danger" 
            onPress={() => navigation.navigate({
            name: route.params.screenName,
            params: { barcodeNo: lotList },
            merge: true,})}
          >
           닫기
          </Button>
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




