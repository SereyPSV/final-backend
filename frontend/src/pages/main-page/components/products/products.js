import { useEffect, useMemo, useState } from 'react';
import { Pagination, ProductsList, ProductsEdit, Search } from './components';
import { Button, Icon, Selector } from '../../../../components';
import { GROUPS, ROLE, SORT_BY_PRICE_OR_NAME } from '../../../../constants';
import { debounce } from './components/utils';
import { Link, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts, selectUserRole } from '../../../../selectors';
import { checkAccess } from '../../../../utils';
import { CLOSE_MODAL, loadProductsAsync, openModal } from '../../../../actions';

const ProductsContainer = ({ className, searchGroup, setIsLoading }) => {
	const [page, setPage] = useState(1);
	const [isDeleting, setIsDeleting] = useState(false);
	const [lastPage, setLastPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);
	const [sortSelectionProducts, setSortSelectionProducts] = useState('');
	const roleId = useSelector(selectUserRole);
	const products = useSelector(selectProducts);
	const isEditing = useMatch('/products/edit');
	const dispatch = useDispatch();
	const isAllowed = checkAccess([ROLE.ADMIN, ROLE.SELLER], roleId);

	let searchGroupUrl;
	if (searchGroup.length === 0) {
		searchGroupUrl = GROUPS;
	} else {
		searchGroupUrl = searchGroup;
	}

	useEffect(() => {
		dispatch(
			loadProductsAsync(searchPhrase, searchGroupUrl, sortSelectionProducts, page),
		).then(({ lastPage }) => setLastPage(lastPage));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		dispatch,
		page,
		shouldSearch,
		isDeleting,
		sortSelectionProducts,
		lastPage,
		searchGroupUrl,
	]);

	const delay = useMemo(() => debounce(setShouldSearch, 1500), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		delay(!shouldSearch);
	};

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

	return (
		<div className={className}>
			<div className="searchAndSort">
				<Search searchPhrase={searchPhrase} onChange={onSearch} />
				<Selector
					selectorBy={SORT_BY_PRICE_OR_NAME}
					selected={sortSelectionProducts}
					setSelected={setSortSelectionProducts}
					width={'200px'}
				/>
				{isEditing ? (
					<Button width={'210px'} onClick={onProductAdd}>
						Добавить товар
						<Icon
							id="fa-pencil-square-o"
							margin="0 0 0 20px"
							color={'#222222'}
						/>
					</Button>
				) : (
					<div>
						{isAllowed && (
							<Link to="/products/edit">
								<Button width={'210px'}>
									Добавить товар-редактировать товар
									<Icon
										id="fa-pencil-square-o"
										margin="0 0 0 20px"
										color={'#222222'}
									/>
								</Button>
							</Link>
						)}
					</div>
				)}
			</div>
			{products.length > 0 ? (
				<div className="products">
					{isEditing ? (
						<div>
							{isAllowed ? (
								<ProductsEdit
									isDeleting={isDeleting}
									setIsDeleting={setIsDeleting}
								/>
							) : (
								<div>Доступ закрыт</div>
							)}
						</div>
					) : (
						<ProductsList />
					)}
				</div>
			) : (
				<div className="products">Товары не найдены</div>
			)}
			{lastPage > 1 && products.length > 0 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	);
};

export const Products = styled(ProductsContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 80%;

	& .searchAndSort {
		width: 95%;
		display: flex;
		justify-content: space-between;
	}

	& .products {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 20px;
		overflow: auto;
		height: 655px;
	}
`;
