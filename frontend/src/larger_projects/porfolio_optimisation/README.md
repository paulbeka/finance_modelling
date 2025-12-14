## Portfolio Optimizer (Markowitz)

This portfolio optimizer optimizes for the sharpe ratio, returning the maximum sharpe point. From that point, the program draws the capital markets line, which shows the tradeoff between risk-free returns and the maximum sharpe point given a certain parameter beta. 

With this parameter, an investor can maximize their risk-to-return given a certain number of assets over a certain period of prior time. Notice that the beta parameter can go above 1. This is because an investor can leverage their trade: by choosing a beta of 2 or 3, an investor can invest in 2 or 3x leveraged portfolios for a fee.

The asset selector searches tickers inside of the Yahoo database. Any ticker can be found. If a ticker doesn't have the historical data necessary, then the time window is cut to that date. Ex: if GOOG has 3 years ticker data, and SGLN has 5, then only 3 years of SGLN will be taken into account.

### Certain choices that were made:

 - Maximum of 10 years backwards market data, to prevent large requests to the backend server
 - Maximum of 10 stocks can be selected, for the same reasons
 - The number of simulations is set by the backend, again to prevent too large requests to the backend
 - Beta is capped at 1.2, to demonstrate the leverage effect, but to make the graph look good.
 - The Convex-Hull method was used to draw the efficient frontier

### TODO

- Create different efficient frontier algorithms
- Implement a Black-Litterman model
