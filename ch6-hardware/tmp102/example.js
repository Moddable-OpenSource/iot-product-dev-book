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

import Timer from "timer";
import I2C from "pins/i2c";

let sensor = new I2C({address: 0x48});

const TEMPERATURE_REG = 0;
sensor.write(TEMPERATURE_REG);
let value = sensor.read(2);
value = (value[0] << 4) | (value[1] >> 4);
if (value & 0x800) {
    value -= 1;
    value = ~value & 0xFFF;
    value = -value;
}
value /= 16;
trace(`Celsius temperature: ${value}\n`);