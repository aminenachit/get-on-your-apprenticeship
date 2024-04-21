import express, { Request, Response } from 'express';
import axios from 'axios';

const realRouter = express.Router();

// Route pour récupérer tous les élèves
realRouter.get('/students', async (req: Request, res: Response) => {
  try {
    const url = 'https://harry-potter-api-3a23c827ee69.herokuapp.com/api/characters';
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Erreur lors de la récupération des élèves');
  }
});

// route pour récupérer un élève au hasard
realRouter.get('/randomstudent', async (req: Request, res: Response) => {
  try {
    const url = 'https://harry-potter-api-3a23c827ee69.herokuapp.com/api/characters';
    const response = await axios.get(url);
    const students = response.data;
    const randomIndex = Math.floor(Math.random() * students.length);
    const randomStudent = students[randomIndex];
    res.json(randomStudent);
  } catch (error) {
    res.status(500).send('Erreur lors du tirage au sort de l\'élève');
  }
});



export default realRouter;
