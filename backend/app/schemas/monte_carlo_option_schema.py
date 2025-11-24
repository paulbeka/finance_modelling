from pydantic import BaseModel

class MonteCarloOptionInput(BaseModel):
    spot: float
    strike: float
    T: float
    r: float
    sigma: float
    num_simulations: int
    num_steps: int
    option_type: str = "call"
    option_style: str = "european"
    return_paths: bool = False


class MonteCarloOptionOutput(BaseModel):
    options_price: float
    paths: list[float] = None
