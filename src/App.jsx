import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import WelcomeMessage from './WelcomeMessage';
import { fetchRecipes, fetchRecipeDetails } from './api';

const RecipeApp = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleFetchRecipes = async () => {
    try {
      const meals = await fetchRecipes(query);
      setRecipes(meals);
    } catch (error) {
      console.error('Fehler beim Abrufen der Rezepte:', error);
    }
  };

  const handleRecipeClick = async (recipeId) => {
    try {
      const recipe = await fetchRecipeDetails(recipeId);
      setSelectedRecipe(recipe);
    } catch (error) {
      console.error('Fehler beim Abrufen der Rezeptdetails:', error);
    }
  };

  return (
    <div className="app">
      <WelcomeMessage />
      <header>
        <h1>Rezept Suche</h1>
      </header>
      <main>
        <input
          type="text"
          id="recipe-search"
          name="recipe-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Gib ein Rezept in English ein"
        />
        <button onClick={handleFetchRecipes}>Suchen</button>
        <ul className="ul-list">
          {recipes && recipes.map(recipe => (
            <li className="li-list" key={recipe.idMeal} onClick={() => handleRecipeClick(recipe.idMeal)}>
              {recipe.strMeal}
            </li>
          ))}
        </ul>
        {selectedRecipe && (
          <div className="container">
            <div className="selected-recipe">
              <div className='recipe-details'>
              <h2>{selectedRecipe.strMeal}</h2>
              <p>{selectedRecipe.strInstructions}</p>
              </div>
              <img src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} />
            </div>
          </div>
        )}
      </main>
      <footer>
        <p>created by Yousef ®</p>
        <div className="social-icons">
          <a href="https://www.instagram.com/youssef0d/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://github.com/YoussefDawod" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="https://www.linkedin.com/in/youssef-dawod-203273215/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default RecipeApp;