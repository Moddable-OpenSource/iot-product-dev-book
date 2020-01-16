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

const wifiTexture = new Texture({
    path: "wifi-strip.png"
});

const wifiSkin = new Skin({
    texture: wifiTexture,
    width: 28, height: 28, 
    states: 28,
    variants: 28
});

class WifiIconBehavior extends Behavior {
    onDisplaying(content) {
        content.interval = 1000;
        content.start();
    }
    onTimeChanged(content) {
        let variant = content.variant + 1;
        if (variant > 4) {
            variant = 0;
            content.state = content.state ? 0 : 1;
        }
        content.variant = variant;
    }
}

const wifiIcon = new Content(null, { 
    skin: wifiSkin,
    state: 0,
    variant: 0,
    Behavior: WifiIconBehavior
});

application.add(wifiIcon);
