/* eslint-disable react/jsx-key */
import './App.css'
import PageContainer from './container/pageContainer'
import Header from './components/Header'
import RouterConfig from './config/RouterConfig'
import Loading from './components/Loading'
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux'
import { calculateBasket, setDrawer, removeBasket } from './redux/slices/basketSlice'
import { useEffect } from 'react'

function App() {

  const { products, drawer, totalAmount } = useSelector((store) => store.basket);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(removeBasket({ id }))
  }

  useEffect(() => {
    dispatch(calculateBasket());
  }, [products, dispatch])

  return (
    <div>
      <PageContainer>
        <Header />
        <RouterConfig />
        <Loading />
        <Drawer className='drawer' anchor='right' open={drawer} onClose={() => dispatch(setDrawer())}>
          {
            products && products.map((product) => {
              return (
                <div key={product.id}>
                  <div className='flex-row' style={{ padding: '10px' }}>
                    <img style={{ marginRight: '5px' }} src={product.image} width={50} height={50} />
                    <p style={{ width: '320px', marginRight: '5px' }}>{product.title}({product.count})</p>
                    <p style={{ fontWeight: 'bold', marginRight: '10px', width: '50px' }}>{product.price} $</p>
                    <button onClick={() => handleDelete(product.id)} className='basket-button'>Çıkar</button>
                  </div>
                </div>
              )
            })
          }
          <div>
            <p style={{ marginLeft: '25x', marginRight: '25px', marginTop: '50px' }}> <h3>Toplam Tutar: {totalAmount} $ </h3></p>
          </div>
        </Drawer>
      </PageContainer>
    </div>
  )
}

export default App