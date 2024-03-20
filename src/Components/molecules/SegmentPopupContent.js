import React, { useState } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import styled from "styled-components";

const PopupContent = styled.div`
  padding: 0 16px;

  .segment-name {
    width: 90%;
    padding: 8px;
  }

  .blue-box {
    margin-top: 16px;
    border: 2px solid rgb(111, 168, 220);
    padding: 8px;
  }

  select {
    width: 100%;
    margin-top: 8px;
    padding: 8px;
  }

  .schema-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
  }

  .schema-item select {
    flex: 1;
    margin-right: 8px;
  }

  .traits {
    display: flex;
    justify-content: flex-end;
  }

  .group-traits {
    margin-left: 20px;
  }
  .user-dot {
    background-color: green;
    margin-right: 10px;
  }
  .guest-dot {
    background-color: red;
    margin-right: 10px;
  }
  .user-dot,
  .guest-dot {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    display: inline-block;
  }
  .submit-segment{
    background: rgb(246, 246, 246);
    bottom: 14px;
    position: fixed;
    display: grid;
    grid-template-columns: 2fr 1fr;
  }
`;
const GreenButton = styled(Button)`
  background-color: rgb(65,180,148);
  border: 1px solid white;
  color:white;
  padding: 6px;
`;

const WhiteButton = styled(Button)`
  background-color: white;
  border: 1px solid white;
  color:red;
`;

const AddButton = styled(Button)`
  border: 2px solid white;
  color: rgb(114,202,180);
  text-decoration: underline; 
  cursor: pointer; 
  background: white;
  margin-top:16px;
`;

const RemoveButton = styled(Button)`
     border-radius: 2px;
     width: 20px;
    border: 1px solid rgb(101, 122, 147);
    background: rgb(101, 122, 147);
`;

export const schemaOptions = [
  { label: "First Name", value: "first_name", color: "green" },
  { label: "Last Name", value: "last_name", color: "green" },
  { label: "Gender", value: "gender", color: "green" },
  { label: "Age", value: "age", color: "green" },
  { label: "Account Name", value: "account_name", color: "red" },
  { label: "City", value: "city", color: "red" },
  { label: "State", value: "state", color: "red" },
];

const SegmentPopupContent = ({ onSave, setShowPopup }) => {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchema, setSelectedSchema] = useState([]);
  const [newSchema, setNewSchema] = useState("");

  const handleAddSchema = () => {
    if (newSchema) {
      setSelectedSchema([
        ...selectedSchema,
        schemaOptions.find((option) => option.value === newSchema),
      ]);
      setNewSchema("");
    }
  };


  const handleSave = () => {
    const schemaNames = selectedSchema.map(item => ({ [item.value]: item.label }));
    onSave({ segment_name: segmentName, schema: schemaNames });
    setSegmentName("");
    setSelectedSchema([]);
    setShowPopup(false);
  };
  

  return (
    <PopupContent>
      <p>Enter the Name of the segment</p>
      <Input
        type="text"
        placeholder="Name of the segment"
        value={segmentName}
        className="segment-name"
        onChange={(e) => setSegmentName(e.target.value)}
      />
      <p>To save your segment, you need to add schemas to build the query </p>
      <div className="traits">
        <p>
          <span className="user-dot"></span>-User Traits
        </p>
        <p className="group-traits">
          <span className="guest-dot"></span>-Group Traits
        </p>
      </div>
      <div className="blue-box">
        {selectedSchema.map((item, index) => (
          <div key={index} className="schema-item">
            <span
              className={item.color === "red" ? "guest-dot" : "user-dot"}
            ></span>
            <select
              value={item.value}
              onChange={(e) => {
                const updatedSchemas = [...selectedSchema];
                updatedSchemas[index] = schemaOptions.find(
                  (option) => option.value === e.target.value
                );
                setSelectedSchema(updatedSchemas);
              }}
            >
              {schemaOptions
                .filter(
                  (option) =>
                    !selectedSchema.find((item) => item.value === option.value)
                )
                .map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </select>
            <RemoveButton
              onClick={() => {
                const updatedSchemas = [...selectedSchema];
                updatedSchemas.splice(index, 1);
                setSelectedSchema(updatedSchemas);
              }}
            ></RemoveButton>
          </div>
        ))}
      </div>
      <select value={newSchema} onChange={(e) => setNewSchema(e.target.value)}>
        <option value="">Select Schema</option>
        {schemaOptions
          .filter(
            (option) =>
              !selectedSchema.find((item) => item.value === option.value)
          )
          .map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
      <AddButton onClick={handleAddSchema}>+ Add new schema</AddButton>
      <br />
      <div className="submit-segment">
      <GreenButton onClick={handleSave}>Save the segment</GreenButton>
        <WhiteButton onClick={() => setShowPopup(false)}>Close</WhiteButton>
      </div>
    </PopupContent>
  );
};

export default SegmentPopupContent;
