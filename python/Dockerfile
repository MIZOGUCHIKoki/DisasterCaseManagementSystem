FROM python:3.13.0

RUN mkdir -p /src
WORKDIR /src

RUN python -m pip install --upgrade pip
RUN apt-get update
RUN apt-get install -y libsqlite3-dev
RUN pip install poetry

COPY ./pyproject.toml ./poetry.lock /src
RUN poetry install --no-root

# OFF virtual envs of poetry
RUN poetry config virtualenvs.create false
RUN poetry config virtualenvs.in-project false

RUN if [ -f pyproject.toml ]; then poetry install --no-root; else exit 1; fi
