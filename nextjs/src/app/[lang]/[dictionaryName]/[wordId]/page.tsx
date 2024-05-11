import "server-only";

import * as React from "react";
import { getTranslations } from "next-intl/server";
import RSCWordTable from "@/app/_rsc/RSCWordTable";
import RSCPojWord from "@/app/_rsc/RSCPojWord";

import { getDictionaryByName } from "@/app/_isomorphic/Dictionary";
import { dicAndId } from "@/app/_api";
import type { DictionaryWordParams } from "./types";

export async function generateMetadata({
	params,
	params: { dictionaryName },
}: {
	params: DictionaryWordParams;
}) {
	const dictionary = getDictionaryByName(dictionaryName);
	const wordId = parseInt(params.wordId, 10);
	const chhoeTaigi = await dicAndId(dictionary.code, wordId);
	const title = [
		chhoeTaigi.PojUnicode,
		chhoeTaigi.HanLoTaibunPoj,
		dictionary.chineseName,
	]
		.filter(Boolean)
		.join(" | ");
	return {
		title,
		openGraph: {
			title,
		},
		twitter: {
			title,
		},
	};
}

export default function RSCWordPage({
	params,
	params: { lang, dictionaryName },
}: {
	params: DictionaryWordParams;
}) {
	const dictionary = getDictionaryByName(dictionaryName);
	const wordId = parseInt(params.wordId, 10);
	return (
		<main>
			<div className="result-detail">
				<div className="container">
					<div id="script"></div>
					<div className="result-detail__query">
						<div className="result-detail__query-dic">
							{dictionary.chineseName}：
						</div>
						<div className="result-detail__query-text">
							<RSCPojWord dic={dictionaryName} wordId={wordId} />
						</div>
					</div>
					<div
						style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: '20px' }}
					>
						<img
							src={`/${lang}/${dictionaryName}/${wordId}/opengraph-image`}
							alt="opengraph-image"
							width="600"
							height="315"
						/>
					</div>
					<div className="result-detail__table">
						<RSCWordTable dictionary={dictionary} wordId={wordId} />
					</div>
				</div>
			</div>
		</main>
	);
}
