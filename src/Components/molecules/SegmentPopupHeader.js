import React from "react";
import styled from "styled-components";

const PopupHeader = styled.div`
 background: rgb(57,174,188);
 .header-content{
    padding: 16px;
    margin: 0;
    color: white;
 }
 .arrow-symbol{
    margin-right: 8px;
 }
`;
const SegmentPopupHeader = () => {
  return (
    <PopupHeader>
      <h3 className="header-content"><span className="arrow-symbol">&lt;</span>Saving Segment</h3>
    </PopupHeader>
  );
};

export default SegmentPopupHeader;