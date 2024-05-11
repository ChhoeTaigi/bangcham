import dicStruct from "./dictStruct";
import sql from "../../postgreSQL/pool";

function isValid(columns: any, dicColumns: any) {
	for (let key in columns) {
		if (
			key in dicColumns ||
			(key === "hoabun" && "HoaBun" in dicColumns) ||
			(key === "english" && "EngBun" in dicColumns) ||
			(key === "jitbun" &&
				("JitBun" in dicColumns ||
					"KaisoehJitbunPoj" in dicColumns ||
					"LekuJitbunPoj" in dicColumns)) ||
			(key === "taibun" &&
				("HanLoTaibunPoj" in dicColumns || "HanLoTaibunKip" in dicColumns))
		) {
			return true;
		}
	}
	return false;
}

function columnsToAndWhere(columns, struct) {
	return Object.entries(columns)
		.map(([key, value]) => {
			switch (key) {
				case "PojUnicode": {
					if ("PojUnicodeOthers" in struct.columns) {
						return sql` AND ("PojUnicode" ~* ${value} OR "PojUnicodeOthers" ~* ${value})`;
					}
					break;
				}
				case "PojInput": {
					if ("PojInputOthers" in struct.columns) {
						return sql` AND ("PojInput" ~* ${value} OR "PojInputOthers" ~* ${value})`;
					}
					break;
				}
				case "KipUnicode": {
					if ("KipUnicodeOthers" in struct.columns) {
						return sql` AND ("KipUnicode" ~* ${value} OR "KipUnicodeOthers" ~* ${value})`;
					}
					break;
				}
				case "KipInput": {
					if ("KipInputOthers" in struct.columns) {
						return sql` AND ("KipInput" ~* ${value} OR "KipInputOthers" ~* ${value})`;
					}
					break;
				}
				case "taibun": {
					if (
						"HanLoTaibunPoj" in struct.columns ||
						"HanLoTaibunKip" in struct.columns
					) {
						return sql` AND ("HanLoTaibunPoj" ~* ${value} OR "HanLoTaibunKip" ~* ${value})`;
					}
					break;
				}
				case "hoabun": {
					if ("HoaBun" in struct.columns) {
						return sql` AND ("HoaBun" ~* ${value})`;
					}
					return false;
				}
				case "english": {
					if ("EngBun" in struct.columns) {
						return sql` AND ("EngBun" ~* ${value})`;
					}
					return false;
				}
				case "jitbun": {
					const orList = ["JitBun", "KaisoehJitbunPoj", "LekuJitbunPoj"]
						.filter(key => key in struct.columns)
						.map((key) =>  sql`"${key}" ~* ${value}`);

					if (orList.length) {
						return sql`AND (${orList})`;
					}
					return false;
				}
			}
			// default case:
			return sql` AND (${sql(key)} ~* ${value})`;
		})
		.filter(Boolean);
}

function searchBasicNo(options, struct) {
	return sql`
SELECT count("JoinedWordID")
FROM "public"."ChhoeTaigi"
WHERE
	"DictCode" = ${options.dic}
	${columnsToAndWhere(options.columns, struct)}
`;
}

function searchBasicList(options, pageSize, pageAt, struct) {
	return sql`
SELECT "DictWordID", ${sql(Object.keys(struct.brief))}
FROM "public"."ChhoeTaigi"
WHERE
	"DictCode" = ${options.dic}
	${columnsToAndWhere(options.columns, struct)}
LIMIT ${pageSize}
OFFSET ${pageAt * pageSize}
`;
}

export function basicSearch(options, pageSize) {
	const dic = options.dic;
	const struct = dicStruct.find((e) => e.name === dic);

	if (!isValid(options.columns, struct.columns)) {
		console.log("basicSearch invalid", options, struct);
		return {
			dic,
			num: 0,
			words: [],
		};
	}
	const pageAt = (options.page || 1) - 1;

	return Promise.all([
		searchBasicNo(options, struct),
		searchBasicList(options, pageSize, pageAt, struct),
	]).then(([countR, listR]) => {
		const num = parseInt(countR[0].count, 10)
		return ({
			dic,
			num,
			words: listR,
		})
	});
}
