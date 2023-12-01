import { useSelector } from 'react-redux';
import { Button } from '../button/button';
import {
	selectModalButton,
	selectModalIsEdit,
	selectModalIsOpen,
	selectModalOnCancel,
	selectModalOnConfirm,
	selectModalText,
	selectModalWidth,
} from '../../selectors';
import styled from 'styled-components';
import { ProductEditModal } from './components';

const ModalContainer = ({ className }) => {
	const isOpen = useSelector(selectModalIsOpen);
	const isEdit = useSelector(selectModalIsEdit);
	const text = useSelector(selectModalText);
	const onConfirm = useSelector(selectModalOnConfirm);
	const onCancel = useSelector(selectModalOnCancel);
	const buttonModal = useSelector(selectModalButton);

	if (!isOpen) {
		return null;
	}

	return (
		<div className={className}>
			<div className="overlay">
				<div className="box">
					<h3>{text}</h3>
					{isEdit && <ProductEditModal />}
					<div className="buttons">
						<Button width="120px" onClick={onConfirm}>
							{buttonModal.confirm}
						</Button>
						<Button width="120px" onClick={onCancel}>
							{buttonModal.cancel}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 20;

	& .overlay {
		background-color: rgba(0, 0, 0, 0.5);
		width: '100%';
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	& .box {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: ${({ width = useSelector(selectModalWidth) }) => width};
		background-color: #fff;
		padding: 20px;
	}
	& .buttons {
		display: flex;
		justify-content: space-around;
		margin: 20px 0;
		width: 100%;
	}
`;
