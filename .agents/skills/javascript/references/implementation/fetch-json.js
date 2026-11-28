// MARK: FETCH-JSON
// GET one data file by name. The data base path is declared here, once —
// only the name (endpoint suffix) varies. Returns parsed data, or null on
// any failure. Transport only. Knows no element, no state machine.
// Console: success = one minimal timestamped line; failure = verbose.

const BASE = "assets/data/";

export async function fetchJson(name = "") {
  if (!name) return null;

  const path = `${BASE}${name}.json`;

  try {
    const response = await fetch(path);

    if (!response.ok) {
      console.error(`${new Date().toISOString()} FAIL ${path}`, response.status, response.statusText, response);
      return null;
    }

    const data = await response.json();
    console.log(`${new Date().toISOString()} OK ${path}`);
    return data;
  } catch (error) {
    console.error(`${new Date().toISOString()} FAIL ${path}`, error);
    return null;
  }
}
