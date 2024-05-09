import "server-only";

import * as React from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

import home_image_text from "@/images/home_image_text@2x.png";
import home_image_bg from "@/images/home_image_bg@2x.png";
import SearchForm from "@/components/SearchForm";

export default async function RSCIndexPage({ params: { lang } }) {
	const t = await getTranslations("RSCIndexPage");

	return (
		<main className="bg--darkgreen">
			{/* if (currentLocation === '/chinkai') {
            bgType = 'bg--lightgreen';
        } */}
			<div className="site-banner">
				<div className="container">
					<div className="site-banner__wrapper">
						<div className="site-banner__text">
							<Image src={home_image_text} alt="ChhoeTaigi 台語辭典⁺" />
						</div>
						<div className="site-banner__bg">
							<Image src={home_image_bg} alt="bg" />
						</div>
					</div>
				</div>
			</div>
			<div className="basic-search">
				<SearchForm id="basic-form" className="container" autoComplete="off">
					<h2>{t("basic")}</h2>
					<div className="basic-search__form-wrapper">
						<div className="basic-search__top">
							<div className="basic-search__mode">
								<h3>{t("search-method")}</h3>
								<label className="radio-simulated">
									<input
										type="radio"
										className="radio-simulated__hidden"
										name="searchMethod"
										value="equals"
										defaultChecked
									/>
									<span className="radio-simulated__text">{t("equals")}</span>
								</label>
								<label className="radio-simulated">
									<input
										type="radio"
										className="radio-simulated__hidden"
										name="searchMethod"
										value="contains"
									/>
									<span className="radio-simulated__text">{t("contains")}</span>
								</label>
							</div>
							<div className="basic-search__note">
								<Link href="/annachhoe">{t("explanation")}</Link>
							</div>
						</div>
						<div className="basic-search__bottom">
							<h3>{t("input-method")}</h3>
							<div className="search-block">
								<label className="search-block__left" htmlFor="spelling">
									{t("lmj-tb")}
								</label>
								<div className="search-block__right search-block__lmj">
									<div className="search-block__lmj-top">
										<label className="radio-simulated">
											<input
												type="radio"
												className="radio-simulated__hidden"
												name="spellingMethod"
												value="PojInput"
												defaultChecked
											/>
											<span className="radio-simulated__text">
												{t("poj-input")}
											</span>
										</label>
										<label className="radio-simulated">
											<input
												type="radio"
												className="radio-simulated__hidden"
												name="spellingMethod"
												value="PojUnicode"
											/>
											<span className="radio-simulated__text">{t("poj")}</span>
										</label>
										<label className="radio-simulated">
											<input
												type="radio"
												className="radio-simulated__hidden"
												name="spellingMethod"
												value="KipInput"
											/>
											<span className="radio-simulated__text">
												{t("lmj-input")}
											</span>
										</label>
										<label className="radio-simulated">
											<input
												type="radio"
												className="radio-simulated__hidden"
												name="spellingMethod"
												value="KipUnicode"
											/>
											<span className="radio-simulated__text">{t("lmj")}</span>
										</label>
									</div>
									<div className="search-block__lmj-bottom">
										<input
											type="text"
											name="spelling"
											placeholder={t("lmj_keyword")}
											defaultValue=""
										/>
									</div>
								</div>
							</div>
							<div className="search-block">
								<label className="search-block__left" htmlFor="taibun">
									{t("corresponding-tb")}
								</label>
								<div className="search-block__right">
									<input
										type="text"
										name="taibun"
										placeholder={t("hanlo_keyword")}
										defaultValue=""
									/>
								</div>
							</div>
							<div className="search-block">
								<label className="search-block__left" htmlFor="english">
									{t("corresponding-en")}
								</label>
								<div className="search-block__right">
									<input
										type="text"
										name="english"
										placeholder={t("engbun_keyword")}
										defaultValue=""
									/>
								</div>
							</div>
							<div className="search-block">
								<label className="search-block__left" htmlFor="jitbun">
									{t("corresponding-jp")}
								</label>
								<div className="search-block__right">
									<input
										type="text"
										name="jitbun"
										placeholder={t("jitbun_keyword")}
										defaultValue=""
									/>
								</div>
							</div>
							<div className="search-block">
								<label className="search-block__left" htmlFor="hoabun">
									{t("corresponding-hb")}
								</label>
								<div className="search-block__right">
									<input
										type="text"
										name="hoabun"
										placeholder={t("tiongbun_keyword")}
										defaultValue=""
									/>
								</div>
							</div>
						</div>
						<div className="basic-search__actions search-actions">
							<input
								className="btn btn--search"
								type="submit"
								value={t("find")}
							/>
							<input
								className="btn btn--clear"
								type="reset"
								value={t("reset")}
							/>
							<input
								className="btn btn--donate"
								type="button"
								value={t("donate")}
								// onClick={this.donateButtonClick}
							/>
						</div>
						<footer className="basic-search__kesimi">
							{t("support_taibun_kesimi_part1")}
							<a target="_blank" href="https://r.zecz.ec/ZAaP">
								{t("support_taibun_kesimi_part2")}
							</a>
							{t("support_taibun_kesimi_part3")}
							{t("support_taibun_kesimi_part4")}
						</footer>
					</div>
				</SearchForm>
			</div>
		</main>
	);
}
