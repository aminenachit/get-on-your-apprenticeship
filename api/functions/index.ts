import express from 'express';
import serverless from 'serverless-http';
import realRouter from '../src/routes/real';
import userRouter from '../src/routes/users';
import errorHandler from '../src/error-handler'; // Assurez-vous d'importer vos gestionnaires d'erreurs

const app = express();

app.use(express.json());
app.use('/real', realRouter);
app.use('/users', userRouter);

// Utilisez votre middleware de gestion des erreurs personnalisé
app.use(errorHandler);

// Détecter l'environnement d'exécution
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

// Exporter l'application pour Netlify
module.exports.handler = serverless(app);
