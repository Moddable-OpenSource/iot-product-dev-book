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
 
const maskSettingsTexture = new Texture({
    path: "settings-mask.png"
});

const maskSettingsSkin = new Skin({ 
    texture: maskSettingsTexture, 
    width: 80, height: 80,
    color: ["orange", "yellow"]
});

class SettingsIconBehavior extends Behavior {
    onTouchBegan(content) {
        content.state = 1;
    }
    onTouchEnded(content) {
        content.state = 0;
    }
}

const maskSettingsIcon = new Content(null, { 
    skin: maskSettingsSkin,
    state: 0,
    active: true,
    Behavior: SettingsIconBehavior
});

application.add(maskSettingsIcon);
