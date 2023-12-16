import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectProductCategories } from '../../../../selectors';
import { Category } from './components';

const ProductCategoriesContainer = ({ className, searchGroup, setSearchGroup }) => {
	const productCategories = useSelector(selectProductCategories) || [];

	return (
		<form className={className}>
			{productCategories.map((category) => (
				<Category
					key={category.id}
					category={category}
					searchGroup={searchGroup}
					setSearchGroup={setSearchGroup}
				/>
			))}
		</form>
	);
};

export const ProductCategories = styled(ProductCategoriesContainer)`
	display: flex;
	flex-direction: column;
	width: 20%;
	height: 760px;
	overflow: auto;
`;
