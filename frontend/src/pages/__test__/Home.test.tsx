import { MemoryRouter } from "react-router-dom";
import { render, RenderOptions } from "@testing-library/react";
import Home from "../Home";
import { ReactElement } from "react";


export function renderWithRouter(component: ReactElement, options?: RenderOptions) {
  return render(component, { wrapper: MemoryRouter, ...options });
}


describe("Home Page", () => {
  test("renders snapshot as expected", () => {
    const home = renderWithRouter(<Home />);
    expect(home.asFragment()).toMatchSnapshot();
  });
});
