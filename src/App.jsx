import React from 'react';
import Card from './components/Card/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  
  React.useEffect(() => {
    fetch('https://63ffc1b929deaba5cb2b10b7.mockapi.io/items')
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
      });
  }, []);

  const onAddToCart = (obj) => {
    console.log('obj', obj)
  }

  return <div className='wrapper clear'>

    {cartOpened ? <Drawer items={cartItems} onClose={()=> setCartOpened(false)} /> : null}
    <Header onClickCart={()=> setCartOpened(true)} />

    <div className='content p-40'>
      <div className='d-flex align-center mb-40 justify-between'>
        <h1>Все кроссовки</h1>
        <div className="search-block">
          <img width={14} height={14} src='/img/search.svg' alt='search' />
          <input placeholder='Поиск...' />
        </div>
      </div>
     
      
      <div className='d-flex flex-wrap'>
        {items.map(item => (
          <Card
            title = {item.title}
            price = {item.price}
            imgUrl = {item.imgUrl}
            onFavorite = {() => null}
            onCart = {(obj) => onAddToCart(obj)}
          />
        ))}
      </div>

    </div>

    </div>
}

export default App;
