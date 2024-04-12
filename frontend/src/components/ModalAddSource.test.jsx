import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";

import ModalAddSource from "./ModalAddSource";

jest.mock("axios");
jest.mock("../utils/apiAccess");

describe("ModalAddSource Component", () => {

    it("should display a form with inputs, select buttons and a submit button", () => {
        render(<ModalAddSource />);
        expect(screen.getByLabelText(/source url/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/access control/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/refresh interval/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
    });

    it("should not make request when form is not filled", async () => {
        render(<ModalAddSource />);

        const mockAxiosPost = jest.spyOn(axios, "post").mockImplementation();

        // user submits empty form
        userEvent.click(screen.getByRole("button", { name: /save/i }));
        await waitFor(() => expect(mockAxiosPost).not.toHaveBeenCalled());
    });

});
