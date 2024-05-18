import express, { Request, Response } from 'express';
import axios from 'axios';

const realRouter = express.Router();

// Route pour récupérer tous les élèves ou les filtrer
realRouter.get('/students', async (req: Request, res: Response) => {
  try {
    const { house, page = 1 } = req.query;
    const pageSize = 6;
    const url =
      'https://harry-potter-api-3a23c827ee69.herokuapp.com/api/characters';
    const response = await axios.get(url);
    let students: Student[] = response.data;

    if (house) {
      students = students.filter((student: Student) => student.house === house);
    }

    // Pagination
    const totalStudents = students.length;
    const totalPages = Math.ceil(totalStudents / pageSize);
    const startIndex = (Number(page) - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const studentsPage = students.slice(startIndex, endIndex);

    res.json({ students: studentsPage, totalPages });
  } catch (error) {
    res.status(500).send('Erreur lors de la récupération des élèves');
  }
});

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
// route pour récupérer un élève au hasard
realRouter.get('/randomstudent', async (req: Request, res: Response) => {
  try {
    const url =
      'https://harry-potter-api-3a23c827ee69.herokuapp.com/api/characters';
    const response = await axios.get(url);
    const students = response.data;
    const randomIndex = Math.floor(Math.random() * students.length);
    const randomStudent = students[randomIndex];
    res.json(randomStudent);
  } catch (error) {
    res.status(500).send("Erreur lors du tirage au sort de l'élève");
  }
});

// Route pour récupérer les statistiques des élèves
realRouter.get('/students/stats', async (req: Request, res: Response) => {
  try {
    const url =
      'https://harry-potter-api-3a23c827ee69.herokuapp.com/api/characters';
    const response = await axios.get(url);
    const students: Student[] = response.data;

    const houseCount = students.reduce((acc: HouseCount, student: Student) => {
      const house = student.house || 'Unknown';
      acc[house] = (acc[house] || 0) + 1;
      return acc;
    }, {});

    const ageDistribution = students.reduce(
      (acc: AgeDistribution, student: Student) => {
        const age = student.yearOfBirth
          ? new Date().getFullYear() - student.yearOfBirth
          : 'Unknown';
        acc[age] = (acc[age] || 0) + 1;
        return acc;
      },
      {},
    );

    res.json({ houseCount, ageDistribution });
  } catch (error) {
    res.status(500).send('Erreur lors de la récupération des statistiques');
  }
});

export default realRouter;
