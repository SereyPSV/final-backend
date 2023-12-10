import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ProductCategories, Products } from './components';
import { Loader } from '../../components';
import { request } from '../../utils/request';
import { setProductCategoriesData } from '../../actions';
import styled from 'styled-components';

const MainPageContainer = ({ className }) => {
	const [sortingCategory, setSortingCategory] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();

	function handleChange(event) {
		setIsLoading(true);
		let newIsChecked = sortingCategory || [];
		if (event.target.checked === undefined) {
			return setIsLoading(false);
		}
		if (event.target.checked === true) {
			newIsChecked.push(event.target.name);
			setSortingCategory(newIsChecked);
			return setIsLoading(false);
		}
		if (event.target.checked === false) {
			if (newIsChecked.some((i) => i === event.target.name)) {
				newIsChecked = newIsChecked.filter((el) => el !== event.target.name);
				setSortingCategory(newIsChecked);
				return setIsLoading(false);
			}
		}
	}

	useEffect(() => {
		setIsLoading(true);
		request('/categories')
			.then((productCategories) => {
				dispatch(setProductCategoriesData(productCategories.categories));
			})
			.finally(() => setIsLoading(false));
	}, [dispatch]);

	isLoading && <Loader />; // лоадер

	return (
		<div className={className}>
			<ProductCategories
				handleChange={handleChange}
				sortingCategory={sortingCategory}
				setSortingCategory={setSortingCategory}
			/>
			<Products sortingCategory={sortingCategory} />
		</div>
	);
};

export const MainPage = styled(MainPageContainer)`
	margin: auto;
	padding: 20px 40px;
	display: flex;
	width: 1440px;
`;
