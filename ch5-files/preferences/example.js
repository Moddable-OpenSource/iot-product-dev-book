import Preference from "preference";

Preference.set("example", "boolean", true);
Preference.set("example", "integer", 1);
Preference.set("example", "string", "my value");
Preference.set("example", "arraybuffer", Uint8Array.of(1, 2, 3).buffer);

let a = Preference.get("example", "boolean");     // true
let b = Preference.get("example", "integer");     // 1
let c = Preference.get("example", "string");      // "my value"
let d = Preference.get("example", "arraybuffer"); // ArrayBuffer of [1, 2, 3]

trace(`boolean: ${a}\n`);
trace(`integer: ${b}\n`);
trace(`string: ${c}\n`);
trace(`arraybuffer: ${d}\n`);