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

const textStyle = new Style({ 
	font: "24px Open Sans", 
	color: "black", 
	top: 10, bottom: 10, left: 10, right: 10 
});

const backgroundSkin = new Skin({ 
	fill: ["white", "gray"]
});

const buttonSkin = new Skin({ 
	fill: ["#dfdfdf", "#909090"] 
});

const squareSkin = new Skin({ 
	fill: ["blue", "green"] 
});

class StartButtonBehavior extends Behavior {
	onCreate(label, data) {
		this.data = data;
	}
	onTouchBegan(label) {
		label.state = 1;
	}
	onTouchEnded(label) {
		label.state = 0;
		this.data.SQUARE.start();
		this.data.BACKGROUND.start();
	}
}

const StartButton = Label.template($ => ({
	top: 60, height: 40, width: 120,
	skin: buttonSkin, 
	style: textStyle,
	string: "Start",
	active: true, 
	Behavior: StartButtonBehavior 	
}));

class AnimatedSquareBehavior extends Behavior {
	onCreate(content, data) {
		content.interval = 500;
	}
	onTimeChanged(content) {
		content.state = !content.state;
	}
}

const AnimatedSquare = Content.template($ => ({
	top: 110, height: 40, width: 40,
	anchor: "SQUARE",
	skin: squareSkin,
	Behavior: AnimatedSquareBehavior 	
}));

class MainContainerBehavior extends Behavior {
	onCreate(content, data) {
		content.interval = 500;
	}
	onTimeChanged(content) {
		content.state = !content.state;
	}
}

const MainContainer = Container.template($ => ({
	top: 0, bottom: 0, left: 0, right: 0,
	anchor: "BACKGROUND",
	skin: backgroundSkin,
	contents: [
		new StartButton($),
		new AnimatedSquare($)
	],
	Behavior: MainContainerBehavior
}));

let instantiatingData = {};
application.add(new MainContainer(instantiatingData));