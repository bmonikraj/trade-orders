""" base for db models """

import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session
from contextlib import contextmanager
from src.util.log import get_logger

logger = get_logger()

SQLALCHEMY_DATABASE_URL = "sqlite:///{}".format(
    os.path.join(os.path.dirname(
        os.path.dirname(
            os.path.dirname(
                os.path.dirname(
                    os.path.dirname(
                        os.path.realpath(__file__)
                    )
                )
            )
        )
    ), "database", "trade.db")
)

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
Session = scoped_session(sessionmaker(bind=engine))
Base = declarative_base()
Base.query = Session.query_property()

@contextmanager
def session_scope():
    session = Session()
    try:
        yield session
        session.commit()
    except:
        session.rollback()
        logger.error("Exception occurred in Database session. Rolling back transaction")
        raise
    finally:
        session.close()
