import axios from 'axios';
import { PostModel } from 'app/models/PostModel';

const API = 'https://jsonplaceholder.typicode.com/posts';

export const getData = async () => {
   let response = await axios.get(API);
   return response.data;
};

export const postData = async (data: PostModel): Promise<any> => {
   let response = await axios.post(API, data);
   console.log(response.data);
   return response.data;
};
