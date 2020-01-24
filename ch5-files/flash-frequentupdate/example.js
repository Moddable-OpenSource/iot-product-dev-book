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

const SIGNATURE = 0xa82aa82a;

let signature = partition.read(0, 4);
signature = (new Uint32Array(signature))[0];
if (signature !== SIGNATURE)
	initialize(partition);


function initialize(partition) {
	let signature = Uint32Array.of(SIGNATURE);

	partition.erase(0);
	partition.write(0, 4, signature.buffer);
}

function write(partition, newValue) {
	for (let i = 1; i < 1024; i++) {
		let currentValue = partition.read(i * 4, 4);
		currentValue = (new Uint32Array(currentValue))[0];
		if (0xFFFFFFFF === currentValue) {
			partition.write(i * 4, 4, Uint32Array.of(newValue).buffer);
			return;
		}
	}
	initialize(partition);
	partition.write(4, 4, Uint32Array.of(newValue).buffer);
}

function read(partition) {
	let i;

	for (i = 1; i < 1024; i++) {
		let currentValue = partition.read(i * 4, 4);
		currentValue = (new Uint32Array(currentValue))[0];
		if (0xFFFFFFFF === currentValue)
			break;
	}

	let result = partition.read((i - 1) * 4, 4);
	return (new Uint32Array(result))[0];
}