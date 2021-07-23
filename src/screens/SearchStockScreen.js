import React, {useState, useEffect} from 'react';
import {  VStack,  Center,  useColorModeValue, FlatList} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import fetch from '../service/fetch';
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

  const [textDate, setTextDate] = useState(
    getFormatDate(date, "yyyy-MM")
  );
  const [textLotNo, setTextLotNo] = useState('');

  const [wareHouseList, setWareHouseList] = useState([]); 
  const [whCode, setWhCode] = useState('');
  const [lotList, setLotList] = useState([]);
  const [barcodeInfo, setBarcodeInfo] = useState([]);
  const [showModal, setShowModal] = useState(false)


  useEffect(() => {
    let url = ServerInfo.serverURL + '/api/getWarehouseList/';
    url += LoginInfo.fac_cd + '/\'\'/5';

    fetch(url)
      .then( data => {   
        setWareHouseList(data);
      })
      .catch ( error => {
        alert("창고에러 : " + error.message);
      });
   }, []);

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
  
  const showCameraScanner = () => {
    setShowModal(true);
  }  

  const search = (e) => {

    // let url = ServerInfo.serverURL + '/api/searchStock/';
    // url += textDate
    // url += '/' + LoginInfo.co_cd + '/' + LoginInfo.fac_cd + '/';
    // url += whCode + '/\'\'/\'\'/\'\'/\'\'/\'\'/\'\'/\'\'/\'\'/\'\'/\'\'/'
    // url += textLotNo + '/\'\'/\'\'';

    if(e.nativeEvent.key === "Enter") {
      if(textLotNo === '') {
        alert('LOTNO를 스캔해주세요');
      } else if (whCode === '') {
        alert('출고창고를 선택해주세요');
      } else if (textDate === '') {
        alert('조회일자를 선택해주세요');
      } else {
        let url = ServerInfo.serverURL + '/api/scanMoveList/';
            url += LoginInfo.fac_cd + '/';
            url += textLotNo + '/' + whCode + '/2/\'\'';

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

  const onBarCodeRead = (value) => {
    if (whCode === '') {
      alert('출고창고를 선택해주세요');
    } else if (textDate === '') {
      alert('조회일자를 선택해주세요');
    } else {
      if(value.data !== null) {
        let url = ServerInfo.serverURL + '/api/scanMoveList/';
            url += LoginInfo.fac_cd + '/';
            url += value.data + '/' + whCode + '/2/' + textDate;

      fetch(url)
        .then( data => {   
          setBarcodeInfo(data);
          setLotList(barcodeInfo);
          setShowModal(false)
        })
        .catch ( error => {
          alert("창고에러 : " + error.message);
        });
      }  
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

          <CameraScanner isOpen = {showModal} onClose = { () => setShowModal(false) } onBarCodeRead = {onBarCodeRead}/>
      
          <InputIcon 
            name = "calendar" 
            formSize = "sm" 
            labelName = "조회일" 
            value = {textDate} 
            isReadOnly = {true} 
            iconName = "calendar-today" 
            onIconPress = {showDatepicker} 
            onChangeText = {(value) => setTextDate(value)}
          />
          <SelectBox 
            size = "sm" 
            labelName = "창고" 
            data = {wareHouseList} 
            onValueChange = {setWhCode}
          />
          <InputIcon 
            name = "lotNo" 
            formSize = "sm" 
            labelName = "LOTNO" 
            value = {textLotNo} 
            isReadOnly = {false} 
            iconSize = "md" 
            iconName = "camera-alt" 
            wareHouseCode = {whCode} 
            onChangeText = {(value) => setTextLotNo(value)}   
            onIconPress = {showCameraScanner}       
            onKeyPress = {search}
            returnKeyType = 'none'
          /> 
        </VStack>        
      </Center>

      {/* <Box border = {1} borderColor = 'gray.300'/> */}
      
      <GroupTitle name = '검색결과' />

      <FlatList 
          flex = {1} 
          bg={useColorModeValue("gray.50", "gray.700")}
          data = {lotList}
          renderItem = {(item) => {return <ListBox data = {item} />; }}
          keyExtractor = {(index) => index.toString()}
      />
    </> 
  );
}

export default SearchStockScreen;