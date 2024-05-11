import "server-only";

import * as React from "react";
import { getTranslations } from "next-intl/server";

import DicBriefResult from "@/components/DicBriefResult";
import RSCBriefWordTable from "@/app/_rsc/RSCBriefWordTable";
import DicButtonGroup from "@/components/DicButtonGroup";
import { normalizeBasic, basic } from "@/app/_api";

type SearchParams = { lang: string };

export async function generateMetadata({ searchParams: { spelling } }) {
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
	searchParams: { dic },
}: {
	params: SearchParams;
	searchParams: any;
}) {
	const t = await getTranslations("RSCSearchPage");
	const options = normalizeBasic(searchParams);
	if (dic) {
		const r = await basic(options);
		console.log(r);
		return "TODO : single dic";
	}
	const resultListStack = await basic(options);
	const sumOfAllNum = resultListStack.reduce((acc, it) => acc + it.num, 0);

	return (
		<React.Fragment>
			<div className="container">
				<div className="search-result__query">
					{t("search_keyword")}：
					{Object.entries(options.columns)
						.filter(([, value]) => value)
						.map(([, value]) => `【${value}】`)
						.join("，")}
				</div>
				<div key="resultCount" className="search-result__counts">
					{t("all-result-1")}
					{resultListStack.length}
					{t("all-result-2")}
					{sumOfAllNum}
					{t("all-result-3")}
				</div>
				{/* 
				{!this.props.allResults && LoadingIndicator} */}
			</div>
			<div id="dic-button-group" className="search-result__dic-list">
				<div className="container">
					<DicButtonGroup
						dictNameList={resultListStack.map(({ dic }) => dic)}
					/>
				</div>
			</div>
			<div className="search-result__brief">
				<div className="container">
					{resultListStack.map(({ num, dic, words }) => (
						<DicBriefResult
							key={dic}
							dic={dic}
							result1={t("result-1")}
							count={num}
							result2={t("result-2")}
						>
							<RSCBriefWordTable
								lang={lang}
								dic={dic}
								wordList={words}
								more={t("more")}
							/>
							{20 < num && (
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
