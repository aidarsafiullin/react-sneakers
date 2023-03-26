import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Drawer from './components/Drawer/Drawer';
import axios from 'axios';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AppContext from './context';



function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get('http://localhost:3001/cart'),
          axios.get('http://localhost:3001/favorites'),
          axios.get('http://localhost:3001/items'),
        ]);
        
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);

        await timeout(500);
        setIsLoading(false);
      } catch (error) {
        alert('Ошибка при запросе данных ;(');
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const timeout = (delay) => {
    return new Promise( res => setTimeout(res, delay) );
  }

  const onAddToCart = (obj) => {
    try {
      if(cartItems.find(item => Number(item.id) === Number(obj.id))) {
        axios.delete(`http://localhost:3001/cart/${obj.id}`);
        setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
      } else {
        axios.post('http://localhost:3001/cart', obj);
        
        setCartItems( prev => [...prev, obj]);
      }
      
    } catch(error) {

    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`http://localhost:3001/favorites/${obj.id}`);
        setFavorites( prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        const {data} = await axios.post('http://localhost:3001/favorites', obj);
        setFavorites( prev => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты');
      console.error(error);
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`http://localhost:3001/cart/${id}`);
        
    setCartItems( prev => prev.filter(item => item.id !== id));
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.id) === Number(id));
  }

  return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, setCartOpened, setCartItems}}>
      <div className='wrapper clear'>
    { cartOpened 
      ? <Drawer 
          items={cartItems}
          onRemove={onRemoveItem}
          onClose={() => setCartOpened(false)}
          opened={cartOpened}
        />
      : null }
    <Header onClickCart={()=> setCartOpened(true)} />

    <Routes>
      <Route path="/" element={
        <Home
          items={items}
          cartItems={cartItems}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
          isLoading={isLoading}
        />}
      />

      <Route path="/favorites" element={
        <Favorites
          items={favorites}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
        />}
      />
    </Routes>
    </div>
    </AppContext.Provider>
  )
}

export default App;
