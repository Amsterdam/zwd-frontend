ARG NODE_VERSION=22
# Use the official Node.js image as the builder stage.
# "alpine" refers to a lightweight Linux distribution based on musl libc and BusyBox,
# known for its small size and efficiency.
FROM node:$NODE_VERSION-alpine AS builder

ENV DIR=/var/www
WORKDIR $DIR

COPY package*.json ./
RUN npm ci --ignore-scripts

COPY . .

RUN npm run build

# build dirs and "config" directory in /application
RUN mkdir -p $DIR/builds/application/config && \
    mv $DIR/dist/* $DIR/builds/application/

FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /var/www/builds /var/www
COPY --from=builder /var/www/env.* /var/www
COPY --from=builder /var/www/package.json /var/www/package.json

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]
CMD ["nginx", "-g", "daemon off;"]
