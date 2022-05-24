""" main script - entrypoint """

import sys
import os
import uvicorn
from dotenv import load_dotenv
from src.util.log import get_logger
from src.controller.base import app


_BASEDIR_ = os.path.dirname(os.path.realpath(__file__))
sys.path.append(_BASEDIR_)
load_dotenv(dotenv_path=os.path.join(_BASEDIR_,"app.env"))

logger = get_logger()

def main():
    try:
        """ service to start uvicorn app """
        if sys.argv[1] == "DEV":
            logger.info("Dev environment running at {0}:{1}".format(os.environ["HOST"], os.environ["PORT"]))
            uvicorn.run(app, host=os.environ["HOST"], port=int(os.environ["PORT"]), log_level="debug")
        elif sys.argv[1] == "PROD":
            logger.info("Prod environment running at {0}:{1}".format(os.environ["HOST"], os.environ["PORT"]))
            uvicorn.run(app, host=os.environ["HOST"], port=int(os.environ["PORT"]), log_level="info")
    except Exception as err:
        logger.error(err, exc_info=True)

if __name__ == "__main__":
    main()
