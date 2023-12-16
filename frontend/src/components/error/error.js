import { H2 } from '../../components/title-text/h2';
import styled from 'styled-components';

const Div = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 18px;
	width: 1440px;
	padding: 40px;
`;

export const Error = ({ error }) =>
	error && (
		<Div className="error">
			<H2>Ошибка</H2>
			<div>{error}</div>
		</Div>
	);
