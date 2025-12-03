import requests
from fastapi import APIRouter, HTTPException

from ...schemas.data_util_schema import YahooTicker
from typing import List

router = APIRouter()

@router.get("/tickers", response_model=List[YahooTicker])
def get_tickers(query: str):
  try:
    url = f"https://query1.finance.yahoo.com/v1/finance/search?q={query}"
    response = requests.get(
      url,
      headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "application/json",
      },
      timeout=5
    )

    if response.status_code != 200:
      raise HTTPException(status_code=500, detail="Yahoo Finance error")
    
    response = response.json()
    quotes = response.get("quotes", [])
    
    output = []
    for quote in quotes:
      output.append({
        "symbol": quote.get("symbol"),
        "shortname": quote.get("shortname"),
        "exchDisp": quote.get("exchDisp")
      })
    
    return output

  except Exception as e:
    print(e)
    raise HTTPException(status_code=500, detail=str(e))
