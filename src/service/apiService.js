import axios from "axios";
import { getListFronJson } from "./utils";
import ERROR_MESSAGE from "../constants/messages";
import BASE_URL from "../constants/api";

export const fetchList = async ({ listName }) => {
  try {
    const isOnline = window.navigator.onLine;

    if (isOnline) {
      const response = await axios.get(`${BASE_URL}/play-list/${listName}`);
      const data = await response.data;
      return data;
    }
    const playList = getListFronJson(listName);

    if (playList?.listName) {
      return playList;
    }

    const error = { message: ERROR_MESSAGE };
    return { error };
  } catch (error) {
    if (error.response.status === 404)
      return { error: { message: ERROR_MESSAGE } };

    return { error };
  }
};
