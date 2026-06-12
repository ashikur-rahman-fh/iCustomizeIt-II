FROM nginx:1.27-alpine

RUN mkdir -p /var/cache/nginx/brand && chown nginx:nginx /var/cache/nginx/brand

COPY infra/nginx/snippets /etc/nginx/snippets
