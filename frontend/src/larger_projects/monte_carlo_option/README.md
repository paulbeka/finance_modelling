## Monte-Carlo for Option Pricing

The monte-carlo method is one which simulates the portfolio of an asset over time given a fixed volatility measure. The resulting payoff is then calculated for a particular option, which gives the estimated price of the derivative.

### Some design decisions that were taken

 - The number of output lines is limited to 20, as more would put a strain on MUI and its graphics engine for the user's frontend
 - The number of simulations is capped at 10000, for performance reasons
 - 1000 steps per simulations is also a limiting factor, for performance

### TODO

- Consider moving to a differnet js plotting library to show more results