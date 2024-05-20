import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import axios from "axios";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  try {
    const url = "https://harry-potter-api-3a23c827ee69.herokuapp.com/api/characters";
    const response = await axios.get(url);
    const students = response.data;
    const randomIndex = Math.floor(Math.random() * students.length);
    const randomStudent = students[randomIndex];
    return {
      statusCode: 200,
      body: JSON.stringify(randomStudent),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erreur lors du tirage au sort de l'élève" }),
    };
  }
};

export { handler };
