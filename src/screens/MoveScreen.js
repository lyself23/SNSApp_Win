import React, {useState, useEffect, useRef} from 'react';
 import { SafeAreaView, View, StyleSheet, StatusBar, Modal } from 'react-native';
import {  VStack,  Center,   useColorModeValue,  Button, FlatList,  AlertDialog, HStack} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import fetch from '../service/fetch';
import getFormatDate from '../service/GetFormatDate';
import LoginInfo from '../common/LoginInfo';
import ServerInfo from '../common/ServerInfo';
import {InputSwipeListBox} from '../components/ListBox';
import SelectBox from '../components/SelectBox';
import {InputIcon} from '../components/Input';
import ScreenHeader from '../components/ScreenHeader';
import GroupTitle from '../components/GroupTitle';
import CameraScanner from '../components/CameraScanner';

const AlertDialogComponent= () => {
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = useRef();
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
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showCalander, setShowCalander] = useState(false);

  const [textDate, setTextDate] = useState(
    getFormatDate(date, "yyyy-MM-dd")
  );

  const [textLotNo, setTextLotNo] = useState('');

  const [wareHouseInList, setWareHouseInList] = useState([]); 
  const [whInCode, setWhInCode] = useState('');
  const [wareHouseOutList, setWareHouseOutList] = useState([]); 
  const [whOutCode, setWhOutCode] = useState('');

  const [lotList, setLotList] = useState([]);
  const [barcodeInfo, setBarcodeInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 
  const [showModal, setShowModal] = useState(false)

  const deleteItem = index => {
      const arr = [...lotList];
      arr.splice(index, 1);
      setLotList(arr);
  }

  useEffect(() => {    
    let url = ServerInfo.serverURL + '/api/getWarehouseList/';
    url += LoginInfo.fac_cd + '/\'\'/5';

    fetch(url)
      .then( data => {   
        setWareHouseOutList(data);
      })
      .catch ( error => {
        alert("창고에러 : " + error.message);
      });
    
    fetch(url)
      .then( data => {   
        setWareHouseInList(data);
      })
      .catch ( error => {
        alert("창고에러 : " + error.message);
      });
   }, []);

  const showCameraScanner = () => {
    setShowModal(true);
  }  

  const onBarCodeRead = (value) => {  
    if (whOutCode === '') {
      alert('출고창고를 선택해주세요');
    } else if (textDate === '') {
      alert('이동일자를 선택해주세요');
    } else {
      if(value.data !== null) {
        let url = ServerInfo.serverURL + '/api/scanMoveList/';
            url += LoginInfo.fac_cd + '/';
            url += value.data + '/' + whOutCode + '/2/' + textDate;

        fetch(url)
          .then( data => {   
            setBarcodeInfo(data);
          })
          .catch ( error => {
            alert("창고에러 : " + error.message);
          });
      }
    }
  }  

  const search = (e) => {
    if(e.nativeEvent.key === "Enter") {
      if(textLotNo === '') {
        alert('LOTNO를 스캔해주세요');
      } else if (whOutCode === '') {
        alert('출고창고를 선택해주세요');
      } else if (textDate === '') {
        alert('이동일자를 선택해주세요');
      } else {
        let url = ServerInfo.serverURL + '/api/scanMoveList/';
            url += LoginInfo.fac_cd + '/';
            url += textLotNo + '/' + whOutCode + '/2/\'\'';

        fetch(url)
          .then( data => {   
            if(data.length === 0) {
              alert("조회된 내용이 없습니다");
            } else {
              setBarcodeInfo(data);
              setTextLotNo('');
            }        
          })
          .catch ( error => {
            alert("창고에러 : " + error.message);
          });
      }
    }
  }

  useEffect (() => {
    if(barcodeInfo.length > 0) {  
      if (lotList.length > 0) {
        var index = lotList.findIndex(item => item.mng_no === barcodeInfo[0].mng_no);

        if(index < 0) {
          setLotList(lotList => lotList.concat(barcodeInfo));          
        }
      } else {
        setLotList(barcodeInfo);
      }
    }    
  }, [barcodeInfo])

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowCalander(Platform.OS === 'ios');
    setDate(currentDate);
    setTextDate(getFormatDate(currentDate, "yyyy-MM"))
  };

  const showMode = (currentMode) => {
    setShowCalander(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };  

  return (
      <>
          <ScreenHeader headerName = "창고 이동" navigation = {navigation}/> 

          <GroupTitle name = '조회조건' />

          <Center py = {3} bg = 'gray.50'>
              <VStack w = "90%">    
                {showCalander && (
                  <DateTimePicker
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onDateChange}
                  />
                )}

                <InputIcon 
                  name = "calendar" 
                  formSize = "sm" 
                  labelName = "이동일" 
                  value = {textDate} 
                  isReadOnly = {true} 
                  iconName = "calendar-today" 
                  onIconPress = {showDatepicker} 
                  onChangeText = {(value) => setTextDate(value)}
                />

               
                  <SelectBox size = "sm" labelName = "출고창고" data = {wareHouseOutList} onValueChange = {setWhOutCode}/>             
                  <SelectBox size = "sm" labelName = "입고창고" data = {wareHouseInList} onValueChange = {setWhInCode}/>
             
                  
                
                <InputIcon 
                  name = "lotNo" 
                  fontSize = "sm" 
                  labelName = "LOTNO" 
                  value = {textLotNo} 
                  isReadOnly = {false} 
                  iconSize = "md" 
                  iconName = "camera-alt"                       
                  onChangeText = {(value) => setTextLotNo(value)} 
                  onIconPress = {showCameraScanner}  
                  onKeyPress = {search}
                  returnKeyType = 'none'
                />  
                <CameraScanner isOpen = {showModal} onClose = { () => setShowModal(false) } onBarCodeRead = {onBarCodeRead}/>                  
              </VStack>                
          </Center>
          
          {/* <Box border = {1} borderColor = 'gray.300'/> */}

          

          {/* <Box mt = {3} 
                p = {2} 
                border={2} 
                borderBottomColor='gray.300' 
                bg = 'white' borderBottomWidth={2} borderTopWidth = {0} borderLeftWidth = {0} borderRightWidth = {0}
          >
              <HStack>
                  <Text fontSize = "sm">스캔 개수 : {lotList.length}    </Text>
                  <AlertDialogComponent />
              </HStack>
          </Box> */}

          <GroupTitle name = '검색결과' />

          <FlatList 
            flex = {1} bg={useColorModeValue("gray.50", "gray.700")}
            data = {lotList}
            renderItem = {(item, index) => {return <InputSwipeListBox data = {item} handleDelete = {() => deleteItem(index)} />; }}
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