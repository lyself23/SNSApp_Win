import React from 'react';
import axios from 'axios';

async function fetch(url) {  
  try {
    let result = await axios.get(url) ;
    return result.data;
  } catch (error) {
    alert(error.message);
  }
}

export default fetch;
