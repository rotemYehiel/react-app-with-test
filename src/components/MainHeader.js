import React from "react";
import {
  ListTitle,
  MainHeaderLayout,
  ListImage,
  ListImageWrapper,
} from "../styleComponents/MainHeader";
import STATES from "../constants/states";

function MainHeader({ listName, listImage, currentState }) {
  return (
    <MainHeaderLayout>
      {currentState === STATES.SUCCESS && listName && (
        <>
          <ListTitle>{listName}</ListTitle>
          <ListImageWrapper>
            <ListImage listImage={listImage} />
          </ListImageWrapper>
        </>
      )}
    </MainHeaderLayout>
  );
}

export default MainHeader;
