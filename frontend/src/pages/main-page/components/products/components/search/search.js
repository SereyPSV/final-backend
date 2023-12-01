import { Icon, Input } from '../../../../../../components';
import { styled } from 'styled-components';

const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<Input value={searchPhrase} placeholder="ПОИСК..." onChange={onChange} />
			<Icon id="fa-search" size="21px" />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	display: flex;
	align-items: center;
	margin: 2px 0 0 0;
	padding: 0 0 0 0;
	width: 45%;
	height: 40px;
	border: none;
	border-radius: 4px;
	position: relative;

	& > input {
		padding: 10px 32px 10px 10px;
	}

	& > div {
		position: absolute;
		top: 0px;
		right: 9px;
	}
`;
