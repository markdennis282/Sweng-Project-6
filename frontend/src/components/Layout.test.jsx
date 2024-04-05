import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import Layout from "./Layout";

describe("Layout Components", () => {

    it("should render menu component with its children", () => {
        const menuComponent = <div>Menu Component</div>;

        const { getByText } = render(
            <Layout menuComponent={menuComponent}>
                <div>Main Component</div>
            </Layout>
        );

        expect(getByText("Menu Component")).toBeInTheDocument();
        expect(getByText("Main Component")).toBeInTheDocument();
    });

});
