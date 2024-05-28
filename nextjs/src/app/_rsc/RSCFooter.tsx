import * as React from "react";

import { getTranslations } from "next-intl/server";
import Footer from "@/components/Footer";
import Image from "next/image";

import sponsor_logo_hoatki from "@/images/sponsor_logo_hoatki.jpg";

function commafy(num) {
	if (num === null) {
		return "";
	}
	const str = num.toString();
	if (str.length > 3) {
		return str.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
	}
	return str;
}

export default async function RSCFooter({ lang }) {
	const t = await getTranslations("RSCFooter");
	// TODO
	const sessions = commafy(1000000);
	const clicks = commafy(100100);

	return (
		<Footer lang={lang}>
			<div className="container site-footer__status">
				<ul className="site-footer__status-visit">
					<li>{t("since")}</li>
					<li>
						{t("visitors")}：{sessions}
					</li>
					<li>
						{t("searches")}：{clicks}
					</li>
					<li>{t("word_count_desc")}</li>
				</ul>
				<ul className="site-footer__status-site">
					<li>{t("book_index_desc")}</li>
					<li>{t("web_index_desc")}</li>
					<li>{t("bunhaktuchok_index_desc")}</li>
					<li>{t("word_jitpunsitai_desc")}</li>
				</ul>
			</div>
			<div className="container site-footer__sponsors-text">
				{t("sponsors")}
			</div>
			<div className="container site-footer__sponsors-logo">
				<ul className="site-footer__sponsors-logo-list">
					<li>
						<a href="https://hoatki.de-han.org/" target="_blank">
							<Image
								className="sponsor-logo"
								src={sponsor_logo_hoatki}
								alt="Hoat-Ki Tâi-gí Ki-kim-hōe 蔣發太孫玉枝台語文教育基金會"
							/>
						</a>
					</li>
				</ul>
			</div>
		</Footer>
	);
}
