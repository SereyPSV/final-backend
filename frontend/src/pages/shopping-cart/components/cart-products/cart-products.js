import { useDispatch, useSelector } from 'react-redux';
import { Button, Counter, H2, H3, Icon } from '../../../../components';
import { Link } from 'react-router-dom';
import { CLOSE_MODAL, openModal, removeProductFromCartAsync } from '../../../../actions';
import { useServerRequest } from '../../../../hooks';
import { styled } from 'styled-components';
import { selectShoppingCart } from '../../../../selectors';

const CartContainer = ({ className, userId, products, onProductInCartUpdate }) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const shoppingCart = useSelector(selectShoppingCart);

	let totalCostOrder = 0;
	let shoppingCartWithImg = [];

	products.forEach((product) => {
		shoppingCart.forEach((cart) => {
			if (cart.productId === product.id) {
				shoppingCartWithImg.push({
					...product,
					amountInCart: cart.amountInCart,
					idInCart: cart.id,
				});
				totalCostOrder += Number(product.price) * cart.amountInCart;
			}
		});
	});

	const onProductFromCartRemove = (idInCart, id) => {
		dispatch(
			openModal({
				text: 'Удалить товар из корзины?',
				onConfirm: () => {
					dispatch(
						removeProductFromCartAsync(requestServer, userId, idInCart, id),
					);
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => {
					dispatch(CLOSE_MODAL);
				},
			}),
		);
	};

	return (
		<div className={className}>
			{shoppingCartWithImg.map(
				({ id, imageUrl, productName, price, amountInCart, idInCart }) => {
					return (
						<div className="product" key={id}>
							<Link to={`/product/${id}`}>
								<div className="product-title">
									<div className="product-image">
										<img src={imageUrl} alt={productName} />
									</div>
									<H3>{productName}</H3>
								</div>
							</Link>
							<div className="products-order">
								<div className="cost-per-piece">{price} руб/шт</div>

								<Counter
									amountInCart={amountInCart}
									onProductInCartUpdate={onProductInCartUpdate}
								/>

								<div className="total-cost-product">
									{amountInCart * Number(price)} руб
								</div>
								<Icon
									size={'24px'}
									margin={'0 10px 0 10px'}
									id="fa-trash-o"
									color={'#999999'}
									onClick={() => onProductFromCartRemove(idInCart, id)}
								/>
							</div>
						</div>
					);
				},
			)}
		</div>
	);
};
export const Cart = styled(CartContainer)`
	padding: 20px 40px;
	display: flex;
	flex-direction: column;
	width: 1440px;
	height: 760px;
	overflow: auto;

	& .product {
		height: 120px;
		display: flex;
		justify-content: space-between;
		border: 1px solid #ededed;
	}

	& .product-title {
		display: flex;
		align-items: center;
	}

	& .product-image {
		width: 200px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	& .product-image img {
		width: 80px;
	}

	& H2 {
		padding: 20px 0 40px 0;
	}

	& .products-order {
		width: 600px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	& .cost-per-piece {
		display: flex;
		justify-content: center;
		width: 30%;
		font-size: 20px;
		font-weight: 400;
	}
	& .total-cost-product {
		display: flex;
		justify-content: center;
		width: 25%;
		font-size: 20px;
		font-weight: 500;
	}

	& .total-cost-order {
		display: flex;
		justify-content: flex-end;
		padding: 40px 0;
	}
	& .total-cost-order-wrapper {
		display: flex;
		flex-direction: column;
		width: 600px;
		padding: 24px;
		border: 1px solid #ededed;
	}
	& .total-cost-order-position {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		padding: 0 0 24px;
	}
	& .title-total {
		font-size: 20px;
		font-weight: 400;
	}
	& .title-cost-order {
		font-size: 36px;
		font-weight: 500;
	}
`;
