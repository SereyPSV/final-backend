import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { request } from '../../utils/request';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { Button, Loader } from '../../components';
import { selectProduct, selectUserRole } from '../../selectors';
import {
	CLOSE_MODAL,
	RESET_PRODUCT_DATA,
	openModal,
	removeProductAsync,
	setProductData,
	setShoppingCart,
} from '../../actions';
import { ROLE } from '../../constants';
import { Product } from './components';
import { checkAccess } from '../../utils';

const ProductPageContainer = ({ className }) => {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const params = useParams();
	const dispatch = useDispatch();
	const product = useSelector(selectProduct);
	const userRole = useSelector(selectUserRole);
	const isAllowed = checkAccess([ROLE.ADMIN, ROLE.SELLER], userRole);
	const isLogin = userRole === ROLE.GUEST ? false : true;
	const isCreating = !!useMatch('/product/:id');

	useLayoutEffect(() => {
		dispatch(RESET_PRODUCT_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		setIsLoading(true);
		Promise.all([
			request(`/products/${params.id}`),
			request('/categories'),
			isLogin ? request(`/shoppingCart`) : [],
		])
			.then(([product, categories, shoppingCart]) => {
				isLogin && dispatch(setShoppingCart(shoppingCart.data));
				const [checkCart] = isLogin
					? shoppingCart.data.filter((cart) => cart.product === product.data.id)
					: [false];
				const newProduct = !checkCart
					? { ...product.data, count: 1 }
					: { ...product.data, count: checkCart.count };

				categories.categories.forEach((category) => {
					if (category.group === product.data.group) {
						dispatch(
							setProductData({ ...newProduct, groupTitle: category.title }),
						);
					}
				});
			})
			.finally(() => setIsLoading(false));
	}, [dispatch, params.id, isLogin]);

	const onProductAdd = () => {
		dispatch(
			openModal({
				text: 'Редактирование товара',
				button: { confirm: 'Сохранить', cancel: 'Отмена' },
				width: '1000px',
				isEdit: true,
				onConfirm: () => {
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => {
					dispatch(CLOSE_MODAL);
				},
			}),
		);
	};
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
					setIsLoading(true);
				},
				onCancel: () => {
					dispatch(CLOSE_MODAL);
				},
			}),
		);
		setIsLoading(false);
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
						setIsLoading(true);
					});

					dispatch(CLOSE_MODAL);
				},
				onCancel: () => {
					dispatch(CLOSE_MODAL);
				},
			}),
		);
		setIsLoading(false);
	};

	return (
		<Loader isLoading={isLoading}>
			<div className={className}>
				<div className="product-control-panel">
					<div className="path-to-product">
						{product.groupTitle} / {product.productName}
					</div>
					{isAllowed && (
						<div className="product-buttons">
							<Button
								width={'170px'}
								onClick={() => onProductAdd(params.id)}
							>
								Добавить
							</Button>
							<Button
								width={'170px'}
								onClick={() => onProductEdit(params.id)}
							>
								Редактировать
							</Button>
							<Button
								width={'170px'}
								onClick={() => onProductRemove(params.id)}
							>
								Удалить
							</Button>
						</div>
					)}
				</div>
				<Product />
			</div>
		</Loader>
	);
};

export const ProductPage = styled(ProductPageContainer)`
	margin: auto;
	padding: 20px 40px;
	display: flex;
	flex-direction: column;
	width: 1440px;

	& .product-control-panel {
		display: flex;
		justify-content: space-between;
	}

	& .path-to-product {
		padding: 20px 0;
	}

	& .product-buttons {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	& .product-wrapper {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	& .product-image {
		width: 32%;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid #ccc;
	}

	& .product-image img {
		width: 100%;
	}

	& .product-content {
		width: 64%;
		display: flex;
		flex-direction: column;
	}

	& H3 {
		padding: 40px 0 20px;
		font-size: 30px;
	}

	& .product-description {
		padding: 20px 0;
		font-size: 20px;
		border-bottom: 1px solid #fcc82a;
	}

	& H4 {
		padding: 20px 0 20px;
		font-size: 26px;
	}

	& .product-price {
		padding: 20px 0;
		font-size: 30px;
	}

	& .counter-block {
		display: flex;
	}
	& Button {
		margin: 0px 0px 0 20px;
	}
`;
