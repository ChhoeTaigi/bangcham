import "server-only";

import * as React from "react";
import { dicAndId } from "../_api";

export default async function RSCPojWord({ langNoauiDict, wordId }) {
	const chhoeTaigi = await dicAndId(
		langNoauiDict.DictCode,
		wordId,
	);
	return chhoeTaigi.PojUnicode;
}
