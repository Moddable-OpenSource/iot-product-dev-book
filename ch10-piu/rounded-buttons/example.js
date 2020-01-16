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
	color: "white", 
	top: 5, bottom: 5, left: 5, right: 5 
});
const smallTextStyle = new Style({ 
	font: "semibold 16px Open Sans", 
	color: "white", 
	top: 5, bottom: 5, left: 5, right: 5 
});

const roundedTexture = new Texture({ 
    path: "button.png" 
});

const roundedSkin = new Skin({
    texture: roundedTexture,
    width: 30, height: 30,
    color: ["#ff9900", "#ffd699"],
    tiles: {
        top: 5, bottom: 5, left: 5, right: 5
    }
});

class ButtonBehavior extends Behavior {
	onTouchBegan(button) {
		button.state = 1;
	}
	onTouchEnded(button) {
		button.state = 0;
	}
}

const button1 = new Label(null, { 
    top: 10, left: 10,
    skin: roundedSkin,
    style: smallTextStyle,
    string: "Option 1",
    active: true,
    Behavior: ButtonBehavior
});

const button2 = new Label(null, { 
    top: 60, left: 10,
    skin: roundedSkin, 
    style: textStyle,
    string: "Option 2",
    active: true,
    Behavior: ButtonBehavior
});

const button3 = new Text(null, { 
    top: 120, left: 10, width: 90,
    skin: roundedSkin,
    style: textStyle,
    string: "Option 3",
    active: true,
    Behavior: ButtonBehavior 
});

application.add(button1);
application.add(button2);
application.add(button3);