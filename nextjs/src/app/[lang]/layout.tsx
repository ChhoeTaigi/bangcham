import "server-only";

import * as React from "react";
import type { Metadata, Viewport } from "next";

import "@/styles/styles.scss";
import RSCHeader from "../_rsc/RSCHeader";
import RSCFooter from "../_rsc/RSCFooter";
import { init } from "src/LangNoauiDict";

const title = "ChhoeTaigi 台語辭典⁺";
const description =
	"ChhoeTaigi 台語辭典 · 找台語 · 台文雞絲麵 Tâi-bûn Ke-si-mī";
const image = "https://chhoe.taigi.info/preview.jpg";

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
};

export const metadata: Metadata = {
	metadataBase: new URL("https://chhoe.taigi.info"),
	title,
	description,
	openGraph: {
		title,
		description,
		url: "https://chhoe.taigi.info",
		type: "website",
		images: image,
	},
	twitter: {
		title,
		description,
		card: "summary_large_image",
		images: image,
	},
	other: {
		HandheldFriendly: "true",
		image,
		"fb:app_id": "306448440105903",
	},
};

export default function RSCRootLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: any;
}) {
	init();
	return (
		<html lang={params.lang}>
			<head>
				<link
					rel="icon"
					sizes="16x16"
					media="(prefers-color-scheme: light)"
					type="image/png"
					href="favicon-light.ico"
				/>
				<link
					rel="icon"
					sizes="16x16"
					media="(prefers-color-scheme: dark)"
					type="image/png"
					href="favicon-dark.ico"
				/>
			</head>
			<body>
				<div className="content-wrapper">
					<RSCHeader />
					{children}
					<RSCFooter lang={params.lang} />
				</div>
			</body>
		</html>
	);
}
