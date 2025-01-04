import pytest

@pytest.fixture(scope="session")
async def set_up():
    print("Setting up")
    yield
    print("Tearing down")