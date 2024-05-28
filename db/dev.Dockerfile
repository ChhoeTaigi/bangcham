FROM library/postgres
COPY init_tables.sql /docker-entrypoint-initdb.d/0001_init_tables.sql
COPY init_entries.sql.gz /docker-entrypoint-initdb.d/0002_init_entries.sql.gz
COPY init_noaui.sql /docker-entrypoint-initdb.d/0003_init_noaui.sql
