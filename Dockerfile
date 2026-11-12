# Production image for Dokploy. Astro builds the whole site to static files, images
# included, and nginx serves them; nothing else runs at request time.

FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Resized images are cached between builds, so a deploy only processes new or changed ones.
RUN --mount=type=cache,target=/app/node_modules/.astro npm run build
RUN find dist -type f \( -name '*.html' -o -name '*.css' -o -name '*.js' -o -name '*.svg' -o -name '*.json' -o -name '*.xml' -o -name '*.txt' \) \
      -exec sh -c 'for f; do gzip -9 -c "$f" > "$f.gz"; done' _ {} +

FROM nginxinc/nginx-unprivileged:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 3000
