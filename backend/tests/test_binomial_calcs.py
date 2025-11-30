import numpy as np

from app.services.binomial import simulate_binomial, get_lattice_parameters


np.random.seed(0)


def test_european_call_option_is_correct():
  crr_price = simulate_binomial(
    100, 100, 1, 0.05, 0.2, 0, 100, "call", "european", "CRR"
  )["binomial_price"]
  jr_price = simulate_binomial(
    100, 100, 1, 0.05, 0.2, 0, 100, "call", "european", "JR"
  )["binomial_price"]
  tian_price = simulate_binomial(
    100, 100, 1, 0.05, 0.2, 0, 100, "call", "european", "TIAN"
  )["binomial_price"]
  trg_price = simulate_binomial(
    100, 100, 1, 0.05, 0.2, 0, 100, "call", "european", "TRG"
  )["binomial_price"]

  real_price = 10.45
  assert abs(crr_price - real_price) <= 0.05
  assert abs(jr_price - real_price) <= 0.05
  assert abs(tian_price - real_price) <= 0.05
  assert abs(trg_price - real_price) <= 0.05


def test_european_put_option_is_correct():
  price = simulate_binomial(
    100, 100, 1, 0.05, 0.2, 0, 100, "put", "european", "CRR"
  )["binomial_price"]

  realPrice = 5.57
  assert abs(price - realPrice) <= 0.05


def test_american_call_option_is_correct():
  price = simulate_binomial(
    100, 100, 1, 0.05, 0.2, 0, 100, "call", "american", "CRR"
  )["binomial_price"]

  realPrice = 10.45
  assert abs(price - realPrice) <= 0.05


def test_american_put_option_is_correct():
  price = simulate_binomial(
    100, 100, 1, 0.05, 0.2, 0, 100, "put", "american", "CRR"
  )["binomial_price"]

  realPrice = 6.088
  assert abs(price - realPrice) <= 0.05


def test_lattice_parameters_crr():
  u, d, p = get_lattice_parameters(1/100, 0.05, 0.2, 0, "CRR")

  true_u = 1.0202
  true_d = 0.9802
  true_p = 0.5075
  assert abs(true_u - u) <= 0.001
  assert abs(true_d - d) <= 0.001
  assert abs(true_p - p) <= 0.001


def test_lattice_parameters_crr_with_dividend_rate():
  u, d, p = get_lattice_parameters(1/100, 0.05, 0.2, 0.01, "CRR")

  true_u = 1.0202
  true_d = 0.9802
  true_p = 0.5050
  assert abs(true_u - u) <= 0.001
  assert abs(true_d - d) <= 0.001
  assert abs(true_p - p) <= 0.001


def test_lattice_parameters_jr():
  u, d, p = get_lattice_parameters(1/100, 0.05, 0.2, 0, "JR")
  
  true_u = 1.0205
  true_d = 0.9805
  true_p = 0.5
  assert abs(true_u - u) <= 0.0001
  assert abs(true_d - d) <= 0.0001
  assert abs(true_p - p) <= 0.001


def test_lattice_parameters_jr_with_yield():
  u, d, p = get_lattice_parameters(1/100, 0.05, 0.2, 0.02, "JR")
  
  true_u = 1.0203
  true_d = 0.9803
  true_p = 0.5
  assert abs(true_u - u) <= 0.0001
  assert abs(true_d - d) <= 0.0001
  assert abs(true_p - p) <= 0.001


def test_lattice_parameters_tian():
  u, d, p = get_lattice_parameters(1/100, 0.05, 0.2, 0, "TIAN")
  
  true_u = 1.0211
  true_d = 0.9811
  true_p = 0.4850
  assert abs(true_u - u) <= 0.0001
  assert abs(true_d - d) <= 0.0001
  assert abs(true_p - p) <= 0.001


def test_lattice_parameters_tian_with_yield():
  u, d, p = get_lattice_parameters(1/100, 0.05, 0.2, 0.02, "TIAN")
  
  true_u = 1.0209
  true_d = 0.9809
  true_p = 0.4850
  assert abs(true_u - u) <= 0.0001
  assert abs(true_d - d) <= 0.0001
  assert abs(true_p - p) <= 0.001


def test_lattice_parameters_trg_with_yield():
  u, d, p = get_lattice_parameters(1/100, 0.05, 0.2, 0.02, "TRG")
  
  true_u = 1.0203
  true_d = 0.9803
  true_p = 0.5
  assert abs(true_u - u) <= 0.0001
  assert abs(true_d - d) <= 0.0001
  assert abs(true_p - p) <= 0.001


def test_lattice_parameters_trg():
  u, d, p = get_lattice_parameters(1/100, 0.05, 0.2, 0, "TRG")
  
  true_u =  1.0205
  true_d = 0.9805
  true_p = 0.5
  assert abs(true_u - u) <= 0.0001
  assert abs(true_d - d) <= 0.0001
  assert abs(true_p - p) <= 0.001


def test_check_american_higher_for_put():
  american_price = simulate_binomial(
    100, 80, 1, 0.05, 0.2, 0, 100, "put", "american", "CRR"
  )["binomial_price"]

  european_price = simulate_binomial(
    100, 80, 1, 0.05, 0.2, 0, 100, "put", "european", "CRR"
  )["binomial_price"]

  assert european_price < american_price


def test_check_american_higher_for_call_with_negative_real_rates():
  american_price = simulate_binomial(
    100, 100, 1, -0.05, 0.2, 0, 100, "call", "american", "CRR"
  )["binomial_price"]

  european_price = simulate_binomial(
    100, 100, 1, -0.05, 0.2, 0, 100, "call", "european", "CRR"
  )["binomial_price"]

  assert european_price < american_price

# test american with risk free low is higher 