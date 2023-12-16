import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ProductCategories, Products } from './components';
import { Loader } from '../../components';
import { request } from '../../utils/request';
import { setProductCategories } from '../../actions';
import styled from 'styled-components';

const MainPageContainer = ({ className }) => {
	const [searchGroup, setSearchGroup] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		setIsLoading(true);
		request('/categories')
			.then((productCategories) => {
				dispatch(setProductCategories(productCategories.categories));
			})
			.finally(() => setIsLoading(false));
	}, [dispatch]);

	return (
		<Loader isLoading={isLoading}>
			<div className={className}>
				<ProductCategories
					searchGroup={searchGroup}
					setSearchGroup={setSearchGroup}
				/>
				<Products searchGroup={searchGroup} setIsLoading={setIsLoading} />
			</div>
		</Loader>
	);
};

export const MainPage = styled(MainPageContainer)`
	margin: auto;
	padding: 20px 40px;
	display: flex;
	width: 1440px;
`;
