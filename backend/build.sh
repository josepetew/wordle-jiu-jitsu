#!/usr/bin/env bash
# exit on error

set -o errexit
#----------------------------------------
# Build frontend
#----------------------------------------
cd frontend && npm i && npm run build

cd ..

#----------------------------------------
# Setup backend
#----------------------------------------
poetry install

python manage.py collectstatic --no-input

python manage.py migrate

#----------------------------------------
# Create user if it doesn't exist
#----------------------------------------
if [[ $CREATE_SUPERUSER ]];
then
  python manage.py createsuperuser --no-input
fi

