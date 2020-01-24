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
import Digital from "pins/digital";

let button = new Digital({
    pin: 16, 
    mode: Digital.InputPullDown
});
let previous = 0;
let count = 0;
Timer.repeat(id => {
    let value = button.read();
    if (value !== previous) {
        if (!value)
            trace(`button pressed: ${++count}\n`);
        previous = value;
    }
}, 100);