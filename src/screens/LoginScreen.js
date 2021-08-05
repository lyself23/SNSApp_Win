import React, {useState} from 'react';
import {
  StyleSheet,  Text,  View,  TextInput,  TouchableHighlight,  Image
} from 'react-native';
import {fetch} from '../service/fetch';
import LoginInfo from '../common/LoginInfo';
import ServerInfo from '../common/ServerInfo';


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
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
            <TextInput 
                style={styles.inputs}
                value={ id }
                placeholder="사번"
                keyboardType="number-pad"
                underlineColorAndroid='transparent'
                onChangeText={(value) => onChangeText("id", value)}
            />
          </View>
      
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
            <TextInput style={styles.inputs}
                placeholder="비밀번호"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                value = {password}
                onChangeText={(value) => onChangeText("password", value)}
            />
          </View>

          <TouchableHighlight 
              name = "login" 
              style={[styles.buttonContainer, styles.loginButton]}
               onPress={search}
          >
              <Text style={styles.loginText}>Login</Text>
          </TouchableHighlight>

          {/* <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
              <Text>Forgot your password?</Text>
          </TouchableHighlight>  */}

          {/* <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('register')}>
              <Text>Register</Text>
          </TouchableHighlight> */}
      </View>
  );
}

 export default LogInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#DCDCDC',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:250,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    inputIcon:{
      width:30,
      height:30,
      marginLeft:15,
      justifyContent: 'center'
    },
    buttonContainer: {
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
    },
    loginButton: {
      backgroundColor: "#00b5ec",
    },
    loginText: {
      color: 'white',
    }
  });