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

const WHITE = "white";
const GRAY = "#e6e6e6";
const BLUE = "#1932ab";

const textStyle = new Style({ 
	font: "semibold 16px Open Sans" 
});

class GraphBehavior extends Behavior {
	onDisplaying(port) {
		this.values = new Array(20);
		this.values.fill(0);
		port.interval = 100;
		port.start();
	}
	onTimeChanged(port) {
		this.values.shift();
		this.values.push(Math.random() * 100);
		port.invalidate();
	}
	onDraw(port, x, y, width, height) {
		port.fillColor(WHITE, x, y, width, height);

		for (let i = 100, yOffset = 0; yOffset < height; yOffset += height / 5, i -= 20) {
			port.drawString(i, textStyle, "black", 30 - textStyle.measure(i).width, yOffset);
			port.fillColor(GRAY, 35, yOffset + 10, width, 1);
		}

		let xOffset = 35;
		const values = this.values;
		for (let i = 0; i < values.length; i++) {
			let value = values[i];
			let barHeight = (value / 100) * (height - 10);
			port.fillColor(BLUE, xOffset, height - barHeight, 12, barHeight);
			xOffset += 14;
		}
	}
}

const graph = new Port(null, {
	top: 0, bottom: 0, left: 0, right: 0,
	Behavior: GraphBehavior
});

application.add(graph);