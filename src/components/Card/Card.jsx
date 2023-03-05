import React, { useState } from 'react';

import styles from './Card.module.scss';

function Card({onFavorite, title, imgUrl, price, onCart}) {
  const [isAdded, setIsAdded] = useState(false);

  const onClickPlus = () => {
    onCart({title, imgUrl, price});
    setIsAdded(!isAdded);
  }
  
  React.useEffect( () => {
  }, [isAdded]);

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick = {onFavorite}>
          <img src='/img/unliked.svg' alt='unlike'/>
      </div>
      
      <img width={133} height={112 } src={imgUrl} alt="sneaker"></img>
      <h5>{title}</h5>
      <div className='d-flex justify-between align-center'>
          <div className='d-flex flex-column'>
          <span>Цена:</span>
          <b>{price} руб.</b>
          </div>

          <img className={styles.plus} onClick = {onClickPlus} src = {isAdded ? "/img/added.svg" : "/img/add.svg"} alt="add"></img>

      </div>
    </div>
  );
}

export default Card;

