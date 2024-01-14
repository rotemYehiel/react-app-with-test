import axios from "axios";
import { getListFronJson } from "./utils";
const BASE_URL = "https://fc6eaabb-0798-4dd5-9a76-02daa25ed1d9.mock.pstmn.io";
const ERROR_MSG = "Request failed with status code 404";
// const ERROR_MESSAGE = "Cant find the list you asked for.";

export const fetchList = async ({ listName }) => {
  try {
    const isOnline = window.navigator.onLine;
    console.log(isOnline);
    if (isOnline) {
      const response = await axios.get(`${BASE_URL}/play-list/${listName}`);
      const data = await response.data;
      return data;
    }
    let playList = getListFronJson(listName);

    if (playList?.listName) {
      return playList;
    }

    let error = { message: ERROR_MSG };
    return { error };
  } catch (error) {
    return { error };
  }
};
