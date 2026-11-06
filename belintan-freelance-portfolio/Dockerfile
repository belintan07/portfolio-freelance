# Multi-Stage Production Container for Belintan Freelance Platform
# Stage 1: Build the React 19 Frontend
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Production Minimal Runtime
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

COPY package*.json ./
RUN npm ci --omit=dev

# Copy compiled frontend distribution & server sources
COPY --from=builder /app/dist ./dist
COPY server.js ./
COPY server ./server
COPY data ./data

EXPOSE 5000

CMD ["node", "server.js"]
