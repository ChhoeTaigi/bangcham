import * as Path from "node:path";
import { readdir, open, mkdir } from "node:fs/promises";
import { createGzip } from "node:zlib";
import { createWriteStream, createReadStream } from "node:fs";
import { Readable, Duplex, compose } from "node:stream";
import { pipeline } from "node:stream/promises";
import sqlLint from "sql-lint";
import csvtojson from "csvtojson";

const SEGMENT_LENGTH = Math.pow(10, 3);

main(process.argv.slice(2)).catch(async (e) => {
	console.error(e);
	process.exit(1);
});

function formatRawCSV(rawCSV) {
	return rawCSV
		.map((value, index) => {
			if ((0 === index || 2 === index) && value.match(/^\d+$/)) {
				return value;
			}
			if ("" === value) {
				return "NULL";
			}
			return `'${
				value

				.replaceAll(/'/g, it => `'${it}`)
			}'`;
		})
		.join(",");
}

function formatChunk(rawCSVList) {
	return rawCSVList.map(formatRawCSV).join("),\n  (");
}

function processNoauiTable(sourceName, tableName) {
	return async function* () {
		let headerList;
		const csv = csvtojson({
			output: "csv",
		});
		csv.on("header", (header) => {
			headerList = header;
		});
		const chunkRowCSVList = await csv.fromFile(
			Path.resolve("init_sources", sourceName),
			"utf-8"
		);
		const sql = `INSERT INTO ${tableName}
	("${headerList.join(`","`)}")
VALUES
	(${formatChunk(chunkRowCSVList)});\n`;

		const errors = await sqlLint.default({
			sql,
		});
		if (errors.length) {
			console.error(errors);
			setTimeout(() => {
				throw new Error(sql);
			});
		}
		yield sql;
	};
}

function processChhoeTaigiTable({ supressError }) {
	let headerList;
	const csv = csvtojson({
		output: "csv",
	});
	csv.on("header", (header) => {
		headerList = header;
	});
	return compose(
		createReadStream(Path.resolve("init_sources", "JOINED.csv"), "utf-8"),
		csv,
		async function* (source) {
			let rowCSVList = [];
			async function flush() {
				if (!headerList) {
					console.error(kind, detail, headerList, rowCSVList);
					console.flush();
					return;
				}
				const chunkRowCSVList = rowCSVList.splice(0, SEGMENT_LENGTH);
				const sql = `INSERT INTO "public"."ChhoeTaigi"
	("${headerList.join(`","`)}")
VALUES
	(${formatChunk(chunkRowCSVList)});\n`;

				if (true !== supressError) {
					const errors = await sqlLint.default({
						sql,
					});
					if (errors.length) {
						console.error(errors);
						setTimeout(() => {
							throw new Error(sql);
						});
					}
				}
				return sql;
			}
			for await (const chunk of source) {
				const chunkStr = chunk.toString("utf-8").trim();
				rowCSVList.push(
					...JSON.parse(`[
						${
							"," === chunkStr[chunkStr.length - 1]
								? chunkStr.substr(0, chunkStr.length - 1)
								: chunkStr
						}

					]`)
				);
				while (SEGMENT_LENGTH <= rowCSVList.length) {
					yield flush();
				}
			}
			if (rowCSVList.length) {
				yield flush();
			}
		}
	);
}

async function main() {
	const entriesSQLName = `init_entries.sql.gz`;
	const writeTo = compose(
		createGzip(),
		createWriteStream(Path.resolve(entriesSQLName), {
			autoClose: false,
			flush: true,
		})
	);
	await pipeline(
		Readable.from([
			processNoauiTable(
				"Chu-liāu Nôa-ūi Pió (To Gí-giân) - JoinedDictColumnName.csv",
				`"public"."NoauiChhoeTaigi"`
			),
			processNoauiTable(
				"Chu-liāu Nôa-ūi Pió (To Gí-giân) - DictCode.csv",
				`"public"."NoauiDict"`
			),
			processChhoeTaigiTable({ supressError: true }),
		]).flatMap((it) => Duplex.from(it)),
		writeTo
	);
	writeTo.end();
	console.log(`Done!`);
}
