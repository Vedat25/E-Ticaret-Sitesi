import '../css/Header.css'
import { IoIosBasket } from "react-icons/io";
import { FaRegLightbulb } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawer } from '../redux/slices/basketSlice';


function Header() {

	const [theme, setTheme] = useState(false);
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const { products } = useSelector((store) => store.basket);

	const changeTheme = () => {
		const root = document.getElementById("root");
		if (theme) {
			root.style.backgroundColor = "black";
			root.style.color = "#fff"
		} else {
			root.style.backgroundColor = "#fff";
			root.style.color = "black"
		}
		setTheme(!theme);
	}
	return (
		<div className='inclusive'>
			<div className='flex-row' onClick={() => navigate("/")}>
				<img className='logo' src="./src/images/logo.webp" />
				<p className='logo-text'>YENİSEY</p>
			</div>
			<div className='flex-row'>
				<input className='search-input' type='text' placeholder='Ara' />
				<div >
					{theme ? <FaMoon className='icon' onClick={changeTheme} /> : <FaRegLightbulb className='icon' onClick={changeTheme} />}
					<Badge onClick={() => dispatch(setDrawer())} badgeContent={products.length} color='error'>
						<IoIosBasket style={{ marginRight: '5px' }} className='icon' />
					</Badge>
				</div>
			</div>
		</div>
	)
}

export default Header