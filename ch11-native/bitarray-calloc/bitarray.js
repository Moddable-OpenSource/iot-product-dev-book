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

class BitArray @ "xs_bitarray_destructor" {
	constructor(count) @ "xs_bitarray_constructor";
	close() @ "xs_bitarray_close";
	get(index) @ "xs_bitarray_get";
	set(index, value) @ "xs_bitarray_set";

	get length() @ "xs_bitarray_get_length";
	set length(value) {
		throw new Error("read-only");
	}
}

export default BitArray;
