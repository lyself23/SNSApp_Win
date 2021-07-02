import React from 'react';
//import { Form, Item, Label, Input, Left, Body, Title, Right, Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Spinner, Picker, Drawer, ActivityIndicator, DatePicker } from 'native-base';
import {
  Select,
  VStack,
  HamburgerIcon,
  ArrowBackIcon,
  Pressable,
  Heading,
  Center,
  HStack,
  CheckIcon,
  Input,
  useColorModeValue,
  Button,
  Icon,
  Box,
  Text,
  FlatList,
  NativeBaseProvider
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import LoginInfo from '../../common/LoginInfo';
import ServerInfo from '../../common/ServerInfo';
import SearchListBox from './SearchListBox';
import SearchListHeader from './SearchListHeader';

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
    let url = ServerInfo.serverURL + '/api/searchStock/2021-06/';
    url += LoginInfo.co_cd + '/' + LoginInfo.fac_cd + '/';
    url += whCode + '/\'\'/\'\'/\'\'/\'\'/\'\'/\'\'/\'\'/\'\'/\'\'/\'\'/'
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
    <>
      <Box  backgroundColor='#057DD7' p = {2} pb = {3}>      
        <HStack alignItems="center" mt={2}>
            <Pressable onPress={() => navigation.goBack()} margin={2} zIndex={1}>
                <ArrowBackIcon ml={2} size="sm" color = 'white'/>
            </Pressable>
            <Center flex={1} >
                <Heading size="md" color = 'white'>재고 조회</Heading>
            </Center>
            <Pressable onPress={() => navigation.toggleDrawer()} margin={2} zIndex={1}>
                <HamburgerIcon mr={2} size="sm" color = 'white'/>
            </Pressable>
        </HStack>
      </Box>
      
      <Center py = {3} mt = {2} bg = 'gray.50'>
        <VStack w = "90%">    
          <Text alignItems = 'flex-start'>조회조건</Text>      
          <Select m = {1}
            InputLeftElement={<Text m = {3}>창고</Text>}
            selectedValue={undefined}
            accessibilityLabel="창고 선택"
            placeholder="창고 선택"
            onValueChange = {value => setWhCode(value)}
            _selectedItem={{
              bg: "cyan.600",
              endIcon: <CheckIcon size={4} />,
            }}
          >
            {(wareHouseList.length > 0 ? (
                  wareHouseList.map(item => (
                    <Select.Item key = {item.wh_cd} label={item.wh_nm} value={item.wh_cd} />
                  ))
                ) : (
                  <></> 
                ))}
          </Select>
          <Input m = {1}        
            placeholder="LOTNO"
            placeholderTextColor={useColorModeValue("blueGray.400", "blueGray.50")}
            value = {lotNo}
            onChangeText = {value => setLotNo(value)} 
            returnKeyType = 'none'
            autoCapitalize = 'characters'   
            keyboardType = 'email-address'   
            bg="#fff"
                    borderRadius={4}
                    py={3}
                    px={1}
                    fontSize={14}
                    _web={{
                        _focus: { borderColor: 'muted.300', style: { boxShadow: 'none' } },
                        }}
                        InputLeftElement={<Text m = {3}>LOTNO</Text>}
                        InputRightElement={<Icon size='sm'  m = {1} size={6} 
                                            color="gray.400" as={<MaterialCommunityIcons name="camera" 
                                            onPress = {() => navigation.navigate("BarcodeScanner", {screenName : 'Stock', ismultiScan : false})}/>} />}
          />  
          {isLoading ? (
            <Button isLoading m = {1}>
              Button</Button>
          ) : (
            <Button m = {1}
                onPress = {search}
              >
                  조회
                </Button>
          )}          
        </VStack>        
      </Center>
      <Box border = {1} borderColor = 'gray.300'/>
      <Box mt = {3} p = {2} border={2} borderBottomColor='gray.300' bg = 'white' borderBottomWidth={2} borderTopWidth = {0} borderLeftWidth = {0} borderRightWidth = {0}>검색결과</Box>

      <FlatList flex = {1} bg={useColorModeValue("gray.50", "gray.700")}
          data = {lotList}
          renderItem = {(item, index) => {
              return <SearchListBox data = {item} />;
          }}
        // ListHeaderComponent = {SearchListHeader}
        //  removeClippedSubviews = {false}
        //  stickyHeaderIndices = {[0]}
          keyExtractor = {(item, index) => index.toString()}
      //   ItemSeparatorComponent = {() => {<View style = {{height:1, backgroundColor: 'black'}}></View>}}
      />
    </> 
  );
}

export default SearchStockScreen;