import React, {useState, useEffect, useRef} from 'react';
import {Spinner, VStack,  Center,   useColorModeValue,  Button, FlatList,  AlertDialog} from 'native-base';
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
  const [showScanner, setShowScanner] = useState(false); 

  const [lotList, setLotList] = useState([]);
  const [barcodeInfo, setBarcodeInfo] = useState([]); 
  const [outWarehouseList, setOutWarehouseList] = useState({})
  const [inWarehouseList, setInWarehouseList] = useState({})

  const [isLoading, setIsloading] = useState(false);

  const [inputs, setInputs] = useState({
    inputDate : getFormatDate(date, "yyyy-MM"),
    inputOutWarehouse : "",
    inputInWarehouse : "",
    inputLotNo : "",
    inputWarehouseList : {}
  })  

  const warehouseApiParams = {
    outWarehouse : {
      factoryCode : LoginInfo.fac_cd,
      warehouseCode : "",
      flag : "5",
      regID : LoginInfo.regID
    },
    inWarehouse : {
      factoryCode : LoginInfo.fac_cd,
      warehouseCode : "",
      flag : "1",
      regID : LoginInfo.regID
    }}

    const [searchApiParams, setSearchApiParams] = useState({
        standardDate : "",
        factoryCode : LoginInfo.fac_cd,
        warehouseCode : "",
        lotNo : "",      
    })


  const [saveApiParams, setSaveApiParams] = useState({    
    master : {
        standardDate : "",
        outFactoryCode : LoginInfo.fac_cd,
        inFactoryCode : LoginInfo.fac_cd,
        outWarehouseCode : "",
        inWarehouseCode : "",
      },
    detail : []
  })

  const deleteItem = index => {
      const arr = [...lotList];
      arr.splice(index, 1);
      setLotList(arr);
  }

  //비구조화 할당을 통해 값 추출
  //기본 : 변경 => 기본을 변경으로 바꿔서 사용하겠다란 의미
  const {master : insertMaster, detail : insertDetail} = saveApiParams;
  const {
    outWarehouse : outWarehouseAPIParam,
    inWarehouse : inWarehouseAPIParam
  } = warehouseApiParams;
  const {inputDate, inputOutWarehouse, inputInWarehouse, inputLotNo} = inputs;
 
  useEffect(() => {
    const url = ServerInfo.serverURL + '/api/warehouse/getWarehouseList';
    fetch(url, outWarehouseAPIParam)
      .then( data => {setOutWarehouseList(data)})
      .catch ( error => {alert("창고에러 : " + error.message);});

    fetch(url, inWarehouseAPIParam)
      .then( data => {setInWarehouseList(data)})
      .catch ( error => {alert("창고에러 : " + error.message);});
  }, []) 

  useEffect (() => {
    setSearchApiParams({
      ...searchApiParams,
      standardDate : inputDate,
      warehouseCode : inputOutWarehouse,
      lotNo : inputLotNo.trim()
    })
  }, [inputDate, inputOutWarehouse, inputLotNo])

  //바코드 내역 변경될 때 실행
  useEffect (() => {
    if(barcodeInfo.length > 0) { 
      setLotList(barcodeInfo);
    }    
  }, [barcodeInfo]) 

  //검색할 때만 API 정보 가져옴
  useEffect (() => {
    let url = ServerInfo.serverURL + '/api/product/getStockList';     

    if (isLoading) {
      // console.log('searchAPIParam', searchApiParams)
      fetch(url, searchApiParams)            
      .then( data => { 
        setBarcodeInfo(data);
        setInputs({...inputs, inputLotNo : ""})
        setIsloading(false);
      })
      .catch ( error => {
        alert("창고에러 : " + error.message);
         setIsloading(false);  
      }); 
    }    
  }, [isLoading])

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowCalander(Platform.OS === 'ios');
    setDate(currentDate);
    onChangeInputs("inputDate", getFormatDate(currentDate, "yyyy-MM"))
  };

  const onChangeInputs = (name, value) => {
    setInputs({
      ...inputs,
      [name] : value
    })    
  }

  const showMode = (currentMode) => {
    setShowCalander(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };  
  
  const showCameraScanner = () => {
    setShowScanner(true);
  }

  const onBarCodeRead = (value) => {  
    if(value.data !== null) {
      console.log('value.data', value.data);
      setIsloading(true);
    }
  }

  const getBarcodeInfo = (name, event) => {
    const lotNo = (name === "inputLotNo") ? event : event.data;

    if (inputOutWarehouse === '') {
      alert('출고창고를 선택해주세요');
    } else if (inputDate === '') {
      alert('조회일자를 선택해주세요');
    } else if (name === 'inputLotNo' && lotNo === '') {
      alert('LOTNO를 스캔해주세요');
    } 

    if ((name === 'inputLotNo' && event.nativeEvent.key === "Enter") ||
        (name === 'scanner' && lotNo !== null)) {
          setIsloading(true);
    }
  }

  const onPress = (() => {
    setSaveApiParams({
       master : {
        ...insertMaster,
        standardDate : inputDate,
        outWarehouseCode : inputOutWarehouse,
        inWarehouseCode : inputInWarehouse,
      },
      detail : insertDetail.concat(lotList)          
    }) 
  })

  useEffect(() => {
    console.log('insertMaster : ', insertMaster);
    console.log('insertDetail : ', insertDetail);

  }, [saveApiParams])

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

              <CameraScanner 
                isOpen = {showScanner} 
                onClose = { () => setShowScanner(false) } 
                onBarCodeRead = {value => onBarCodeRead(value)}            
              />

                <InputIcon 
                  name = "calendar" 
                  formSize = "sm" 
                  labelName = "이동일" 
                  value = {inputDate} 
                  isReadOnly = {true} 
                  iconName = "calendar-today" 
                  onIconPress = {showDatepicker} 
                  onChangeText = {(value) => onChangeInputs("inputDate", value)}
                />
               
                <SelectBox 
                  size = "sm" 
                  labelName = "출고창고" 
                  data = {outWarehouseList} 
                  onValueChange = {(value) => onChangeInputs("inputOutWarehouse", value)}
                />     

                <SelectBox 
                  size = "sm" 
                  labelName = "입고창고" 
                  data = {inWarehouseList} 
                  onValueChange = {(value) => onChangeInputs("inputInWarehouse", value)}
                />   
                
                <InputIcon 
                  name = "lotNo" 
                  fontSize = "sm" 
                  labelName = "LOTNO" 
                  value = {inputLotNo} 
                  isReadOnly = {false} 
                  iconSize = "md" 
                  iconName = "camera-alt"                       
                  onChangeText = {(value) => onChangeInputs("inputLotNo", value)}
                  onIconPress = {showCameraScanner}  
                  onKeyPress = {(value) => getBarcodeInfo("inputLotNo", value)}
                  returnKeyType = 'none'
                />                            
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

          {isLoading ?
          <Center space={3}><Spinner size="lg" /></Center>
          :
            <FlatList 
              flex = {1} bg={useColorModeValue("gray.50", "gray.700")}
              data = {lotList}
              renderItem = {(item, index) => {return <InputSwipeListBox data = {item} handleDelete = {() => deleteItem(index)} />; }}
              keyExtractor = {(item, index) => index.toString()}
            />
          }

          <Button  m = {1} onPress = {onPress}>등록</Button>

          {/* {lotList.length > 0 ?
          <Button isLoading  m = {1}></Button>
          :
          <Button  m = {1} >등록</Button>
          } */}

          {/* <FlatList 
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
          )}        */}
      </>      
  )
};

export default MoveScreen;