import React from "react";
import SegmentPopup from "../organisms/SegmentPopup";
import styled from "styled-components";

const Container = styled.div`
 background: rgb(153,153,153);
 height: 100vh;
 .create-segment{
    margin: 0;
    background: rgb(34,104,112);
    padding: 16px;
 }
`

const AppView = ({ handleSave }) => {
  return (
    <Container className="App">
      <h3 className="create-segment">View Audience</h3>
      <SegmentPopup onSave={handleSave} />
    </Container>
  );
};

export default AppView;