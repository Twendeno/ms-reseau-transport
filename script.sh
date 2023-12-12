#!/bin/sh

env_dir=/app/.env

cat > $env_dir << EOF
DATABASE_URL="postgresql://$PG_USERNAME:$PG_PASSWORD@$PG_HOST:$PG_PORT/$PG_DATABASE?schema=public"
PORT=$SERVER_PORT
EOF