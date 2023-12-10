import { useSelector } from 'react-redux';
import { selectProductCategories } from '../../../../selectors';
import { Input, Selector } from '../../../../components';
import { SELECTOR_PRODUCT_CATEGORIES } from '../../../../constants';
import styled from 'styled-components';
import { useLayoutEffect, useState } from 'react';

const ProductEditModalContainer = ({ className, editingProduct, setNewProduct }) => {
	const { productName, group, price, description, amount, imageUrl } = editingProduct;

	const [productNameValue, setProductNameValue] = useState(productName);
	const [groupValue, setGroupValue] = useState(group);
	const [priceValue, setPriceValue] = useState(price);
	const [descriptionValue, setDescriptionValue] = useState(description);
	const [amountValue, setAmountValue] = useState(amount);
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl);

	useLayoutEffect(() => {
		setNewProduct({
			productName: productNameValue,
			group: groupValue,
			price: priceValue,
			description: descriptionValue,
			amount: amountValue,
			imageUrl: imageUrlValue,
		});
	}, [
		productNameValue,
		groupValue,
		priceValue,
		descriptionValue,
		amountValue,
		imageUrlValue,
		setNewProduct,
	]);

	const productCategories = [
		...SELECTOR_PRODUCT_CATEGORIES,
		...useSelector(selectProductCategories).map((item) => ({
			value: item.group,
			label: item.title,
		})),
	];
	const onProductNameChange = ({ target }) => setProductNameValue(target.value);
	const onPriceChange = ({ target }) => setPriceValue(target.value);
	const onDescriptionChange = ({ target }) => setDescriptionValue(target.value);
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
					selected={groupValue}
					setSelected={setGroupValue}
				/>
			</div>
			<div className="product-description">
				<h3>Описание товара</h3>
				<Input
					value={descriptionValue}
					placeholder="Описание товара..."
					onChange={onDescriptionChange}
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
