import { ImageResponse } from "next/og";
import type { DictionaryWordParams } from "./types";
import * as React from "react";
import { dicAndId } from "../../../_api";

// Image metadata
export const alt = "About Acme";
export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function OpengraphImage({
	params,
	params: { dictionaryName },
}: {
	params: DictionaryWordParams;
}) {
	const wordId = parseInt(params.wordId, 10);
	const [chhoeTaigi, DejaVuSans] = await Promise.all([
		dicAndId(dictionaryName, wordId),
		fetch(
			/**
			 * Found at https://github.com/prawnpdf/prawn/blob/master/data/fonts/DejaVuSans.ttf
			 */
			"https://github.com/prawnpdf/prawn/raw/master/data/fonts/DejaVuSans.ttf",
		).then((res) => res.arrayBuffer()),
	]);
	return new ImageResponse(
		(
			<div
				style={{
					padding: "40px",
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					background: "#eee",
					fontFamily: "TaigiFont",
				}}
			>
				<article
					style={{
						border: "1px solid gray",
						borderRadius: "60px",
						padding: "40px",
						width: "100%",
						height: "100%",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						background: "white",
					}}
				>
					<header
						style={{
							borderBottom: "2px dashed gray",
							width: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<img
							src="https://chhoe.taigi.info/images/logo@2x.png"
							style={{ flex: "0 1 36%" }}
						/>
						<p
							style={{
								flex: "1",
								paddingLeft: "40px",
								fontSize: 128,
							}}
						>
							{chhoeTaigi.PojUnicode}
						</p>
					</header>
					<section
						style={{
							paddingTop: "40px",
							fontSize: 64,
						}}
					>
						{chhoeTaigi.KaisoehPoj}
					</section>
				</article>
			</div>
		),
		{
			// For convenience, we can re-use the exported opengraph-image
			// size config to also set the ImageResponse's width and height.
			...size,
			fonts: [
				/**
				 * We're unforntunately to use IanSui font for ImageResponse.
				 * A fallback is to use DejaVuSans that supports POJ.
				 */
				{
					name: "DejaVuSans",
					data: DejaVuSans,
					style: "normal",
					weight: 400,
				},
			],
		},
	);
}
