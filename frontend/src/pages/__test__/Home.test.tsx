import { MemoryRouter } from "react-router-dom";
import { render, RenderOptions } from "@testing-library/react";
import Home from "../Home";
import { ReactElement } from "react";
import { fireEvent } from "@testing-library/react";


export function renderWithRouter(component: ReactElement, options?: RenderOptions) {
  return render(component, { wrapper: MemoryRouter, ...options });
}


describe("Home Page", () => {
  test("renders snapshot as expected", () => {
    const home = renderWithRouter(<Home />);
    expect(home.asFragment()).toMatchSnapshot();
  });

  test("mini project drop down displays on project click", async () => {
    const home = renderWithRouter(<Home />);

    const firstProjectCard = home.getAllByTestId("mini-project-card")[0];

    fireEvent.click(firstProjectCard);

    const expandedDiv = await home.findByTestId("expanded-content");
    expect(expandedDiv).toBeInTheDocument();
  });
});
