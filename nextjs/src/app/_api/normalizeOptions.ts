import {
	regexpRedundantSianntiau,
	regexpSianntiauTaibe,
	regexStringSouSianntiau,
	regexStringKootengImchatPrefix,
	regexStringKootengImchatSuffix,
	regexpSpecialChar1,
	regexpStringSpecialChar1Temp,
	regexpSpecialChar2,
	regexpStringSpecialChar2Temp,
	regexpSpecialChar3,
	regexpStringSpecialChar3Temp,
	regexpSpecialChar4,
	regexpStringSpecialChar4Temp,
	regexpHyphenOrSpace,
	regexStringHyphenOrSpace,
	regexpKooImchatSiannthauTaibe,
	regexpStringKooImchatSiannthauTaibePrefix,
	regexpKooImchatHeksimKapBoeliuTaibe,
	regexpStringKooImchatHeksimKapBoeliuTaibeSuffix,
	regexpKooImchatTaibeBoKhakteng,
	regexStringKooImchatBoKhakteng,
	regexpKooImchatTaibe,
	regexStringKooImchat,
	regexpSpecialChar1R,
	regexpStringSpecialChar1,
	regexpSpecialChar2R,
	regexpStringSpecialChar2,
	regexpSpecialChar3R,
	regexpStringSpecialChar3,
	regexpSpecialChar4R,
	regexpStringSpecialChar4,
	regexStringAhUnPrefix,
	regexStringAhUnSuffix,
} from "./regExp";

const debug = (...any: any) => {};

function lomajiColumnKeyQueryRegexProcess(options, key) {
	// debug("lomajiColumnKeyQueryRegexProcess(), options.columns[key]: " + options.columns[key]);
	if (
		key === "PojInput" ||
		key === "PojInputOthers" ||
		key === "KipInput" ||
		key === "KipInputOthers" ||
		key === "PojUnicode" ||
		key === "PojUnicodeOthers" ||
		key === "KipUnicode" ||
		key === "KipUnicodeOthers"
	) {
		// check pass
	} else {
		return;
	}

	options.columns[key] = options.columns[key].replace(
		regexpRedundantSianntiau,
		"",
	);

	if (options.columns[key].includes("@")) {
		// debug("@@@@@@@@@ key: " + options.columns[key]);
		if (options.columns[key].endsWith("@")) {
			const un7bo2 = options.columns[key].replace("@", "");
			options.columns[key] =
				regexStringAhUnPrefix + un7bo2 + regexStringAhUnSuffix;
		}
	} else if (
		options.columns[key].startsWith("{") &&
		options.columns[key].endsWith("}")
	) {
		options.columns[key] = options.columns[key]
			.replace("{", regexStringKootengImchatPrefix)
			.replace("}", regexStringKootengImchatSuffix);
	}

	// Sūn-sū bē-tàng ōaⁿ
	options.columns[key] = options.columns[key].replace(
		regexpSpecialChar1,
		regexpStringSpecialChar1Temp,
	);
	options.columns[key] = options.columns[key].replace(
		regexpSpecialChar2,
		regexpStringSpecialChar2Temp,
	);
	options.columns[key] = options.columns[key].replace(
		regexpSpecialChar3,
		regexpStringSpecialChar3Temp,
	);
	options.columns[key] = options.columns[key].replace(
		regexpSpecialChar4,
		regexpStringSpecialChar4Temp,
	);
	options.columns[key] = options.columns[key].replace(
		regexpHyphenOrSpace,
		regexStringHyphenOrSpace,
	);
	options.columns[key] = options.columns[key].replace(
		regexpKooImchatSiannthauTaibe,
		regexpStringKooImchatSiannthauTaibePrefix,
	);
	options.columns[key] = options.columns[key].replace(
		regexpKooImchatHeksimKapBoeliuTaibe,
		regexpStringKooImchatHeksimKapBoeliuTaibeSuffix,
	);
	options.columns[key] = options.columns[key].replace(
		regexpKooImchatTaibeBoKhakteng,
		regexStringKooImchatBoKhakteng,
	);
	options.columns[key] = options.columns[key].replace(
		regexpKooImchatTaibe,
		regexStringKooImchat,
	);
	options.columns[key] = options.columns[key].replace(
		regexpSpecialChar1R,
		regexpStringSpecialChar1,
	);
	options.columns[key] = options.columns[key].replace(
		regexpSpecialChar2R,
		regexpStringSpecialChar2,
	);
	options.columns[key] = options.columns[key].replace(
		regexpSpecialChar3R,
		regexpStringSpecialChar3,
	);
	options.columns[key] = options.columns[key].replace(
		regexpSpecialChar4R,
		regexpStringSpecialChar4,
	);
}

/**
 * spellingMethod
 * @param options
 * @returns
 */
function processBasicSearchColumns(options) {
	if (options.spellingMethod) {
		options.columns[options.spellingMethod] = options.columns.spelling;
		delete options.columns.spelling;
	}
	return options;
}

/**
 * check '  ' or undefined
 * @param options
 * @returns
 */
