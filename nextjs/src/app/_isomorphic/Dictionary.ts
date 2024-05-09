export const DICT_1895_JITPUN_SITAI_TANGI_MIALUI_CHIP =
	"JitpunSitaiTangiMialuiChip";
export const DICT_1913_KAM_UILIM_TAIGI_JITIAN = "KamUilimTaigiJitian";
export const DICT_1931_TAIJIT_SIN_SUSU = "TaijitSinSusu";
export const DICT_1932_TAIJIT_TOA_SUTIAN = "TaijitToaSutian";
export const DICT_1956_TAIOAN_PEHOE_KICHHOO_GIKU = "TaioanPehoeKichhooGiku";
export const DICT_1957_TAIOANGI_SIONGIONG_GILUI = "TaioangiSiongiongGilui";
export const DICT_1973_EMBREE_TAIENG_SUTIAN = "EmbreeTaiengSutian";
export const DICT_1976_MARYKNOLL_TAIENG_SUTIAN = "MaryknollTaiengSutian";
export const DICT_1979_MARYKNOLL_ENGTAI_SUTIAN = "MaryknollEngtaiSutian";
export const DICT_2002_TAIHOA_SOANNTENG_SUTIAN = "TaihoaSoanntengSutian";
export const DICT_2009_TJ_TAIGI_PEHOE_SIOSUTIAN_SEKIN =
	"TJTaigiPehoeSioSutianSekin";
export const DICT_2011_KAUIOKPOO_SUTIAN = "KauiokPooSutian";
export const DICT_2016_ITAIGI = "ITaigi";
export const DICT_CHHOETAIGI_CHENGPOO_SUTIAN = "ChhoetaigiChengpooSutian";
export const DICT_TAIOAN_BUNHAK_TUCHOK_SEKIN = "TaioanBunhakTuchokSekin";
export const DICT_SOANNTENG_MUITHE_SEKIN = "SoanntengMuitheSekin";

export const ORDERED_LIST = [
	DICT_1895_JITPUN_SITAI_TANGI_MIALUI_CHIP,
	DICT_1913_KAM_UILIM_TAIGI_JITIAN,
	DICT_1931_TAIJIT_SIN_SUSU,
	DICT_1932_TAIJIT_TOA_SUTIAN,
	DICT_1956_TAIOAN_PEHOE_KICHHOO_GIKU,
	DICT_1957_TAIOANGI_SIONGIONG_GILUI,
	DICT_1973_EMBREE_TAIENG_SUTIAN,
	DICT_1976_MARYKNOLL_TAIENG_SUTIAN,
	DICT_1979_MARYKNOLL_ENGTAI_SUTIAN,
	DICT_2002_TAIHOA_SOANNTENG_SUTIAN,
	DICT_2009_TJ_TAIGI_PEHOE_SIOSUTIAN_SEKIN,
	DICT_2011_KAUIOKPOO_SUTIAN,
	DICT_2016_ITAIGI,
	DICT_CHHOETAIGI_CHENGPOO_SUTIAN,
	DICT_TAIOAN_BUNHAK_TUCHOK_SEKIN,
	DICT_SOANNTENG_MUITHE_SEKIN,
];

export function getDictionaryByName(name) {
	return DICTIONARY_BY[name];
}

export function isDictionaryAcceptsColumns(dictionary, targetColumns) {
	const { columns } = dictionary;
	for (const key in targetColumns) {
		if (key in columns) {
			return true;
		}
		switch (key) {
			case "hoabun": {
				return "HoaBun" in columns;
			}
			case "english": {
				return "EngBun" in columns;
			}
			case "jitbun": {
				return (
					"JitBun" in columns ||
					"KaisoehJitbunPoj" in columns ||
					"LekuJitbunPoj" in columns
				);
			}
			case "taibun": {
				return "HanLoTaibunPoj" in columns || "HanLoTaibunKip" in columns;
			}
		}
	}
	return false;
}

