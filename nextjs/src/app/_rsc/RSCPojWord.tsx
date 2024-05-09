import "server-only";

import * as React from "react";
import { findUniqueByDictCodeAndWordId } from "./api";

export default async function RSCPojWord({ dictionary, wordId }) {
	const chhoeTaigi = await findUniqueByDictCodeAndWordId(
		dictionary.code,
		wordId,
	);
	return chhoeTaigi.PojUnicode;
}
