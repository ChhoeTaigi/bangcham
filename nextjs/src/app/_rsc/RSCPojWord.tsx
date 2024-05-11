import "server-only";

import * as React from "react";
import { dicAndId } from "../_api";

export default async function RSCPojWord({ dictionary, wordId }) {
	const [chhoeTaigi] = await dicAndId(
		dictionary.code,
		wordId,
	);
	return chhoeTaigi.PojUnicode;
}
