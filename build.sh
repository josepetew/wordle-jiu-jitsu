#!/usr/bin/env bash
# exit on error

set -o errexit

poetry install

cd frontend && npm run build

python manage.py migrate 

