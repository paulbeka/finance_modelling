from pydantic import BaseModel

class YahooTicker(BaseModel):
  symbol: str
  shortname: str
  exchDisp: str
  