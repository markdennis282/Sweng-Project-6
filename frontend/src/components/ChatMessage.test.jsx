import renderer from "react-test-renderer";

import ChatMessage from "./ChatMessage";

describe("Logic tests", () => {
    it("Should throw when the sender is invalid.", () => {
        expect(() => ChatMessage({ sender: "invalid", contents: "contents" })).toThrow(Error);
    });

    it("Should not throw when the sender is valid.", () => {
        expect(() => ChatMessage({ sender: "user", contents: "contents" })).not.toThrow(Error);
        expect(() => ChatMessage({ sender: "ai", contents: "contents" })).not.toThrow(Error);
        expect(() => ChatMessage({ sender: "system", contents: "contents" })).not.toThrow(Error);
    });
});

describe("Snapshot tests", () => {
    it("Should render correctly (user message)", () => {
        const tree = renderer
            .create(<ChatMessage sender="user" contents="user contents" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Should render correctly (ai message)", () => {
        const tree = renderer
            .create(<ChatMessage sender="ai" contents="ai contents" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Should render correctly (system message)", () => {
        const tree = renderer
            .create(<ChatMessage sender="system" contents="system contents" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
