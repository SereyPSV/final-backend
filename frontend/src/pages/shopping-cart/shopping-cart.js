import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch } from 'react-router-dom';
import { RESET_SHOPPING_CART, setShoppingCart } from '../../actions';
import { request } from '../../utils/request';
import { Button, H2, Loader, PrivateContent } from '../../components';
import { Cart } from './components';
import { styled } from 'styled-components';
import { GROUPS, ROLE } from '../../constants';
import { selectShoppingCart } from '../../selectors';

const ShoppingCartContainer = ({ className }) => {
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const shoppingCart = useSelector(selectShoppingCart);
	const isCreating = !!useMatch('/shopping-cart/:userId');

	useLayoutEffect(() => {
		dispatch(RESET_SHOPPING_CART);
	}, [dispatch, isCreating]);

	useEffect(() => {
		setIsLoading(true);
		Promise.all([
			request(`/shoppingCart`),
			request(`/products?&searchPhrase=&searchGroup=${GROUPS}&sort=$&page=&limit=`),
		])
			.then(([{ data: shoppingCart }, { data: products }]) => {
				const newShoppingCart = [];
				shoppingCart.forEach((cart) => {
					products.products.forEach((product) => {
						if (product.id === cart.product) {
							newShoppingCart.push({
								...cart,
								imageUrl: product.imageUrl,
								productName: product.productName,
								price: product.price,
							});
						}
					});
				});
				dispatch(setShoppingCart(newShoppingCart));
			})
			.finally(() => setIsLoading(false));
	}, [dispatch]);

	isLoading && <Loader />; // лоадер

	return (
		<Loader isLoading={isLoading}>
			<PrivateContent
				access={[ROLE.ADMIN, ROLE.SELLER, ROLE.BUYER]}
				className="private-content"
			>
				<div className={className}>
					{!shoppingCart.length ? (
						<H2>Корзина пуста</H2>
					) : (
						<div>
							<H2>Корзина</H2>
							<div className="shopping-cart-list">
								{shoppingCart.map((cart) => {
									return (
										<Cart
											key={cart._id}
											cart={cart}
											shoppingCart={shoppingCart}
										/>
									);
								})}
							</div>
							<div className="total-cost-order">
								<div className="total-cost-order-wrapper">
									<div className="total-cost-order-position">
										<div className="title-total">Итого:</div>
										<div className="title-cost-order">
											{shoppingCart.reduce(
												(acc, item, i) =>
													acc + item.count * item.price,
												0,
											)}{' '}
											руб
										</div>
									</div>
									<Button width={'100%'}>Оформить заказ</Button>
								</div>
							</div>
						</div>
					)}
				</div>
			</PrivateContent>
		</Loader>
	);
};

export const ShoppingCart = styled(ShoppingCartContainer)`
	margin: auto;
	padding: 20px 40px;
	display: flex;
	flex-direction: column;
	text-align: center;
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

	.error {
		width: 1440px;
	}
`;
