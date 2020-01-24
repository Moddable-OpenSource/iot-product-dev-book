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
let buffer = partition.map();
let bytes = new Uint8Array(buffer);

for (let i=0; i<8; i++)
	trace(`${bytes[i].toString(16).padStart(2, 0)} `);
trace("\n");
