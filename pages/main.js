import React from 'react';
// import styled from 'styled-components/native';
// import Title from '../components/Title';
// import Row from '../components/Row';
// import ListItem from '../components/ListItem';
// import MovieName from '../components/MovieName';
import axios from 'axios';
import { ActivityIndicator } from 'react-native';

// const Container = styled.SafeAreaView`
//     flex: 1;
// `;

// const Input = styled.TextInput`
//     flex: 1;
//     border: 1px solid #e5e5e5;
//     margin-left: 12px;
//     padding: 0 12px;
// `;

// const Button = styled.Button``;

function Main( props ) {
    const [keyword,setKeyword] = React.useState('');
    const [list,setList] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const search = React.useCallback(()=>{
        fetch( `http://localhost:8080/api/users/empno/${keyword}` )
          .then( data => {
            setList( data );
          } );
        
      },[keyword]);


    // const search = React.useCallback(()=>{
    //     let url = 'https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=bbd8a6868e6ee578589f5f5efa49dd40';
    //     url += '&movieNm=' + keyword;
    //     setIsLoading( true );
    //     axios.get( url )
    //         .then( response => {
    //             setIsLoading( false );
    //             setList( response.data.movieListResult.movieList );
    //         } )
    //         .catch( error => alert( error.message ) );
    // }, [keyword]);
    alert("xxxx" + props.name);
    return (
        <>
           
        </>
    )
}

export default Main;