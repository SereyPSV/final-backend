import styled from 'styled-components';
import { Button, Counter, H3, H4 } from '../../../../components';
import { Link } from 'react-router-dom';
import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProduct, selectShoppingCart, selectUserId } from '../../../../selectors';
import { request } from '../../../../utils/request';
import { setShoppingCart } from '../../../../actions';

const ProductContainer = ({ className }) => {
	const {
		imageUrl,
		productName,
		description,
		amount,
		price,
		count = 1,
		id,
	} = useSelector(selectProduct);
	const [basketCounter, setBasketCounter] = useState(count);
	const shoppingCart = useSelector(selectShoppingCart);
	const userId = useSelector(selectUserId);
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		setBasketCounter(count);
	}, [count]);

	const addInShoppingCart = () => {
		console.log(shoppingCart);
		request(`/shoppingCart`, 'POST', {
			count: basketCounter,
			productId: id,
		}).then((newCart) => {
			if (shoppingCart.length === 0) {
				console.log('корзина пустая', newCart.data);
				dispatch(setShoppingCart(newCart.data));
			}
			// if (
			// 	shoppingCart.length === 0 ||
			// 	shoppingCart.filter((cart) => cart.product === id).length === 0
			// ) {
			// 	console.log('add', newCart.data);
			// 	dispatch(setShoppingCart([...shoppingCart, newCart.data]));
			// } else {
			// 	console.log('edit');
			// 	dispatch(
			// 		setShoppingCart(
			// 			shoppingCart.map((cart) =>
			// 				cart.product === id
			// 					? { ...cart, count: basketCounter }
			// 					: { ...cart },
			// 			),
			// 		),
			// 	);
			// }
		});
	};

	return (
		<div className={className}>
			<div className="product-image">
				<img src={imageUrl} alt={productName} />
			</div>
			<div className="product-content">
				<H3>{productName}</H3>
				<div className="product-description">{description}</div>
				<H4>
					<span>Наличие: </span>
					{amount} <span>шт.</span>
				</H4>
				<div className="product-price">{price} руб.</div>
				{!!userId && (
					<div>
						<div>КОЛИЧЕСТВО:</div>
						<div className="counter-block">
							<Counter
								basketCounter={basketCounter}
								setBasketCounter={setBasketCounter}
							/>
							<Link to={`/shopping-cart/${userId}`}>
								<Button width={'170px'} onClick={addInShoppingCart}>
									В корзину
								</Button>
							</Link>
						</div>
						<div className="">
							<H4>
								<span>Сумма:</span> {price * basketCounter} руб.
							</H4>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
export const Product = styled(ProductContainer)`
	width: 100%;
	display: flex;
	justify-content: space-between;

	& .product-image {
		width: 32%;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid #ccc;
	}

	& .product-image img {
		width: 100%;
	}

	& .product-content {
		width: 64%;
		display: flex;
		flex-direction: column;
	}

	& H3 {
		padding: 40px 0 20px;
		font-size: 30px;
	}

	& .product-description {
		padding: 20px 0;
		font-size: 20px;
		border-bottom: 1px solid #fcc82a;
	}

	& H4 {
		padding: 20px 0 20px;
		font-size: 26px;
	}

	& .product-price {
		padding: 20px 0;
		font-size: 30px;
	}

	& .counter-block {
		display: flex;
	}
	& Button {
		margin: 0px 0px 0 20px;
	}
`;
