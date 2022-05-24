import random
from src.data.schema.portfolio import PortfolioResponse, Portfolio as PortfolioSchema
from src.util.log import get_logger
from fastapi import HTTPException

logger = get_logger()

class PortfolioService:
    def __init__(self) -> None:
        pass

    @staticmethod
    def holdings(data) -> PortfolioResponse:
        try:
            portfolio_mock_1 = {
                "tradingsymbol": "GOLDBEES",
                "exchange": "BSE",
                "isin": "INF204KB17I5",
                "quantity": 2,
                "authorised_date": "2021-06-08 00:00:00",
                "average_price": 40.67,
                "last_price": 42.47,
                "close_price": 42.28,
                "pnl": 3.5999999999999943,
                "day_change": 0.18999999999999773,
                "day_change_percentage": 0.44938505203405327
            }
            portfolio_mock_2 = {
                "tradingsymbol": "IDEA",
                "exchange": "NSE",
                "isin": "INE669E01016",
                "quantity": 5,
                "authorised_date": "2021-06-08 00:00:00",
                "average_price": 8.466,
                "last_price": 10,
                "close_price": 10.1,
                "pnl": 7.6700000000000035,
                "day_change": -0.09999999999999964,
                "day_change_percentage": -0.9900990099009866
            }
            return PortfolioResponse(
                status="success",
                data=[
                    PortfolioSchema(
                        **portfolio_mock_1
                    ),
                    PortfolioSchema(
                        **portfolio_mock_2
                    )
                ]
            )
        except Exception as err:
            logger.error(err, exc_info=True)
            raise HTTPException(status_code=500, detail="Error while fetching portfolio details")

