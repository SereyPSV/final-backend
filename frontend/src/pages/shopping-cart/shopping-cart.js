import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { useServerRequest } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '../../selectors';
import { setProductInCartAsync, setShoppingCartData } from '../../actions';
import { request } from '../../utils/request';
import { Button, H2 } from '../../components';
import { Cart } from './components';

const ShoppingCartContainer = ({ className }) => {
	const dispatch = useDispatch();

	const userId = useSelector(selectUserId);
	console.log(userId);

	useEffect(() => {
		request(`/shoppingCart/${userId}`, 'GET').then((shoppingCart) => {
			console.log(shoppingCart.data);
			// dispatch(setShoppingCartData(shoppingCart.data));
		});
	}, [userId]);

	// const onProductInCartUpdate = (productId, userId, basketCounter) => {
	// 	dispatch(setProductInCartAsync(requestServer, userId, productId, basketCounter));
	// };

	return (
		<div>
			<H2>Корзина</H2>
			{/* <Cart /> */}
			<div className="total-cost-order">
				<div className="total-cost-order-wrapper">
					<div className="total-cost-order-position">
						<div className="title-total">Итого:</div>
						<div className="title-cost-order">{'totalCostOrder'} руб</div>
					</div>
					<Button width={'100%'}>Оформить заказ</Button>
				</div>
			</div>
		</div>
	);
};

export const ShoppingCart = styled(ShoppingCartContainer)`
	margin: auto;
	padding: 20px 40px;
	display: flex;
	flex-direction: column;
	max-width: 1440px;

	& .path-to-product {
		width: 100%;
		padding: 20px 0;
	}

	& .product-wrapper {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

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
