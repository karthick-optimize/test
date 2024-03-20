import React, { useState } from "react";
import styled from "styled-components";

const StyledPopupContainer = styled.div`
  position: fixed;
  top: 0;
  right: ${(props) => (props.showPopup ? "0" : "-50%")};
  width: 50%;
  height: 100%;
  background-color: white;
  transition: right 0.3s ease-in-out;
  z-index: 9999;
  .popup-header {
    background: rgb(57, 174, 188);
    padding: 10px;
  }
  .traits {
    display: flex;
    justify-content: flex-end;
  }
  .popup-content {
    padding: 14px;
  }
  .blue-box {
    border: 1px solid blue;
    padding: 10px;
    margin-top: 10px;
  }
`;

const SegmentPopup = ({ onSave }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchema, setSelectedSchema] = useState([]);
  const [newSchema, setNewSchema] = useState("");
  const schemaOptions = [
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ];

  const handleAddSchema = () => {
    if (newSchema) {
      setSelectedSchema([
        ...selectedSchema,
        schemaOptions.find((option) => option.value === newSchema),
      ]);
      setNewSchema("");
    }
  };

  const handleSave = async () => {
    const data = {
      segment_name: segmentName,
      schema: selectedSchema.reduce((acc, item) => {
        acc.push({ [item.value]: item.label });
        return acc;
      }, []),
    };
  
    try {
      const response = await fetch("https://webhook.site/bb9038d5-5adc-4354-a6a2-3dc5a621104b", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers if required
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Segment saved successfully:", data);
        // Reset state
        setSegmentName("");
        setSelectedSchema([]);
        setShowPopup(false);
      } else {
        console.error("Failed to save segment:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving segment:", error);
    }
  };
  
  return (
    <div>
      <button
        style={{
          background: "rgba(153, 153, 153, 0.81)",
          border: "2px solid white",
          color: "white",
        }}
        onClick={() => setShowPopup(true)}
      >
        Save Segment
      </button>
      <StyledPopupContainer showPopup={showPopup}>
        <div className="popup">
          <div className="popup-header">
            <h3>Save Segment</h3>
          </div>
          <div className="popup-content">
            <p>Enter the Name of the segment</p>
            <input
              type="text"
              placeholder="Name of the segment"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
            />
            <p>To save your segment, you need to add schemas to build the query </p>
            <div className="traits">
              <p>-User Traits</p>
              <p>-Group Traits</p>
            </div>
            <select
              value={newSchema}
              onChange={(e) => setNewSchema(e.target.value)}
            >
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
            <br />
            <div className="blue-box">
              {selectedSchema.map((item, index) => (
                <div key={index}>
                  {item.label}
                </div>
              ))}
            </div>
            <button onClick={handleAddSchema}>+ Add new schema</button>
            <br />
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      </StyledPopupContainer>
    </div>
  );
};

export default SegmentPopup;
