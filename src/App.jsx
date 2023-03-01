import React from 'react';
import Card from './components/Card/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

const arr = [
  {
    'title': 'Мужские Кроссовки Nike Blazer Mid Suede',
    'price': 12999,
    'imgUrl': '/img/sneakers/1.jpg'
  },
  {
    'title': 'Мужские Кроссовки Nike Air Max',
    'price': 15999,
    'imgUrl': '/img/sneakers/2.jpg'
  },
  {
    'title': 'Мужские Кроссовки Nike Air Max',
    'price': 15999,
    'imgUrl': '/img/sneakers/3.jpg'
  },
  {
    'title': 'Мужские Кроссовки Nike Air Max',
    'price': 15999,
    'imgUrl': '/img/sneakers/4.jpg'
  },
  {
    'title': 'Мужские Кроссовки Nike Air Max',
    'price': 15999,
    'imgUrl': '/img/sneakers/5.jpg'
  },
  {
    'title': 'Мужские Кроссовки Nike Air Max',
    'price': 15999,
    'imgUrl': '/img/sneakers/6.jpg'
  },
  {
    'title': 'Мужские Кроссовки Nike Blazer Mid Suede',
    'price': 12999,
    'imgUrl': '/img/sneakers/7.jpg'
  },
  {
    'title': 'Мужские Кроссовки Nike Air Max',
    'price': 15999,
    'imgUrl': '/img/sneakers/8.jpg'
  },
  {
    'title': 'Мужские Кроссовки Nike Air Max',
    'price': 15999,
    'imgUrl': '/img/sneakers/9.jpg'
  },
  {
    'title': 'Мужские Кроссовки Nike Air Max',
    'price': 15999,
    'imgUrl': '/img/sneakers/9.jpg'
  },
  {
    'title': 'Мужские Кроссовки Nike Air Max',
    'price': 15999,
    'imgUrl': '/img/sneakers/11.jpg'
  },
  {
    'title': 'Мужские Кроссовки Nike Air Max',
    'price': 15999,
    'imgUrl': '/img/sneakers/12.jpg'
  },
]

function App() { 
  const [cartOpened, setCartOpened] = React.useState(false);
  
  return <div className='wrapper clear'>

    {cartOpened ? <Drawer onClose={()=> setCartOpened(false)} /> : null}
    <Header onClickCart={()=> setCartOpened(true)} />

    <div className='content p-40'>
      <div className='d-flex align-center mb-40 justify-between'>
        <h1>Все кроссовки</h1>
        <div className="search-block">
          <img width={14} height={14} src='/img/search.svg' alt='search' />
          <input placeholder='Поиск...' />
        </div>
      </div>
     
      
      <div className='d-flex'>
        {arr.map(item => (
          <Card
            title = {item.title}
            price = {item.price}
            imgUrl = {item.imgUrl}
            onFavorite = {() => console.log('лайк')}
            onCart = {() => console.log('в корзину')}
          />
        ))}
      </div>

    </div>

    </div>
}

export default App;
