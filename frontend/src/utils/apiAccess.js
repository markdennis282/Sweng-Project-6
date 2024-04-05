function getApiUrlPrefix() {
    if(import.meta.env.PROD) {
        return "/api";
    }
    return "http://localhost:8000/api";
}

// returns the URL for a given API route (route passed as the argument should begin with a slash)
export function apiUrl(route) {
    return getApiUrlPrefix() + route;
}

// fetches the streamed chat response from the server.
// yields message object of type { message_type: string, final_response: string }
// throws on error
export async function* getChatStreamResponse(messageContents, sourceTag) {
    const response = await fetch(apiUrl("/chat_stream"), {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prompt: messageContents,
            section: sourceTag
        })
    });
    const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
    while(true) {
        const { value, done } = await reader.read();
        if(done) break;
        const message = JSON.parse(value);
        yield message;
    }
}
