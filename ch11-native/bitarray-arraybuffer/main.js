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

import BitArray from "bitarray";

let bits = new BitArray(128);

trace(`${bits.get(0)}, ${bits.get(1)}, ${bits.get(2)}\n`)
bits.set(1, 1);
trace(`${bits.get(0)}, ${bits.get(1)}, ${bits.get(2)}\n`)
bits.set(2, 1);
trace(`${bits.get(0)}, ${bits.get(1)}, ${bits.get(2)}\n`)
bits.set(1, 0);
trace(`${bits.get(0)}, ${bits.get(1)}, ${bits.get(2)}\n`)
bits.set(2, 0);
trace(`${bits.get(0)}, ${bits.get(1)}, ${bits.get(2)}\n`)
