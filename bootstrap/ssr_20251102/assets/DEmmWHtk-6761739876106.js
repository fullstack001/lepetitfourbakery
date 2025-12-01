function formatTitle(content) {
  return content.replace(/\[(.*?)\]/g, '<span class="brand-color">$1</span>');
}
function formatEmphasis(content) {
  return content.replace(/\[(.*?)\]/g, '<span class="font-bold">$1</span>');
}
function linkOutcome(content, if_local, if_external) {
  return content.replace(/^www\./, "").startsWith("https://lepetitfourbakery.com") ? if_local : if_external;
}
export {
  formatEmphasis as a,
  formatTitle as f,
  linkOutcome as l
};
