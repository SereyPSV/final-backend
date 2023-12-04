import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { request } from '../../utils/request';
import { Link, useParams } from 'react-router-dom';
import { Button, Counter, H3, H4 } from '../../components';
import { selectShoppingCart, selectUserId } from '../../selectors';

const ProductPageContainer = ({ className }) => {
	const [product, setProduct] = useState([]);
	const [basketCounter, setBasketCounter] = useState((product.amount = 1));
	const [isLoading, setIsLoading] = useState(false);
	const params = useParams();
	const userId = useSelector(selectUserId);

	useEffect(() => {
		setIsLoading(true);
		Promise.all([
			(request(`/products/${params.id}`), request('/shoppingCart', 'GET')),
		])
			.then(([product, shoppingCart]) => {
				setProduct(product.data);
				console.log(shoppingCart);
			})
			.finally(() => setIsLoading(false));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={className}>
			<div className="path-to-product">
				{product.group} / {product.id}
			</div>
			<div className="product-wrapper">
				<div className="product-image">
					<img src={product.imageUrl} alt={product.productName} />
				</div>
				<div className="product-content">
					<H3>{product.productName}</H3>
					<div className="product-description">
						{product.productDescription}
					</div>
					<H4>
						<span>Наличие: </span>
						{product.amount} <span>шт.</span>
					</H4>
					<div className="product-price">{product.price} руб.</div>
					<div>КОЛИЧЕСТВО:</div>
					<div className="counter-block">
						<Counter
							productId={product.id}
							basketCounter={basketCounter}
							setBasketCounter={setBasketCounter}
						/>
						<Link to="/shopping-cart">
							<Button
								onClick={() =>
									request('/shoppingCart', 'POST', {
										count: basketCounter,
										productId: params.id,
									})
								}
							>
								В корзину
							</Button>
						</Link>
					</div>
					<div className="">
						<H4>
							<span>Сумма:</span> {product.price * basketCounter} руб.
						</H4>
					</div>
				</div>
			</div>
		</div>
	);
};

export const ProductPage = styled(ProductPageContainer)`
	margin: auto;
	padding: 20px 40px;
	display: flex;
	flex-direction: column;
	width: 1440px;

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
