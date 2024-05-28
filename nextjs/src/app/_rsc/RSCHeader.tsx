import * as React from "react";

import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";

export default async function RSCHeader() {
	const t = await getTranslations("RSCHeader");

	return (
		<Header
			navItemList={[
				{
					href: "/",
					title: t("basic"),
				},
				{
					isDisabled: true,
					href: "/chinkai",
					title: t("advanced"),
				},
				{
					isDisabled: true,
					href: "/annachhoe",
					title: t("anchoannchhoe"),
				},
				// {
				// 	href: "/app",
				// 	title: t("app"),
				// },
				{
					isDisabled: true,
					href: "/liaukai",
					title: t("about"),
				},
			]}
			translations={{
				koankhoan: t("koankhoan"),
			}}
		/>
	);
}
