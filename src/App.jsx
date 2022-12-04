import { Link, Route, Routes } from 'react-router-dom';
import Game from './components/Game';
import Toggle from './components/toggle/Toggle';

function App() {
  return (
    <div className="">
      {/* <Toggle> */}
      <nav>
        <ul>
          <li>
            <Link to={'/'}>Game 01</Link>
          </li>
          <li>
            <Link to={'/2'}>Game 02</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Game GameTitle={'Game 01'} />} />
        <Route path="/2" element={<Game GameTitle={'Game 02'} />} />
      </Routes>

      {/* </Toggle> */}
    </div>
  );
}

export default App;
