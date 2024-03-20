import React, { useState } from "react";
import styled from "styled-components";
import SegmentPopupHeader from "../molecules/SegmentPopupHeader";
import SegmentPopupContent from "../molecules/SegmentPopupContent";
import Button from "../atoms/Button";

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  right: ${(props) => (props.showPopup ? "0" : "-50%")};
  width: 40%;
  height: 100vh;
  background-color: white;
  transition: right 0.3s ease-in-out;
  z-index: 3;
`;
const SaveButton = styled(Button)`
    margin: 40px 0 0 80px;
    padding: 8px 12px;
  background-color: rgb(153, 153, 153);
  border: 2px solid white;
  color: white;
`;


const SegmentPopup = ({ onSave }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div >
<SaveButton  onClick={() => setShowPopup(true)}>Save Segment</SaveButton>
      <PopupContainer showPopup={showPopup}>
        <SegmentPopupHeader onClick={() => setShowPopup(false)} />
        <SegmentPopupContent onSave={onSave} setShowPopup={setShowPopup} />
      </PopupContainer>
    </div>
  );
};

export default SegmentPopup;
