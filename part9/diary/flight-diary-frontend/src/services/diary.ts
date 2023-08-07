import axios from 'axios';
import { Diary, NewDiary } from "../types";

const baseUrl = 'http://localhost:3001/api/diaries';

export const getAllDiaries = () => {
  return axios
    .get<Diary[]>(baseUrl)
    .then(response => response.data)
};

export const createDiary = async (object: NewDiary) => {
  try {
    const response = await axios
      .post<Diary>(baseUrl, object);
    return response.data;
  } catch(error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    } else {
      console.error(error);
    }
  }
};