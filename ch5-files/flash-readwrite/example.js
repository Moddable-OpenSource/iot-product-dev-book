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

import Flash from "flash";

let partition = new Flash("storage");

partition.erase(0);

let buffer = Uint8Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).buffer;
partition.write(0, 10, buffer);

buffer = partition.read(0, 10);
let bytes = new Uint8Array(buffer);
for (let i = 0; i < bytes.byteLength; i++)
    trace(bytes[i] + "\n");
