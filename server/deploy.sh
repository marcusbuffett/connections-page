#!/bin/bash
docker build -t marcusbuffett/connections-server:latest .
docker push marcusbuffett/connections-server:latest
kubectl rollout restart deployment connections-server
