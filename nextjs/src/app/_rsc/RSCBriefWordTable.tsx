import * as React from "react";
import { getDictionaryByName } from "@/app/_isomorphic/Dictionary";
import Link from "next/link";

export default function RSCBriefWordTable({ lang, dic, wordList, more }) {
	if (0 === wordList.length) {
		return false;
	}
	const dictionary = getDictionaryByName(dic);
	const briefEntryList = Object.entries(dictionary.brief);

	return (
		<div className="brief-table__wrapper">
			<table className="brief-table">
				<thead>
					<tr>
						{briefEntryList.map(([key, value]) => (
							<th key={key}>{value as string}</th>
						))}
						<th className="brief-table__detail" />
					</tr>
				</thead>
				<tbody>
					{wordList.map((chhoeTaigi) => (
						<tr key={chhoeTaigi.DictWordID}>
							{briefEntryList.map(([key, value]) => (
								<td key={key}>
									<span className="brief-table__narrow-title">{value  as string}：</span>
									<span className="brief-table__text">{chhoeTaigi[key]}</span>
								</td>
							))}
							<td className="brief-table__detail">
								<Link href={`/${lang}/${dic}/${chhoeTaigi.DictWordID}`}>{more}</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
