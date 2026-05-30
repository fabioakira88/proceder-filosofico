import os

from requests.auth import HTTPBasicAuth


DEFAULT_WP_USER = "procederfilosofico@gmail.com"


def get_auth():
    user = os.environ.get("WP_USER", DEFAULT_WP_USER)
    app_password = os.environ.get("WP_APP_PASSWORD")

    if not app_password:
        raise RuntimeError(
            "Defina WP_APP_PASSWORD antes de executar este script. "
            "Exemplo: export WP_APP_PASSWORD='xxxx xxxx xxxx xxxx xxxx xxxx'"
        )

    return HTTPBasicAuth(user, app_password)
