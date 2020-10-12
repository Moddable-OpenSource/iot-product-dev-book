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

import LoadMod from "loadmod";

export default function () {
	if (!LoadMod.has("pins/i2c"))
		throw new Error("This device does not have an FT6206 touch sensor.")

	const I2C = LoadMod.load("pins/i2c");
	const probe = new I2C({
		hz: 600000,
		address: 0x38,
		throw: false,
	});

	probe.write(Uint8Array.of(0xA8), false);
	if (17 !== (new Uint8Array(probe.read(1)))[0])
		throw new Error("This device does not have an FT6206 touch sensor.");

	probe.close();
};
