import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';
import axios from 'axios';
import Main from '../pages/main';

function LogInScreen({navigation}) {
    const [userNo, setUserNo] = React.useState('');
    const [userPassword, setUserPassword] = React.useState('');
    const [list, setList] = React.useState([null]);
    const [isLoading, setIsLoading] = React.useState(false);

    const search = React.useCallback(()=>{
        if(userNo == "" || userPassword == "") {
             alert("사원번호나 비밀번호를 입력해주세요");
        } else {
            let url = 'http://210.101.190.140:8080/api/users/login/';
            url += userNo + '/';
            url += userPassword;
            setIsLoading( true );
            axios.get( url )
            .then( response => {
                setIsLoading( false );
                if(response == null) {
                    alert("사원번호나 비밀번호를 다시 확인해주세요");
                } else {
                    setList( response.data[0]);
                    //navigation.navigate("Main", {barcodeNo : ""});
                }
            } )
            .catch( error => alert( error.message ) );
        }
    }, [userNo, userPassword]);
    return (      
        <View style={styles.container}>            
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
            <TextInput 
                style={styles.inputs}
                value={ userNo }
                placeholder="사번"
                keyboardType="number-pad"
                underlineColorAndroid='transparent'
                onChangeText={(value) => setUserNo(value)}/>
          </View>
      
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
            <TextInput style={styles.inputs}
                placeholder="비밀번호"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={(userPassword) => setUserPassword(userPassword)}/>
          </View>

          <TouchableHighlight 
              name = "login" 
              style={[styles.buttonContainer, styles.loginButton]}
              // onPress={search}
              //Main 으로 이동
              //onPress = {() => navigation.navigate("Main", {userNo : list.emp_no})}
              onPress = {() => navigation.navigate("Main", {barcodeNo : ""})} //userNo는 mainscreen에서 route로 받음
          >
              <Text style={styles.loginText}>Login</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.buttonContainer}>  
            {list != null ? ( 
              //navigation.navigate("메인화면")
              <Text>{list.emp_nm}</Text>
            ) : (
              <Text>{list.emp_nm}</Text>
            )}
          
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