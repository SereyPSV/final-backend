import { Link } from 'react-router-dom';
import styled from 'styled-components';
import images from '../../images/logo/LOGO2.png';

export const Logo = () => (
	<Link to="/">
		<LogoImg>
			<img
				src={images}
				alt="Интернет-магазин СТРОЙ-BUILD"
				title="Интернет-магазин СТРОЙ-BUILD"
			/>
		</LogoImg>
	</Link>
);

const LogoImg = styled.div`
	display: flex;

	&:hover {
		opacity: 0.8;
	}

	& img {
		width: 100px;
	}
`;
