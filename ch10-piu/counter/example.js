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

const buttonSkin = new Skin({ 
	fill: ["#dfdfdf", "#909090"] 
});

class CounterBehavior extends Behavior {
    onDisplaying(label) {
        this.count = 0;
    }
    increment(label) {
        label.string = ++this.count;
    }
}

const counter = new Label(null, {
    top: 70, height: 30, left: 0, right: 0, 
    style: textStyle,
    string: "0",
    Behavior: CounterBehavior
});

class IncrementButtonBehavior extends Behavior {
    onTouchBegan(label) {
        label.state = 1;
    }
    onTouchEnded(label) {
        label.state = 0;
        counter.delegate("increment");
    }
}

const incrementButton = new Label(null, {
    top: 120, height: 40, left: 140, width: 40,
    style: textStyle,
    string: "+",
    skin: buttonSkin,
    active: true,
    Behavior: IncrementButtonBehavior
});

application.add(counter);
application.add(incrementButton);