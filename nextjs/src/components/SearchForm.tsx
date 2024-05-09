"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";

export default function SearchForm(props) {
	const router = useRouter();
	const { lang} = useParams();
	function onSubmit(event) {
		event.preventDefault();

		const formData = new FormData(event.target);

		// ReactGA.event({
		// 	category: 'user',
		// 	action: 'search',
		// 	label: 'basic'
		// });

		let spelling = formData.get("spelling") as string;
		let taibun = formData.get("taibun") as string;
		let english = formData.get("english") as string;
		let jitbun = formData.get("jitbun") as string;
		let hoabun = formData.get("hoabun") as string;

		if ("equals" === formData.get("searchMethod")) {
			spelling = spelling.trim();
			taibun = taibun.trim();
			english = english.trim();
			jitbun = jitbun.trim();
			hoabun = hoabun.trim();
		}
		// normalize input to Unicode standard
		spelling = spelling.normalize("NFC");
		taibun = taibun.normalize("NFC");
		english = english.normalize("NFC");
		jitbun = jitbun.normalize("NFC");
		hoabun = hoabun.normalize("NFC");

		const searchParams = new URLSearchParams({
			method: "basic",
			searchMethod: formData.get("searchMethod") as string,
			spellingMethod: formData.get("spellingMethod") as string,
			spelling,
			taibun,
			english,
			jitbun,
			hoabun,
		});
		const emptyValueKeyList = [];
		searchParams.forEach((value, key) => {
			if (!value) {
				emptyValueKeyList.push(key);
			}
		});
		emptyValueKeyList.forEach((key) => {
			searchParams.delete(key);
		});
		router.push(`/${lang}/search?${searchParams}`);
	}
	return <form {...props} onSubmit={onSubmit} />;
}
