import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import axios from "axios";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  try {
    const url = "https://harry-potter-api-3a23c827ee69.herokuapp.com/api/characters";
    const response = await axios.get(url);
    const students: Student[] = response.data;

    const houseCount = students.reduce((acc: HouseCount, student: Student) => {
      const house = student.house || "Unknown";
      acc[house] = (acc[house] || 0) + 1;
      return acc;
    }, {});

    const ageDistribution = students.reduce(
      (acc: AgeDistribution, student: Student) => {
        const age = student.yearOfBirth
          ? new Date().getFullYear() - student.yearOfBirth
          : "Unknown";
        acc[age] = (acc[age] || 0) + 1;
        return acc;
      },
      {}
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ houseCount, ageDistribution }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erreur lors de la récupération des statistiques" }),
    };
  }
};

interface Student {
  name: string;
  house: string;
  yearOfBirth: number;
}

interface HouseCount {
  [key: string]: number;
}

interface AgeDistribution {
  [key: string]: number;
}

export { handler };
