import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { H5 } from '../../components';

const FooterContainer = ({ className }) => {
	const [city, setCity] = useState('');
	const [temperature, setTemperature] = useState('');
	const [weather, setWeather] = useState('');
	useEffect(() => {
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?q=Minsk&units=metric&lang=ru&appid=5c3e0db9e4c84c4bbd9ade2d0a1b222f',
		)
			.then((res) => res.json())
			.then(({ name, main, sys, weather }) => {
				setCity(`${name} ${sys.country}`);
				setTemperature(Math.round(main.temp));
				setWeather(weather[0].description);
			});
	}, []);
	return (
		<footer className={className}>
			<div>
				<H5>
					Интернет-магазин <span>СТРОЙ </span>BUILD
				</H5>
				<H5>Телефон: +375(29)166-00-00</H5>
				<H5>Email: stroy-build@myshop.ru</H5>
			</div>
			<div>
				<H5>
					{new Date().toLocaleDateString('ru', {
						day: 'numeric',
						month: 'long',
					})}
				</H5>
				<H5>{city}</H5>
				<H5>
					{temperature} ℃ {weather}
				</H5>
			</div>
		</footer>
	);
};
export const Footer = styled(FooterContainer)`
	height: 70px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-weight: bold;
	padding: 20px 40px;
	background-color: #fff;
	box-shadow: 0 5px 15px #fcc82a;
	position: fixed;
	z-index: 10;
	bottom: 0;
	width: 1440px;
`;
