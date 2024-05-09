import "server-only";

import * as React from "react";
import sql from "../../postgreSQL/pool";

import {
	ORDERED_LIST,
	getDictionaryByName,
	isDictionaryAcceptsColumns,
} from "@/app/_isomorphic/Dictionary";

export const findUniqueByDictCodeAndWordId = React.cache(
	async function findUniqueByDictCodeAndWordId(dictionaryCode, wordId) {
		const result = await sql`
SELECT * FROM "public"."ChhoeTaigi" WHERE
	"DictCode" = ${dictionaryCode} AND 
	"DictWordID" = ${wordId}`;
		return result[0];
	},
);

function columnsToAndWhere(columns, dictionary) {
	return Object.entries(columns).map(([key, value]) => {
		switch (key) {
			case "PojUnicode": {
				if ("PojUnicodeOthers" in dictionary.columns) {
					return sql` AND ("PojUnicode" ~* ${value} OR "PojUnicodeOthers"  ~* ${value})`;
				}
				break;
			}
			case "PojInput": {
				if ("PojInputOthers" in dictionary.columns) {
					return sql` AND ("PojInput" ~* ${value} OR "PojInputOthers"  ~* ${value})`;
				}
				break;
			}
			case "KipUnicode": {
				if ("KipUnicodeOthers" in dictionary.columns) {
					return sql` AND ("KipUnicode" ~* ${value} OR "KipUnicodeOthers"  ~* ${value})`;
				}
				break;
			}
			case "KipInput": {
				if ("KipInputOthers" in dictionary.columns) {
					return sql` AND ("KipInput" ~* ${value} OR "KipInputOthers"  ~* ${value})`;
				}
				break;
			}
			case "taibun": {
				if (
					"HanLoTaibunPoj" in dictionary.columns ||
					"HanLoTaibunKip" in dictionary.columns
				) {
					return sql` AND ("HanLoTaibunPoj" ~* ${value} OR "HanLoTaibunKip"  ~* ${value})`;
				}
				break;
			}
			case "hoabun": {
				if ("HoaBun" in dictionary.columns) {
					return sql` AND ("HoaBun" ~* ${value})`;
				}
				break;
			}
			case "english": {
				if ("EngBun" in dictionary.columns) {
					return sql` AND ("EngBun" ~* ${value})`;
				}
				break;
			}
			case "jitbun": {
				if ("JitBun" in dictionary.columns) {
					// return sql` AND ("JitBun" ~* ${value} OR "KaisoehJitbunPoj"  ~* ${value} OR "LekuJitbunPoj"  ~* ${value})`
					return sql` AND ("JitBun" ~* ${value})`;
				}
			}
		}
		// default case:
		return sql` AND (${key} ~* ${value})`;
	});
}

async function basicDict(dictName, columns, pageAt, pageSize) {
	const dictionary = getDictionaryByName(dictName);

	if (!isDictionaryAcceptsColumns(dictionary, columns)) {
		return false;
	}
	const [countResult, wordList] = await Promise.all([
		sql`
SELECT count("JoinedWordID")
FROM "public"."ChhoeTaigi"
WHERE
	"DictCode" = ${dictionary.code}
	${columnsToAndWhere(columns, dictionary)}`,
		sql`
SELECT "DictWordID", ${sql(
			Object.entries(dictionary.brief).flatMap(([key]) => {
				if ("ChhehMia" === key) {
					return [];
				}
				return [key];
			}),
		)}
FROM "public"."ChhoeTaigi"
WHERE
	"DictCode" = ${dictionary.code}
	${columnsToAndWhere(columns, dictionary)}
LIMIT ${pageSize}
OFFSET ${pageAt * pageSize}
	`,
	]);
	console.log(
		`Has: ${countResult[0].count} basicDict [${dictName}]. Given: `,
		columns,
	);
	return {
		dic: dictName,
		total: countResult[0].count,
		wordList,
	};
}

const setLomajiInput = new Set([
	"PojInput",
	"PojInputOthers",
	"KipInput",
	"KipInputOthers",
]);
const setLomajiUnicode = new Set([
	"PojInput",
	"PojInputOthers",
	"KipInput",
	"KipInputOthers",
]);

const regexpHyphenOrSpace = new RegExp("[ -]", "g");
const regexStringHyphenOrSpace = "(?: |--|-)";
const regexpKooImchatSiannthauTaibe = new RegExp("~<", "g");
const regexpStringKooImchatSiannthauTaibePrefix =
	"(?:ph|p|m|b|th|t|n|l|kh|k|ng|g|chh|ch|s|j|h)";
const regexpKooImchatHeksimKapBoeliuTaibe = new RegExp("~>", "g");
const regexpStringKooImchatHeksimKapBoeliuTaibeSuffix =
	"(?:[aiueo]+(?:nn|m|ng|n)*|(?:m|ng|g))(?:2|3|p8|p|t8|t|k8|k|h8|h|5|7|8)?";
