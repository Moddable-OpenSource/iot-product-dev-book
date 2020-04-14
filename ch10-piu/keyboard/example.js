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

import { HorizontalExpandingKeyboard } from "keyboard";
import { KeyboardField } from "common/keyboard";

const keyboardStyle = new Style({ 
	font: "semibold 16px Open Sans", 
	color: "black" 
});
const fieldStyle = new Style({ 
	font: "24px Open Sans", 
	color: "black", 
	horizontal:"left", 
	vertical:"middle" 
});

class KeyboardContainerBehavior extends Behavior {
	onCreate(column, data){
		this.data = data;
	}
	onDisplaying(column) {
		this.addKeyboard();
	}
	onTouchEnded(column){
		this.addKeyboard();
	}
	addKeyboard() {
		if (1 !== this.data.KEYBOARD.length)
			this.data.KEYBOARD.add(HorizontalExpandingKeyboard(this.data, {
				style: keyboardStyle, target: this.data.FIELD, doTransition: true
			}));
	}
	onKeyboardOK(application, string) {
		trace(`User entered: ${string}\n`);
		this.data.FIELD.visible = false;
	}
	onKeyboardTransitionFinished(application, out) {
		if (out) {
			let keyboard = this.data.KEYBOARD;
			keyboard.remove(keyboard.first);
		}
		else
			this.data.FIELD.visible = true;
	}
}

const KeyboardContainer = Column.template($ => ({
	left: 0, right: 0, top: 0, bottom: 0,
	contents: [
		KeyboardField($, {
			anchor: "FIELD",
			left: 32, right: 0, top: 0, bottom: 0,
			style: fieldStyle
		}),
		Container($, {
			anchor: "KEYBOARD",
			left: 0, right: 0, bottom: 0, height: 164
		})
	],
	active: true,
	Behavior: KeyboardContainerBehavior
}));

application.add(new KeyboardContainer({}));

