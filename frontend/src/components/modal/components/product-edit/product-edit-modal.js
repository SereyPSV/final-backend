import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectProductCategories } from '../../../../selectors';
import { Input, Selector } from '../../../../components';
import { SELECTOR_PRODUCT_CATEGORIES } from '../../../../constants';
import styled from 'styled-components';

const ProductEditModalContainer = ({ className }) => {
	const [productNameValue, setProductNameValue] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');
	const [descriptionValue, setDescriptionValue] = useState('');
	const [priceValue, setPriceValue] = useState('');
	const [amountValue, setAmountValue] = useState('');
	const [imageUrlValue, setImageUrlValue] = useState('');

	const productCategories = [
		...SELECTOR_PRODUCT_CATEGORIES,
		...useSelector(selectProductCategories).map((item) => ({
			value: item.group,
			label: item.title,
		})),
	];
	const onProductNameChange = ({ target }) => setProductNameValue(target.value);

	const onPriceChange = ({ target }) => setPriceValue(target.value);
	const onAmountChange = ({ target }) => setAmountValue(target.value);
	const onImageChange = ({ target }) => setImageUrlValue(target.value);

	return (
		<div className={className}>
			<div className="product-name">
				<h3>Наименование товара</h3>
				<Input
					value={productNameValue}
					placeholder="Наименование товара..."
					onChange={onProductNameChange}
				/>
			</div>
			<div className="product-category">
				<h3>Категория товара</h3>
				<Selector
					width={'100%'}
					selectorBy={productCategories}
					selected={selectedCategory}
					setSelected={setSelectedCategory}
				/>
			</div>
			<div className="product-description">
				<h3>Описание товара</h3>
				<Input
					value={descriptionValue}
					placeholder="Описание товара..."
					onChange={setDescriptionValue}
				/>
			</div>
			<div className="product-price">
				<h3>Стоимость товара</h3>
				<Input
					value={priceValue}
					placeholder="Стоимость товара..."
					onChange={onPriceChange}
				/>
			</div>
			<div className="product-amount">
				<h3>Количество товара</h3>
				<Input
					value={amountValue}
					placeholder="Количество товара..."
					onChange={onAmountChange}
				/>
			</div>
			<div className="product-image">
				<h3>URL изображения товара</h3>
				<Input
					value={imageUrlValue}
					placeholder="URL изображения товара..."
					onChange={onImageChange}
				/>
			</div>
			<div className=""></div>
		</div>
	);
};

export const ProductEditModal = styled(ProductEditModalContainer)`
	margin: auto;
	padding: 20px 40px;
	display: flex;
	flex-direction: column;
	width: 100%;
`;
