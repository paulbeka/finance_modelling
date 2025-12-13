## European Option Binomial Model Calculator

This is a typical binomial option calculator. Given the lattice type, option call or put, and its parameters, it calculates an estimation of the price and compares it to Black-Scholes. 

Since I wanted the mini-calculator to be reactive, I decided to implement it on my frontend. However, this model is quite slow. The reasons are twofold:
- doing heavy computation on the frontend is never the best idea (as your client will probably click away from the lag!)
- and there is n