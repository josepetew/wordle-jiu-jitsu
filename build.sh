#!/usr/bin/env bash
# exit on error

set -o errexit

poetry install

cd frontend && npm i && npm run build

cd ..

python manage.py migrate 

