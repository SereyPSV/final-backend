import { styled } from 'styled-components';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts, selectShoppingCart } from '../../selectors';
import { setProductsData, setShoppingCartData } from '../../actions';
import { request } from '../../utils/request';
import { Button, H2, Loader } from '../../components';
import { Cart } from './components';
import { useMatch } from 'react-router-dom';
import { RESET_SHOPPING_CART_DATA } from '../../actions/reset-shopping-cart-data';

const ShoppingCartContainer = ({ className }) => {
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const products = useSelector(selectProducts);
	const shoppingCart = useSelector(selectShoppingCart);
	const isCreating = !!useMatch('/shopping-cart/:userId');

	useLayoutEffect(() => {
		dispatch(RESET_SHOPPING_CART_DATA);
	}, [dispatch, isCreating]);
	console.log(shoppingCart);
	let newShoppingCart = [],
		totalCostOrder = 0;
	shoppingCart.forEach((cart) => {
		products.forEach((product) => {
			if (product.id === cart.product) {
				newShoppingCart.push({
					...product,
					count: cart.count,
					cartId: cart._id,
				});
			}
		});
	});

	totalCostOrder = newShoppingCart.reduce(
		(acc, item, i) => acc + item.count * item.price,
		0,
	);

	useEffect(() => {
		setIsLoading(true);
		Promise.all([
			request(`/shoppingCart`),
			request('/products?&search=&sort=&page=&limit='),
		])
			.then(([shoppingCart, products]) => {
				dispatch(setShoppingCartData(shoppingCart.data));
				dispatch(setProductsData(products.data.products));
			})
			.finally(() => setIsLoading(false));
	}, [dispatch]);

	isLoading && <Loader />; // лоадер

	return (
		<div className={className}>
			<H2>Корзина</H2>
			<div className="shopping-cart-list">
				{newShoppingCart.map((cart) => (
					<Cart key={cart.id} cart={cart} />
				))}
			</div>

			<div className="total-cost-order">
				<div className="total-cost-order-wrapper">
					<div className="total-cost-order-position">
						<div className="title-total">Итого:</div>
						<div className="title-cost-order">{totalCostOrder} руб</div>
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
	width: 1370px;

	& h2 {
		width: 100%;
		padding: 10px 40px;
	}

	& .shopping-cart-list {
		height: 490px;
		overflow: auto;
		padding: 10px 40px;
	}

	& .total-cost-order {
		width: 100%;
		display: flex;
		justify-content: flex-end;
	}

	& .total-cost-order-wrapper {
		width: 45%;
		margin: 20px 40px;
		padding: 30px;
		// 	display: flex;
		// 	justify-content: center;
		// 	align-items: center;
		border: 1px solid #ccc;
	}

	& .total-cost-order-position {
		display: flex;
		justify-content: space-between;
		padding: 20px;
		font-size: 28px;
	}

	& .title-total {
		width: 40%;
	}

	& button {
		font-size: 20px;
	}
`;
