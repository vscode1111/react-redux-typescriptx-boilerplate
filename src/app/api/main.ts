import axios from 'axios';
import * as fetch from 'isomorphic-fetch';

export const getData = async () => {
   // let response = await fetch('https://jsonplaceholder.typicode.com/posts');
   // let data = await response.json();
   // return data;
   let response = await axios.get('https://jsonplaceholder.typicode.com/posts');
   return response.data;
};
