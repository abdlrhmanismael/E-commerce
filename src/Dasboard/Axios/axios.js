import axios from "axios";
import Cookie from "cookie-universal";
import { baseURL } from "../Api/Api";

const cookie = Cookie();
const token = cookie.get("Bearer");
export const Axios = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: "Bearer " + token,
  },
});
