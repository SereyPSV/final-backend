import { useDispatch } from 'react-redux';
import { Counter, H3, Icon } from '../../../../components';
import { Link } from 'react-router-dom';
import { CLOSE_MODAL, openModal, removeProductFromCartAsync } from '../../../../actions';
import { styled } from 'styled-components';
import { useState } from 'react';

const CartContainer = ({ className, cart }) => {
	const { id, imageUrl, productName, price, cartId, count } = cart;
	const [basketCounter, setBasketCounter] = useState(count);
	const dispatch = useDispatch();

	const onProductFromCartRemove = (cartId) => {
		dispatch(
			openModal({
				text: 'Удалить товар из корзины?',
				onConfirm: () => {
					dispatch(removeProductFromCartAsync(cartId));
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
					basketCounter={basketCounter}
					setBasketCounter={setBasketCounter}
				/>

				<div className="total-cost-product">{price * basketCounter} руб</div>
				<Icon
					size={'24px'}
					margin={'0 10px 0 10px'}
					id="fa-trash-o"
					color={'#999999'}
					onClick={() => onProductFromCartRemove(cartId)}
				/>
			</div>
		</div>
	);
};
export const Cart = styled(CartContainer)`
	// padding: 20px 40px;
	// display: flex;
	// flex-direction: column;
	// width: 100%;
	// max-height: 760px;
	// overflow: auto;

	height: 120px;
	display: flex;
	justify-content: space-between;
	border: 1px solid #ededed;

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

	& h2 {
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
`;
