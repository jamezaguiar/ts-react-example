import axios from 'axios';
import { IPost } from '../types/postTypes';

export async function getPosts() {
  const response = await axios.get<IPost[]>(
    'https://jsonplaceholder.typicode.com/posts'
  );

  return response.data;
}
