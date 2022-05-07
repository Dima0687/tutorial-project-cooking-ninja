import { Link } from 'react-router-dom';
import useTheme from '../hooks/useTheme';
import TrashCan from '../assets/trashcan.svg'
import { projectFirestore } from '../firebase/config';


//style
import './RecipeList.css';

const RecipeList = ({recipes}) => {
  const { mode } = useTheme();
  
  if(recipes.length === 0){
    return <div className='error'>No recipes found ...</div>
  }

  const handleClick = (id) => {
    projectFirestore.collection('recipes').doc(id).delete();
  }

  return (
    <div className='recipe-list'>
      { recipes.map( (recipe) => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method.substring(0,100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook this</Link>
          <img 
            className='delete'
            src= {TrashCan}
            onClick = { () => handleClick(recipe.id)}
            alt='delete recipe'
          />
        </div>
      ))}
    </div>
  );
}
 
export default RecipeList;