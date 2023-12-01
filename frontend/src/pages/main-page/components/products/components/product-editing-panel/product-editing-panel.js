import styled from 'styled-components';
import { Button, H3, Input, Selector } from '../../../../../../../../components';
import { useEffect, useState } from 'react';
import { useServerRequest } from '../../../../../../../../hooks';
import { SELECTOR_PRODUCT_CATEGORIES } from '../../../../../../../../constants';

const ProductEditingPanelContainer = ({ className }) => {
	const [productCategories, setProductCategories] = useState([]);
	const [selected, setSelected] = useState('');

	const requestServer = useServerRequest();

	useEffect(() => {
		requestServer('fetchProductCategories')
			.then((productCategories) =>
				productCategories.res.map((item) => ({
					value: item.group,
					label: item.title,
				})),
			)
			.then((productCategories) =>
				setProductCategories([
					...SELECTOR_PRODUCT_CATEGORIES,
					...productCategories,
				]),
			);
	}, [requestServer]);

	return (
		<div className={className}>
			<div className="searchAndSort">
				<H3>Наименование товара</H3>
				<Input
					// value={imageUrlValue}
					placeholder="Наименование товара..."
					// onChange={onImageChange}
				/>
			</div>
			<div className="searchAndSort">
				<H3>Категория товара</H3>
				<Selector
					width={'100%'}
					selectorBy={productCategories}
					selected={selected}
					setSelected={setSelected}
				/>
			</div>
			<div className="searchAndSort">
				<H3>Стоимость товара</H3>
				<Input
					// value={imageUrlValue}
					placeholder="Стоимость товара..."
					// onChange={onImageChange}
				/>
			</div>
			<div className="searchAndSort">
				<H3>Количество товара</H3>
				<Input
					// value={imageUrlValue}
					placeholder="Количество товара..."
					// onChange={onImageChange}
				/>
			</div>
			<div className="searchAndSort">
				<H3>URL изображения товара</H3>
				<Input
					// value={imageUrlValue}
					placeholder="URL изображения товара..."
					// onChange={onImageChange}
				/>
			</div>
			<Button width={'90%'}>Сохранить изменения</Button>
		</div>
	);
};

export const ProductEditingPanel = styled(ProductEditingPanelContainer)`
	display: flex;
	flex-direction: column;
	width: 25%;

	& .searchAndSort {
		text-align: center;
		width: 90%;
		height: 100px;
	}

	& H3 {
		margin: 0px 0 10px;
	}
`;
