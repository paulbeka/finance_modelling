from pydantic import BaseModel

class BinomialInput(BaseModel):
	spot: float
	strike: float
	time: float
	risk_free_rate: float
	sigma: float
	dividends: float
	num_steps: int
	option_type: str
	option_style: str
	lattice_type: str

class BinomialOutput(BaseModel):
	binomial_price: float