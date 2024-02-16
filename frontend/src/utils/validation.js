export function isValidUrl(url) {
    try {
        const x = new URL(url);
        if(x) {
            console.log("valid");
            return true;
        }
    } catch(error) {
        console.log("invalid");
        return false;
    }
    return false;
}
