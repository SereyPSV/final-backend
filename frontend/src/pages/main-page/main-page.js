import { useEffect, useState } from 'react';
import { ProductCategories, Products } from './components';
import { useServerRequest } from '../../hooks';
import { Loader } from '../../components';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { request } from '../../utils/request';
import { setProductCategoriesData } from '../../actions';

const MainPageContainer = ({ className }) => {
	const [productCategories, setProductCategories] = useState([]);
	const [sortingCategory, setSortingCategory] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const requestServer = useServerRequest();
	const dispatch = useDispatch();

	useEffect(() => {
		setIsLoading(true);
		request('/categories')
			.then((productCategories) => {
				setProductCategories(productCategories.categories);
				dispatch(setProductCategoriesData(productCategories.categories));
			})
			.finally(() => setIsLoading(false));
	}, [requestServer, dispatch]);

	isLoading && <Loader />; // лоадер

	return (
		<div className={className}>
			<ProductCategories
				productCategories={productCategories}
				setProductCategories={setProductCategories}
				sortingCategory={sortingCategory}
				setSortingCategory={setSortingCategory}
			/>
			<Products
				productCategories={productCategories}
				sortingCategory={sortingCategory}
			/>
		</div>
	);
};

export const MainPage = styled(MainPageContainer)`
	margin: auto;
	padding: 20px 40px;
	display: flex;
	width: 1440px;
`;
