import { useState, useEffect } from 'react';
import logo from './assets/hogwarts.png';
import './App.css';

// Importe les images des maisons ici
import gryffindorLogo from './assets/gryffindor.png';
import ravenclawLogo from './assets/ravenclaw.png';
import slytherinLogo from './assets/slytherin.png';
import hufflepuffLogo from './assets/hufflepuff.png';


/*import harrypotter from './assets/harrypotter.png';
import hermionegranger from './assets/hermionegranger.png';
import lunalovegood from './assets/lunalovegood.png';
import nevillelongbottom from './assets/nevillelongbottom.png';
import ronweasley from './assets/ronweasley.png';*/
import nop from './assets/nop.png';

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
      const response = await fetch('http://localhost:3000/real/students');
      const data = await response.json();
      setStudents(data.map(student => ({
        ...student,
      
        houseLogo: getHouseLogo(student.house),
      })));
      animateCards();
    };
  
    fetchStudents();
  }, []);

  // Fonction pour obtenir le logo de la maison du student
  const getHouseLogo = (house) => {
    switch (house) {
      case 'Gryffindor':
        return gryffindorLogo;
      case 'Ravenclaw':
        return ravenclawLogo;
        case 'Slytherin':
        return slytherinLogo;
        case 'Hufflepuff':
        return hufflepuffLogo;
      default:
        return nop; 
    }
  };

  /*const getStudentLogo = (name) => {
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
        return nop; 
    }
  };*/

  const animateCards = () => {
    const cards = document.querySelectorAll('.student-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = 1;
        card.style.transform = 'translateY(0)';
      }, 150 * index);
    });
  };

  // Ajout d'un état pour stocker les students tiré au sort
  const [randomStudent, setRandomStudent] = useState(null);

  const fetchRandomStudent = async () => {
    const response = await fetch('http://localhost:3000/real/randomstudent');
    const data = await response.json();
    setRandomStudent({
      ...data,
     
      houseLogo: getHouseLogo(data.house),
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"  />
        <div><button onClick={fetchRandomStudent}> Tirer un élève au sort</button>
        {randomStudent && (
          <div className="student-card">
            {/*<img src={student.photoUrl} alt={`Photo de ${student.name}`} className="student-photo" /> */}
            <img src={randomStudent.image ? randomStudent.image : nop} alt={`Photo de ${randomStudent.name}`} className="student-photo" />
            <img src={randomStudent.houseLogo} alt={`Logo de la maison ${randomStudent.house}`} className="house-logo" />
            <h3>Nom : {randomStudent.name}</h3>
            <h4>Naissance : {randomStudent.dateOfBirth}</h4>
            <h4>Surnom : {randomStudent.alternate_names}</h4>
          </div>
        )}</div>

        <h2>Voici la liste de tous les élèves :</h2>
        <div className="student-list">
          {students ? students.map(student => (
            <div key={crypto.randomUUID()} className="student-card">
              {/*<img src={student.photoUrl} alt={`Photo de ${student.name}`} className="student-photo" /> */}
              <img src={student.image ? student.image : nop} alt={`Photo de ${student.name}`} className="student-photo" />
              <img src={student.houseLogo} alt={`Logo de la maison ${student.house}`} className="house-logo" />
              <h3>Name : {student.name}</h3>
              <h4>Birth : {student.dateOfBirth}</h4>
              <h4>surname : {student.alternate_names}</h4>
            </div>
          )) : "Chargement..."}
        </div>
      </header>
    </div>
  );
}

export default App;
