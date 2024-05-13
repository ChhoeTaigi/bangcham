# With Docker Compose

This example contains everything needed to get a Next.js development and production environment up and running with Docker Compose.

## Benefits of Docker Compose

- Develop locally without Node.js or TypeScript installed ✨
- Easy to run, consistent development environment across macOS, Windows, and Linux teams
- Run multiple Next.js apps, databases, and other microservices in a single deployment
- Multistage builds combined with [Output Standalone](https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files) outputs up to 85% smaller apps (Approximately 110 MB compared to 1 GB with create-next-app)
- Easy configuration with YAML files

## Prerequisites

**Step 1.** Install [Docker Desktop](https://docs.docker.com/get-docker) for Mac, Windows, or Linux. Docker Desktop includes Docker Compose as part of the installation.

**Step 2.** Go to the folder https://drive.google.com/drive/folders/12UAoEKduxXXCi0suGezwEIguRLvn2FhZ and *Download* the files to [db/init_sources](db/init_sources):

* Chu-liāu Nôa-ūi Pió (To Gí-giân) > *Download* > *CSV* > [Chu-liāu Nôa-ūi Pió (To Gí-giân) - DictCode.csv](<db/init_sources/Chu-liāu Nôa-ūi Pió (To Gí-giân) - DictCode.csv>)
* Chu-liāu Nôa-ūi Pió (To Gí-giân) > *Download* > *CSV* > [Chu-liāu Nôa-ūi Pió (To Gí-giân) - JoinedDictColumnName.csv](<db/init_sources/Chu-liāu Nôa-ūi Pió (To Gí-giân) - JoinedDictColumnName.csv>)
* db/init_sources/JOINED_HEADER_ONLY.csv
* db/init_sources/JOINED.csv

Then, run the following script:

```bash
pnpm --dir=db i && pnpm --dir=db build
```

Continue to next section.

## Development

First, run the development server:

```bash
# Up dev in detached mode. To stop, see the "Useful commands" section
docker compose -f docker-compose.dev.yml up -d --build

# See logs
docker logs bangcham_nextjs -f
docker logs bangcham_db -f
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

### Useful commands

```bash
# When package.json changed
docker stop guntau_nextjs && docker rm guntau_nextjs
# Then start again

# Stop all running containers
docker compose -f docker-compose.dev.yml down

# Stop all running containers and remove the (database) volumes
docker compose -f docker-compose.dev.yml down --volumes

# Free space
docker system prune -af --volumes
```

## Technical Stacks

### Next.js App Folder

* The [nextjs/src/app](nextjs/src/app) folder forms a tree of **pathname to request handler**
* The **request handler** in our context is React Server Components (RSC).
* It mostly forms by a content `page.tsx` and a wrapper `layout.tsx`.
* Think of RSC is a **templating language** for HTML, but it's written in React.
* This is the main place for _loading a content from DB_, and _output it in a HTML/React_.
* Any folders(pathnames) starting with `_` are internal and won't be public.

### Next.js Other Folders

* [nextjs/src/_wbst](nextjs/src/_wbst) consists of pre-generation Website. It was copied from the source with a squashed commit. We import stuff from there for the gradual migration
* [nextjs/src/components](nextjs/src/components) consits of **client-side components**, which has the local state that runs on the client's browser.
* [nextjs/src/media](nextjs/src/media) for images and stylesheets that will be compiled/compressed/hashed by Next.js
* [nextjs/public] is the place for no-compliation.

### I18n

* I18n using `next-intl` package
* Define the messages JSON in [nextjs/src/translations](nextjs/src/translations)
* Pull all messages altogether for a language in [nextjs/src/i18n.ts](nextjs/src/i18n.ts)
* The locale/language/lang is determined by the pathname in the URL. Thus, the first level of [nextjs/src/app/[lang]](nextjs/src/app/[lang]) is parameterized lang param.
* Also, auto-lang redirection for non-matching pathname is done via a Next.js middleware [nextjs/src/middleware.ts](nextjs/src/middleware.ts)

### db

1. CSV in [db/init_sources](db/init_sources) get converted to [db/init_entries.sql.gz](db/init_entries.sql.gz)
2. The `.sql.gz` will be copied into the Dockerfile, and postgres will use them for initialization.

## Production - TODO

Multistage builds are highly recommended in production. Combined with the Next [Output Standalone](https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files) feature, only `node_modules` files required for production are copied into the final Docker image.

First, run the production server (Final image approximately 110 MB).

```bash
# Build prod
docker compose -f docker-compose.prod.yml build

# Up prod in detached mode
docker compose -f docker-compose.prod.yml up -d
```

Alternatively, run the production server without without multistage builds (Final image approximately 1 GB).

```bash
# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create next_network

# Build prod without multistage
docker compose -f docker-compose.prod-without-multistage.yml build

# Up prod without multistage in detached mode
docker compose -f docker-compose.prod-without-multistage.yml up -d
```

Open [http://localhost:3000](http://localhost:3000).
