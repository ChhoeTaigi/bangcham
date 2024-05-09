"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";

import { langList } from "../chhoeTaigiLangs";

export default function Footer({ lang, children }) {
	const router = useRouter();
	const pathname = usePathname();
	function onLangClick({ target }) {
		const value = target.getAttribute("data-value");
		const { pathname, search } = window.location;
		router.push(
			pathname.replace(new RegExp(`^\/${lang}`), `/${value}`) + search,
		);
	}
	return (
		<footer
			className={
				"site-footer site-footer--darkgreen " +
				{
					// TODO
					"/chinkai": "site-footer--lightgreen",
				}[pathname]
			}
		>
			<div className="container">
				<ul className="langs" onClick={onLangClick}>
					{langList.map(({ value, label }) => (
						<li key={value}>
							<button
								className={"langs__btn " + (lang === value ? "active" : "")}
								data-value={value}
							>
								{label}
							</button>
						</li>
					))}
				</ul>
			</div>
			{children}
		</footer>
	);
}
