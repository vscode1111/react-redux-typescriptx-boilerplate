import axios from 'axios';
import * as fetch from 'isomorphic-fetch';
import { PostModel } from 'app/models/PostModel';

const API = 'https://jsonplaceholder.typicode.com/posts';

export const getData = async () => {
   // let response = await fetch('https://jsonplaceholder.typicode.com/posts');
   // let data = await response.json();
   // return data;
   let response = await axios.get(API);
   return response.data;
};

export const postData = async (data: PostModel) => {
   let response = await axios.post(API, data);
   console.log(response.data);
};
