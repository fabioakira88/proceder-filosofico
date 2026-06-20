from __future__ import annotations


class PublishingDisabledError(RuntimeError):
    pass


def publish_article(*_args: object, **_kwargs: object) -> None:
    raise PublishingDisabledError(
        "Publishing is intentionally disabled in Belzebu MVP 0.1."
    )
