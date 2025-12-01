export function formatTitle(content) {
    return content.replace(/\[(.*?)\]/g, '<span class="brand-color">$1</span>');
}

export function formatEmphasis(content) {
    return content.replace(/\[(.*?)\]/g, '<span class="font-bold">$1</span>');
}

export function linkOutcome(content, if_local, if_external) {
    return content.replace(/^www\./, '').startsWith('https://lepetitfourbakery.com')
        ? if_local
        : if_external;
}
