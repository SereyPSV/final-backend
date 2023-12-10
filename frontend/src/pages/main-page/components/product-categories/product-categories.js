import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectProductCategories } from '../../../../selectors';
import { Category } from './components';

const ProductCategoriesContainer = ({
	className,
	sortingCategory,
	setSortingCategory,
	handleChange,
}) => {
	const productCategories = useSelector(selectProductCategories) || [];

	const handleSubmit = (event) => {};

	return (
		<form className={className} onClick={handleSubmit}>
			{productCategories.map((category) => (
				<Category
					key={category.id}
					category={category}
					sortingCategory={sortingCategory}
					setSortingCategory={setSortingCategory}
					handleChange={handleChange}
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
