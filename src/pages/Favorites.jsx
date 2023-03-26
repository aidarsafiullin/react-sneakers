import Card from '../components/Card/Card';
import React from 'react';
import AppContext from '../context';

function Favorites({ onAddToFavorite, onAddToCart}) {
  const state = React.useContext(AppContext);
  
  return (
    <div className='content p-40'>
      <div className='d-flex align-center mb-40 justify-between'>
        <h1>Мои закладки</h1>
      </div>

      <div className='d-flex flex-wrap'>
        {state.favorites.map( (item, index) => (
            <Card
                key = {index}
                favorited = {true}
                onFavorite = {(obj) => onAddToFavorite(obj)}
                onCart = {(obj) => onAddToCart(obj)}
                {...item}
            />
          ))}
      </div>
    </div>
  )
}

export default Favorites;