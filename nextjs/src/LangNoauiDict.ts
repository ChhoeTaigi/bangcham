import { langList } from "src/chhoeTaigiLangs";
import sql from "./postgreSQL/pool";

const LANG_NOAUI_DICT_BY_LANG_AND_CODE = new Map();

export async function init() {
	if (LANG_NOAUI_DICT_BY_LANG_AND_CODE.size) {
		return;
	}
	const [noauiDict, noauiChhoeTaigi] = await Promise.all([
		sql`SELECT * FROM "public"."NoauiDict"`,
		sql`SELECT * FROM "public"."NoauiChhoeTaigi"`,
	]);
	const NOAUI_CHHOE_TAIGI_BY = new Map();
	noauiChhoeTaigi.forEach((it) => NOAUI_CHHOE_TAIGI_BY.set(it.id, it));

	langList.forEach(({ value, label }) => {
		noauiDict.forEach((it) => {
			const key = `${value}_${it.DictCode}`;
			const langNoauiDict = {
				id: it.id,
				DictCode: it.DictCode,
				langName: it[label],
				langNoauiChhoeTaigiList: it.noauiChhoeTaigiIdList.map((id) => {
					const noauiChhoeTaigi = NOAUI_CHHOE_TAIGI_BY.get(id);

					return {
						id: noauiChhoeTaigi.id,
						JoinedDictColumnName: noauiChhoeTaigi.JoinedDictColumnName,
						langName: noauiChhoeTaigi[label],
					};
				}),
				pageURL(chhoeTaigi) {
					return chhoeTaigi.PageNumber;
				},
				storeURL(chhoeTaigi) {
					return false;
				},
				laigoanURL(chhoeTaigi) {
					return chhoeTaigi.LaigoanBangchi;
				},
				...EXTRA_DICT_PROPS_BY[it.DictCode],
			};
			LANG_NOAUI_DICT_BY_LANG_AND_CODE.set(key, langNoauiDict);
		});
	});
}

export function langNoauiDictBy({ lang, dictCode }) {
	return LANG_NOAUI_DICT_BY_LANG_AND_CODE.get(`${lang}_${dictCode}`);
}

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

function thakTaigiURL(dictCode, page) {
	return `https://thak.taigi.info/${dictCode}/chheh/?page=${page}`;
}

const EXTRA_DICT_PROPS_BY = {
	[DICT_1895_JITPUN_SITAI_TANGI_MIALUI_CHIP]: {
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
		pageURL(chhoeTaigi) {
			return thakTaigiURL(
				"1913KamJitian",
				34 + parseInt(chhoeTaigi.PageNumber, 10),
			);
		},
	},
	[DICT_1931_TAIJIT_SIN_SUSU]: {
		pageURL(chhoeTaigi) {
			return thakTaigiURL(
				"1931TaijitSinSusu",
				51 + parseInt(chhoeTaigi.PageNumber, 10),
			);
		},
	},
	[DICT_1932_TAIJIT_TOA_SUTIAN]: {
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
		pageURL(chhoeTaigi) {
			return thakTaigiURL(
				"1956TaioanPehoeKichhooGiku",
				10 + parseInt(chhoeTaigi.PageNumber, 10),
			);
		},
	},
	[DICT_1957_TAIOANGI_SIONGIONG_GILUI]: {
		pageURL(chhoeTaigi) {
			return thakTaigiURL(
				"1957TaioangiSiongiongGilui",
				4 + parseInt(chhoeTaigi.PageNumber, 10),
			);
		},
	},
	[DICT_1973_EMBREE_TAIENG_SUTIAN]: {
		pageURL(chhoeTaigi) {
			return thakTaigiURL(
				"1973EmbreeTaiengSutian",
				44 + parseInt(chhoeTaigi.PageNumber, 10),
			);
		},
	},
	[DICT_1976_MARYKNOLL_TAIENG_SUTIAN]: {
		pageURL(chhoeTaigi) {
			return thakTaigiURL(
				"1976MaryknollTaiengSutian",
				17 + parseInt(chhoeTaigi.PageNumber, 10),
			);
		},
	},
	[DICT_1979_MARYKNOLL_ENGTAI_SUTIAN]: {
		pageURL(chhoeTaigi) {
			return thakTaigiURL(
				"1979MaryknollEngtaiSutian",
				1 + parseInt(chhoeTaigi.PageNumber, 10),
			);
		},
	},
	[DICT_2002_TAIHOA_SOANNTENG_SUTIAN]: {
		laigoanURL(chhoeTaigi) {
			return `http://ip194097.ntcu.edu.tw/q/THq.asp?w=${chhoeTaigi.HoaBun}`;
		},
	},
	[DICT_2009_TJ_TAIGI_PEHOE_SIOSUTIAN_SEKIN]: {
		storeURL() {
			return "https://www.pcstore.com.tw/haiang/M19279123.htm";
		},
	},
	[DICT_2011_KAUIOKPOO_SUTIAN]: {
		laigoanURL(chhoeTaigi) {
			return `https://sutian.moe.edu.tw/und-hani/tshiau/?lui=tai_su&tsha=${chhoeTaigi.PojUnicode}`;
		},
	},
	[DICT_2016_ITAIGI]: {
		laigoanURL(chhoeTaigi) {
			return `https://itaigi.tw/k/${chhoeTaigi.HoaBun}`;
		},
	},
	[DICT_TAIOAN_BUNHAK_TUCHOK_SEKIN]: {
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
};
