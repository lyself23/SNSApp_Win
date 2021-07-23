import React from 'react';
import {  StyleSheet,  View } from 'react-native';
import { Modal } from "native-base"
import {RNCamera} from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';

let camera;

function CameraScanner(props) {
  return (
    <Modal isOpen = {props.isOpen} onClose = { props.onClose} >
        <Modal.Content maxWidth = "400px">
          <Modal.CloseButton />
          <Modal.Header>스캔해주세요</Modal.Header>
          <Modal.Body>
           <View style={styles.container}>      
              <RNCamera
              ref={(ref) => {
                camera = ref;
              }}
              autoFocus={RNCamera.Constants.AutoFocus.on} 
              style={styles.scanner}    
              type={RNCamera.Constants.Type.back} 
              flashMode={RNCamera.Constants.FlashMode.off} 
              onBarCodeRead={props.onBarCodeRead}
              >
                <BarcodeMask 
                    maskOpacity={0.5}
                    width={'90%'}
                    height={100}
                    showAnimatedLine={true}         
                />        
              </RNCamera>
            </View>
          </Modal.Body>
          <Modal.Footer />
        </Modal.Content>
      </Modal>
         
    
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  scanner: {
    flex: 1,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    height: 150,
  },
});
 
export default CameraScanner;