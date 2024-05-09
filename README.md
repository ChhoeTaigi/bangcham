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
docker logs -f $(docker ps -aq)
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Production

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

## Useful commands

```bash
# When package.json changed
docker stop guntau_nextjs && docker rm guntau_nextjs
# Then start again

# Stop all running containers
docker compose -f docker-compose.dev.yml down --volumes

# Free space
docker system prune -af --volumes
```
