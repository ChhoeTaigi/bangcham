import postgres from '../database/postgres';
import dicStruct from '../dicts/dictionary-struct';
import { lowerQeury, lowerStr } from './regExp';


export function queryCondictionSingleDic(options) {
	const dic = options.dic;
	const struct = dicStruct.find(e => e.name === dic);
	const dicColumns = struct.columns;
	const columns = options.columns;

	console.log("queryCondictionSingleDic: " + dic);

	const query = postgres.from(dic);
	for (let key in columns) {
		if (key === 'DictWordID') {
			var keyNumber = columns[key].replace(/[^\d.-]/g, '');;
			query.andWhere(key, keyNumber);
		} else if (key in dicColumns) {
			if (key !== 'StoreLink') {
				query.andWhere(lowerQeury(key), '~*', lowerStr(columns[key]));
			}
		}
	}

	return query;
}
