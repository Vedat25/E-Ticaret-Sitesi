import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { setSelectedProduct } from '../redux/slices/productSlice';
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import '../css/ProductDetails.css'
import { addToBasket, calculateBasket } from '../redux/slices/basketSlice';

function ProductDetails() {
	const { id } = useParams();
	const { products, selectedProduct } = useSelector((store) => store.product)

	const { price, image, title, description } = selectedProduct;

	const [count, setCount] = useState(0);

	const dispatch = useDispatch();

	const increment = () => {
		setCount(count + 1)
	}

	const decrement = () => {
		setCount(count - 1)
	}

	const addBasket = () => {
		const payload = {
			id,
			price,
			image,
			title,
			description,
			count
		}
		dispatch(addToBasket(payload));
		dispatch(calculateBasket());

	}

	useEffect(() => {
		getProductById();

	}, [])

	const getProductById = () => {
		products && products.map((product) => {
			if (product.id == id) {
				dispatch(setSelectedProduct(product));
			}
		});
	}
	return (
		<div className='product-main-div'>
			<div style={{ marginRight: '50px' }}>
				<img className='product-image' src={image} alt='' />
			</div>
			<div>
				<h1>{title}</h1>
				<p>{description}</p>
				<h1>{price} $</h1>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<CiCircleMinus className='circle-dec' onClick={decrement} /> <span style={{ fontSize: '25px' }}>{count}</span> <CiCirclePlus className='circle-inc' onClick={increment} />
				</div>
				<div>
					<button onClick={addBasket} className='product-button'>Sepete Ekle</button>
				</div>
			</div>
		</div>
	)
}

export default ProductDetails
