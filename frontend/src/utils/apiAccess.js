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
