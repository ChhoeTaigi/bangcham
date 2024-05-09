export const langList = [
	{ value: "hanlo", label: "漢Lô" },
	{ value: "poj", label: "POJ" },
	{ value: "tiongbun", label: "中文" },
	{ value: "engbun", label: "English" },
	{ value: "jitbun", label: "日本語" },
];

export const langMap = new Map(
	langList.map(({ value }, index) => [value, index]),
);

export const langValueList = langList.map(({ value }) => value);
