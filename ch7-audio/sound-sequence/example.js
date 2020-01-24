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

import AudioOut from "pins/audioout";
import Resource from "Resource";

let speaker = new AudioOut({sampleRate: 11025, bitsPerSample: 16, numChannels: 1, streams: 1});

speaker.callback = function() {
	speaker.enqueue(0, AudioOut.Samples,
		new Resource("ding.maud"));
	speaker.enqueue(0, AudioOut.Samples,
		new Resource("tick-tock.maud"));
	speaker.enqueue(0, AudioOut.Samples,
		new Resource("tada.maud"));
	speaker.enqueue(0, AudioOut.Callback, 0);
}
speaker.callback();
speaker.start();