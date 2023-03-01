function Header(props) {
    return (
    <header className='d-flex justify-between align-center'>
    <div className='d-flex align-center'>
      <img alt='logo' width={40} height={40} src='/img/logo.png'/>
      <div className='headerInfo'>
        <h3 className='text-uppercase'>React Sneakers</h3>
        <p>Магазин лучших крассовок</p>
      </div>
    </div>
    

    <ul className='d-flex'>
      <li onClick={props.onClickCart} className='mr-30 cu-p'>
        <img alt='cart' width={20} height={20} src='/img/cart.svg'/>
        <span>1205 руб.</span>
      </li>
      <li>
      <img alt='user' width={20} height={20} src='/img/user.svg'/>
      </li>
    </ul>
  </header>
  )
}

export default Header;