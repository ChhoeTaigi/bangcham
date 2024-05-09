import createMiddleware from "next-intl/middleware";

import { langValueList } from "./chhoeTaigiLangs";

export default createMiddleware({
	// A list of all locales that are supported
	locales: langValueList,

	// Used when no locale matches
	defaultLocale: "hanlo",
});

export const config = {
	/**
	 * Match only internationalized pathnames
	 * The value here must be a static analyzable string. Cannot use langValueList
	 */
	matcher: ["/", `/(hanlo|poj|engbun|jitbun|tiongbun)/:path*`],
};


