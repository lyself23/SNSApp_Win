import React from 'react';
import { Form, Item, Label, Input, Left, Body, Title, Right, Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Spinner, Picker, Drawer, ActivityIndicator, DatePicker } from 'native-base';
import { DataTable } from 'react-native-paper';
import axios from 'axios';
import LoginInfo from '../common/LoginInfo';
import ServerInfo from '../common/ServerInfo';

function SearchStockScreen({navigation, route}) {
  const itemsPerPage = 5;
  const [page, setPage] = React.useState(0);
  const from = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;

  const [wareHouseList, setWareHouseList] = React.useState([]); 
  const [whCode, setWhCode] = React.useState('');
  const [lotNo, setLotNo] = React.useState('');
  const [lotList, setLotList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    let url = ServerInfo.serverURL + '/api/getWarehouseList/';
    url += LoginInfo.fac_cd + '/\'\'/5';
    
    axios.get(url)
    .then( response => {   
      setWareHouseList(response.data);
    })
    .catch ( error => {
      alert("창고에러 : " + error.message);
    });
   }, []);

  //route가 변경될 때마다 실행
  React.useEffect(() => {
    setLotNo(route.params.barcodeNo);    
  }, [route])

  const search = () => {
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
            <Title>재고 조회</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='menu' 
                onPress = {() => navigation.openDrawer()}/>
            </Button>
          </Right>
        </Header>
      <Content style = {{flex : 1}}>     
        <Form style = {{flex : 1, flexDirection: "row", justifyContent: 'space-between', marginLeft : 20, marginRight : 20}}>
          {/* <Item style = {{flex : 1}} >
            <DatePicker
              defaultDate={new Date(2018, 4, 4)}          
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="날짜"
              textStyle={{ color: "green" }}
              placeHolderTextStyle={{ color: "#d3d3d3" }}
            // onDateChange={this.setDate}
              disabled={false}
              />
          </Item> */}
          <Item picker style = {{flex : 1}}>          
              <Picker
                mode="dropdown"
                style={{ width: undefined }}
                placeholder="창고"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={undefined}
                value = {whCode}
                onValueChange = {value => setWhCode(value)}
              >
                {(wareHouseList.length > 0 ? (
                  wareHouseList.map(item => (
                    <Picker.Item key = {item.wh_cd} label={item.wh_nm} value={item.wh_cd} />
                  ))
                ) : (
                  <></> 
                ))}
              </Picker>
          </Item>            
         
        </Form>
        <Form style = {{flex : 1, flexDirection: "row", justifyContent: 'space-between'}}>
          <Item stackedLabel style = {{flex : 1, marginLeft : 20, marginRight : 20}}>
            <Label>LOTNO</Label>
            <Input 
              value = {lotNo}
              onChangeText = {value => setLotNo(value)} 
            />
          </Item>  
          <Button bordered>
              <Icon name = 'camera' 
                onPress = {() => navigation.navigate("BarcodeScanner", {flag : 'S'})}/>
          </Button> 
        </Form>
        <Form>
          
          <Button block style = {{marginTop:20, marginLeft : 10, marginRight : 10}}
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
              <DataTable.Row key = {item.mng_no, item.box_sq}>
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