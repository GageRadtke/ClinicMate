# backend/Dockerfile
FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Expose the port your app runs on
EXPOSE 4000

# Ensure that your environment variables (DB_URI, JWT_SECRET, FRONTEND_URL, etc.) 
# are provided via your Docker orchestration (docker-compose, Swarm, Kubernetes)
CMD ["node", "src/index.js"]
