import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import axios from "axios";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  try {
    const { house, page = 1 } = event.queryStringParameters || {};
    const pageSize = 6;
    const url = "https://harry-potter-api-3a23c827ee69.herokuapp.com/api/characters";
    const response = await axios.get(url);
    let students: Student[] = response.data;

    if (house) {
      students = students.filter((student: Student) => student.house === house);
    }

    const totalStudents = students.length;
    const totalPages = Math.ceil(totalStudents / pageSize);
    const startIndex = (Number(page) - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const studentsPage = students.slice(startIndex, endIndex);

    return {
      statusCode: 200,
      body: JSON.stringify({ students: studentsPage, totalPages }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erreur lors de la récupération des élèves" }),
    };
  }
};

interface Student {
  name: string;
  house: string;
  yearOfBirth: number;
}

export { handler };
