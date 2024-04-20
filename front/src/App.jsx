import { useState, useEffect } from 'react';
import logo from './assets/hogwarts.png';
import './App.css';

// Importe les images des maisons ici
import gryffindorLogo from './assets/gryffindor.png';
import ravenclawLogo from './assets/ravenclaw.png';


import harrypotter from './assets/harrypotter.png';
import hermionegranger from './assets/hermionegranger.png';
import lunalovegood from './assets/lunalovegood.png';
import nevillelongbottom from './assets/nevillelongbottom.png';
import ronweasley from './assets/ronweasley.png';

// Crée un objet pour associer les noms des élèves à leurs photos
/*const studentPhotos = {
  'Harry Potter': './assets/harrypotter.png',
  'Hermione Granger': './assets/hermionegranger.png',
  'Luna Lovegood': './assets/lunalovegood.png',
  'Neville Longbottom': './assets/nevillelongbottom.png',
  'Ron Weasley': './assets/ronweasley.png'
};*/

function App() {
  const [students, setStudents] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch('http://localhost:3000/dummy/students');
      const data = await response.json();
      setStudents(data.map(student => ({
        ...student,
        photoUrl: getStudentLogo(student.name), // Utilise l'objet pour obtenir le chemin de la photo
        houseLogo: getHouseLogo(student.house) // Ajoute le logo de la maison ici
      })));
      animateCards();
    };

    fetchStudents();
  }, []);

  // Fonction pour obtenir le logo de la maison de l'élève
  const getHouseLogo = (house) => {
    switch (house) {
      case 'Gryffindor':
        return gryffindorLogo;
      case 'Ravenclaw':
        return ravenclawLogo;
      default:
        return ''; // ou une image par défaut
    }
  };

  const getStudentLogo = (name) => {
    switch (name) {
        case 'Harry Potter':
        return harrypotter;
        case 'Hermione Granger':
        return hermionegranger;
        case 'Luna Lovegood':
        return lunalovegood;
        case 'Neville Longbottom':
        return nevillelongbottom;
        case 'Ron Weasley':
        return ronweasley;
      default:
        return ''; // ou une image par défaut
    }
  };

  const animateCards = () => {
    const cards = document.querySelectorAll('.student-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = 1;
        card.style.transform = 'translateY(0)';
      }, 150 * index);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"  />
        <p>Voici la liste de tous les élèves :</p>
        <div className="student-list">
          {students ? students.map(student => (
            <div key={crypto.randomUUID()} className="student-card">
              <img src={student.photoUrl} alt={`Photo de ${student.name}`} className="student-photo" />
              <img src={student.houseLogo} alt={`Logo de la maison ${student.house}`} className="house-logo" />
              <h3>{student.name}</h3>
              <p>Maison : {student.house}</p>
            </div>
          )) : "Chargement..."}
        </div>
      </header>
    </div>
  );
}

export default App;
