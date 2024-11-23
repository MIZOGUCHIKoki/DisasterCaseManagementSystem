FROM python:3.9

RUN mkdir -p /src
WORKDIR /src

RUN python -m pip install --upgrade pip
RUN pip install poetry

# poetryの定義ファイルをコピー (存在する場合)
COPY pyproject.toml* poetry.lock* ./
RUN poetry config virtualenvs.in-project true

RUN if [ -f pyproject.toml ]; then poetry install --no-root; else poetry init; fi