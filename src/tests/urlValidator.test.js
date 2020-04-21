import { validateUrl } from "../client/js/urlValidator";

test('should return true for valid url', () => {
    const url = "https://www.google.com/";
    const result = validateUrl(url);
    expect(result).toBe(true);
});

test('should return false for invalid url', () => {
    const url = "hts://www.google.com/";
    const result = validateUrl(url);
    expect(result).toBe(false);
});