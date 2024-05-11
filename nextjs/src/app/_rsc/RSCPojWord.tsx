import "server-only";

import * as React from "react";
import { dicAndId } from "../_api";

export default async function RSCPojWord({ dic, wordId }) {
	const chhoeTaigi = await dicAndId(
		dic,
		wordId,
	);
	return chhoeTaigi.PojUnicode;
}
