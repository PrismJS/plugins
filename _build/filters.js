export function escape_quotes (str) {
	return str?.replace(/"/g, `\\"`);
}
