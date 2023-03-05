function Drawer({onClose, items = []} ) {
    return ( 
    <div className='overlay'>
        <div className="drawer">
        <h2 className='d-flex justify-between mb-30'>
          Корзина <img onClick={onClose} className="cu-p" src="/img/remove.svg" alt="close"/></h2>

        <div className="items">
          {
            items.map(obj => (
              <div className="cartItem d-flex align-center mb-20">
                <div
                 style={{backgroundImage: `url(${obj.imgUrl})`}}
                 className="cartItem-img"></div>
                <div className='cartItem-text'>
                  <p className='mb-5'>{obj.title}</p>
                  <b>{obj.price} руб.</b>
                </div>
                <img className='removeBtn' src="/img/remove.svg" alt="remove" />
              </div>
            ))
          }
        </div>

        <div className="cartTotalBlock">
        <ul>
          <li className='d-flex'>
            <span>Итого:</span>
            <div></div>
            <b>21 498 руб. </b>
          </li>

          <li className='d-flex'>
            <span>Налог 5%:</span>
            <div></div>
            <b>1074 руб.</b>
          </li>
        </ul>
        
        <button className='greenButton'>Оформить заказ</button>
        </div>
        
      </div></div>
    )
}

export default Drawer;