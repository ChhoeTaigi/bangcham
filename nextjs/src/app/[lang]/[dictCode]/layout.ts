import "server-only";

import * as React from "react";

import { init } from "src/LangNoauiDict";

export default async function RSCDictCodeLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: any;
}) {
	await init();
	return children;
}
