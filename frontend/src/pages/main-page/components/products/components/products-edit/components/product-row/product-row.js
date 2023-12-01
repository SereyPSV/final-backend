import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TableRow } from '../table-row/table-row';
import { Button } from '../../../../../../../../components';
import { trimDescription } from '../../../utils';
import { useServerRequest } from '../../../../../../../../hooks';
import {
	CLOSE_MODAL,
	RESET_PRODUCT_DATA,
	openModal,
	removeProductAsync,
} from '../../../../../../../../actions';
import { selectUserId } from '../../../../../../../../selectors';
import styled from 'styled-components';
import { useLayoutEffect } from 'react';

const ProductRowContainer = ({
	className,
	product,
	productCategories,
	isDeleting,
	setIsDeleting,
}) => {
	const { productId, productName, group, price, amount, imageUrl } = product;
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const navigate = useNavigate();
	const userId = useSelector(selectUserId);
	const [groupTitle] = productCategories.filter((item) => item.group === group);

	useLayoutEffect(() => {
		dispatch(RESET_PRODUCT_DATA);
	}, [dispatch]);

	const onProductEdit = (productId) => {
		dispatch(
			openModal({
				text: 'Редактировать товар?',
				button: { confirm: 'Возможно', cancel: 'НННЕТ' },
				width: '1000px',
				isEdit: true,
				onConfirm: () => {
					dispatch(removeProductAsync(requestServer, productId)).then(() => {
						setIsDeleting(!isDeleting);
						navigate('/products/edit');
					});
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => {
					// TODO setIsDeleting(!isDeleting);
					dispatch(CLOSE_MODAL);
				},
			}),
		);
	};
	const onProductRemove = (productId) => {
		dispatch(
			openModal({
				text: 'Удалить товар?',
				width: '500px',
				isEdit: false,
				onConfirm: () => {
					dispatch(removeProductAsync(requestServer, productId, userId)).then(
						() => {
							setIsDeleting(!isDeleting);
							navigate('/products/edit');
						},
					);

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
				<div className="name-column">{trimDescription(productName, 30)}</div>
				<div className="category-column">{groupTitle.title}</div>
				<div className="price-column">{price} руб.</div>
				<div className="amount-column">{amount} </div>
				<div className="image-url-column">
					<img src={imageUrl} alt={`${productName}`} />
				</div>
				<div className="edit-or-remove-column">
					<Button width={'140px'} onClick={() => onProductEdit(productId)}>
						Редактировать
					</Button>
					<Button width={'140px'} onClick={() => onProductRemove(productId)}>
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
