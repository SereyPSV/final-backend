import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TableRow } from '../table-row/table-row';
import { Button } from '../../../../../../../../components';
import { trimDescription } from '../../../utils';
import {
	CLOSE_MODAL,
	openModal,
	removeProductAsync,
} from '../../../../../../../../actions';
import styled from 'styled-components';

const ProductRowContainer = ({ className, product, isDeleting, setIsDeleting }) => {
	const { id, productName, titleGroup, price, amount, imageUrl } = product;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onProductEdit = () => {
		dispatch(
			openModal({
				text: 'Редактирование товара',
				button: { confirm: 'Сохранить', cancel: 'Отмена' },
				width: '1000px',
				isEdit: true,
				product: product,
				onConfirm: () => {
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => {
					dispatch(CLOSE_MODAL);
				},
			}),
		);
	};
	const onProductRemove = (productId) => {
		dispatch(
			openModal({
				text: `Удалить товар из базы данных товаров?`,
				width: '500px',
				isEdit: false,
				onConfirm: () => {
					dispatch(removeProductAsync(productId)).then(() => {
						navigate('/');
						setIsDeleting(!isDeleting);
					});

					dispatch(CLOSE_MODAL);
				},
				onCancel: () => {
					dispatch(CLOSE_MODAL);
				},
			}),
		);
	};

	return (
		<div className={className}>
			<TableRow border={true}>
				<div className="name-column">{trimDescription(productName, 200)}</div>
				<div className="category-column">{titleGroup}</div>
				<div className="price-column">{price.toFixed(2)} руб</div>
				<div className="amount-column">{amount} </div>
				<div className="image-url-column">
					<img src={imageUrl} alt={`${productName}`} />
				</div>
				<div className="edit-or-remove-column">
					<Button width={'140px'} onClick={() => onProductEdit(id)}>
						Редактировать
					</Button>
					<Button width={'140px'} onClick={() => onProductRemove(id)}>
						Удалить товар
					</Button>
				</div>
			</TableRow>
		</div>
	);
};

export const ProductRow = styled(ProductRowContainer)`
	display: flex;
	margin: 3px 0;

	& .edit-or-remove-column {
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		// justify-content: space-between;
		font-size: 16px;
		height: 100%;
	}
`;
