import { Link } from 'react-router-dom';
import useTheme from '../hooks/useTheme';

// components
import SearchBar from './SearchBar';

//styles
import './Navbar.css'

const Navbar = () => {
  const { color } = useTheme();

  return (
    <div className="navbar" style={{ background: color }}>
      <nav>
        <Link to="/" className='brand'>
          <h1>Cooking Ninja</h1>
        </Link>
        <SearchBar />
        <Link to="/create">Create Recipe</Link>
      </nav>
    </div>
  );
}
 
export default Navbar;