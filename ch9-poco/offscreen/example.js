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

import Poco from "commodetto/Poco";
import Timer from "timer";
import BufferOut from "commodetto/BufferOut";

let poco = new Poco(screen);

let offscreen = new BufferOut({width: 64, height: 64, pixelFormat: poco.pixelsOut.pixelFormat});
let pocoOff = new Poco(offscreen);
pocoOff.begin();
	for (let i = 64; i >= 1; i--) {
		let gray = (i * 4) - 1;
		let color = pocoOff.makeColor(gray, gray, gray);
		pocoOff.fillRectangle(color, 0, 0, i, i);
	}
pocoOff.end();

let white = poco.makeColor(255, 255, 255);
poco.begin();
	poco.fillRectangle(white, 0, 0, poco.width, poco.height);
poco.end();

let step = 1;
let direction = +1;
Timer.repeat(function() {
	poco.begin(0, 0, 240, 240);
		poco.fillRectangle(white, 0, 0, poco.width, poco.height);
		for (let i = 0; i < 19; i += 1)
			poco.drawBitmap(offscreen.bitmap, i * step, i * 10);

		step += direction;
		if (step > 40) {
			step = 40;
			direction = -1;
		}
		else if (step < 1) {
			step = 0;
			direction = +1;
		 }
	poco.end();
}, 33);
