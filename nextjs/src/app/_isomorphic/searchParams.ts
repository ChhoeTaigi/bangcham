

// export const parse = (search) => {
// 	const query = queryString.parse(search);

// 	let options = {};
// 	if (query.method === "basic") {
// 	} else if (query.method === "all-field") {
// 		options = {
// 			method: query.method,
// 			dic: query.dic,
// 			page: query.page,
// 			searchMethod: query.searchMethod,
// 			value: query.value,
// 		};
// 	} else if (query.method === "single-dic") {
// 		const dic = query.dic;
// 		const struct = dicStruct.find((e) => e.name === dic);
// 		const structColumns = struct.columns;
// 		const columns = {};
// 		for (let key in query) {
// 			if (key in structColumns) {
// 				columns[key] = query[key];
// 			}
// 		}
// 		options = {
// 			method: query.method,
// 			dic: dic,
// 			page: query.page,
// 			searchMethod: query.searchMethod,
// 			columns: columns,
// 		};
// 	}

// 	return options;
// };
