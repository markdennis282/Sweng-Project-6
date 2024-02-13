from utils import is_production_mode

if is_production_mode():
    from .llm_prod_impl import *
else:
    from .llm_dev_impl import *
