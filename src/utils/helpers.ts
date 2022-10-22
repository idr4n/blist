// returns URL from string
export function getURL(str: string) {
    let matches = str.match(/https?:\/\/[^ ]+/gi);
    if (matches) {
        return matches[0];
    }
}

export function openUrl(title: string) {
    const url = getURL(title);
    url && window.open(url);
}
