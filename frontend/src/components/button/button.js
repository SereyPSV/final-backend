import styled from 'styled-components';

const ButtonContainer = ({ children, className, width, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 14px;
	width: ${({ width = '120px' }) => width};
	height: 36px;
	border: none;
	border: 1px solid #fcc82a;
	border-radius: 3px;
	background-color: #fcc82a;
	&:hover {
		cursor: pointer;
		border: 1px solid #fcc82a;
		background-color: #ff7f00;
	}
`;
