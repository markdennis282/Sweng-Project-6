import os

def get_env_as_nonnegint(env_variable_name: str) -> int | None:
    """
    Reads the value of an environment variable and returns it as `int` if the value can be parsed as a non-negative integer.
    Throws `ValueError` if the value cannot be parsed as a non-negative integer.
    Returns `None` if the environment variable does not exist.
    """

    value = os.environ.get(env_variable_name)
    if value is None:
        return None
    value = int(value)
    if value < 0:
        raise ValueError('Value should be a non-negative integer')
    return value

def is_production_mode() -> bool:
    """
    Checks if the app is running in production mode.
    """
    
    environment = os.environ.get('APP_ENVIRONMENT')
    return environment == 'production'
