import "server-only";

import * as React from "react";
import {
	DICT_2009_TJ_TAIGI_PEHOE_SIOSUTIAN_SEKIN,
	DICT_TAIOAN_BUNHAK_TUCHOK_SEKIN,
	getDictionaryByName,
} from "@/app/_isomorphic/Dictionary";
import { dicAndId } from "../_api";

function RSCGoanChhehLink({ dictionary, chhoeTaigi }) {
	if (
		getDictionaryByName(DICT_2009_TJ_TAIGI_PEHOE_SIOSUTIAN_SEKIN) ===
			dictionary ||
		(getDictionaryByName(DICT_TAIOAN_BUNHAK_TUCHOK_SEKIN) === dictionary &&
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
			<a key={index} href={dictionary.pageURL(chhoeTaigi)} target="_blank">
				{chhoeTaigi.PageNumber}
			</a>,
		);
		return acc;
	}, []);
}

function RSCDictionaryColumn({ dictionary, columnKey, chhoeTaigi }) {
	switch (columnKey) {
		case "PageNumber": {
			return (
				<RSCGoanChhehLink dictionary={dictionary} chhoeTaigi={chhoeTaigi} />
			);
		}
		case "StoreLink": {
			const storeURL = dictionary.storeURL?.(chhoeTaigi);
			if (storeURL) {
				return (
					<a href={storeURL} target="_blank">
						{getDictionaryByName(DICT_2009_TJ_TAIGI_PEHOE_SIOSUTIAN_SEKIN) ===
						dictionary
							? `亞細亞國際傳播社：TJ台語白話小詞典`
							: storeURL}
					</a>
				);
			}
			return false;
		}
		case "LaigoanBangchi": {
			const laigoanURL =
				dictionary.laigoanURL?.(chhoeTaigi) || chhoeTaigi.LaigoanBangchi;
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
	return chhoeTaigi[columnKey];
}

export default async function RSCWordTable({ dictionary, wordId }) {
	const [chhoeTaigi] = await dicAndId(
		dictionary.code,
		wordId,
	);
	return (
		<table className="word-detail-table">
			<tbody>
				{Object.keys(dictionary.columns).map((columnKey) => (
					<tr key={columnKey}>
						<th>{dictionary.columns[columnKey]}</th>
						<td>
							<RSCDictionaryColumn
								key={columnKey}
								dictionary={dictionary}
								columnKey={columnKey}
								chhoeTaigi={chhoeTaigi}
							/>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
