import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import './FoodList.css';

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFood, setSelectedFood] = useState(null);

    const fetchFoods = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        setFoods(response.data.meals);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Taaki koi Duvidha na aa sake
    useEffect(() => {
      fetchFoods();
    }, []);

  useEffect(() => {
    const storedSearchTerm = localStorage.getItem('searchTerm');
    if (storedSearchTerm) {
      setSearchTerm(storedSearchTerm);
    }
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setSelectedFood(null);
    localStorage.setItem('searchTerm', term);
  };

  const handleFoodClick = (food) => {
    setSearchTerm('');
    setSelectedFood(food);
  };

  return (
    <div className="food-list-container">
      <h2 className="title">Sorry sir Api nahi mila so mene meals wala API use kiya hai</h2>
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      <ul className="food-list">
        {selectedFood ? (
          <li className="food-item" key={selectedFood.idMeal}>
            {selectedFood.strMeal}
          </li>
        ) : (
          foods
            .filter((food) => food.strMeal.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((food) => (
              <li className="food-item" key={food.idMeal} onClick={() => handleFoodClick(food)}>
                {food.strMeal}
              </li>
            ))
        )}
      </ul>
    </div>
  );
};

export default FoodList;
