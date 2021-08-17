import axios from 'axios';

async function fetch(url, params) {  
  try {
    console.log('1. fetch params', {params});
    //await 결과값이 조회 되어야만 다음 라인으로 이동 (async/await)
    let result = await axios.get(url, {params}) ; 
    console.log('2. fetch result', result.data);
    return result.data;
  } catch (error) {
    alert(error.message);
  }
}

async function fetchPost(url, data) {  
  try {
    console.log('1. fetchPost body', {data});
    //await 결과값이 조회 되어야만 다음 라인으로 이동 (async/await)
    let result = await axios.post(url, data) ; 
    console.log('fetchPost result.data', result.data);
    return result.data;
  } catch (error) {
    alert(error.message);
  }
}

export {fetch, fetchPost};
