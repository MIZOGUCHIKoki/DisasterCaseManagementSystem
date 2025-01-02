import pytest

@pytest.fixture(scope="function")
def hoge():
    print("start")
    message = "ほげ"

    yield message

    print("done")