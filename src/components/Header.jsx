import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context';

function Header(props) {
    const {cartItems} = React.useContext(AppContext);
    const totalPrice = cartItems.reduce((sum, cur) => cur.price + sum , 0);
  
    return (
      <header className='d-flex justify-between align-center p-40'>
      <Link to='/'>
      <div className='d-flex align-center'>
        
        <img alt='logo' width={40} height={40} src='/img/logo.png'/>
        <div className='headerInfo'>
          <h3 className='text-uppercase'>React Sneakers</h3>
          <p>Магазин лучших крассовок</p>
        </div>
      </div>
      </Link>

      <ul className='d-flex'>
        <li onClick={props.onClickCart} className='mr-30 cu-p'>
          <img alt='cart' width={20} height={20} src='/img/cart.svg'/>
          <span>{totalPrice} руб.</span>
        </li>
        <li className="mr-20 cu-p">
          <Link to="/favorites">
            <img alt='user' width={20} height={20} src='/img/heart.svg'/>
          </Link>
        </li>
        <li>
          <img alt='user' width={20} height={20} src='/img/user.svg'/>
        </li>
      </ul>
    </header>
  )
}

export default Header;