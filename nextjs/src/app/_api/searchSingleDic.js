import dicStruct from '../dicts/dictionary-struct';
import { queryCondictionSingleDic } from './queryCondictionSingleDic';
import { searchSingleDicNo } from './searchSingleDicNo';

// single dictionary search

export function searchSingleDic(options) {
	const dic = options.dic;
	const struct = dicStruct.find(e => e.name === dic);
	const dicColumns = struct.columns;
	const brief = struct.brief;
	const briefArray = ['DictWordID'];
	for (let key in brief) {
		briefArray.push(key);
	}

	const columns = options.columns;
	// check valid columns
	let valid = false;
	for (let key in columns) {
		if (key in dicColumns) {
			valid = true;
			break;
		}
	}
	if (!valid)
		return {
			dic: dic,
			num: 0,
			words: [],
		};

	const query = queryCondictionSingleDic(options);
	query.select(briefArray);

	query.limit(options.limit);
	if (options.offset) {
		query.offset(options.offset);
	}

	const queryNo = searchSingleDicNo(options);

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
