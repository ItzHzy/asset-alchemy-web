FROM node:14-alpine AS builder
ENV PORT 8080
ENV AUTH0_API_IDENTIFIER https://api.assetalchemy.io
ENV NODE_ENV production
ARG AUTH0_DOMAIN
ARG AUTH0_CLIENT_ID
ARG AUTH0_REDIRECT_URI
ARG API_SERVER_URL

ENV AUTH0_DOMAIN ${AUTH0_DOMAIN}
ENV AUTH0_CLIENT_ID ${AUTH0_CLIENT_ID}
ENV AUTH0_REDIRECT_URI ${AUTH0_REDIRECT_URI}
ENV API_SERVER_URL ${API_SERVER_URL}
ENV SENTRY_DSN https://01a22e4e2fba493c978d94e687513c50@o1138958.ingest.sentry.io/6194829

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm i

COPY . .
RUN npm run build


FROM nginx:1.21.0-alpine as production
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]