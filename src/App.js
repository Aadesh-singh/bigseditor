import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import  Landing  from './components/food-landinpage.component';
import Details from './components/food-details.component';
import Register from './components/register.component';

// const list = [
//   {
//     name: 'restraunt1',
//     image: '',
//     description: 'adfadfadfadfadfadfadfasdfadfasdsf'
//   }
// ]

function App() {
  return (
    <div className="App">
      {/* <Landing name="Navya" /> */}
      <Routes>
        <Route 
          path='/' 
          element={<Register />} 
        />
        <Route 
          path='/home' 
          element={<Landing />} 
        />
        <Route 
          path='details' 
          element={<Details />} 
        />
      </Routes>
    </div>
  );
}

export default App;
