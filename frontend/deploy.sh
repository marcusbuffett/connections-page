#!/bin/bash
set -e
yarn build
docker build -t marcusbuffett/connections-fe:latest .
docker push marcusbuffett/connections-fe:latest
kubectl rollout restart deployment connections-fe
