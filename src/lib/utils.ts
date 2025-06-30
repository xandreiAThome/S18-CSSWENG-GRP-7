/**
 * Extracts the parameter taken from a ParsedUrlQuery as a single string
 * @param queryParam The query parameter
 * @returns The parameter if it is a string, the first element if it is an array of strings
 * @throws If the parameter is undefined
 */
export function extractParamAsString(queryParam: string | string[] | undefined): string {
  if (Array.isArray(queryParam)) {
    return queryParam[0];
  }
  if (queryParam === undefined) {
    throw new Error('Missing query parameter');
  }
  return queryParam;
}