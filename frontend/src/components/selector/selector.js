import styled from 'styled-components';

const SelectorContainer = ({ className, selectorBy, selected, setSelected, width }) => {
	const onSelectedChange = ({ target }) => {
		setSelected(target.value);
	};

	return (
		<div className={className}>
			<select value={selected} onChange={onSelectedChange}>
				{selectorBy.map(({ value, label }, index) => (
					<option key={index} value={value}>
						{label}
					</option>
				))}
			</select>
		</div>
	);
};

export const Selector = styled(SelectorContainer)`
	border: none;

	border-radius: 4px;

	& > div,
	select {
		width: ${({ width = '128px' }) => width};
		height: 35px;
		border-radius: 4px;
		border-color: #fcc82a;
		font-size: 16px;

		background: rgba(252, 200, 42, 0.1);
		outline: none;
		&:hover {
			border: 2px solid ##ff7f00;
			background: rgba(252, 200, 42, 0.3);
		}
	}
`;
