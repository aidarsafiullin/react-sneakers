import Card from '../components/Card/Card';

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading
  }) {

    const renderitems = () => {
        return items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
        .map( (item, index) => (
        <Card
            key = {index}
            onFavorite = {(obj) => onAddToFavorite(obj)}
            onCart = {(obj) => onAddToCart(obj)}
            loading = {isLoading}
            {...item}
        />
        ))
    }

    return (
        <div className='content p-40'>
            <div className='d-flex align-center mb-40 justify-between'>
            <h1>{searchValue ? `Поиск по запросу: "${searchValue}" `: 'Все кроссовки'}</h1>
            <div className="search-block">
                <img width={14} height={14} src='/img/search.svg' alt='search' />
                <input onChange={onChangeSearchInput} value={searchValue} placeholder='Поиск...' />
            </div>
            </div>

            <div className='d-flex flex-wrap'>
                {renderitems()}
            </div>
        </div>
    )
}

export default Home;