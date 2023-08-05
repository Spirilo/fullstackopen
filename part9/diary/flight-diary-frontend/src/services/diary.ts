import axios from 'axios';
import { Diary } from "../types";

const baseUrl = 'http://localhost:3001/api/diaries';

const getAll = () => {
  return axios
    .get<Diary[]>(baseUrl)
    .then(response => response.data)
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll
}