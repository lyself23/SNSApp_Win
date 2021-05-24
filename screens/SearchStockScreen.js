import * as React from 'react';
// import { View, Text, Button, ActivityIndicator } from 'react-native';
import { Form, Item, Label, Input, Left, Body, Title, Right, Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Spinner, Picker, Drawer } from 'native-base';
// import { DataTable } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DataTable } from 'react-native-paper';
import axios from 'axios';
import { NavigationEvents } from 'react-navigation';

function SearchStockScreen({navigation, route}) {
  const itemsPerPage = 5;
  const [page, setPage] = React.useState(0);
  const from = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;

  const [wareHouseList, setWareHouseList] = React.useState([]); 
  const [lotNo, setLotNo] = React.useState('');
  const [lotList, setLotList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isCaptured, setIsCaptured] = React.useState(false);

 React.useEffect(() => {
    let url = 'http://203.228.186.44:8080/api/getWarehouseList/';
    url += '01/6/5';
    axios.get(url)
    .then( response => {   
      setWareHouseList(response.data);
      //  alert(wareHouseList.length)
    })
    .catch ( error => {
      alert("창고에러 : " + error.message);
    });
  }, []);

  const search = React.useCallback(() => {
    let url = 'http://203.228.186.44:8080/api/searchStock/2021-05/20/01/';
    url += '01S200/%20/\'\'/\'\'/\'\'/\'\'/\'\'/\'\'/\'\'/\'\'/\'\'/'
    url += lotNo + '/\'\'/\'\'';

    console.log(url);
    axios.get(url)
      .then( response => {
        setIsLoading( false );
        setLotList(response.data);
          // alert(lotList[1].box_sq)
      })
      .catch ( error => {
        alert(error.message);
      });
  }, [lotNo]);

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
            <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='menu' 
                onPress = {() => navigation.openDrawer()}/>
            </Button>
          </Right>
        </Header>
      <Content style = {{flex : 1}}>
        <Form style = {{flex : 1, flexDirection: "row", justifyContent: 'space-between'}}>
          <Item picker style = {{flex : 1}}>
              <Picker
                mode="dropdown"
                style={{ width: undefined }}
                placeholder="창고"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={undefined}
              >
                {(wareHouseList.length > 0 ? (
                  wareHouseList.map(item => (
                    <Picker.Item label={item.wh_nm} value={item.wh_cd} />
                  ))
                ) : (
                  <></> 
                ))}
              </Picker>
          </Item>  
          
          <Item stackedLabel style = {{flex : 1}}>
              <Label>LOTNO</Label>
              <Input 
                //value = {lotNo}
               // onChangeText = {value => setLotNo(value)}
                value = {(route.params.barcodeNo === "") ? lotNo : route.params.barcodeNo}
                onChangeText = {value => setLotNo(value)}
              />
          </Item>
          <Button bordered>
              <Icon name = 'camera' 
                onPress = {() => navigation.navigate("BarcodeScanner")}/>
          </Button> 
                   
        </Form>
        <Form>
          <Button full style = {{marginTop:20}}
            onPress = {search}
          >
            <Text>조회</Text>
          </Button>
        </Form>        
                   
        <DataTable style = {{marginTop:20}}>
          <DataTable.Header>
            <DataTable.Title>LOTNO</DataTable.Title>
            <DataTable.Title numeric>박스순번</DataTable.Title>
            <DataTable.Title numeric>재고</DataTable.Title>
          </DataTable.Header>

          {isLoading ? (
            <ActivityIndicator size = {'large'} /> 
          ) : (
            lotList.map(item => (
              <DataTable.Row>
                <DataTable.Cell>{item.mng_no}</DataTable.Cell>
                <DataTable.Cell numeric>{item.box_sq}</DataTable.Cell>
                <DataTable.Cell numeric>{item.end_qty}</DataTable.Cell>
              </DataTable.Row>
            ))                   
          )
          }

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.floor(lotList.length / itemsPerPage)}
            onPageChange={page => setPage(page)}
            label={`${from + 1}-${to} of ${lotList.length}`}
          />  
        </DataTable>
      </Content>
    </Container>
  );
}

export default SearchStockScreen;