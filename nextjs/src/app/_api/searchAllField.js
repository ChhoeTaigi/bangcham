import dicStruct from '../dicts/dictionary-struct';
import { queryCondictionAllField } from './queryCondictionAllField';
import { searchAllFieldNo } from './searchAllFieldNo';

// all field search

export function searchAllField(options) {
	const dic = options.dic;
	const struct = dicStruct.find(e => e.name === dic);
	const columns = struct.columns;
	const brief = struct.brief;
	const briefArray = ['DictWordID'];
	for (let key in brief) {
		briefArray.push(key);
	}

	// check valid input
	if (!/\S/.test(options.value) || (options.value === undefined))
		return {
			dic: dic,
			num: 0,
			words: [],
		};

	const query = queryCondictionAllField(options);
	query.select(briefArray);

	if (options.limit) {
		query.limit(options.limit);
	}
	if (options.offset) {
		query.offset(options.offset);
	}

	const queryNo = searchAllFieldNo(options);
	return new Promise((resolve, reject) => {
		Promise.all([queryNo, query])
			.catch(error => reject(error))
			.then(results => {
				rtn = {
					dic: dic,
					num: results[0][0].num,
					words: results[1],
				};
				resolve(rtn);
			});
	});
}
