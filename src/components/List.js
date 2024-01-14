import React from "react";

const List = ({ list }) => {
  return (
    <div className="list">
      {/* {list && list.songs.length && ( */}
      <div>
        <h2>{list.listName}</h2>
        {list.songs.map((song, index) => {
          return <div key={index}>{song.name}</div>;
        })}
      </div>
      {/* )} */}
    </div>
  );
};

export default List;
