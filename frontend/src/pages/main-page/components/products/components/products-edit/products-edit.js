import { useSelector } from 'react-redux';
import { selectProductCategories, selectProducts } from '../../../../../../selectors';
import { TableRow, ProductRow } from './components';
import styled from 'styled-components';

const ProductsEditContainer = ({ className, isDeleting, setIsDeleting }) => {
	const products = useSelector(selectProducts);
	const productCategories = useSelector(selectProductCategories);

	let productsAdvanced = [];
	products.forEach((product) => {
		productCategories.forEach((categories) => {
			if (categories.group === product.group) {
				productsAdvanced.push({ ...product, titleGroup: categories.title });
			}
		});
	});

	return (
		<div className={className}>
			<div>
				<TableRow className="header-row">
					<div className="name-column column">Наименование товара</div>
					<div className="category-column column">Категория товара</div>
					<div className="price-column column">Стоимость</div>
					<div className="amount-column column">Количество</div>
					<div className="image-url-column column">Фото</div>
					<div className="edit-or-remove-column column">Действия</div>
				</TableRow>
				<div className="product-list-row">
					{productsAdvanced.map((product) => {
						return (
							<ProductRow
								product={product}
								key={product.id}
								isDeleting={isDeleting}
								setIsDeleting={setIsDeleting}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export const ProductsEdit = styled(ProductsEditContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	overflow: auto;
	height: 740px;

	& .header-row {
		position: fixed;
		top: 170px;
		height: 40px;
		background-color: rgba(252, 200, 42, 1);
		z-index: 10;
		& div {
			font-size: 18px;
		}
	}

	& .product-list-row {
		margin-top: 55px;
	}
`;
