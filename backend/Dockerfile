# Use an official Python base image
FROM python:3.7.1-slim

# Create and set the working directory
RUN mkdir /app
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y curl

# Installing poetry
RUN curl -sSL https://install.python-poetry.org | POETRY_VERSION=1.4.1 python3 -


# Add Poetry to PATH
ENV PATH="${PATH}:/root/.local/bin"

# Copy the pyproject.toml and poetry.lock files
COPY pyproject.toml poetry.lock /app/

# Install the project dependencies
RUN poetry config virtualenvs.create false && \
    poetry install --no-dev

# Copy the Django app
COPY . /app/

# Expose the port the app will run on
EXPOSE 10000

# Start the Django app
CMD ["poetry", "run", "python", "manage.py", "collectstatic", "--no-input", "&&", "python", "manage.py", "migrate", "&&","python", "manage.py", "runserver", "0.0.0.0:10000"]

