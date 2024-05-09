"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import logo from "@/images/logo@2x.png";

export default function Header({ navItemList, translations }) {
	const pathname = usePathname();
	const siteNavListRef = React.useRef();
	// TODO: handleClickOutside
	function toggleMenu() {
		if (!siteNavListRef.current) {
			return;
		}
		(siteNavListRef.current as HTMLElement).classList.toggle("active");
	}
	function closeMenu() {
		if (!siteNavListRef.current) {
			return;
		}
		(siteNavListRef.current as HTMLElement).classList.remove("active");
	}
	return (
		<header id="site-header">
			<div className="container">
				<h1>
					<Link href="/">
						<Image className="logo" src={logo} alt="ChhoeTaigi 台語辭典⁺" />
					</Link>
				</h1>
				<nav className="site-nav">
					<button className="site-nav__menu-toggle" onClick={toggleMenu}>
						<span className="sr-only">Toggle menu</span>
					</button>
					<ul id="site-nav-list" ref={siteNavListRef} onClick={closeMenu}>
						{navItemList.map(({ href, title }) => (
							<li key={href}>
								<Link href={href} className={href === pathname ? "active" : ""}>
									{title}
								</Link>
							</li>
						))}
						<li>
							<a
								className="koankhoan-link"
								href="https://r.zecz.ec/vpKd"
								target="_blank"
							>
								{translations.koankhoan}
							</a>
						</li>
					</ul>
					<a
						id="FB-link"
						className="menu-item"
						href="https://www.facebook.com/ChhoeTaigi/"
						target="_blank"
					>
						<span className="sr-only">ChhoeTaigi Facebook</span>
					</a>
				</nav>
			</div>
		</header>
	);
}
