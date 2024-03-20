import AppView from "./Components/views/AppView"
import SegmentController from "./Components/controllers/SegmentController"

const App = () => {
  const handleSave = async (data) => {
    try {
      const response = await SegmentController.saveSegment(data);
      console.log("Segment saved successfully:", response);
    } catch (error) {
      console.error("Error saving segment:", error);
    }
  };

  return <AppView handleSave={handleSave} />;
};

export default App;
