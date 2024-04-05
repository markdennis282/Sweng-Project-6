/* eslint-disable camelcase */
export const apiUrl = jest.fn(route => `/api${route}`);

export const getChatStreamResponse = jest.fn(async function* (messageContents, sourceTag) {
    for(let i = 1; i <= 3; i++) {
        yield { message_type: "update", message_content: `progressUpdate${i}` };
        await new Promise(resolve => {
            setTimeout(resolve, 100);
        });
    }
    yield {
        message_type: "final_response",
        message_content: `Final response to query ${messageContents} for tag ${sourceTag}`
    };
});