function thakTaigiURL(dictionaryName, page) {
	return `https://thak.taigi.info/${dictionaryName}/chheh/?page=${page}`;
}

function defaultPageURL(chhoeTaigi) {
	return chhoeTaigi.PageNumber;
}

const DICTIONARY_BY = {
	[DICT_1895_JITPUN_SITAI_TANGI_MIALUI_CHIP]: {
		code: DICT_1895_JITPUN_SITAI_TANGI_MIALUI_CHIP,
		chineseName: "1895-1945 日本時代單語名彙集",
		brief: {
			PojUnicode: "白話字",
			KipUnicode: "教育部拼音",
			HanLoTaibunPoj: "漢羅",
			ChhehMia: "冊名",
		},
		briefWidth: {
			PojUnicode: "230px",
			KipUnicode: "230px",
			HanLoTaibunPoj: "210px",
			ChhehMia: "232px",
		},
		columns: {
			DictWordID: "番號",
			Sube: "詞碼",
			PojUnicode: "白話字",
			PojInput: "白話字輸入式",
			KipUnicode: "教育部拼音",
			KipInput: "教育部拼音輸入式",
			HanLoTaibunPoj: "漢羅",
			JitBun: "日文",
			HunluiJitbun: "分類(日文)",
			Hunlui: "分類",
			ChhoetaigiPhianChu: "ChhoeTaigi編註",
			ChhehMia: "冊名",
			PageNumber: "掀原冊(頁)",
		},
		pageURL(chhoeTaigi) {
			switch (chhoeTaigi.ChhehMia) {
				case "1895《臺灣語》": {
					return thakTaigiURL(
						"1895Taioangi",
						5 + parseInt(chhoeTaigi.PageNumber, 10) / 2,
					);
				}
				case "1896《日臺會話大全》": {
					return thakTaigiURL(
						"1896JittaiHoeoeTaichoan",
						10 + parseInt(chhoeTaigi.PageNumber, 10),
					);
				}
				case "1896《臺灣土語全書》": {
					return thakTaigiURL(
						"1896TaioanThoogiChoansu",
						22 + parseInt(chhoeTaigi.PageNumber, 10),
					);
				}
				case "1905《臺灣職業名字彙》": {
					return thakTaigiURL(
						"1905TaioanChitgiapMiaJilui",
						5 >= parseInt(chhoeTaigi.PageNumber, 10)
							? 12 + parseInt(chhoeTaigi.PageNumber, 10)
							: 15 + parseInt(chhoeTaigi.PageNumber, 10) / 2,
					);
				}
				case "1922《臺灣職業名字彙》": {
					return thakTaigiURL(
						"1922TaioanChitgiapMiaJilui",
						16 + parseInt(chhoeTaigi.PageNumber, 10) / 2,
					);
				}
				case "1922《臺灣語典》": {
					return thakTaigiURL(
						"1922TaioangiTian",
						143 + parseInt(chhoeTaigi.PageNumber, 10) / 2,
					);
				}
				case "1923《專賣局臺灣語典 第二篇 腦務》": {
					return thakTaigiURL(
						"1923ChoanbekiokTaioangiTianLobu",
						15 + parseInt(chhoeTaigi.PageNumber, 10),
					);
				}
				case "1926《銀行台語會話》": {
					return thakTaigiURL(
						"1926GinhangTaigiHoeoe",
						12 + parseInt(chhoeTaigi.PageNumber, 10),
					);
				}
				case "1928《臺灣植物名彙》": {
					return thakTaigiURL(
						"1928TaioanSitbutMialui",
						41 + parseInt(chhoeTaigi.PageNumber, 10),
					);
				}
				case "1933《臺灣稻在來品種名彙》": {
					return thakTaigiURL(
						"1933TaioanTiuChailaiPhinchengMialui",
						1 + parseInt(chhoeTaigi.PageNumber, 10),
					);
				}
			}
			return chhoeTaigi.PageNumber;
		},
	},
	[DICT_1913_KAM_UILIM_TAIGI_JITIAN]: {
		code: DICT_1913_KAM_UILIM_TAIGI_JITIAN,
		chineseName: "1913 甘為霖台語字典",
		brief: {
			PojUnicode: "白話字",
			KipUnicode: "教育部拼音",
			HanLoTaibunPoj: "漢羅",
			KaisoehHanLoPoj: "漢羅解說",
		},
		briefWidth: {
			PojUnicode: "150px",
			KipUnicode: "150px",
			HanLoTaibunPoj: "100px",
			KaisoehHanLoPoj: "512px",
		},
		columns: {
			DictWordID: "番號",
			Sube: "詞碼",
			PojUnicode: "白話字",
			PojInput: "白話字輸入式",
			KipUnicode: "教育部拼音",
			KipInput: "教育部拼音輸入式",
			HanbunImPojUnicode: "漢文音(白話字)",
			HanbunImPojInput: "漢文音(白話字輸入式)",
			HanbunImKipUnicode: "漢文音(教育部拼音)",
			HanbunImKipInput: "漢文音(教育部拼音輸入式)",
			HanLoTaibunPoj: "漢羅",
			KaisoehPoj: "解說(白話字)",
			KaisoehHanLoPoj: "解說(漢羅)",
			KaisoehKip: "解說(教育部拼音)",
			ChhoetaigiPhianChu: "ChhoeTaigi編註",
			PageNumber: "掀原冊(頁)",
		},
		pageURL(chhoeTaigi) {
			return thakTaigiURL(
				"1913KamJitian",
				34 + parseInt(chhoeTaigi.PageNumber, 10),
			);
		},
	},
	[DICT_1931_TAIJIT_SIN_SUSU]: {
		code: DICT_1931_TAIJIT_SIN_SUSU,
		chineseName: "1931 臺日新辭書",
		brief: {
			PojUnicode: "白話字",
			KipUnicode: "教育部拼音",
			HanLoTaibunPoj: "漢羅",
		},
		briefWidth: {
			PojUnicode: "300px",
			KipUnicode: "300px",
			HanLoTaibunPoj: "200px",
		},
		columns: {
			DictWordID: "番號",
			Sube: "詞碼",
			PojUnicode: "白話字",
			PojUnicodeOthers: "白話字(其他講法)",
			PojInput: "白話字輸入式",
			PojInputOthers: "白話字輸入式(其他講法)",
			KipUnicode: "教育部拼音",
			KipUnicodeOthers: "教育部拼音(其他講法)",
			KipInput: "教育部拼音輸入式",
			KipInputOthers: "教育部拼音輸入式(其他講法)",
			HanLoTaibunPoj: "漢羅",
			ChhoetaigiPhianChu: "ChhoeTaigi編註",
			PageNumber: "掀原冊(頁)",
		},
		pageURL(chhoeTaigi) {
			return thakTaigiURL(
				"1931TaijitSinSusu",
				51 + parseInt(chhoeTaigi.PageNumber, 10),
			);
		},
	},
	[DICT_1932_TAIJIT_TOA_SUTIAN]: {
		code: DICT_1932_TAIJIT_TOA_SUTIAN,
		chineseName: "1932 臺日大辭典",
		brief: {
			PojUnicode: "白話字",
			KipUnicode: "教育部拼音",
			HanLoTaibunPoj: "漢羅",
			KaisoehHanLoPoj: "解說(漢羅)",
		},
		briefWidth: {
			PojUnicode: "200px",
			KipUnicode: "200px",
			HanLoTaibunPoj: "170px",
			KaisoehHanLoPoj: "230px",
		},
		columns: {
			DictWordID: "番號",
			Sube: "詞碼",
			PojUnicode: "白話字",
			PojUnicodeOthers: "白話字(其他講法)",
			PojInput: "白話字輸入式",
			PojInputOthers: "白話字輸入式(其他講法)",
			KipUnicode: "教育部拼音",
			KipUnicodeOthers: "教育部拼音(其他講法)",
			KipInput: "教育部拼音輸入式",
			KipInputOthers: "教育部拼音輸入式(其他講法)",
			HanLoTaibunPoj: "漢羅",
			KaisoehHanLoPoj: "解說(漢羅)",
			KaisoehJitbunPoj: "解說(日文)",
			LekuHanLoPoj: "例(漢羅)",
			LekuJitbunPoj: "例(日文)",
			KahToo: "Kah圖",
			ChhoetaigiPhianChu: "ChhoeTaigi編註",
			PageNumber: "掀原冊(頁)",
		},
		pageURL(chhoeTaigi) {
			const firstChar = chhoeTaigi.PageNumber.slice(0, 1);
			const page = parseInt(chhoeTaigi.PageNumber.slice(1, 5), 10);
			if ("A" === firstChar) {
				return thakTaigiURL("1931TaijitToaSutian1", 12 + page);
			} else {
				return thakTaigiURL("1932TaijitToaSutian2", 4 + page);
			}
		},
	},
	[DICT_1956_TAIOAN_PEHOE_KICHHOO_GIKU]: {
		code: DICT_1956_TAIOAN_PEHOE_KICHHOO_GIKU,
		chineseName: "1956 台灣白話基礎語句",
		brief: {
			PojUnicode: "白話字",
			KipUnicode: "教育部拼音",
			HoaBun: "對應華文",
			EngBun: "對應英文",
		},
		briefWidth: {
			PojUnicode: "150px",
			KipUnicode: "150px",
			HoaBun: "150px",
			EngBun: "350px",
		},
		columns: {
			DictWordID: "番號",
			Sube: "詞碼",
			PojUnicode: "白話字",
			PojUnicodeOthers: "白話字(其他講法)",
			PojInput: "白話字輸入式",
			PojInputOthers: "白話字輸入式(其他講法)",
			KipUnicode: "教育部拼音",
			KipUnicodeOthers: "教育部拼音(其他講法)",
			KipInput: "教育部拼音輸入式",
			KipInputOthers: "教育部拼音輸入式(其他講法)",
			EngBun: "對應英文",
			KaisoehEngbun: "英文說明",
			HoaBun: "對應華文",
			NounClassifier: "助數詞",
			LesuPoj: "詞例",
			Opposite: "反義詞",
			LekuPoj: "句例(白話字)",
			LekuEngbun: "句例(英文)",
			LekuHoabun: "句例(華文)",
			Confer: "參考比較",
			ChhoetaigiPhianChu: "ChhoeTaigi編註",
			PageNumber: "掀原冊(頁)",
		},
		pageURL(chhoeTaigi) {
			return thakTaigiURL(
				"1956TaioanPehoeKichhooGiku",
				10 + parseInt(chhoeTaigi.PageNumber, 10),
			);
		},
	},
	[DICT_1957_TAIOANGI_SIONGIONG_GILUI]: {
		code: DICT_1957_TAIOANGI_SIONGIONG_GILUI,
		chineseName: "1957 台灣語常用語彙",
		brief: {
			PojUnicode: "白話字",
			KipUnicode: "教育部拼音",
			HanLoTaibunPoj: "漢羅",
			// LekuJitbunPoj: "例(日文)",
		},
		briefWidth: {
			PojUnicode: "150px",
			KipUnicode: "150px",
			HanLoTaibunPoj: "150px",
			// LekuJitbunPoj: "305px",
		},
		columns: {
			DictWordID: "番號",
			Sube: "詞碼",
			PojUnicode: "白話字",
			PojInput: "白話字輸入式",
			KipUnicode: "教育部拼音",
			KipInput: "教育部拼音輸入式",
			HanLoTaibunPoj: "漢羅",
			KaisoehJitbunPoj: "解說(日文)",
			LekuJitbunPoj: "例(日文)",
			Confer: "參考比較",
			Synonym: "Kāng義詞",
			Opposite: "反義詞",
			ChhoetaigiPhianChu: "ChhoeTaigi編註",
			PageNumber: "掀原冊(頁)",
			PageNumberChianoePan: "前衛出版社中譯版頁數",
		},
		pageURL(chhoeTaigi) {
			return thakTaigiURL(
				"1957TaioangiSiongiongGilui",
				4 + parseInt(chhoeTaigi.PageNumber, 10),
			);
		},
	},
	[DICT_1973_EMBREE_TAIENG_SUTIAN]: {
		code: DICT_1973_EMBREE_TAIENG_SUTIAN,
		chineseName: "1973 Embree台英辭典",
		brief: {
			PojUnicode: "白話字",
			KipUnicode: "教育部拼音",
			HoaBun: "對應華文",
			EngBun: "對應英文",
		},
		briefWidth: {
			PojUnicode: "150px",
			KipUnicode: "150px",
			HoaBun: "150px",
			EngBun: "350px",
		},
		columns: {
			DictWordID: "番號",
			Sube: "詞碼",
			PojUnicode: "白話字",
			PojInput: "白話字輸入式",
			KipUnicode: "教育部拼音",
			KipInput: "教育部拼音輸入式",
			Abbreviation: "詞類略語",
			NounClassifier: "助數詞",
			Reduplication: "疊詞",
			EngBun: "對應英文",
			HoaBun: "對應華文",
			Synonym: "Kāng義詞",
			Confer: "參考比較",
			ChhoetaigiPhianChu: "ChhoeTaigi編註",
			PageNumber: "掀原冊(頁)",
		},
		pageURL(chhoeTaigi) {
			return thakTaigiURL(
				"1973EmbreeTaiengSutian",
				44 + parseInt(chhoeTaigi.PageNumber, 10),
			);
		},
	},
	[DICT_1976_MARYKNOLL_TAIENG_SUTIAN]: {
		code: DICT_1976_MARYKNOLL_TAIENG_SUTIAN,
		chineseName: "1976 Maryknoll台英辭典",
		brief: {
			PojUnicode: "白話字",
			KipUnicode: "教育部拼音",
			HoaBun: "對應華文",
			EngBun: "對應英文",
		},
		briefWidth: {
			PojUnicode: "150px",
			KipUnicode: "150px",
			HoaBun: "150px",
			EngBun: "350px",
		},
		columns: {
			DictWordID: "番號",
			Sube: "詞碼",
			PojUnicode: "白話字",
			PojInput: "白話字輸入式",
			KipUnicode: "教育部拼音",
			KipInput: "教育部拼音輸入式",
			EngBun: "對應英文",
			HoaBun: "對應華文",
			ChhoetaigiPhianChu: "ChhoeTaigi編註",
			PageNumber: "掀原冊(頁)",
		},
		pageURL(chhoeTaigi) {
			return thakTaigiURL(
				"1976MaryknollTaiengSutian",
				17 + parseInt(chhoeTaigi.PageNumber, 10),
			);
		},
	},
	[DICT_1979_MARYKNOLL_ENGTAI_SUTIAN]: {
		code: DICT_1979_MARYKNOLL_ENGTAI_SUTIAN,
		chineseName: "1979 Maryknoll英台辭典",
		brief: {
			PojUnicode: "白話字",
			KipUnicode: "教育部拼音",
			HoaBun: "對應華文",
			EngBun: "對應英文",
		},
		briefWidth: {
			PojUnicode: "150px",
			KipUnicode: "150px",
			HoaBun: "150px",
			EngBun: "350px",
		},
		columns: {
			DictWordID: "番號",
			Sube: "詞碼",
			PojUnicode: "白話字",
			PojInput: "白話字輸入式",
			KipUnicode: "教育部拼音",
			KipInput: "教育部拼音輸入式",
			EngBun: "對應英文",
			HoaBun: "對應華文",
			Confer: "參考比較",
			ChhoetaigiPhianChu: "ChhoeTaigi編註",
			PageNumber: "掀原冊(頁)",
		},
		pageURL(chhoeTaigi) {
			return thakTaigiURL(
				"1979MaryknollEngtaiSutian",
				1 + parseInt(chhoeTaigi.PageNumber, 10),
			);
		},
	},
	[DICT_2002_TAIHOA_SOANNTENG_SUTIAN]: {
		code: DICT_2002_TAIHOA_SOANNTENG_SUTIAN,
		chineseName: "2002⁺ 台華線頂辭典",
		brief: {
			PojUnicode: "白話字",
			KipUnicode: "教育部拼音",
			HanLoTaibunPoj: "漢羅",
			HoaBun: "對應華文",
		},
		briefWidth: {
			PojUnicode: "200px",
			KipUnicode: "200px",
			HanLoTaibunPoj: "200px",
			HoaBun: "200px",
		},
		columns: {
			DictWordID: "番號",
			Sube: "詞碼",
			PojUnicode: "白話字",
			PojUnicodeOthers: "白話字(其他講法)",
			PojInput: "白話字輸入式",
			PojInputOthers: "白話字輸入式(其他講法)",
			KipUnicode: "教育部拼音",
			KipUnicodeOthers: "教育部拼音(其他講法)",
			KipInput: "教育部拼音輸入式",
			KipInputOthers: "教育部拼音輸入式(其他講法)",
			HanLoTaibunPoj: "漢羅",
			HoaBun: "對應華文",
			LaigoanBangchi: "網址",
		},
		pageURL: defaultPageURL,
		laigoanURL(chhoeTaigi) {
			return `http://ip194097.ntcu.edu.tw/q/THq.asp?w=${chhoeTaigi.HoaBun}`;
		},
	},
	[DICT_2009_TJ_TAIGI_PEHOE_SIOSUTIAN_SEKIN]: {
		code: DICT_2009_TJ_TAIGI_PEHOE_SIOSUTIAN_SEKIN,
		chineseName: "2009 TJ台語白話小詞典(索引)",
		brief: {
			PojUnicode: "白話字",
			PojUnicodeOthers: "白話字(其他講法)",
			LmjUnicode: "原冊白話字",
			PageNumber: "掀原冊(頁)",
		},
		briefWidth: {
			PojUnicode: "220px",
			PojUnicodeOthers: "220px",
			LmjUnicode: "210px",
			PageNumber: "200px",
		},
		columns: {
			DictWordID: "番號",
			Sube: "詞碼",
			PojUnicode: "白話字",
			PojUnicodeOthers: "白話字(其他講法)",
			PojInput: "白話字輸入式",
			PojInputOthers: "白話字輸入式(其他講法)",
			LmjUnicode: "原冊白話字",
			LmjUnicodeOthers: "原冊白話字(其他講法)",
			KipUnicode: "教育部拼音",
			KipUnicodeOthers: "教育部拼音(其他講法)",
			KipInput: "教育部拼音輸入式",
			KipInputOthers: "教育部拼音輸入式(其他講法)",
			ChhoetaigiPhianChu: "ChhoeTaigi編註",
			PageNumber: "掀原冊(頁)",
			StoreLink: "來去買冊",
		},
		pageURL: defaultPageURL,
		storeURL() {
			return "https://www.pcstore.com.tw/haiang/M19279123.htm";
		},
	},
	[DICT_2011_KAUIOKPOO_SUTIAN]: {
		code: DICT_2011_KAUIOKPOO_SUTIAN,
		chineseName: "2011⁺ 教育部辭典⁺",
		brief: {
			PojUnicode: "白話字",
			KipUnicode: "教育部拼音",
			HanLoTaibunKip: "漢字",
			HoaBun: "對應華文",
		},
		briefWidth: {
			PojUnicode: "200px",
			KipUnicode: "200px",
			HanLoTaibunKip: "200px",
			HoaBun: "250px",
		},
		columns: {
			DictWordID: "番號",
			Sube: "詞碼",
			PojUnicode: "白話字",
			PojUnicodeOthers: "白話字(其他講法)",
			PojInput: "白話字輸入式",
			PojInputOthers: "白話字輸入式(其他講法)",
			KipUnicode: "教育部拼音",
			KipUnicodeOthers: "教育部拼音(其他講法)",
			KipInput: "教育部拼音輸入式",
			KipInputOthers: "教育部拼音輸入式(其他講法)",
			HanLoTaibunKip: "漢字",
			KipDictHanjiTaibunOthers: "漢字(其他寫法)",
			KaisoehHanLoPoj: "解說(華文)、例(台文/白話字)",
			HoaBun: "對應華文",
			KaisoehHanLoKip: "解說(華文)、例(台文/教育部拼音)",
			KipDictDialects: "無kāng所在無kāng講法(教育部拼音)",
			KipDictWordProperty: "資料集",
			Synonym: "Kāng義詞",
			Opposite: "反義詞",
			KhehBun: "對應客文",
			KipDictKaisoehKhehbun: "對應客文解說",
			LaigoanBangchi: "網址",
		},
		pageURL: defaultPageURL,
		laigoanURL(chhoeTaigi) {
			return `https://sutian.moe.edu.tw/und-hani/tshiau/?lui=tai_su&tsha=${chhoeTaigi.PojUnicode}`;
		},
	},
	[DICT_2016_ITAIGI]: {
		code: DICT_2016_ITAIGI,
		chineseName: "2016⁺ iTaigi",
		brief: {
			PojUnicode: "白話字",
			KipUnicode: "教育部拼音",
			HanLoTaibunPoj: "漢羅",
			HoaBun: "對應華文",
		},
		briefWidth: {
			PojUnicode: "200px",
			KipUnicode: "200px",
			HanLoTaibunPoj: "200px",
			HoaBun: "250px",
		},
		columns: {
			DictWordID: "番號",
			Sube: "詞碼",
			PojUnicode: "白話字",
			PojInput: "白話字輸入式",
			KipUnicode: "教育部拼音",
			KipInput: "教育部拼音輸入式",
			HanLoTaibunPoj: "漢羅(白話字)",
			HanLoTaibunKip: "漢羅(教育部拼音)",
			HoaBun: "對應華文",
			DataProvidedBy: "資料來源",
			LaigoanBangchi: "網址",
		},
		pageURL: defaultPageURL,
		laigoanURL(chhoeTaigi) {
			return `https://itaigi.tw/k/${chhoeTaigi.HoaBun}`;
		},
	},
	[DICT_CHHOETAIGI_CHENGPOO_SUTIAN]: {
		code: DICT_CHHOETAIGI_CHENGPOO_SUTIAN,
		chineseName: "ChhoeTaigi增補辭典",
		brief: {
			PojUnicode: "白話字",
			KipUnicode: "教育部拼音",
			HanLoTaibunPoj: "漢羅",
			HoaBun: "對應華文",
		},
		briefWidth: {
			PojUnicode: "200px",
			KipUnicode: "200px",
			HanLoTaibunPoj: "200px",
			HoaBun: "250px",
		},
		columns: {
			DictWordID: "番號",
			Sube: "詞碼",
			PojUnicode: "白話字",
			PojInput: "白話字輸入式",
			KipUnicode: "教育部拼音",
			KipInput: "教育部拼音輸入式",
			HanLoTaibunPoj: "漢羅",
			EngBun: "對應英文",
			JitBun: "對應日文",
			HoaBun: "對應華文",
			ChhoetaigiPhianChu: "ChhoeTaigi編註",
			LaigoanMia: "資料來源",
			LaigoanBangchi: "網址",
		},
		pageURL: defaultPageURL,
	},
	[DICT_TAIOAN_BUNHAK_TUCHOK_SEKIN]: {
		code: DICT_TAIOAN_BUNHAK_TUCHOK_SEKIN,
		chineseName: "台灣文學著作索引",
		brief: {
			PojUnicode: "白話字",
			KipUnicode: "教育部拼音",
			ChhehMia: "冊名",
			// SuBeSoatbeng: "所在",
		},
		briefWidth: {
			PojUnicode: "200px",
			KipUnicode: "200px",
			ChhehMia: "225px",
			SuBeSoatbeng: "225px",
		},
		columns: {
			DictWordID: "番號",
			Sube: "詞碼",
			PojUnicode: "白話字",
			PojInput: "白話字輸入式",
			KipUnicode: "教育部拼音",
			KipInput: "教育部拼音輸入式",
			HanLoTaibunPoj: "漢羅",
			SuBeSoatbeng: "所在",
			ChhoetaigiPhianChu: "ChhoeTaigi編註",
			ChhehMia: "冊名",
			PageNumber: "掀原冊(頁)",
			StoreLink: "來去買冊",
		},
		pageURL(chhoeTaigi) {
			if (chhoeTaigi.ChhehMia.startsWith("《Chhut Sí-sòaⁿ (出死線)》")) {
				return thakTaigiURL(
					"1926ChhutSisoann",
					1 + parseInt(chhoeTaigi.PageNumber, 10),
				);
			}
			if (chhoeTaigi.ChhehMia.startsWith("《Khó-ài ê Siû-jîn (可愛ê仇人)》")) {
				const firstChar = chhoeTaigi.PageNumber.slice(0, 1);
				const page =
					"T" === firstChar
						? parseInt(chhoeTaigi.PageNumber.slice(1, 3), 10)
						: 5 + parseInt(chhoeTaigi.PageNumber, 10);

				return thakTaigiURL("1960KhoaiESiujin", page);
			}
			return chhoeTaigi.PageNumber;
		},
		storeURL(chhoeTaigi) {
			if (chhoeTaigi.chhehMia.startsWith("《鄉史補記》")) {
				return "http://www.taiouan.com.tw/catalog/product_info.php?products_id=3282";
			}
			if (chhoeTaigi.chhehMia.startsWith("《陳明仁台語文學選》")) {
				return "http://www.taiouan.com.tw/catalog/product_info.php?products_id=1583";
			}
		},
	},
	[DICT_SOANNTENG_MUITHE_SEKIN]: {
		code: DICT_SOANNTENG_MUITHE_SEKIN,
		chineseName: "線頂媒體索引",
		brief: {
			PojUnicode: "白話字",
			KipUnicode: "教育部拼音",
			HanLoTaibunPoj: "漢羅",
			HoaBun: "對應華文",
		},
		briefWidth: {
			PojUnicode: "200px",
			KipUnicode: "200px",
			HanLoTaibunPoj: "200px",
			HoaBun: "250px",
		},
		columns: {
			DictWordID: "番號",
			Sube: "詞碼",
			PojUnicode: "白話字",
			PojInput: "白話字輸入式",
			KipUnicode: "教育部拼音",
			KipInput: "教育部拼音輸入式",
			HanLoTaibunPoj: "漢羅",
			EngBun: "對應英文",
			HoaBun: "對應華文",
			SoanntengMuitheSekinPoochhiongChuliau: "補充資料",
			ChhoetaigiPhianChu: "ChhoeTaigi編註",
			SoanntengMuitheSekinHongsangJitki: "放送日期",
			SoanntengMuitheSekinMuitheMiachheng: "媒體名",
			SoanntengMuitheSekinLaigoanBangchi: "網址",
		},
		pageURL: defaultPageURL,
	},
};
