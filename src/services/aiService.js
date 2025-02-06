import axios from "axios";

export const getAiResponse = async (prompt) => {
    try {
      const response = await axios.post("http://localhost:5000/generate-text", { prompt });
  
      console.log("Full API Response:", response.data);
  
      // Check the actual response structure & extract text correctly
      const aiText = response.data?.response;
  
      console.log("Extracted AI Response:", aiText);
  
      return aiText;
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return "Error retrieving response";
    }
  };

  
 