function cleanEmptyColumns(options) {
	if (undefined !== options.columns) {
		for (let key in options.columns) {
			if (
				!/\S/.test(options.columns[key]) ||
				options.columns[key] === undefined
			) {
				delete options.columns[key];
			}
		}
	} else if (undefined !== options.value) {
		if (!/\S/.test(options.value) || options.value === undefined) {
			delete options.value;
		}
	}
	return options;
}

function preprocessRegex(options) {
	debug("preprocessRegex()");

	if (undefined !== options.value) {
		// debug("preprocessRegex() - options.value");
		options.value = options.value.replace(regexpRedundantSianntiau, "");
		options.value = options.value.replace(
			regexpSianntiauTaibe,
			regexStringSouSianntiau,
		);

		if (options.value.startsWith("{") && options.value.endsWith("}")) {
			options.value = options.value
				.replace("{", regexStringKootengImchatPrefix)
				.replace("}", regexStringKootengImchatSuffix);
		}

		// Sūn-sū bē-tàng ōaⁿ
		options.value = options.value.replace(
			regexpSpecialChar1,
			regexpStringSpecialChar1Temp,
		);
		options.value = options.value.replace(
			regexpSpecialChar2,
			regexpStringSpecialChar2Temp,
		);
		options.value = options.value.replace(
			regexpSpecialChar3,
			regexpStringSpecialChar3Temp,
		);
		options.value = options.value.replace(
			regexpSpecialChar4,
			regexpStringSpecialChar4Temp,
		);
		options.value = options.value.replace(
			regexpHyphenOrSpace,
			regexStringHyphenOrSpace,
		);
		options.value = options.value.replace(
			regexpKooImchatSiannthauTaibe,
			regexpStringKooImchatSiannthauTaibePrefix,
		);
		options.value = options.value.replace(
			regexpKooImchatHeksimKapBoeliuTaibe,
			regexpStringKooImchatHeksimKapBoeliuTaibeSuffix,
		);
		options.value = options.value.replace(
			regexpKooImchatTaibeBoKhakteng,
			regexStringKooImchatBoKhakteng,
		);
		options.value = options.value.replace(
			regexpKooImchatTaibe,
			regexStringKooImchat,
		);
		options.value = options.value.replace(
			regexpSpecialChar1R,
			regexpStringSpecialChar1,
		);
		options.value = options.value.replace(
			regexpSpecialChar2R,
			regexpStringSpecialChar2,
		);
		options.value = options.value.replace(
			regexpSpecialChar3R,
			regexpStringSpecialChar3,
		);
		options.value = options.value.replace(
			regexpSpecialChar4R,
			regexpStringSpecialChar4,
		);
	} else if (undefined !== options.columns) {
		// debug("preprocessRegex() - options.columns");
		for (let key in options.columns) {
			if (/\S/.test(options.columns[key])) {
				// debug("preprocessRegex() - options.columns - key:" + key);
				// debug("preprocessRegex() - options.columns[key]:" + options.columns[key]);
				if (
					key === "PojInput" ||
					key === "PojInputOthers" ||
					key === "KipInput" ||
					key === "KipInputOthers"
				) {
					options.columns[key] = options.columns[key].replace(
						regexpSianntiauTaibe,
						regexStringSouSianntiau,
					);
					lomajiColumnKeyQueryRegexProcess(options, key);
				} else if (
					key === "PojUnicode" ||
					key === "PojUnicodeOthers" ||
					key === "KipUnicode" ||
					key === "KipUnicodeOthers"
				) {
					lomajiColumnKeyQueryRegexProcess(options, key);
				} else if (key === "english") {
					if (
						options.columns[key].startsWith("{") &&
						options.columns[key].endsWith("}")
					) {
						options.columns[key] = options.columns[key]
							.replace("{", regexStringKootengImchatPrefix)
							.replace("}", regexStringKootengImchatSuffix);
					}
				}
			}
		}
	}

	return options;
}

function processSearchMethod(options) {
	debug("processSearchMethod()");

	if (options.searchMethod !== "equals") {
		return options;
	}
	// equals
	if (undefined !== options.value) {
		// search all
		if (/\S/.test(options.value)) {
			options.value = "(?:^|.*/)" + options.value + "(?:\\(.*\\))?(?:/.*|$)";
		}
	} else if (undefined !== options.columns) {
		// search common
		for (let key in options.columns) {
			if (/\S/.test(options.columns[key])) {
				debug("processSearchMethod() - options.columns - key: " + key);
				if (
					key === "spelling" ||
					key === "PojInput" ||
					key === "PojInputOthers" ||
					key === "KipInput" ||
					key === "KipInputOthers" ||
					key === "PojUnicode" ||
					key === "PojUnicodeOthers" ||
					key === "KipUnicode" ||
					key === "KipUnicodeOthers"
				) {
					options.columns[key] =
						"(?:^|.*/)" + options.columns[key] + "(?:\\(.*\\))?(?:/.*|$)";
					debug(options.columns[key]);
				} else {
					options.columns[key] = "^" + options.columns[key] + "$";
				}
			}
		}
	}
	return options;
}

export default function normalizeOptions(options: any) {
	options = processBasicSearchColumns({...options, columns: {...options.columns}});
	options = cleanEmptyColumns(options);
	options = preprocessRegex(options);
	options = processSearchMethod(options);
	return options;
}
