import React from 'react';
import { Item, Label, Input, Left, Body, Title, Right, Container, Header, Content, Button, Icon, Picker} from 'native-base';
 import { DataTable, IconButton} from 'react-native-paper';
import axios from 'axios';
import LoginInfo from '../common/LoginInfo';
import ServerInfo from '../common/ServerInfo';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import MoveListBox from './MoveListBox';
import MoveListHeader from './MoveListHeader';

function MoveScreen ({navigation, route}) {
  const [wareHouseInList, setWareHouseInList] = React.useState([]); 
  const [whInCode, setWhInCode] = React.useState('');

  const [wareHouseOutList, setWareHouseOutList] = React.useState([]); 
  const [whOutCode, setWhOutCode] = React.useState('');

  const [lotNo, setLotNo] = React.useState('');
  const [lotList, setLotList] = React.useState([]);
  const [scanData, setScanData] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);

  const deleteItem = index => {
      const arr = [...lotList];
      arr.splice(index, 1);
      setLotList(arr);
  }



  React.useEffect(() => {    
    let url = ServerInfo.serverURL + '/api/getWarehouseList/';
    url += LoginInfo.fac_cd + '/\'\'/4';
    axios.get(url)
    .then( response => {   
        setWareHouseInList(response.data);
    })
    .catch ( error => {
      alert("창고에러 : " + error.message);
    });

    url = ServerInfo.serverURL + '/api/getWarehouseList/';
    url += LoginInfo.fac_cd + '/\'\'/3';
    axios.get(url)
    .then( response => {   
        setWareHouseOutList(response.data);
    })
    .catch ( error => {
      alert("창고에러 : " + error.message);
    });
   }, []);

  //route가 변경될 때마다 실행
  React.useEffect(() => {
    setLotNo(route.params.barcodeNo);  
  }, [route])

React.useEffect(() => {
    setLotList(lotList.concat(scanData));
}, [scanData])

  const getLotData = (e) => {
      if(e.nativeEvent.key === "Enter") {
        let url = ServerInfo.serverURL + '/api/scanMoveList/';
        url += LoginInfo.fac_cd + '/';
        url += lotNo + '/' + whOutCode + '/2/\'\'';
        
        console.log(url);
        axios.get(url)
        .then( response => {
            if(response.data.name === 'ERROR') {
                alert(response.data.message);
            } else {                 
                setScanData(response.data);        
            }
            setLotNo('');
        })
        .catch ( error => {
          alert("창고에러 : " + error.message);
        });
      }
  }

  const save = () => {
    let url = ServerInfo.serverURL + '/api/searchStock/2021-05/';
    url += LoginInfo.co_cd + '/' + LoginInfo.fac_cd + '/';
    url += whCode + '/%20/\'\'/\'\'/\'\'/\'\'/\'\'/\'\'/\'\'/\'\'/\'\'/'
    url += lotNo + '/\'\'/\'\'';
    // setIsLoading( true );
    console.log(url);
    axios.get(url)
      .then( response => {
        setIsLoading( false );

        if(response.data.length === 0) {
          alert("조회된 내용이 없습니다");
        }  
        // alert(lotList[1].box_sq)      
        setLotList(response.data);
      })
      .catch ( error => {
        alert(error.message);
      });
  };


    return (
        <Container>
            <Header>
                <Left>
                    <Button transparent>
                    <Icon name='arrow-back' 
                        onPress = {() => navigation.goBack()}/>
                    </Button>
                </Left>
                <Body>
                    <Title>창고 이동</Title>
                </Body>
                <Right>
                    <Button transparent>
                    <Icon name='menu' 
                        onPress = {() => navigation.openDrawer()}/>
                    </Button>
                </Right>
            </Header>
            <Content>
                <View style = {{flex : 1, flexDirection: "row"}}>
                    <View style = {{flex : 1, flexDirection: "column"}}>
                        <Text>출고창고</Text>
                        <Picker
                            mode="dropdown"
                            style={{ width: undefined }}
                            placeholder="출고창고"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={undefined}
                            value = {whOutCode}
                            onValueChange = {value => setWhOutCode(value)}
                        >       
                        {(wareHouseOutList.length > 0 ? (
                            wareHouseOutList.map(item => (
                                <Picker.Item key = {item.wh_cd} label={item.wh_nm} value={item.wh_cd} />
                            ))
                            ) : (
                            <></> 
                            ))}                
                        </Picker>
                    </View>
                    <View style = {{flex : 1, flexDirection: "column"}}>
                        <Text>입고창고</Text>
                        <Picker
                            mode="dropdown"
                            style={{ width: undefined }}
                            placeholder="입고창고"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={undefined}
                            value = {whInCode}
                            onValueChange = {value => setWhInCode(value)}
                        >       
                        {(wareHouseInList.length > 0 ? (
                            wareHouseInList.map(item => (
                                <Picker.Item key = {item.wh_cd} label={item.wh_nm} value={item.wh_cd} />
                            ))
                            ) : (
                            <></> 
                            ))}                       
                        </Picker>
                    </View>                    
                </View>
                <View style = {{flex : 1, flexDirection: "row"}}>
                    <Item stackedLabel style = {{flex : 1, marginLeft : 20, marginRight : 20}}>
                        <Label>LOTNO</Label>
                        <Input
                            value = {lotNo}
                            autoFocus = {true}
                            autoCapitalize = 'characters'
                            keyboardType = 'email-address'
                            onChangeText = {value => setLotNo(value)} 
                            returnKeyType = 'none'
                            onKeyPress = {getLotData}                            
                        />
                    </Item>  
                        <Button bordered>
                            <Icon name = 'camera' 
                                onPress = {() => navigation.navigate("BarcodeScanner", {screenName : 'Move', ismultiScan : false})}/>
                        </Button> 
                </View>              
            </Content>

            <FlatList
                   data = {lotList}
                   renderItem = {(item, index) => {
                       return <MoveListBox data = {item} handleDelete = {() => deleteItem(index)} />;
                   }}
                //    ListHeaderComponent = {() => {
                //        return <MoveListHeader />
                //    }}
                 //  removeClippedSubviews = {false}
                 //  stickyHeaderIndices = {[0]}
                   keyExtractor = {(item, index) => index.toString()}
                //   ItemSeparatorComponent = {() => {<View style = {{height:1, backgroundColor: 'black'}}></View>}}
                />

            <Button block style = {{marginTop:20, marginLeft : 10, marginRight : 10}}
                    onPress = {save}
            >
                <Text>등록</Text>
            </Button>
        </Container>
    )
};

export default MoveScreen;