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

import Timeline from "piu/Timeline";

const WHITE = "white";
const BLACK = "black";
const RED = "red";
const BLUE = "#1932ab";
const whiteSkin = new Skin({ fill: WHITE });
const colorfulSkin = new Skin({ fill: [RED, BLUE] });
const textStyle = new Style({ font: "24px Open Sans", color: [BLACK, WHITE] });

class TimelineBehavior extends Behavior {
	onDisplaying(container) {
		let timeline = this.timeline = new Timeline();
		this.reverse = false;
		timeline.from(container.first, { y: -container.first.height, state: 1 }, 750, Math.quadEaseOut, 0);
		timeline.from(container.last, { x: -320 }, 750, Math.linearEase, -750);
		timeline.to(container.last, { state: 1 }, 750, Math.linearEase, 0);
		timeline.seekTo(0);
		container.duration = timeline.duration;
		container.time = 0;
		container.start();
	}
	onTimeChanged(container) {
		let time = container.time;
		if (this.reverse) 
			time = container.duration - time;
		this.timeline.seekTo(time);
	}
	onFinished(container) {
		this.reverse = !this.reverse;
		this.timeline.seekTo(0);
		container.time = 0;
		container.start();
	}
}

const animatedContainer = new Container(null, {
	top: 0, bottom: 0, left: 0, right: 0, 
	skin: whiteSkin,
	contents: [
		new Label(null, { 
			style: textStyle, 
			top: 80, left: 0, right: 0, 
			string: "Hello, World" 
		}),
		new Content(null, {
			top: 115, height: 3, left: 0, width: 320, 
			skin: colorfulSkin
		})
	],
	Behavior: TimelineBehavior
});

application.add(animatedContainer);