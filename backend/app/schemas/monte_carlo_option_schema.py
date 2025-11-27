from pydantic import BaseModel

class MonteCarloOptionInput(BaseModel):
    spot: float
    strike: float
    time: float
    risk_free_rate: float
    sigma: float
    dividends: float
    num_simulations: int
    num_steps: int
    option_type: str = "call"
    option_style: str = "european"
    return_paths: bool = False


class MonteCarloOptionOutput(BaseModel):
    option_price: float
    paths: list[list[float]] = None
