import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectProductCategories } from '../../../../selectors';

const CategoryImg = styled.div`
	display: flex;
	justify-content: center;
	width: 100px;
	height: 80px;
`;
const CategoryTitle = styled.div`
	display: flex;
	align-items: center;
	width: 150px;
	height: 70px;
`;

const ProductCategoriesContainer = ({
	className,
	sortingCategory,
	setSortingCategory,
}) => {
	const productCategories = useSelector(selectProductCategories);

	const onSortCategory = (event) => {
		let newSortingByCategory = event.target
			.closest('.category')
			.className.slice(0, -9);
		if (newSortingByCategory !== sortingCategory) {
			setSortingCategory(newSortingByCategory);
		} else {
			setSortingCategory('');
		}
	};
	return (
		<div className={className}>
			{productCategories.map(({ id, title, imageUrl }) => (
				<div key={id} onClick={onSortCategory} className={`${id} category`}>
					<CategoryImg>
						<img
							src={imageUrl}
							width={'100px'}
							height={'80px'}
							alt={`${title}`}
						/>
					</CategoryImg>
					<CategoryTitle>{title}</CategoryTitle>
				</div>
			))}
		</div>
	);
};

export const ProductCategories = styled(ProductCategoriesContainer)`
	display: flex;
	flex-direction: column;
	width: 20%;
	height: 760px;
	overflow: auto;

	& .category {
		display: flex;
		justify-content: space-between;
		&:hover {
			background-color: rgba(252, 200, 42, 0.2);
	}
`;
