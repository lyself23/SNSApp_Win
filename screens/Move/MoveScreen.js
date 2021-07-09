import React from 'react';
 import { SafeAreaView, View, StyleSheet, StatusBar } from 'react-native';
import {  
  Select,  VStack,  HamburgerIcon,  ArrowBackIcon,  Pressable,  Heading,
  Center,  HStack,  CheckIcon,  Input,  Text,  useColorModeValue,  Button,
  Icon,  Box,  FlatList,  NativeBaseProvider, AlertDialog, PresenceTransition} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import LoginInfo from '../../common/LoginInfo';
import ServerInfo from '../../common/ServerInfo';
import MoveListBox from './MoveListBox';
import MoveListHeader from './MoveListHeader';
import CameraScanner from './CameraScanner'

function AlertDialogComponent() {
    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef();
    const onDelete = () => {      
            alert('test');
            setIsOpen(false);        
    }
    return (
      <Center>
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}
          motionPreset={"fade"}
        >
          <AlertDialog.Content>
            <AlertDialog.Header fontSize="lg" fontWeight="bold">
              전체 삭제
            </AlertDialog.Header>
            <AlertDialog.Body>
              스캔한 내역을 전부 삭제하시겠습니까?
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button ref={cancelRef} onPress={onClose}>
                취소
              </Button>
              <Button colorScheme="red" onPress={onDelete} ml={3}>
                삭제
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
        <Button size = "xs" colorScheme="danger" onPress={() => setIsOpen(!isOpen)}>
          전체 삭제
        </Button>
      </Center>
    );
  }



function MoveScreen ({navigation, route}) {
  const [wareHouseInList, setWareHouseInList] = React.useState([]); 
  const [whInCode, setWhInCode] = React.useState('');

  const [wareHouseOutList, setWareHouseOutList] = React.useState([]); 
  const [whOutCode, setWhOutCode] = React.useState('');

  const [lotNo, setLotNo] = React.useState('');
  const [lotList, setLotList] = React.useState([]);
  const [scanData, setScanData] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isCameraOpen, setIsCameraOpen] = React.useState(false)

  const deleteItem = index => {
      const arr = [...lotList];
      arr.splice(index, 1);
      setLotList(arr);
  }

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
    setScanData(route.params.barcodeNo);
  }, [route])

React.useEffect(() => {
    setLotList(lotList.concat(scanData));
}, [scanData])

  const getLotData = (e) => {
      if(e.nativeEvent.key === "Enter") {
          if(lotNo === '') {
              alert('LOTNO를 스캔해주세요');
          } else {
            let url = ServerInfo.serverURL + '/api/scanMoveList/';
            url += LoginInfo.fac_cd + '/';
            url += lotNo + '/' + whOutCode + '/2/\'\'';
            
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
  }

  const save = () => {
    let url = ServerInfo.serverURL + '/api/MoveLotNo';    
    let formdata = new FormData();
    formdata.append('data', JSON.stringify(object));

     params.append()
    console.log(url);
    axios.post(url, formdata)
      .then( response => {
        console.log(response);
      })
      .catch ( error => {
        console.log(error.message);
      });
  };

  const onPress = () => {
    navigation.navigate("BarcodeScanner", {screenName : 'Move', ismultiScan : true, whCode : whOutCode})
  }

    return (
        <>
            <Box  backgroundColor='#057DD7' p = {2} pb = {3}> 
                <HStack alignItems="center" mt={2}>
                    <Pressable onPress={() => navigation.goBack()} margin={2} zIndex={1}>
                        <ArrowBackIcon ml={2} size="sm" color = 'white'/>
                    </Pressable>
                    <Center flex={1} >
                        <Heading size="md" color = 'white'>창고 이동</Heading>
                    </Center>
                    <Pressable onPress={() => navigation.toggleDrawer()} margin={2} zIndex={1}>
                        <HamburgerIcon mr={2} size="sm" color = 'white'/>
                    </Pressable>
                </HStack>  
            </Box>
            <Center py = {2} bg = 'gray.50'>
                <VStack w = "90%">     
                    <Text fontSize = "sm" alignItems = 'flex-start'>조회조건</Text>                 
                    <Select m = {1} size = "sm"
                        InputLeftElement={<Text fontSize = "sm" m = {3}>출고창고</Text>}
                        selectedValue={undefined}
                        accessibilityLabel="창고 선택"
                        placeholder="출고창고"
                        onValueChange = {value => setWhOutCode(value)}
                        //value = {whOutCode}
                        _selectedItem={{
                        bg: "cyan.600",
                        endIcon: <CheckIcon size={4} />,
                        }}
                    >

                        {(wareHouseOutList.length > 0 ? (
                            wareHouseOutList.map(item => (
                                <Select.Item key = {item.wh_cd} label={item.wh_nm} value={item.wh_cd} />
                            ))
                            ) : (
                            <></> 
                            ))}
                    </Select>
                    <Select m = {1} size = "sm"
                        InputLeftElement={<Text fontSize = "sm" m = {3}>입고창고</Text>}
                        selectedValue={undefined}
                        accessibilityLabel="창고 선택"
                       // value = {whInCode}
                        onValueChange = {value => setWhInCode(value)}
                        _selectedItem={{
                        bg: "cyan.600",
                        endIcon: <CheckIcon size={4} />,
                        }}
                    >

                        {(wareHouseInList.length > 0 ? (
                            wareHouseInList.map(item => (
                                <Select.Item key = {item.wh_cd} label={item.wh_nm} value={item.wh_cd} />
                            ))
                            ) : (
                            <></> 
                            ))}
                    </Select>
                    <Input  m = {1} size = "sm"
                    value = {lotNo}
                    onChangeText = {value => setLotNo(value)} 
                    returnKeyType = 'none'
                    onKeyPress = {getLotData}        
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
                        InputLeftElement={<Text fontSize = "sm" m = {3}>LOTNO</Text>}
                        InputRightElement={<Icon size='md' mr = {3}
                                            color="gray.400" 
                                            as={<MaterialIcons 
                                                  name="camera-alt" 
                                                  onPress = {onPress}
                                                />} 
                                          />}
                    />
                    <PresenceTransition
                      visible={isCameraOpen}
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                        transition: {
                          duration: 250,
                        },
                      }}
                    >
                       <CameraScanner p = "40px" m = {1}/>
                    </PresenceTransition>
                   
                </VStack>                
            </Center>
            
            <Box border = {1} borderColor = 'gray.300'/>
            <Box mt = {3} 
                 p = {2} 
                 border={2} 
                 borderBottomColor='gray.300' 
                 bg = 'white' borderBottomWidth={2} borderTopWidth = {0} borderLeftWidth = {0} borderRightWidth = {0}
            >
                <HStack>
                    <Text fontSize = "sm">스캔 개수 : {lotList.length}    </Text>
                    <AlertDialogComponent />
                </HStack>
            </Box>
            <FlatList flex = {1} bg={useColorModeValue("gray.50", "gray.700")}
                   data = {lotList}
                   renderItem = {(item, index) => {
                        return <MoveListBox data = {item} handleDelete = {() => deleteItem(index)} />; 
                   }}
                   keyExtractor = {(item, index) => index.toString()}
                />  
             {isLoading ? (
                <Button isLoading  m = {1}>
                Button</Button>
            ) : (
                <Button  m = {1}
                    //onPress = {search}
                >
                    등록
                    </Button>
            )}       
        </>      
    )
};

export default MoveScreen;