import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthFormError, Button, H3, Input } from '../../components';
import { useResetForm } from '../../hooks';
import { setUser } from '../../actions';
import { selectUserRole } from '../../selectors';
import styled from 'styled-components';
import { ROLE } from '../../constants';
import { request } from '../../utils/request';

const regFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/^\w+$/, 'Неверный логин. Допускаются только буквы и цифры')
		.min(3, 'Неверно заполнен логин. Минимум 3 символа')
		.max(15, 'Неверно заполнен логин. Максимум 15 символов'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверно заполнен пароль. Допускаются буквы, цифры и знаки # %',
		)
		.min(6, 'Неверно заполнен пароль. Минимум 6 символов')
		.max(30, 'Неверно заполнен пароль. Максимум 30 символов'),
	passcheck: yup
		.string()
		.required('Заполните повтор пароля')
		.oneOf([yup.ref('password'), null], 'Повтор пароля не совпадает'),
});

const Buttons = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;
const StyledLink = styled(Link)`
	text-align: center;
	text-decoration: underline;
	margin: 20px;
	font-size: 16px;
	text-decoration-line: none;
	color: #fcc82a;
	border-bottom: 1px solid #fcc82a;
	&:hover {
		color: #ff7f00;
		border-bottom: 1px solid #ff7f00;
	}
`;

const RegistrationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(regFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();

	const roleId = useSelector(selectUserRole);

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		request('/register', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};

	const formError =
		errors?.login?.message || errors?.password?.message || errors?.passcheck?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<H3>Регистрация</H3>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>Логин *</div>
				<Input
					className={className}
					type="text"
					placeholder="Логин..."
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				/>
				<div>Пароль *</div>
				<Input
					className={className}
					type="password"
					placeholder="Пароль..."
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>
				<div>Подтверждение пароля *</div>
				<Input
					className={className}
					type="password"
					placeholder="Подтверждение пароля..."
					{...register('passcheck', {
						onChange: () => setServerError(null),
					})}
				/>
				<Buttons>
					<Button type="submit" disabled={!!formError} width={'200px'}>
						Зарегистрироваться
					</Button>
					<StyledLink to="/login">У меня уже есть аккаунт</StyledLink>
				</Buttons>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			</form>
		</div>
	);
};

export const Registration = styled(RegistrationContainer)`
	display: flex;
	flex-direction: column;
	padding: 20px 40px;

	& > H3 {
		padding: 20px 0px;
	}

	& > form {
		display: flex;
		flex-direction: column;
		width: 500px;
	}
`;
