import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Content, H3, Loader } from '../../components';
import { TableRow, UserRow } from './components';
import { ROLE } from '../../constants';
import styled from 'styled-components';
import { request } from '../../utils/request';
import { selectUserRole } from '../../selectors';

const UsersContainer = ({ className }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);
	const userRole = useSelector(selectUserRole);

	useEffect(() => {
		setIsLoading(true);
		Promise.all([request('/users'), request('/users/roles')])
			.then(([usersRes, rolesRes]) => {
				if (usersRes.error || rolesRes.error) {
					setErrorMessage(usersRes.error || rolesRes.error);
					return;
				}
				setUsers(usersRes.data);
				setRoles(rolesRes.data);
			})
			.finally(() => setIsLoading(false));
	}, [shouldUpdateUserList, userRole]);

	const onUserRemove = (userId) => {
		request(`/users/${userId}`, 'DELETE').then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList);
		});
	};

	return (
		<Loader isLoading={isLoading}>
			<div className={className}>
				<Content error={errorMessage}>
					<H3>Пользователи</H3>
					<div>
						<TableRow>
							<div className="login-column">Логин</div>
							<div className="registered-at-column">Дата регистрации</div>
							<div className="role-column">Роль</div>
						</TableRow>
						{users.map(({ id, login, registeredAt, roleId }) => (
							<UserRow
								key={id}
								id={id}
								login={login}
								registeredAt={registeredAt
									.substring(0, 16)
									.replace('T', ' ')}
								roleId={roleId}
								roles={roles.filter(
									({ id: roleId }) => roleId !== ROLE.GUEST,
								)}
								onUserRemove={() => onUserRemove(id)}
							/>
						))}
					</div>
				</Content>
			</div>
		</Loader>
	);
};

export const Users = styled(UsersContainer)`
	padding: 40px;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto;
	width: 1440px;
	font-size: 18px;
}`;
