// front/src/Home.jsx
import { useState, useEffect } from 'react';
import gryffindorLogo from './assets/gryffindor.png';
import ravenclawLogo from './assets/ravenclaw.png';
import slytherinLogo from './assets/slytherin.png';
import hufflepuffLogo from './assets/hufflepuff.png';
import nop from './assets/nop.png';
import './App.css';

const Home = () => {
  const [students, setStudents] = useState(null);
  const [selectedHouse, setSelectedHouse] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchStudents(selectedHouse, currentPage);
  }, [selectedHouse, currentPage]);

  const fetchStudents = async (house, page) => {
    let url = `http://localhost:3000/real/students?page=${page}`;
    if (house !== 'all') {
      url += `&house=${house}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    setStudents(
      data.students.map((student) => ({
        ...student,
        houseLogo: getHouseLogo(student.house),
      }))
    );
    setTotalPages(data.totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
    window.scrollTo(0, 500);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages);
    window.scrollTo(0, 500);
  };

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
    <div>
      <div>
        <button onClick={fetchRandomStudent}>Pick random student</button>
        {randomStudent && (
          <div className={`random-student-card ${randomStudent && 'winner'}`}>
            <img
              src={randomStudent.image ? randomStudent.image : nop}
              alt={`Photo de ${randomStudent.name}`}
              className="student-photo"
            />
            <img
              src={randomStudent.houseLogo}
              alt={`Logo de la maison ${randomStudent.house}`}
              className="house-logo"
            />
            <h3>Nom : {randomStudent.name}</h3>
            <h4>Naissance : {randomStudent.dateOfBirth}</h4>
            <h4>Surnom : {randomStudent.alternate_names}</h4>
          </div>
        )}
      </div>
      <h2>Here is the list of all the students :</h2>
      <div className="center">
        <button onClick={() => setSelectedHouse('all')}>All</button>
        <button onClick={() => setSelectedHouse('Gryffindor')}>Gryffindor</button>
        <button onClick={() => setSelectedHouse('Ravenclaw')}>Ravenclaw</button>
        <button onClick={() => setSelectedHouse('Slytherin')}>Slytherin</button>
        <button onClick={() => setSelectedHouse('Hufflepuff')}>Hufflepuff</button>
      </div>
      <div className="student-list">
        {students
          ? students.map((student) => (
              <div key={crypto.randomUUID()} className="student-card">
                <img
                  src={student.image ? student.image : nop}
                  alt={`Photo de ${student.name}`}
                  className="student-photo"
                />
                <img
                  src={student.houseLogo}
                  alt={`Logo de la maison ${student.house}`}
                  className="house-logo"
                />
                <h3>Name : {student.name}</h3>
                <h4>Birth : {student.dateOfBirth}</h4>
                <h4>surname : {student.alternate_names}</h4>
              </div>
            ))
          : 'Loading...'}
        <div className="center">
          <button onClick={handlePrevPage}>Previous</button>
          <button onClick={handleNextPage}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
