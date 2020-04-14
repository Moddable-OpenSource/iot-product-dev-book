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

import WipeTransition from "piu/WipeTransition";
import CombTransition from "piu/CombTransition";

const WHITE = "white";
const BLUE = "#000066";

const textStyle = new Style({
    font: "24px Open Sans",
    color: [WHITE, BLUE]
});

const sampleLabel = new Label(null, { 
    style: textStyle,
    string: "Hello, World",
    top: 0, bottom: 0, left: 0, right: 0
});

const whiteScreen = new Container(null, {
	top: 0, bottom: 0, left: 0, right: 0, 
	skin: new Skin({ fill: WHITE }),
	contents: [
		Label(null, {
			state: 1, style: textStyle, 
			string: "White screen"
		})
	]
});
const blueScreen = new Container(null, {
	top: 0, bottom: 0, left: 0, right: 0, 
	skin: new Skin({ fill: BLUE }),
	contents: [
		Label(null, {
			state: 0, style: textStyle, 
			string: "Blue screen"
		})
	]
});

const parameters = [
	{ transition:CombTransition, first:"horizontal", last:4 },
	{ transition:CombTransition, first:"vertical", last:4 },
	{ transition:CombTransition, first:"horizontal", last:8 },
	{ transition:CombTransition, first:"vertical", last:8 },
	{ transition:WipeTransition, first:"left" },
	{ transition:WipeTransition, first:"right" },
	{ transition:WipeTransition, last:"top" },
	{ transition:WipeTransition, last:"bottom" },
	{ transition:WipeTransition, first:"center" },
	{ transition:WipeTransition, last:"middle" },
	{ transition:WipeTransition, first:"center", last:"middle" },
	{ transition:WipeTransition, first:"left", last:"top" },
	{ transition:WipeTransition, first:"right", last:"top" },
	{ transition:WipeTransition, first:"right", last:"bottom" },
	{ transition:WipeTransition, first:"left", last:"bottom" },
	{ transition:WipeTransition, first:"center", last:"top" },
	{ transition:WipeTransition, first:"right", last:"middle" },
	{ transition:WipeTransition, first:"center", last:"bottom" },
	{ transition:WipeTransition, first:"left", last:"middle" }
];

class MainContainerBehavior extends Behavior {
	onDisplaying(container) {
		this.index = 0;
		container.duration = 500;
		container.start();
	}
	onFinished(container) {
		let parameter = parameters[this.index % parameters.length];
		let transition = new parameter.transition(250, Math.quadEaseOut, parameter.first, parameter.last);
		this.index++;
		container.run(transition, container.first, (this.index & 1)? blueScreen : whiteScreen);
	}
	onTransitionEnded(container) {
		container.time = 0;
		container.start();
	}
}

application.add(new Container(null, {
	top: 0, bottom: 0, left: 0, right: 0,
	contents: [
		whiteScreen
	],
	Behavior: MainContainerBehavior
}));
