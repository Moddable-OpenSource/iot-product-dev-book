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

const bigTextStyle = new Style({ 
	font: "24px Open Sans", 
	color: "black" 
});

const smallTextStyle = new Style({ 
	font: "semibold 16px Open Sans", 
	color: "black" 
});

const sampleHeader = new Label(null, { 
	top: 20, 
	style: bigTextStyle, 
	string: "Lorem ipsum" 
});

const grayBar = new Content(null, {
	top: 20, height: 2, left: 20, right: 20, 
	skin: new Skin({ fill: "#dedede" })
});

const loremIpsum = `Lorem ipsum dolor sit amet, magna ullum ne mea. An mel suas adipiscing, pri at agam adipisci vituperata. Vix at augue molestie, ut mea viderer albucius assentior. Dicta qualisque definitionem ut duo. Pro veniam virtute ad. Sit te oratio eligendi delicatissimi, mundi tritani ius no, mel te dicant euismod ceteros.`

const sampleText = new Text(null, { 
	top: 20, left: 20, right: 20, 
	style: smallTextStyle, string: loremIpsum
});

class VerticalScrollerBehavior extends Behavior {
    onTouchBegan(scroller, id, x, y, ticks) {
        this.initialScrollY = scroller.scroll.y;
        this.initialY = y;
        scroller.captureTouch(id, x, y, ticks);
    }
    onTouchMoved(scroller, id, x, y, ticks) {
        const dy = y - this.initialY;
        scroller.scrollTo(0, this.initialScrollY - dy);
    }
}

const sampleVerticalScroller = new Scroller(null, {
    left: 0, right: 0, top: 0, bottom: 0, 
    contents: [
        Column(null, {
            left: 0, right: 0, top: 0, 
            contents: [
                sampleHeader,
                grayBar,
                sampleText
            ]
        })
    ],
    active: true,
    Behavior: VerticalScrollerBehavior
});

application.add(sampleVerticalScroller);