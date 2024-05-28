import "server-only";

import * as React from "react";
import {
	DICT_2009_TJ_TAIGI_PEHOE_SIOSUTIAN_SEKIN,
	DICT_TAIOAN_BUNHAK_TUCHOK_SEKIN,
} from "src/LangNoauiDict"
import { dicAndId } from "../_api";

function RSCGoanChhehLink({ langNoauiDict, chhoeTaigi }) {
	if (
		DICT_2009_TJ_TAIGI_PEHOE_SIOSUTIAN_SEKIN === langNoauiDict.DictCode ||
		(DICT_TAIOAN_BUNHAK_TUCHOK_SEKIN === langNoauiDict.DictCode &&
			chhoeTaigi.ChhehMia &&
			(chhoeTaigi.ChhehMia.startsWith("《鄉史補記》") ||
				chhoeTaigi.ChhehMia.startsWith("《陳明仁台語文學選》")))
	) {
		return (
			chhoeTaigi.PageNumber +
			"（本冊kan-na提供索引資料，nā有需要請ka-tī買冊。請支持台文出版品，感謝！）"
		);
	}
	return chhoeTaigi.PageNumber.split("/").reduce((acc, PageNumber, index) => {
		if (acc.length) {
			acc.push(<React.Fragment key={`${index}-sep`}>{", "}</React.Fragment>);
		}
		acc.push(
			<a key={index} href={langNoauiDict.pageURL(chhoeTaigi)} target="_blank">
				{chhoeTaigi.PageNumber}
			</a>,
		);
		return acc;
	}, []);
}

function RSCDictionaryColumn({
	langNoauiDict,
	langNoauiChhoeTaigi,
	chhoeTaigi,
}) {
	switch (langNoauiChhoeTaigi.JoinedDictColumnName) {
		case "PageNumber": {
			return (
				<RSCGoanChhehLink
					langNoauiDict={langNoauiDict}
					chhoeTaigi={chhoeTaigi}
				/>
			);
		}
		case "StoreLink": {
			const storeURL = langNoauiDict.storeURL(chhoeTaigi);
			if (storeURL) {
				return (
					<a href={storeURL} target="_blank">
						{DICT_2009_TJ_TAIGI_PEHOE_SIOSUTIAN_SEKIN === langNoauiDict.DictCode
							? `亞細亞國際傳播社：TJ台語白話小詞典`
							: storeURL}
					</a>
				);
			}
			return false;
		}
		case "LaigoanBangchi": {
			const laigoanURL = langNoauiDict.laigoanURL(chhoeTaigi);
			if (laigoanURL) {
				return (
					<a href={laigoanURL} target="_blank">
						{laigoanURL}
					</a>
				);
			}
			return false;
		}
		case "SoanntengMuitheSekinLaigoanBangchi": {
			const laigoanURL = chhoeTaigi.SoanntengMuitheSekinLaigoanBangchi;
			if (laigoanURL) {
				return (
					<a href={laigoanURL} target="_blank">
						{laigoanURL}
					</a>
				);
			}
			return false;
		}
	}
	return chhoeTaigi[langNoauiChhoeTaigi.JoinedDictColumnName];
}

export default async function RSCWordTable({ langNoauiDict, wordId }) {
	const chhoeTaigi = await dicAndId(langNoauiDict.DictCode, wordId);
	return (
		<table className="word-detail-table">
			<tbody>
				{langNoauiDict.langNoauiChhoeTaigiList.map((langNoauiChhoeTaigi) => (
					<tr key={langNoauiChhoeTaigi.id}>
						<th>{langNoauiChhoeTaigi.langName}</th>
						<td>
							<RSCDictionaryColumn
								langNoauiDict={langNoauiDict}
								langNoauiChhoeTaigi={langNoauiChhoeTaigi}
								chhoeTaigi={chhoeTaigi}
							/>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
