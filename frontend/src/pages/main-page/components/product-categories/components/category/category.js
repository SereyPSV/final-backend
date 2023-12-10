import { useState } from 'react';
import styled from 'styled-components';

const CategoryContainer = ({
	id,
	className,
	category,
	sortingCategory,
	setSortingCategory,
	handleChange,
}) => {
	const { group, title, imageUrl } = category;
	const [isChecked, setIsChecked] = useState(false);

	const handleChangeCat = (event) => {
		handleChange(event);
		setIsChecked(!isChecked);
	};

	return (
		<label id={id} className={className} onClick={handleChangeCat}>
			<input type="checkbox" name={group} />
			<div htmlFor={group} className="categoryImg">
				<img src={imageUrl} width={'100px'} height={'80px'} alt={`${title}`} />
			</div>
			<div className="categoryTitle">{title}</div>
		</label>
	);
};

export const Category = styled(CategoryContainer)`
	display: flex;
	align-items: center;
	padding: 5px;
	margin: 5px;
	background: ${({ isChecked }) => (isChecked ? 'rgba(252, 200, 42, 0.4)' : '#fff')};
	&:hover {
		cursor: pointer;
		background-color: rgba(252, 200, 42, 0.2);
	}

	// & .categoryImg {
	// 	display: flex;
	// 	justify-content: center;
	// 	width: 100px;
	// 	height: 80px;
	// }
	& .categoryTitle {
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 10px;
		width: 150px;
		height: 70px;
	}
`;
