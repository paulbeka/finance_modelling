## Mini Projects mini-READMEs

### Black-Scholes Calculator

This is a quickly build black-scholes closed form calculator. Given a spot initial price, strike price, the volatility of thee asset, the amount of time until string, the risk-free rate, and the dividends paid by the asset, the estimated black-scholes price can calculated.

The sliders were chosen as the UI component as it makes it quick and easy to change and visualise the price change.

Another aspect of the black scholes calculator is the parameters that were added:
- Delta: This is the rate of change of the option price given the spot price. The closer it is to 1, the more "in-the-money" the option becomes. The closer to -1, the closer it is to "out-of-the-money"
- Gamma: The rate of change of delta.
- Theta: Theta is the decay on the price of the option as it approches maturity (gets more negative the closer to maturity you get, given the time value of the option decreases).
- Vega: The change in option price with regards to a change in volatility.
- Rho: The rate of change of the option price given a changing risk-free rate.

### Binomial European Option Calculator

The binomial theorem can be used to price options. In this case, the binomial calculator only prices European options that are either put/call. To get a binomial calculator that can calculate American or Asian options, please refer to the larger project linked here: [https://paulbekaertprojects.com/project/binomial](https://paulbekaertprojects.com/project/binomial)

Due to this version only being run on the browser, I kept it simple. It can only price put/calls on European options and uses a slow O(n^2) solution to calculate the vectors. 

### Fixed-Income Yield Solver

A small calculator to infer the yield of an interest-bearing asset given its market price, face value, coupon rate, maturity, and payments per year. Mostly used for coupon bonds. I added this in to learn more about government bonds and calculating yields. 
