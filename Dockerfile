FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
# SQLite data lives here — mount a persistent disk/volume on it in production
VOLUME ["/app/data"]
ENV PORT=3000
EXPOSE 3000
CMD ["node", "server.js"]
