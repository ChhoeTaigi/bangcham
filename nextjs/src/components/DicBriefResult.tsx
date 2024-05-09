"use client";

import * as React from "react";
import { getDictionaryByName } from "@/app/_isomorphic/Dictionary";

export default function DicBriefResult({
	dic,
	wordResultCount,
	children,
}) {
	function toggleDic(event) {
		const currentHeader = event.currentTarget;
		if (window.getComputedStyle(currentHeader).display === "flex") {
			if (currentHeader.classList.contains("active")) {
				currentHeader.classList.remove("active");
			} else {
				document.querySelectorAll(".dic-block__header").forEach(function (el) {
					el.classList.remove("active");
				});
				currentHeader.classList.add("active");
			}
		}
	}
	return (
		<div id={`dic-${dic}`} className="dic-block">
			<header className="dic-block__header" onClick={toggleDic}>
				<h2 className="dic-block__title">
					{getDictionaryByName(dic).chineseName}
				</h2>
				<h3 className="dic-block__counts">({wordResultCount})</h3>
			</header>
			<div className="dic-block__content">
				{children}
			
			</div>
		</div>
	);
}
