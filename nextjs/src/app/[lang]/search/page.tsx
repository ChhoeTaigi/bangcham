import "server-only";

import * as React from "react";
import { getTranslations } from "next-intl/server";

import { basicAllDictList } from "@/app/_rsc/api";
import DicBriefResult from "@/components/DicBriefResult";
import RSCBriefWordTable from "@/app/_rsc/RSCBriefWordTable";
import DicButtonGroup from "@/components/DicButtonGroup";

type SearcgParams = { lang: string };

export async function generateMetadata({
	searchParams: { spelling },
}) {
	const title = ["Chhoe ", spelling].filter(Boolean).join(" | ");
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

/**
 * ?method=basic&searchMethod=equals&spelling=goa2&spellingMethod=PojInput
 */
async function RSCBasicSearch({
	params: { lang },
	searchParams,
	searchParams: {
		method,
		dic,
		page,
		searchMethod,
		spellingMethod: rawSpellingMethod,
		spelling,
		taibun,
		hoabun,
		english,
		jitbun,
	},
}: {
	params: SearcgParams;
	searchParams: any;
}) {
	const t = await getTranslations("RSCSearchPage");
	const spellingMethod =
		{
			poj_unicode: "PojUnicode",
			poj_input: "PojInput",
			kiplmj_unicode: "KipUnicode",
			kiplmj_input: "KipInput",
		}[rawSpellingMethod] ||
		rawSpellingMethod ||
		"spelling";
	const columns = Object.fromEntries(
		[
			[spellingMethod, spelling],
			["taibun", taibun],
			["hoabun", hoabun],
			["english", english],
			["jitbun", jitbun],
		].filter(([, value]) => !!value && /\S/.test(value)),
	);
	const { dictResultList, wordCount } = await basicAllDictList({
		// method,
		// dic,
		// page,
		// spellingMethod,
		searchMethod,
		columns,
	});
	return (
		<React.Fragment>
			<div className="container">
				<div className="search-result__query">
					{t("keyowrd")}：
					{Object.entries(columns)
						.map(([key, value]) => `【${value}】`)
						.join("，")}
				</div>
				<div key="resultCount" className="search-result__counts">
					{t("allDictListResultCount", { count: dictResultList.length })}
					{t("wordResultCount", { count: wordCount })}
				</div>
				{/* 
				{!this.props.allResults && LoadingIndicator} */}
			</div>
			<div id="dic-button-group" className="search-result__dic-list">
				<div className="container">
					<DicButtonGroup dictNameList={dictResultList.map(({ dic }) => dic)} />
				</div>
			</div>
			<div className="search-result__brief">
				<div className="container">
					{dictResultList.map(({ dic, total, wordList }) => (
						<DicBriefResult
							key={dic}
							dic={dic}
							wordResultCount={t("wordResultCount", { count: total })}
						>
							<RSCBriefWordTable
								lang={lang}
								dic={dic}
								wordList={wordList}
								more={t("more")}
							/>
							{20 < total && (
								<div className="dic-block__append">
									more-results!!
									{/* <Link className="btn dic-block__more" to={this.state.url}>
												<Translate id="more-results" />
											</Link> */}
								</div>
							)}
						</DicBriefResult>
					))}
				</div>
			</div>
		</React.Fragment>
	);
}

export default async function RSCSearchPage({
	params,
	searchParams,
	searchParams: { method },
}) {
	return (
		<main>
			<div className="search-result search-result--list">
				{"basic" === method && (
					<RSCBasicSearch params={params} searchParams={searchParams} />
				)}
			</div>
		</main>
	);
}
