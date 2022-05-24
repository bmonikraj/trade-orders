from cmath import log
import jwt
import os
from src.util.log import get_logger

logger = get_logger()

def validate(token):
    try:
        r = jwt.decode(token, os.environ["SECRET"], algorithms=["HS256"])
        logger.info("Decoded")
        return True, r
    except Exception as err:
        logger.error(err)
        return False, {}
