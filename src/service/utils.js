import PlayList from "../static/playList.json";

export const getListFronJson = (listName) => {
  const list = PlayList.filter((list) => list.listName === listName);
  return list.length > 1 ? {} : list[0];
};
