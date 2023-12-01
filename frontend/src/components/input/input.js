import { forwardRef } from 'react';
import styled from 'styled-components';

const InputContainer = forwardRef(({ className, width, ...props }, ref) => {
	return <input className={className} {...props} ref={ref} />;
});

export const Input = styled(InputContainer)`
	height: 36px;
	margin: 0 0 10px;
	padding: 10px;
	font-size: 16px;
	outline: none;
	border-radius: 4px;
	border: 1px solid #fcc82a;
	width: ${({ width = '100%' }) => width};
	background: rgba(252, 200, 42, 0.1);
	&:hover {
		border: 2px solid ##ff7f00;
		background: rgba(252, 200, 42, 0.3);
	}
`;
