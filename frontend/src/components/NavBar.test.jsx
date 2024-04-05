import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import NavBar from "./NavBar";

describe("NavBar Component", () => {

    it("should render correctly", () => {
        render(<NavBar items={["ALL", "COMPLIANCE", "HR", "TECH"]} onChange={() => {}} />);
        expect(screen.getByText("ALL")).toBeInTheDocument();
        expect(screen.getByText("COMPLIANCE")).toBeInTheDocument();
        expect(screen.getByText("HR")).toBeInTheDocument();
        expect(screen.getByText("TECH")).toBeInTheDocument();
    });

});
