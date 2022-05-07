import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { projectFirestore } from '../../firebase/config';

//styles
import './Recipe.css';

const Recipe = () => {
  const { id } = useParams();
  const { mode } = useTheme();
  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore.collection('recipes').doc(id).onSnapshot( (doc) => {
      if(doc.exists){
        setRecipe(doc.data())
        setIsPending(false);
      } else {
        setIsPending(false);
        setError('Could not find that recipe');
        setTimeout( () => {
          history.push('/');
        },2000);
      }
    });

    return () => unsub();
  }, [id, history]);

  const handleClick = () => {
    projectFirestore.collection('recipes').doc(id).update({
      title: 'Something completely different'
    })
  }

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className='error'>{ error }</p>}
      {isPending && <p className='loading'>Loading ...</p>}
      {recipe && 
        <>
          <h2 className='page-title'>{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map( (ingredient) => <li key={ingredient}>{ingredient}</li> )}
          </ul>
          <p className='method'>{recipe.method}</p>
          <button onClick={handleClick}>Update me</button>
        </>
      }
    </div>
  );
}
 
export default Recipe;