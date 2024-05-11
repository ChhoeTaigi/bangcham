import postgres from '../database/postgres';
import dicStruct from '../dicts/dictionary-struct';
import { lowerQeury, lowerStr } from './regExp';


export function queryCondictionAllField(options) {
	const dic = options.dic;
	const struct = dicStruct.find(e => e.name === dic);
	const columns = struct.columns;

	console.log("queryCondictionAllField: " + dic);

	const query = postgres.from(dic);
	for (key in columns) {
		if (key !== 'DictWordID'
			&& key !== 'StoreLink') {
			query.orWhere(lowerQeury(key), '~*', lowerStr(options.value));
		}
	}
	return query;
}
