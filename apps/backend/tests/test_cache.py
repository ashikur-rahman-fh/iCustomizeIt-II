import pytest
from django.core.cache import cache

pytestmark = pytest.mark.django_db


def test_redis_cache_backend_configured():
    cache.set("i-customize-it:test", "value", timeout=5)
    assert cache.get("i-customize-it:test") == "value"
