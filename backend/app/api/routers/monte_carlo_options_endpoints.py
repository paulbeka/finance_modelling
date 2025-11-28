from fastapi import APIRouter
from ...schemas.monte_carlo_option_schema import MonteCarloOptionInput, MonteCarloOptionOutput
from ...services.monte_carlo_options import monte_carlo_options_simulator

router = APIRouter()

@router.post("/single-option", response_model=MonteCarloOptionOutput)
def simulate_options(req: MonteCarloOptionInput):
    simulation_output = monte_carlo_options_simulator(
        S=req.spot,
        K=req.strike,
        T=req.time,
        r=req.risk_free_rate,
        q=req.dividends,
        sigma=req.sigma,
        simulations=req.num_simulations,
        steps=req.num_steps,
        option_type=req.option_type,
        return_paths=req.return_paths
    )
    return MonteCarloOptionOutput(**simulation_output)