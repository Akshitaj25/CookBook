import React, { useState, useEffect } from 'react';
import recipesData from './Weatherbased.json';
import "./WeatherRecipe.scss";

const WeatherRecipe = () => {
  const [weatherCondition, setWeatherCondition] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherData = await getWeatherCondition('370120e3ddbba6416b142f7181b6e494');
        setWeatherCondition(weatherData.weather[0].main);

        const recipeSuggestions = getRecipesBasedOnWeather(weatherData.weather[0].main);
        setRecipes(recipeSuggestions);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getWeatherCondition = async (apiKey) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Chennai&appid=${apiKey}`);
    const data = await response.json();
    return data;
  };

  const getRecipesBasedOnWeather = (weatherCondition) => {
    const weatherRecipes = recipesData.weather[weatherCondition.toLowerCase()] || recipesData.weather.default;

    if (!Array.isArray(weatherRecipes)) {
      return [];
    }

    return weatherRecipes.map(recipe => ({
      name: recipe.name,
      picture: recipe.picture,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
    }));
  };

  return (
    <div className='section-wrap bg-whitesmoke'>
      <div className="wr-title">Recipe Suggestions for Weather: {weatherCondition}</div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {recipes.map((recipe, index) => (
            <div key={index} className="recipe-container">
              <h3>{recipe.name}</h3>
              <img src={recipe.picture} alt={recipe.name} className="recipe-image" />
              <div className="recipe-details">
                <br/>
                <h4>Ingredients:</h4>
                <ul className='gridd'>
                    {recipe.ingredients.map((ingredient, i) => (
                        <li key={i} className="flex align-center">
                            <span className='li-dot'>{i + 1}</span>
                            <span className='text-capitalize  fs-15'>{ingredient}</span>
                        </li>
                    ))}
                </ul>
                <br/>
                <h4>Steps:</h4>
                <ol>
                  {recipe.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default WeatherRecipe;
