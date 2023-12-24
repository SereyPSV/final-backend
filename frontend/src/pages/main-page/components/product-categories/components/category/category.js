import styled from 'styled-components';

const CategoryContainer = ({ id, className, category, searchGroup, setSearchGroup }) => {
	const { group, title, imageUrl } = category;

	const handleChangeCat = (event) => {
		console.log(event.currentTarget);
		if (event.target.checked) {
			setSearchGroup([...searchGroup, group]);
		} else {
			setSearchGroup(searchGroup.filter((item) => item !== group));
		}
	};

	return (
		<label id={id} className={className} onClick={handleChangeCat} name={group}>
			<input type="checkbox" name={group} onChange={handleChangeCat} />
			<div className="categoryImg">
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
