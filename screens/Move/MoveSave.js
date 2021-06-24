import React from 'react';

const MoveSave = (props) => {
    let url = ServerInfo.serverURL + '/api/searchStock/2021-05/';
    url += LoginInfo.co_cd + '/' + LoginInfo.fac_cd + '/';
    url += whCode + '/%20/\'\'/\'\'/\'\'/\'\'/\'\'/\'\'/\'\'/\'\'/\'\'/'
    url += lotNo + '/\'\'/\'\'';
    // setIsLoading( true );
    console.log(props.data.itm_nm);
    // axios.get(url)
    //   .then( response => {
    //     setIsLoading( false );

    //     if(response.data.length === 0) {
    //       alert("조회된 내용이 없습니다");
    //     }  
    //     // alert(lotList[1].box_sq)      
    //     setLotList(response.data);
    //   })
    //   .catch ( error => {
    //     alert(error.message);
    //   });
  };

  export default MoveSave;