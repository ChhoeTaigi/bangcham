import { queryCondictionAllField } from './queryCondictionAllField';


export function searchAllFieldNo(options) {
	const query = queryCondictionAllField(options);
	query.count('DictWordID as num');

	return query;
}