const regexpKooImchatTaibeBoKhakteng = new RegExp("~x", "g");
const regexStringKooImchatBoKhakteng = "(?:(?![ -/]).)*";
const regexpKooImchatTaibe = new RegExp("~", "g");
const regexStringKooImchat = "(?:(?![ -/]).)+";

function applyChhoeTaigiRegExp(value) {
	// Sūn-sū bē-tàng ōaⁿ
	return value
		.replace(new RegExp("\\\\ ", "g"), "####")
		.replace(new RegExp("\\\\-", "g"), "###")
		.replace(new RegExp("\\\\{", "g"), "##")
		.replace(new RegExp("\\\\}", "g"), "#")
		.replace(regexpHyphenOrSpace, regexStringHyphenOrSpace)
		.replace(
			regexpKooImchatSiannthauTaibe,
			regexpStringKooImchatSiannthauTaibePrefix,
		)
		.replace(
			regexpKooImchatHeksimKapBoeliuTaibe,
			regexpStringKooImchatHeksimKapBoeliuTaibeSuffix,
		)
		.replace(regexpKooImchatTaibeBoKhakteng, regexStringKooImchatBoKhakteng)
		.replace(regexpKooImchatTaibe, regexStringKooImchat)
		.replace(new RegExp("####", "g"), " ")
		.replace(new RegExp("###", "g"), "-")
		.replace(new RegExp("##", "g"), "{")
		.replace(new RegExp("#", "g"), "}");
}

const regexpRedundantSianntiau = new RegExp("(?<!\\\\)(?:1|4)", "g");
const regexStringAhUnPrefix = ".*(?:(?<![aiueo]))";
const regexStringAhUnSuffix = "(?:nn)?(?:2|3|h8|h|5|7|8)?$";
const regexStringKootengImchatPrefix = "(.* |^)";
const regexStringKootengImchatSuffix = "( .*|$)";

function lomajiColumnRegexProcess(value) {
	value = value.replace(regexpRedundantSianntiau, "");

	if (value.endsWith("@")) {
		const un7bo2 = value.replace("@", "");
		value = regexStringAhUnPrefix + un7bo2 + regexStringAhUnSuffix;
	} else if (value.startsWith("{") && value.endsWith("}")) {
		value = value
			.replace("{", regexStringKootengImchatPrefix)
			.replace("}", regexStringKootengImchatSuffix);
	}
	return applyChhoeTaigiRegExp(value);
}

const regexpSianntiauTaibe = new RegExp("%", "g");
const regexStringSouSianntiau = "(?:2|3|p8|p|t8|t|k8|k|h8|h|5|7|8)?";

export const basicAllDictList = React.cache(async function basicAllDictList({
	searchMethod,
	value,
	columns,
}: {
	searchMethod: string;
	value?: any;
	columns: { [k: string]: string };
}) {
	// preprocessRegex
	if (!!value) {
		value = value.replace(regexpRedundantSianntiau, "");
		value = value.replace(regexpSianntiauTaibe, regexStringSouSianntiau);

		if (value.startsWith("{") && value.endsWith("}")) {
			value = value
				.replace("{", regexStringKootengImchatPrefix)
				.replace("}", regexStringKootengImchatSuffix);
		}
		value = applyChhoeTaigiRegExp(value);
	}
	if (!!columns) {
		columns = Object.fromEntries(
			Object.entries(columns).map(([key, value]) => {
				if (setLomajiInput.has(key)) {
					value = value.replace(regexpSianntiauTaibe, regexStringSouSianntiau);
					value = lomajiColumnRegexProcess(value);
				} else if (setLomajiUnicode.has(key)) {
					value = lomajiColumnRegexProcess(value);
				} else if ("english" === key) {
					if (value.startsWith("{") && value.endsWith("}")) {
						value = value
							.replace("{", regexStringKootengImchatPrefix)
							.replace("}", regexStringKootengImchatSuffix);
					}
				}
				return [key, value];
			}),
		);
	}
	// processSearchMethod
	if ("equals" === searchMethod) {
		if (!!value) {
			// search all
			if (/\S/.test(value)) {
				value = "(?:^|.*/)" + value + "(?:\\(.*\\))?(?:/.*|$)";
			}
		}
		if (!!columns) {
			columns = Object.fromEntries(
				Object.entries(columns).map(([key, value]) => {
					value = value.toLowerCase();

					if (setLomajiInput.has(key) || setLomajiUnicode.has(key)) {
						return [key, `(?:^|.*/)${value}(?:\\(.*\\))?(?:/.*|$)`];
					} else {
						return [key, `^${value}$`];
					}
				}),
			);
		}
	}
	const rawResultList = await Promise.all(
		ORDERED_LIST.map((name) => basicDict(name, columns, 0, 20)),
	);
	const dictResultList = [];
	let wordCount = 0;
	rawResultList.forEach((it) => {
		if (false === it || 0 === it.wordList.length) {
			return;
		}
		dictResultList.push(it);
		wordCount += it.wordList.length;
	});
	return {
		dictResultList,
		wordCount,
	};
});
