import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { trimDescription } from '../utils';
import { selectProducts } from '../../../../../../selectors';

const ProductsListContainer = ({ className }) => {
	const products = useSelector(selectProducts);

	return (
		<div className="products">
			{products.map(({ id, productName, imageUrl, description, price }) => (
				<Link key={id} className={className} to={`product/${id}`}>
					<div className="product-img">
						<img src={imageUrl} alt={`${productName}`} />
					</div>
					<div className="product-content">
						<div className="product-title">{productName}</div>
						<div className="product-description">
							{trimDescription(description, 250)}
						</div>
						<div className="product-price">{price.toFixed(2)} руб</div>
					</div>
				</Link>
			))}
		</div>
	);
};

export const ProductsList = styled(ProductsListContainer)`
	display: flex;
	width: 98%;
	padding: 0px;
	&:hover {
		cursor: pointer;
		background-color: rgba(252, 200, 42, 0.2);
	}

	& .product-img {
		& > img {
			height: 200px;
		}
	}
	& .product-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 10px;
		margin: 10px;
	}
	& .product-title {
		font-size: 20px;
	}

	& .product-description {
		font-size: 16px;
	}

	& .product-price {
		font-size: 20px;
	}
`;
