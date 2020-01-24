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
import PWM from "pins/pwm";

let r = new PWM({ pin: 12 });
let g = new PWM({ pin: 13 });
let b = new PWM({ pin: 14 });

r.write(1023);
g.write(0);
b.write(1023);

let rVal=1023, gVal=0, bVal=1023;

while (bVal >= 21) {
	bVal -= 20;
	b.write(bVal);
	Timer.delay(50);
}
b.write(1);

while (gVal <= 1003) {
	gVal += 20;
	g.write(gVal);
	Timer.delay(50);
}
g.write(1023);

while (rVal >= 21) {
	rVal -= 20;
	r.write(rVal);
	Timer.delay(50);
}
r.write(1);

while (bVal <= 1003) {
	bVal += 20;
	b.write(bVal);
	Timer.delay(50);
}
b.write(1023);