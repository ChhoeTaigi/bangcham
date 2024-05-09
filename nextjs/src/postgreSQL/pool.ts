import postgres from "postgres";

let sql;

if (process.env.NODE_ENV === "production") {
	sql = postgres(process.env.DATABASE_URL);
} else {
	if (!global.sql) {
		global.sql = postgres(process.env.DATABASE_URL);
	}
	sql = global.sql;
}

export default sql;
