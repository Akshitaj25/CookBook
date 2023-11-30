import React from 'react';
import "./HomePage.scss";
import { useMealContext } from '../../context/mealContext';
import Loader from "../../components/Loader/Loader";
import NotFound from "../../components/NotFound/NotFound";
import MealList from "../../components/Meal/MealList";
import CategoryHome from '../../components/Category/Home-List/CategoryHome';
import WeatherRecipe from '../../components/WeatherRecipe/WeatherRecipe';
const HomePage = () => {
  const {categories, meals, categoryLoading, mealsLoading} = useMealContext();

  return (
    <main className='main-t'>
      { (mealsLoading) ? <Loader /> : (meals === null) ? <NotFound /> : (meals?.length) ? <MealList meals={meals} /> : "" }
      <div className='a'>
        <div className = 'category-barr' >
        <div className='category-bar'>
          { (categoryLoading) ? <Loader /> : <CategoryHome categories={categories} /> }
        </div>
        </div>
        {/* <div> */}
        <div className='weather-recipe'>
          <WeatherRecipe />
        </div>
        {/* </div> */}
      </div>
    </main>
  )  
}

export default HomePage;
