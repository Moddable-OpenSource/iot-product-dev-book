/*
 * Copyright (c) 2016-2020 Moddable Tech, Inc.
 *
 *   This file is part of the Moddable SDK.
 * 
 *   This work is licensed under the
 *       Creative Commons Attribution 4.0 International License.
 *   To view a copy of this license, visit
 *       <http://creativecommons.org/licenses/by/4.0>
 *   or send a letter to Creative Commons, PO Box 1866,
 *   Mountain View, CA 94042, USA.
 *
 */

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