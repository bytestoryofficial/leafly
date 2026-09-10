#!/bin/bash
mongosh "$MONGO_INITDB_DATABASE" <<EOF
db.createUser({
  user: "$MONGO_APP_USER",
  pwd: "$MONGO_APP_PASSWORD",
  roles: [{ role: "readWrite", db: "$MONGO_INITDB_DATABASE" }]
});
EOF
