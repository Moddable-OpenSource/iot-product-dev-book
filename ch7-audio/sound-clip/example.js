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

let speaker = new AudioOut({streams: 1});

let tickTock = new Resource("tick-tock.maud");
speaker.enqueue(0, AudioOut.Samples, tickTock);
speaker.enqueue(0, AudioOut.Samples, tickTock, 2, 0, 11025/2);
speaker.start();