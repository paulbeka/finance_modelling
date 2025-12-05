import yfinance as yf
import datetime


def get_historical_tick_data(assets: list[str], timeframe: int) -> dict[str, list[float]]:
  end = datetime.date.today()
  start = end - datetime.timedelta(days=timeframe * 365)
  return yf.download(assets, start=start, end=end).xs('Close', axis=1, level=0)
