import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Box, VStack, Input, Button, Icon, Image} from 'native-base'
import {fetch} from '../service/fetch';
import LoginInfo from '../common/LoginInfo';
import ServerInfo from '../common/ServerInfo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NumericInput from 'react-native-numeric-input'

//로그인 정보 저장
function setLogInInfo(userInfo) {
  console.log(userInfo);
  LoginInfo.reg_id = userInfo.reg_id,
  LoginInfo.emp_no = userInfo.emp_no,
  LoginInfo.emp_nm = userInfo.emp_nm,
  LoginInfo.co_cd = userInfo.co_cd,
  LoginInfo.bs_cd = userInfo.bs_cd,
  LoginInfo.div_cd = userInfo.div_cd,
  LoginInfo.dept_cd = userInfo.dept_cd,
  LoginInfo.dept_nm = userInfo.dept_nm,
  LoginInfo.fac_cd = userInfo.fac_cd
}

function LogInScreen({navigation}) {
  const url = ServerInfo.serverURL + '/api/user/Login/';
    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({
      id : '',
      password : ''
    })    

    // 비구조화 할당을 통해 값 추출
    const { id, password } = userInfo;

    const onChangeText = (name, value) => {
      setUserInfo({
        ...userInfo, // 기존의 input 객체를 복사한 뒤
        [name]: value // name 키를 가진 값을 value 로 설정
      });
    };

    const search = () => {
        if(id === "" || password === "") {
             alert("사원번호나 비밀번호를 입력해주세요");
        } else {
            setIsLoading( true );

             fetch(url, userInfo)
              .then( data => {   
                setIsLoading( false );
                if(data.length === 0) {
                  alert("사원번호나 비밀번호를 다시 확인해주세요");
                } else {
                  setLogInInfo(data[0]);
                  navigation.navigate("Main");
                }
              })
              .catch ( error => {
                alert("창고에러 : " + error.message);
              });
        }
    };
    return (    
      <View style={styles.container}> 
        <Image
          style = {{flex : 1}}
          size={180}
          resizeMode={"contain"}
        //  borderRadius={100}
          source={{uri: "http://snsinc.co.kr/images/common/logo.png",}}
          alt="Alternate Text"
        />

          <VStack w = "70%" style = {{flex : 2}}>
            <Input 
              m = {2}
              variant="underlined"
              placeholder="사번"
              keyboardType="number-pad"
              value={ id }
              onChangeText={(value) => onChangeText("id", value)}
              _light={{placeholderTextColor: "blueGray.400",}}
              _dark={{placeholderTextColor: "blueGray.50",}}
              InputLeftElement={<Icon size="md" mr = {3}
                                color="gray.400" 
                                as={<FontAwesome name="user"/>} 
                                />}
            />
            <Input 
              m = {2}
              variant="underlined"
              placeholder="비밀번호"
              secureTextEntry={true}
              value = {password}
              onChangeText={(value) => onChangeText("password", value)}
              _light={{placeholderTextColor: "blueGray.400",}}
              _dark={{placeholderTextColor: "blueGray.50",}}
              InputLeftElement={<Icon size="md" mr = {3}
                                color="gray.400" 
                                as={<FontAwesome name="lock"/>} 
                                />}
            />
          <Button mt = {10} onPress={search}>로그인</Button> 
        </VStack>
      </View>  

  );
}

 export default LogInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
  });