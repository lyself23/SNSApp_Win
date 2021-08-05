import React, {useState, useEffect} from 'react';
import { Spinner, VStack, Center, useColorModeValue, FlatList} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import {fetch} from '../service/fetch';
import LoginInfo from '../common/LoginInfo';
import ServerInfo from '../common/ServerInfo';
import {ListBox} from '../components/ListBox';
import ScreenHeader from '../components/ScreenHeader';
import SelectBox from '../components/SelectBox';
import {InputIcon} from '../components/Input';
import GroupTitle from '../components/GroupTitle';
import getFormatDate from '../service/GetFormatDate';
import CameraScanner from '../components/CameraScanner';

function SearchStockScreen({navigation, route}) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showCalander, setShowCalander] = useState(false);
  const [showScanner, setShowScanner] = useState(false); 
 
  const [lotList, setLotList] = useState([]);
  const [barcodeInfo, setBarcodeInfo] = useState([]);     
  const [warehouseList, setWarehouseList] = useState({})
  const [isLoading, setIsloading] = useState(false);

  const [inputs, setInputs] = useState({
    inputDate : getFormatDate(date, "yyyy-MM"),
    inputWarehouse : "",
    inputLotNo : "",
  })  

  const [apiParams, setApiParams] = useState({
    warehouse : {
      factoryCode : LoginInfo.fac_cd,
      warehouseCode : "",
      flag : "5",
      regID : LoginInfo.regID
    },
    search : {
      standardDate : "",
      factoryCode : LoginInfo.fac_cd,
      warehouseCode : "",
      itemID : "0",
      lotNo : "",
      boxSq : "0",
      boxNo : "",
      rfid : ""
    }    
  })

  //비구조화 할당을 통해 값 추출
  //기본 : 변경 => 기본을 변경으로 바꿔서 사용하겠다란 의미
  const {warehouse : warehouseAPIParam, search : searchAPIParam} = apiParams;
  const {inputDate, inputWarehouse, inputLotNo} = inputs;

  //화면 첫 로드 시 창고리스트 불러오기
  useEffect(() => {
    let url = ServerInfo.serverURL + '/api/warehouse/getWarehouseList';

    fetch(url, warehouseAPIParam)
      .then( data => {   
        setWarehouseList(data)        
      })
      .catch ( error => {
        alert("창고에러 : " + error.message);
      });
   }, []);

  //standardDate, lotNo, date 바뀌면 api 값도 변경됨
  useEffect(() => {
    setApiParams({
      //기존값은 그대로두고
      ...apiParams, 
      search : {
        ...searchAPIParam,
        standardDate : inputDate,
        warehouseCode : inputWarehouse,
        lotNo : inputLotNo,
      }
    })   
  }, [inputDate, inputWarehouse, inputLotNo])

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
      console.log('apiParams.search.lotNo', apiParams.search.lotNo);
      console.log('inputLotNo', inputLotNo);
      console.log('searchAPIParam', searchAPIParam)
      fetch(url, searchAPIParam)            
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

      // setInputs({
      //   ...inputs, 
      //   inputLotNo : value.data
      // })

      //왜인진 모르겠지만 여기서 바로 넣어줘야 lotNo에 적용됨
      setApiParams({
        //기존값은 그대로두고
        ...apiParams, 
        search : {
          ...searchAPIParam,
          lotNo : value.data,
        }
      })   

      setShowScanner(false)
      setIsloading(true);
    }
  }

  const getBarcodeInfo = (name, event) => {
    const lotNo = (name === "inputLotNo") ? event : event.data;

    if (inputWarehouse === '') {
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

  return (
    <>       
      <ScreenHeader headerName = "재고 조회" navigation = {navigation}/>     
      
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
            labelName = "조회일" 
            value = {inputDate} 
            isReadOnly = {true} 
            iconName = "calendar-today" 
            onIconPress = {showDatepicker} 
            onChangeText = {(value) => onChangeInputs("inputDate", value)}
          />
          <SelectBox 
            size = "sm" 
            labelName = "창고" 
            data = {warehouseList} 
            onValueChange = {(value) => onChangeInputs("inputWarehouse", value)}
          />
          <InputIcon 
            name = "lotNo" 
            formSize = "sm" 
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
      
      <GroupTitle name = '검색결과' />

      
      {isLoading ? 
        <Center space={3}><Spinner size="lg" /></Center>
        : <FlatList 
            flex = {1}           
            bg={useColorModeValue("gray.50", "gray.700")}
            data = {lotList}
            renderItem = {(item, index) => {return <ListBox key = {index} data = {item} />; }}
            keyExtractor = {(item, index) => index.toString()}
          />
      }  
    </> 
  );
}

export default SearchStockScreen;