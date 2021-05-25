import React from 'react';
import { Form, Item, Label, Input, Left, Body, Title, Right, Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Spinner, Picker, Drawer, ActivityIndicator, DatePicker } from 'native-base';
import { DataTable } from 'react-native-paper';
import axios from 'axios';
import LoginInfo from '../common/LoginInfo';
import ServerInfo from '../common/ServerInfo';

function MoveScreen ({navigation, route}) {
  const itemsPerPage = 5;
  const [page, setPage] = React.useState(0);
  const from = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;

  const [wareHouseInList, setWareHouseInList] = React.useState([]); 
  const [whInCode, setWhInCode] = React.useState('');

  const [wareHouseOutList, setWareHouseOutList] = React.useState([]); 
  const [whOutCode, setWhOutCode] = React.useState('');

  const [lotNo, setLotNo] = React.useState('');
  const [lotList, setLotList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {    
    let url = ServerInfo.serverURL + '/api/getWarehouseList/';
    url += LoginInfo.fac_cd + '/\'\'/5';
    axios.get(url)
    .then( response => {   
        setWareHouseInList(response.data);
    })
    .catch ( error => {
      alert("창고에러 : " + error.message);
    });

    url = ServerInfo.serverURL + '/api/getWarehouseList/';
    url += LoginInfo.fac_cd + '/\'\'/5';
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
    scanData();
  }, [route])

  const scanData = () => {
    let url = ServerInfo.serverURL + '/api/scanMoveList/';
    url += LoginInfo.fac_cd + '/';
    url += lotNo + '/' + whOutCode + '/2/\'\'';
    
    axios.get(url)
    .then( response => {   
        setLotList(response.data);
    })
    .catch ( error => {
      alert("창고에러 : " + error.message);
    });
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
                <Form style = {{flex : 1, flexDirection: "row"}}>
                    <Form style = {{flex : 1, flexDirection: "column"}}>
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
                    </Form>
                    <Form style = {{flex : 1, flexDirection: "column"}}>
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
                    </Form>                    
                </Form>
                <Form style = {{flex : 1, flexDirection: "row"}}>
                    <Item stackedLabel style = {{flex : 1, marginLeft : 20, marginRight : 20}}>
                        <Label>LOTNO</Label>
                        <Input 
                            value = {lotNo}
                            onChangeText = {value => setLotNo(value)} 
                        />
                    </Item>  
                        <Button bordered>
                            <Icon name = 'camera' 
                                onPress = {() => navigation.navigate("BarcodeScanner", {flag : 'M'})}/>
                        </Button> 
                </Form>

                <DataTable style = {{marginTop:20}}>
                    <DataTable.Header>
                        <DataTable.Title>LOTNO</DataTable.Title>
                        <DataTable.Title numeric>박스순번</DataTable.Title>
                        <DataTable.Title numeric>재고</DataTable.Title>
                        <DataTable.Title numeric>이동수량</DataTable.Title>
                    </DataTable.Header>

                    {isLoading ? (
                        <ActivityIndicator size = {'large'} /> 
                    ) : (
                        lotList.map(item => (
                        <DataTable.Row key = {item.mng_no, item.box_sq}>
                            <DataTable.Cell>{item.mng_no}</DataTable.Cell>
                            <DataTable.Cell numeric>{item.box_sq}</DataTable.Cell>
                            <DataTable.Cell numeric>{item.end_qty}</DataTable.Cell>
                            <DataTable.Cell numeric>{item.end_qty}</DataTable.Cell>
                        </DataTable.Row>
                        ))                   
                    )
                    }

                    {/* <DataTable.Pagination
                        page={page}
                        numberOfPages={Math.floor(lotList.length / itemsPerPage)}
                        onPageChange={page => setPage(page)}
                        label={`${from + 1}-${to} of ${lotList.length}`}
                    />   */}
                </DataTable>

                <Button block style = {{marginTop:20, marginLeft : 10, marginRight : 10}}
                    onPress = {save}
                >
                    <Text>등록</Text>
                </Button>
            </Content>
        </Container>
    )
};

export default MoveScreen;