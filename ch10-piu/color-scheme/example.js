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
	color: ["black", "white"],
	top: 10, bottom: 10, left: 10, right: 10
});

const backgroundSkin = new Skin({ 
	fill: ["white", "black"] 
});

const buttonSkin = new Skin({ 
	fill: ["#dfdfdf", "#909090"] 
});

class ModeButtonBehavior extends Behavior {
	onTouchBegan(label) {
		label.state = 1;
	}
	onTouchEnded(label) {
		label.state = 0;
		application.distribute("onModeChanged", label.string);
	}
}

const ModeButton = Label.template($ => ({
	top: 110, height: 40, width: 120,
	skin: buttonSkin,
	active: true,
	Behavior: ModeButtonBehavior
}));

class LightDarkScreenBehavior extends Behavior {
	onModeChanged(container, mode) {
		container.state = (mode === "Dark")? 1 : 0;
	}
}

class TextBehavior extends Behavior {
	onModeChanged(label, mode) {
		label.state = (mode === "Dark")? 1 : 0;
		label.string = mode;
	}
}

const LightDarkScreen = new Container(null, {
	top: 0, bottom: 0, left: 0, right: 0,
	skin: backgroundSkin,
	style: textStyle,
	contents: [
		Label(null, {
			top: 50, height: 30, left: 0, right: 0, 
			string: "Light",
			Behavior: TextBehavior
		}),
		ModeButton(null, {
			left: 30, 
			string: "Dark"
		}),
		ModeButton(null, {
			right: 30,
			string: "Light"
		})
	],
	Behavior: LightDarkScreenBehavior
});

application.add(LightDarkScreen);