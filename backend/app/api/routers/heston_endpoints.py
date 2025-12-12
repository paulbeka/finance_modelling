from fastapi import APIRouter
from ...schemas.heston_schema import HestonInput, HestonOutput
from ...services.heston import simulate_heston

router = APIRouter()


@router.post("/heston-simulation", response_model=HestonOutput)
def call_heston_model(request: HestonInput):
    simulation_output = simulate_heston(
        S=request.spot,
        K=request.strike,
        T=request.time,
        r=request.risk_free_rate,
        q=request.dividends,
        v=request.initial_variance,
        kappa=request.kappa,
        theta=request.theta,
        sigma=request.sigma,
        rho=request.rho,
        option_type=request.option_type
    )
    return simulation_output