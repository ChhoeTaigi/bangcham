import dicStruct from '../dicts/dictionary-struct';
import { searchAllField } from './searchAllField';


export function searchAllFields(options) {
	const limit = 20;
	options.limit = limit;

	querys = [];
	for (let idx in dicStruct) {
		let dic = dicStruct[idx].name;
		options.dic = dic;
		query = searchAllField(options);
		querys.push(query);
	}

	return new Promise((resolve, reject) => {
		Promise.all(querys)
			.catch(error => reject(error))
			.then(results => {
				resolve(results);
			});
	});
}
