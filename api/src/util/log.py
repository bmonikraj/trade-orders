""" loggin utility """

import os
import logging
import logging.config
import sys

def get_logger():
    log_config_dir = os.path.dirname(
        os.path.dirname(
            os.path.dirname(
                os.path.realpath(__file__)
            )
        )
    )
    logging.config.fileConfig(
        os.path.join(
            log_config_dir,
            "log.conf"
        )
    )
    if len(sys.argv) < 2:
        print("Error: Not enough arguments for main script")
        sys.exit(10)
    if sys.argv[1] == "PROD":
        return logging.getLogger("prod")
    return logging.getLogger("dev")
