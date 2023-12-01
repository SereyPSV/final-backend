import { H3 } from '../title-text/h3';
import { styled } from 'styled-components';

const Div = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Content = ({ children, error }) =>
	error ? (
		<Div>
			<H3>Ошибка</H3>
			<div>{error}</div>
		</Div>
	) : (
		children
	);
