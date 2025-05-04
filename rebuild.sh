#!/bin/bash
echo "🧹 Shutting down and removing volumes..."
docker-compose down -v

echo "🔨 Rebuilding with no cache..."
docker-compose build --no-cache

echo "🚀 Starting container..."
docker-compose up