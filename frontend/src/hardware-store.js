import { useLayoutEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Footer, Header, Loader, Modal } from './components';
import { setUser } from './actions';
import styled from 'styled-components';
import {
	Authorization,
	ShoppingCart,
	MainPage,
	ProductPage,
	Registration,
	Users,
} from './pages';

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1440px;
	min-height: 100%;
	margin: 0 auto;
	background-color: #fff;
`;
const Page = styled.div`
	position: fixed;
	z-index: 5;
	height: 564px;
	padding: 100px 0;
`;

export const HardwareStore = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) {
			return;
		}

		const currentUserData = JSON.parse(currentUserDataJSON);

		dispatch(
			setUser({
				...currentUserData,
				roleId: Number(currentUserData.roleId),
			}),
		);
	}, [dispatch]);

	return (
		<AppColumn>
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/products/edit" element={<MainPage />} />
					<Route path="/product/:id" element={<ProductPage />} />
					<Route path="/shopping-cart/:id" element={<ShoppingCart />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/users" element={<Users />} />
					<Route path="/loader" element={<Loader />} />
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</Page>
			<Footer />
			<Modal />
		</AppColumn>
	);
};
