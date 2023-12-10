import styled from 'styled-components';
import { Button, Counter, H3, H4 } from '../../../../components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '../../../../selectors';
import { saveShoppingCartAsync } from '../../../../actions/save-product-to-cart-async';

const ProductContainer = ({ className, product, productId }) => {
	const { imageUrl, productName, description, amount, price, count } = product;
	const [basketCounter, setBasketCounter] = useState(count);
	const userId = useSelector(selectUserId);
	const dispatch = useDispatch();

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
								<Button
									width={'170px'}
									onClick={() => {
										dispatch(
											saveShoppingCartAsync({
												count: basketCounter,
												productId: productId,
											}),
										);
									}}
								>
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
