import axios, { AxiosResponse } from "axios";
import { string } from "yup";
import { Task } from "../models/task";
import { HelloAPi, HelloApiAnswer } from "../models/helloapi";

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use((config) => {
  return config;
});

axios.interceptors.response.use(async (response) => {
  return response;
});

const request = {
  get: <T>(url: string, params?: URLSearchParams) => axios.get<T>(url, { params }).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
};

const Tasks = {
  getToken: (task: Task) => request.post<void>(`authorization/gettoken`, task),
};
const HelloApis = {
  getHelloApiAnswer: (token: string) => request.get<HelloAPi>(`helloapi/getanswer/${token}`),
  postHelloApiAnswer: (answer: HelloApiAnswer) => request.post<void>(`helloapi/answer`, answer),
};
const agent={
    Tasks,
    HelloApis,
}

export default agent;