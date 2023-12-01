import { useEffect, useMemo, useState } from 'react';
import { Pagination, ProductsList, ProductsEdit, Search } from './components';
import { Button, Icon, Loader, Selector } from '../../../../components';
import { PAGINATION_LIMIT, ROLE, SORT_BY_PRICE_OR_NAME } from '../../../../constants';
import { debounce } from './components/utils';
import { Link, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectProductCategories, selectUserRole } from '../../../../selectors';
import { request } from '../../../../utils/request';
import { checkAccess } from '../../../../utils';

const ProductsContainer = ({ className, sortingCategory }) => {
	const [products, setProducts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);
	const [sortSelectionProducts, setSortSelectionProducts] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const productCategories = useSelector(selectProductCategories);
	const isEditing = useMatch('/products/edit');
	const roleId = useSelector(selectUserRole);
	const isAllowed = checkAccess([ROLE.ADMIN, ROLE.SELLER], roleId);

	console.log('--------------', productCategories);

	useEffect(() => {
		setIsLoading(true);
		request(`/products?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`)
			.then(({ data: { products, lastPage } }) => {
				setProducts(products);
				setLastPage(lastPage);
			})
			.finally(() => setIsLoading(false));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, shouldSearch]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	isLoading && <Loader />; // лоадер

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
					<Button width={'210px'}>
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
						<ProductsEdit
							isDeleting={isDeleting}
							setIsDeleting={setIsDeleting}
							products={products}
							productCategories={productCategories}
						/>
					) : (
						<ProductsList
							products={products}
							productCategories={productCategories}
						/>
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
