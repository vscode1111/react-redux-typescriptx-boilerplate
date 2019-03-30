import axios from 'axios';

export const postData = async () => {
   // let response = await fetch('https://jsonplaceholder.typicode.com/posts');
   // let data = await response.json();
   let response = await axios.get('https://jsonplaceholder.typicode.com/posts');
   return response.data;
};
