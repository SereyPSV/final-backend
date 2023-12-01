import styled from 'styled-components';
import { ControlPanel } from './components';
import { H2, Logo } from '../../components';

const Discription = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const HeaderContainer = ({ className }) => (
	<header className={className}>
		<Logo />
		<Discription>
			<H2>
				Интернет-магазин <span>СТРОЙ </span>BUILD
			</H2>
			<span>ЭТО лучшие товары по низким ценам!</span>
		</Discription>

		<ControlPanel />
	</header>
);
export const Header = styled(HeaderContainer)`
	position: fixed;
	z-index: 10;
	width: 1440px;
	height: 100px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px 40px;
	background-color: #fff;
	box-shadow: 0 -5px 15px #fcc82a;
`;
