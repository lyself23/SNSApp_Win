import * as React from 'react';
// import { View, Text, Button, ActivityIndicator } from 'react-native';
import { Form, Item, Label, Input, Left, Body, Title, Right, Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Spinner } from 'native-base';
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
  const [lotNo, setLotNo] = React.useState('');
  const [lotList, setLotList] = React.useState([null]);
  //const [lists, setLists] = React.useState([]);

  const search = React.useCallback ( () => {
    let url = 'http://210.101.190.140:8080/api/searchStock/';
    url += '21E11UU-009/01S200';
   // url += lotNo + '/';
    axios.get(url)
      .then( response => {
        setLotList(response.data);
        //  alert(lotList[1].box_sq)
      })
      .catch ( error => {
        alert(error.message);
      });

    // setLists([
    //   {
    //   "itm_id": 2712,
    //   "mng_no": "I21E11-013",
    //   "sum_mon": "2021-05",
    //   "wh_cd": "01S100",
    //   "fac_cd": "01",
    //   "in_qty": 25177,
    //   "out_qty": 25177,
    //   "bas_qty": null,
    //   "mid": 11,
    //   "mdt": "2021-05-11T10:19:16.343Z"
    //   },
    //   {
    //     "itm_id": 3333,
    //     "mng_no": "I21E11-013",
    //     "sum_mon": "2021-05",
    //     "wh_cd": "01S100",
    //     "fac_cd": "01",
    //     "in_qty": 3,
    //     "out_qty": 11,
    //     "bas_qty": null,
    //     "mid": 11,
    //     "mdt": "2021-05-11T10:19:16.343Z"
    //     }
    // ]);

    
  }, [lotList])

  //useCallback은 변경이 됐을 때만 실행됨
  const scanLotNo = React.useCallback(() => {
    navigation.navigate("BarcodeScanner");  
    this.setst
  },[lotNo]);

  const changeLotNo = React.useCallback( (e) => {
    setLotNo(e.target.value);
  },[lotNo])

  const changeScanLotNo = React.useCallback(() => {
    setLotNo(route.params.barcodeNo);
  },[lotNo])

  return (
    <Container>
      <Content style = {{flex : 1}}>
      <Header span>
          <Left>
            <Button transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Header Span</Title>
          </Body>
          <Right />
        </Header>


        <Form style = {{flex : 1, flexDirection: "row", justifyContent: 'space-between'}}>
          <Item stackedLabel style = {{flex : 1}}>
              <Label>창고</Label>
              <Input />
          </Item>    
          <Item stackedLabel style = {{flex : 1}}>
              <Label>LOTNO</Label>
              <Input 
                value = {lotNo}
                onChangeText = {setLotNo}/>
                
          </Item>
          <Button 
              bordered
              onPress = {scanLotNo}>
              <Icon name = 'camera' />
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

          {/* { (lotList.length == 0) ? (
            <>
              <Spinner color = 'red'/>
            </>
          ) : (
            <>
              {lotList.map(item => (
                <DataTable.Row>
                  <DataTable.Cell>{item.mng_no}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.box_sq}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.end_qty}</DataTable.Cell>
                </DataTable.Row>
              ))}

                <DataTable.Pagination
                  page={page}
                  numberOfPages={Math.floor(lotList.length / itemsPerPage)}
                  onPageChange={page => setPage(page)}
                  label={`${from + 1}-${to} of ${lotList.length}`}
                />
            </>
          ) } */}
        </DataTable>
      </Content>
    </Container>
  );
}

export default SearchStockScreen;