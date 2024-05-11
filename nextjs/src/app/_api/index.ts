// import postgres from "../database/postgres";
// import { searchSingleDic } from "./searchSingleDic";
// import { searchAllFields } from "./searchAllFields";
// import { searchAllField } from "./searchAllField";
import { basicSearch } from "./basicSearch";
import normalizeOptions from "./normalizeOptions";
import sql from "../../postgreSQL/pool";
import dicStruct from "./dictStruct";

export function normalizeBasic(searchParams) {
	return {
		method: searchParams.method,
		dic: searchParams.dic,
		page: searchParams.page,
		searchMethod: searchParams.searchMethod,
		spellingMethod:
			{
				poj_unicode: "PojUnicode",
				poj_input: "PojInput",
				kiplmj_unicode: "KipUnicode",
				kiplmj_input: "KipInput",
			}[searchParams.spellingMethod] || searchParams.spellingMethod,
		columns: {
			spelling: searchParams.spelling,
			taibun: searchParams.taibun,
			hoabun: searchParams.hoabun,
			english: searchParams.english,
			jitbun: searchParams.jitbun,
		},
	};
}

export function basic(options: any) {
	options = normalizeOptions(options);

	if (options.dic) {
		const pageSize = 30;
		return basicSearch(options, pageSize);
	}
	const pageSize = 20;
	return Promise.all(
		dicStruct.map(({ name }) =>
			basicSearch(
				{
					...options,
					dic: name,
				},
				pageSize,
			),
		),
	).then((list) => list.filter(({ num, dic }) => 0 < num));
}

export async function dicAndId(dic, id) {
	const result = await sql`
SELECT *
FROM "public"."ChhoeTaigi"
WHERE
	"DictCode" = ${dic}
	AND "DictWordID" = ${id}
LIMIT 1
`;
	return result[0];
}

// export function allField(options: any) {
// 	options = normalizeOptions(options);

// 	if (options.dic) {
// 		const limit = 30;
// 		options.limit = limit;
// 		options.offset = ((options.page || 1) - 1) * limit;
// 		return searchAllField(options);
// 	} else {
// 		return searchAllFields(options);
// 	}
// }

// export function singleDic(options: any) {
// 	options = normalizeOptions(options);

// 	const limit = 30;
// 	options.limit = limit;
// 	options.offset = ((options.page || 1) - 1) * limit;
// 	return searchSingleDic(options);
// }
