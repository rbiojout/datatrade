from django.apps import AppConfig


class UsersAppConfig(AppConfig):

    name = "datatrade.users"
    verbose_name = "Users"

    def ready(self):
        try:
            from datatrade import users
        except ImportError:
            pass
