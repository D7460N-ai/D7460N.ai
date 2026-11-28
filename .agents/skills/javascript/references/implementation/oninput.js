// MARK: ONINPUT
// The single lifecycle. Every state machine enters here and nowhere else.
// The control's position among its group's radios (page order, any nesting)
// is its identity and names its data file: 3rd radio → 003.json.
// Label text is for people only; it is never used as an identity.

import { fetchJson } from "./fetch-json.js";
import { inject } from "./inject.js";
import { writeStorage } from "./write-storage.js";

export async function oninput(event) {
  const control = event.target;
  const group = control.name;
  const controls = [...document.querySelectorAll(`input[name="${group}"]`)];
  const position = controls.indexOf(control) + 1;

  if (!group || !position) return;

  writeStorage(group, String(position));

  inject(
    await fetchJson(`assets/data/${String(position).padStart(3, "0")}.json`),
    document.querySelector("main")
  );
}
