import styled from 'styled-components';

const TableRowContainer = ({ className, children }) => (
	<div className={className}>{children}</div>
);

export const TableRow = styled(TableRowContainer)`
	display: flex;
	justify-content: space-around;
	align-items: center;

	// font-size: 16px;
	border: ${({ border }) => (border ? '1px solid #fcc82a' : 'none')};
	border-radius: 4px;

	& > div {
		display: flex;
		text-align: center;
		justify-content: center;
		padding: 3px;
		font-size: 16px;
	}

	& .name-column {
		width: 270px;
	}
	& .category-column {
		width: 180px;
	}
	& .price-column {
		width: 150px;
	}
	& .amount-column {
		width: 140px;
	}
	& .image-url-column {
		width: 70px;
		& > img {
			width: 65px;
		}
	}
	& .edit-or-remove-column {
		width: 200px;
	}
`;
