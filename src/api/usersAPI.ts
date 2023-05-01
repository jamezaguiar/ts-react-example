import axios from 'axios';
import { IUser } from '../types/userTypes';

export async function getUsers() {
  const response = await axios.get<IUser[]>(
    'https://jsonplaceholder.typicode.com/users'
  );

  return response.data;
}
