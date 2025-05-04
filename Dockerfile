FROM ubuntu:latest
LABEL authors="teihyung"

FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Install nodemon globally
RUN npm install -g nodemon ts-node typescript

# Expose port
EXPOSE 8000

# Start dev mode
CMD ["npm", "run", "dev"]