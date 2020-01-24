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
import Resource from "Resource";
import parseBMF from "commodetto/parseBMF";
import Timer from "timer";

let poco = new Poco(screen, {displayListLength: 4000});

let white = poco.makeColor(255, 255, 255);
let black = poco.makeColor(0, 0, 0);
let yellow = poco.makeColor(255, 255, 0);

poco.begin();
	poco.fillRectangle(white, 0, 0, poco.width, poco.height);
poco.end();

let regular16 = parseBMF(new Resource("OpenSans-Regular-16.bf4"));

let frame = 3;
let margin = 2;
let x = 10, y = 60;
let tickerWidth = 200;
let width = tickerWidth + frame * 2 + margin * 2;
let height = regular16.height + frame * 2 + margin * 2;
let text = "JavaScript is one of the world's most widely used programming languages.";
let textWidth = poco.getTextWidth(text, regular16);
let dx = tickerWidth;
Timer.repeat(function() {
	poco.begin(x, y, width, height);
		poco.fillRectangle(black, x, y, width, height);
		poco.fillRectangle(yellow, x + frame, y + frame, tickerWidth + margin * 2, regular16.height + margin * 2);

		poco.clip(x + frame + margin, y + frame + margin, tickerWidth, regular16.height);
		poco.drawText(text, regular16, black, x + frame + margin + dx, y + frame);
		poco.clip();

		dx -= 2;
		if (dx < -textWidth)
			dx = tickerWidth;
	poco.end();
}, 16);
