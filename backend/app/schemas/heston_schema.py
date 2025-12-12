from pydantic import BaseModel

class HestonInput(BaseModel):
  spot: float
  strike: float
  time: float
  risk_free_rate: float
  dividends: float
  initial_variance: float
  kappa: float
  theta: float
  sigma: float
  rho: float
  option_type: str

class HestonOutput(BaseModel):
  price: float  
