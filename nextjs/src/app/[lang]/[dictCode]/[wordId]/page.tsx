import "server-only";

import * as React from "react";
import { getTranslations } from "next-intl/server";
import RSCWordTable from "@/app/_rsc/RSCWordTable";
import RSCPojWord from "@/app/_rsc/RSCPojWord";

import { dicAndId } from "@/app/_api";
import type { DictionaryWordParams } from "./types";
import { langNoauiDictBy } from "src/LangNoauiDict";


export async function generateMetadata({
	params,
	params: { dictCode },
}: {
	params: DictionaryWordParams;
}) {
	const langNoauiDict = langNoauiDictBy(params);
	const wordId = parseInt(params.wordId, 10);
	const chhoeTaigi = await dicAndId(dictCode, wordId);
	const title = [
		chhoeTaigi.PojUnicode,
		chhoeTaigi.HanLoTaibunPoj,
		langNoauiDict.langName,
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
	params: { lang, dictCode },
}: {
	params: DictionaryWordParams;
}) {
	const langNoauiDict = langNoauiDictBy(params);
	const wordId = parseInt(params.wordId, 10);
	return (
		<main>
			<div className="result-detail">
				<div className="container">
					<div id="script"></div>
					<div className="result-detail__query">
						<div className="result-detail__query-dic">
							{langNoauiDict.langName}：
						</div>
						<div className="result-detail__query-text">
							<RSCPojWord langNoauiDict={langNoauiDict} wordId={wordId} />
						</div>
					</div>
					<div
						style={{
							width: "100%",
							display: "flex",
							justifyContent: "center",
							marginBottom: "20px",
						}}
					>
						<img
							src={`/${lang}/${dictCode}/${wordId}/opengraph-image`}
							alt="opengraph-image"
							width="600"
							height="315"
						/>
					</div>
					<div className="result-detail__table">
						<RSCWordTable langNoauiDict={langNoauiDict} wordId={wordId} />
					</div>
				</div>
			</div>
		</main>
	);
}
