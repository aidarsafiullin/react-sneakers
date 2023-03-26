import React from 'react';
import axios from 'axios';
import Info from '../Info';
import AppContext from '../../context';
import styles from './Drawer.module.scss';

const delay = (delay) => new Promise( resolve => setTimeout(resolve, delay));

function Drawer({onClose, onRemove, items = [], opened = false} ) {
  const {cartItems, setCartItems} = React.useContext(AppContext);
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const totalPrice = cartItems.reduce((sum, cur) => cur.price + sum , 0);

  const onClickOrder = async () => {
    const {data} = await axios.post('http://localhost:3001/orders', {
      items: cartItems
    });
    try {
      setIsLoading(true);
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let index = 0; index < cartItems.length; index++) {
        const item = cartItems[index];
        await axios.delete('http://localhost:3001/cart' + item.id);
        await delay(1000);
      }
      
    } catch (error) {
      alert('не удалось создать заказ');
    }
    setIsLoading(false);
  };

  return ( 
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
    <div className={styles.drawer}>
    <h2 className='d-flex justify-between mb-30'>
      Корзина <img onClick={onClose} className="cu-p" src="/img/remove.svg" alt="close"/>
    </h2>

    {items.length > 0 ? (
        <div className="d-flex flex-column flex">
          <div className="items flex">
            {items.map((obj) => (
              <div key={obj.id} className="cartItem d-flex align-center mb-20">
                <div
                  style={{ backgroundImage: `url(${obj.imgUrl})` }}
                  className="cartItemImg"></div>

                <div className="mr-20 flex">
                  <p className="mb-5">{obj.title}</p>
                  <b>{obj.price} руб.</b>
                </div>
                <img
                  onClick={() => onRemove(obj.id)}
                  className="removeBtn"
                  src="img/remove.svg"
                  alt="Remove"
                />
              </div>
            ))}
          </div>
          <div className="cartTotalBlock">
            <ul>
              <li>
                <span>Итого:</span>
                <div></div>
                <b>{totalPrice}</b>
              </li>
              <li>
                <span>Налог 20%:</span>
                <div></div>
                <b>{(totalPrice / 100) * 20} руб. </b>
              </li>
            </ul>
            <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
              Оформить заказ <img src="img/arrow.svg" alt="Arrow" />
            </button>
          </div>
        </div>
      ) : (
        <Info
          title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
          description={
            isOrderComplete
              ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
              : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
          }
          image={isOrderComplete ? 'img/complete-order.jpg' : 'img/empty-cart.jpg'}
        />
      )}
    
    </div>
  </div>
  );
}

export default Drawer;