FROM python:3.13.0

RUN mkdir -p /src
WORKDIR /src

RUN python -m pip install --upgrade pip
RUN apt-get update && apt-get install -y vim
RUN pip install poetry

# OFF virtual envs of poetry
RUN poetry config virtualenvs.create false
RUN poetry config virtualenvs.in-project false

RUN if [ -f pyproject.toml ]; then poetry install --no-root; fi
