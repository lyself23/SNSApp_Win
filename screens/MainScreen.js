import React, { Component } from 'react';
import { Left, Body, Title, Right, Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import LoginInfo from '../common/LoginInfo';


function MainScreen({navigation}) {
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent>
            <Icon 
              name="menu" 
              onPress = {() => navigation.openDrawer()}/>
          </Button>
        </Left>
        <Body>
          <Title>HEADER</Title>
        </Body>
        <Right>
          {/* <Button transparent onPress={() => this.props.navigation.goBack()}>
            <Icon name="menu" />
          </Button> */}
        </Right>
      </Header>
          
      <Content>
        <Button info
          onPress = { () => navigation.navigate("Stock", {barcodeNo : ""})}
        >
          <Text>재고조회</Text>
        </Button>    

        <Button info
          onPress = { () => navigation.navigate("Move", {barcodeNo : ""})}
        >
          <Text>창고이동</Text>
        </Button>    
        <Text>{LoginInfo.fac_cd + "," + LoginInfo.co_cd}</Text>
      </Content>
      <Footer>
        <FooterTab>
          <Button vertical>
            <Icon name="apps"/>
            <Text>Apps</Text>
          </Button>
          <Button vertical>
            <Icon name="camera" />
            <Text>Camera</Text>
          </Button>
          <Button vertical active>
            <Icon active name="navigate" />
            <Text>Navigate</Text>
          </Button>
          <Button vertical>
            <Icon name="person" />
            <Text>Contact</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}

export default MainScreen;

// export default class MainScreen extends Component {
//     // scanBarcode = () => {

//     //     var that = this;
//     //     //To Start Scanning
//     //     if (Platform.OS === 'android') {
//     //         async function requestCameraPermission() {
//     //             try {
//     //                 const granted = await PermissionsAndroid.request(
//     //                     PermissionsAndroid.PERMISSIONS.CAMERA, {
//     //                     'title': '카메라 권한 요청',
//     //                     'message': '바코드를 스캔하기 위해 카메라 권한을 허용해주세요.'
//     //                 }
//     //                 )
//     //                 if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//     //                     //If CAMERA Permission is granted

//     //                     //TODO BarcodeScanner.js를 호출하세요 
//     //                     //this가 아니라 that을 사용해야 함 
//     //                     that.props.navigation.navigate('BarcodeScanner', { onGetBarcode: that.onGetBarcode })
//     //                 } else {
//     //                     alert("카메라 권한을 받지 못했습니다.");
//     //                 }
//     //             } catch (err) {
//     //                 alert("카메라 권한 오류: ", err);
//     //                 console.warn(err);
//     //             }
//     //         }
//     //         //Calling the camera permission function
//     //         requestCameraPermission();
//     //     } else {
//     //         that.props.navigation.navigate('BarcodeScanner', { onGetBarcode: that.onGetBarcode })
//     //     }
//     // }

//     // onGetBarcode = (barcodeValue) => {
//     //     console.log("barcode value: ", barcodeValue);
//     //     //아래 함수의 파라미터로 문자열만 넘길 수 있음. barcodeValue가 문자열처럼 보이지만 문자열이 아닌 듯. String()는 작동하지 않음. JSON.stringify()는 작동함 
//     //     Alert.alert("barcode value: ", barcodeValue);
//     // };


//   render() {
//     return (
//       <Container>
//         <Header>
//           <Left>
//             <Button transparent onPress={() => this.props.navigation.goBack()}>
//               <Icon name="menu" />
//             </Button>
//           </Left>
//           <Body>
//             <Title>Header</Title>
//           </Body>
//           <Right>
//             {/* <Button transparent onPress={() => this.props.navigation.goBack()}>
//               <Icon name="menu" />
//             </Button> */}
//           </Right>
//         </Header>
            
//         <Content>
//           <Button info
//             onPress = { () => this.props.navigation.navigate("Stock")}
//           >
//             <Text>재고조회</Text>
//           </Button>

//           <Button info
//             onPress = {() => this.props.navigation.navigate("BarcodeScanner")}>
//             <Text>바코드 스캔 : {alert(this.props.barcodeNo)}</Text>
//           </Button>


         
//         </Content>
//         <Footer>
//           <FooterTab>
//             <Button vertical>
//               <Icon name="apps"/>
//               <Text>Apps</Text>
//             </Button>
//             <Button vertical>
//               <Icon name="camera" />
//               <Text>Camera</Text>
//             </Button>
//             <Button vertical active>
//               <Icon active name="navigate" />
//               <Text>Navigate</Text>
//             </Button>
//             <Button vertical>
//               <Icon name="person" />
//               <Text>Contact</Text>
//             </Button>
//           </FooterTab>
//         </Footer>
//       </Container>
//     );
//   }
// }