#!/bin/bash
set -e
set -a
source .development.env
set +a

IMAGE_NAME="shopping-list-api:dev"
CONTAINER_NAME="shopping-list-api"
DB_CONTAINER_NAME="mysql_db"
API_PORT=${API_PORT:-3000}
DB_VOLUME="db_data"
PROJECT_DIR=$(pwd)
NETWORK_NAME="shopping-list-network"

mkdir -p "$PROJECT_DIR/$DB_VOLUME"

docker network create $NETWORK_NAME 2>/dev/null || true

docker rm -f $DB_CONTAINER_NAME 2>/dev/null || true

docker run -d \
  --name $DB_CONTAINER_NAME \
  --network $NETWORK_NAME \
  -p $MYSQL_PORT:$MYSQL_PORT \
  -v "$PROJECT_DIR/$DB_VOLUME:/var/lib/mysql" \
  -e MYSQL_ROOT_PASSWORD="$MYSQL_PASSWORD" \
  -e MYSQL_DATABASE="$MYSQL_DATABASE" \
  -e MYSQL_USER="$MYSQL_USER" \
  -e MYSQL_PASSWORD="$MYSQL_PASSWORD" \
  mysql:8

echo "⏳ Database initialization in progress..."
sleep 10

docker build -t $IMAGE_NAME -f Dockerfile.api .

echo "🚀 Running migrations..."
docker run --rm \
  -v "$PROJECT_DIR:/app" \
  --network $NETWORK_NAME \
  -w /app \
  -e DATABASE_URL="mysql://$MYSQL_USER:$MYSQL_PASSWORD@$MYSQL_HOST:$MYSQL_PORT/$MYSQL_DATABASE" \
  $IMAGE_NAME \
  sh -c "npx sequelize-cli db:migrate"

docker rm -f $CONTAINER_NAME 2>/dev/null || true

echo "🚀 Starting API..."
docker run -d \
  --name $CONTAINER_NAME \
  -v "$PROJECT_DIR:/app" \
  --network $NETWORK_NAME \
  -w /app \
  -p $API_PORT:$API_PORT \
  -e DATABASE_URL="mysql://$MYSQL_USER:$MYSQL_PASSWORD@$MYSQL_HOST:$MYSQL_PORT/$MYSQL_DATABASE" \
  -e CHOKIDAR_USEPOLLING=true \
  -e BROWSER=none \
  $IMAGE_NAME

echo "✅ API running on http://localhost:$API_PORT"
