import { saveSegment } from "../services/SegmentService";

const SegmentController = {
  saveSegment: async (data) => {
    try {
      const response = await saveSegment(data);
      if (response.ok) {
        console.log("Segment saved successfully:", data);
        return response.data; 
      } else {
        console.error("Failed to save segment:", response.statusText);
        throw new Error("Failed to save segment");
      }
    } catch (error) {
      console.error("Error saving segment:", error);
      throw error;
    }
  },
};

export default SegmentController;