import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon } from '../../../../components';
import styled from 'styled-components';
import { ROLE } from '../../../../constants';
import { selectUserId, selectUserLogin, selectUserRole } from '../../../../selectors';
import { logout } from '../../../../actions';
import { checkAccess } from '../../../../utils';

const RightAligned = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	margin: 0;
	width: 100%;
	height: 42px;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const userId = useSelector(selectUserId);

	const onLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem('userData');
	};

	const isAdmin = checkAccess([ROLE.ADMIN], roleId);

	return (
		<div className={className}>
			<Button width={'50px'}>
				<Icon
					id="fa-backward"
					margin="0 0 0 0"
					onClick={() => navigate(-1)}
					color={'#222222'}
				/>
			</Button>
			<div>
				<RightAligned>
					{roleId === ROLE.GUEST ? (
						<Link to="/login">
							<Button width={'150px'}>
								Войти
								<Icon
									id="fa-sign-in"
									margin="0 0 0 10px"
									color={'#222222'}
								/>
							</Button>
						</Link>
					) : (
						<>
							<Link to={`/shopping-cart/${userId}`}>
								<Button width={'150px'}>
									Корзина
									<Icon
										id="fa-shopping-cart"
										margin="0 0 0 10px"
										color={'#222222'}
									/>
								</Button>
							</Link>
							<Button width={'150px'} onClick={() => dispatch(onLogout)}>
								{login}
								<Icon
									id="fa-sign-out"
									margin="0 0 0 10px"
									color={'#222222'}
								/>
							</Button>
						</>
					)}
				</RightAligned>
				{isAdmin && (
					<RightAligned>
						<Link to="/users">
							<Button width={'150px'}>
								Пользователи
								<Icon
									id="fa-users"
									margin="0 0 0 10px"
									color={'#222222'}
								/>
							</Button>
						</Link>
					</RightAligned>
				)}
			</div>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
	align-items: center;

	& button {
		margin: 0 0 0 20px;
	}
`;
