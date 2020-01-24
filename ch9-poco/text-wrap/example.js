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

let poco = new Poco(screen, {displayListLength: 4000});

let regular16 = parseBMF(new Resource("OpenSans-Regular-16.bf4"));
let bold28 = parseBMF(new Resource("OpenSans-Semibold-28.bf4"));

let white = poco.makeColor(255, 255, 255);
let black = poco.makeColor(0, 0, 0);
poco.begin();
	poco.fillRectangle(white, 0, 0, poco.width, poco.height);

	let text = "JavaScript is one of the world's most widely used programming languages.";
	text = text.split(" ");
	let width = poco.width;
	let y = 0;
	let font = bold28;
	let spaceWidth = poco.getTextWidth(" ", font);
	while (text.length) {
		let wordWidth = poco.getTextWidth(text[0], font);
		if ((wordWidth < width) || (width === poco.width)) {
			poco.drawText(text[0], font, black, poco.width - width, y);
			text.shift();
		}
		width -= wordWidth + spaceWidth;
		if (width <= 0) {
			width = poco.width;
			y += font.height;
		}
	}
poco.end();
