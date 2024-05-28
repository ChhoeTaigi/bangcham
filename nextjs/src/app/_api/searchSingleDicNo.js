import { queryCondictionSingleDic } from './queryCondictionSingleDic';


export function searchSingleDicNo(options) {
	const query = queryCondictionSingleDic(options);
	query.count('DictWordID as num');

	return query;
}
