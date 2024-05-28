import fs from "fs/promises";
import Path from "path";
import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { langMap } from "./chhoeTaigiLangs";

export default getRequestConfig(async ({ locale }) => {
	// Validate that the incoming `locale` parameter is valid
	const langIndexAt = langMap.get(locale);
	if (undefined === langIndexAt) {
		notFound();
	}
	const fileNameList = await fs.readdir(Path.resolve("./src/translations"));
	const translationList = await Promise.all(
		fileNameList.map((fileName) =>
			fs.readFile(Path.resolve("./src/translations", fileName), "utf8"),
		),
	);
	const messages = {};
	fileNameList.forEach((fileName, index) => {
		const messageListByKey = JSON.parse(translationList[index]);
		messages[Path.basename(fileName, ".json")] = Object.fromEntries(
			Object.entries(messageListByKey).map(([key, messageList]) => [
				key,
				messageList[langIndexAt] || messageList /* fallback as "hanlo" */[0],
			]),
		);
	});
	return {
		messages,
	};
});
