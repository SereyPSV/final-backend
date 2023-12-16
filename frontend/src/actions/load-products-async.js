// TODO - ok!!!
import { GROUPS, PAGINATION_LIMIT } from '../constants';
import { request } from '../utils/request';
import { setProductsData } from './set-products-data';

export const loadProductsAsync =
	(searchPhrase, searchGroupUrl = GROUPS, sortSelectionProducts, page) =>
	(dispatch) =>
		request(
			`/products?&searchPhrase=${searchPhrase}&searchGroup=${searchGroupUrl}&sort=${sortSelectionProducts}&page=${page}&limit=${PAGINATION_LIMIT}`,
		).then(({ data: { products, lastPage } }) => {
			if (products) {
				dispatch(setProductsData(products));
			}
			return { products, lastPage };
		});
