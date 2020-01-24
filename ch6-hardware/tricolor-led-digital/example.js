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

let r = new Digital(12, Digital.Output)
let g = new Digital(13, Digital.Output)
let b = new Digital(14, Digital.Output)
Timer.repeat(() => {
    // black (all off)
    r.write(1);
    g.write(1);
    b.write(1);
    Timer.delay(100);

    // red (red on)
    r.write(0);
    Timer.delay(100);

    // magenta (red and blue on)
    b.write(0);
    Timer.delay(100);

    // white (all on)
    g.write(0);
    Timer.delay(100);
}, 1);