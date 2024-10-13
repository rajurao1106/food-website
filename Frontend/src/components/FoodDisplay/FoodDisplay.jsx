import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

function FoodDisplay({ category }) {
  const { food_list } = useContext(StoreContext)

  // Filter the food list based on the category
  const filteredFoodList = food_list.filter(item => category === "All" || category === item.category)

  return (
    <div className='food-display' id='food-display'>
      <h2>Top Dishes Near You</h2>
      <div className="food-display-list">
        {filteredFoodList.length > 0 ? (
          filteredFoodList.map((item, index) => (
            <FoodItem
              key={item._id} // It's better to use a unique identifier like `_id` instead of `index`
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <p>No dishes available in this category.</p>
        )}
      </div>
    </div>
  )
}

export default FoodDisplay
