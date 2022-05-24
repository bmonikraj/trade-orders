from src.data.model.base import session_scope
from src.data.schema.price import PriceRequest, PriceResponse, Price as PriceSchema
from src.data.model.price import Price as PriceModel
from src.util.log import get_logger
from src.util.converter import row2dict
from sqlalchemy import and_
from fastapi import HTTPException

logger = get_logger()

class PriceService:
    def __init__(self) -> None:
        pass

    @staticmethod
    def get_prices(request: PriceRequest) -> PriceResponse:
        try:
            with session_scope() as Session:
                data_ = Session.query(PriceModel).filter(
                    and_(
                        PriceModel.date >= request.from_date,
                        PriceModel.date <= request.to_date,
                        PriceModel.instrument_name == request.symbol
                    )
                ).all()
                data_ = [PriceSchema(**row2dict(data_[i])) for i in range(len(data_))]
                return PriceResponse(
                    status="success",
                    symbol=request.symbol,
                    data=data_
                    )
        except Exception as err:
            logger.error(err, exc_info=True)
            raise HTTPException(status_code=500, detail="Error while fetching price details")

