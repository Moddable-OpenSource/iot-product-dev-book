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

const whiteSkin = new Skin({ 
	fill: "white" 
});

const buttonSkin = new Skin({ 
	fill: ["#dfdfdf", "#909090"] 
});

class ColorButtonBehavior extends Behavior {
	onTouchBegan(label) {
		label.state = 1;
	}
	onTouchEnded(label) {
		label.state = 0;
		label.bubble("onColorSelected", label.string);
	}
}

const ColorButton = Label.template($ => ({
	height: 40, left: 10, right: 10,
	skin: buttonSkin,
	active: true,
	Behavior: ColorButtonBehavior 	
}));

class ColorScreenBehavior extends Behavior {
	onColorSelected(container, color) {
		container.skin = new Skin({ fill: color.toLowerCase() });
	}
}

const colorScreen = new Container(null, {
	top: 0, bottom: 0, left: 0, right: 0,
	skin: whiteSkin,
	style: textStyle,
	contents: [
		Row(null, {
			height: 50, width: 320,
			contents: [
				new ColorButton(null, { string: "Red" }),
				new ColorButton(null, { string: "Yellow" }),
				new ColorButton(null, { string: "Blue" })
			]
		})
	],
	Behavior: ColorScreenBehavior
});

application.add(colorScreen);