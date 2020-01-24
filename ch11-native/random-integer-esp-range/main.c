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

#include "xsmc.h"
#include "stdint.h"

void xs_randomIntRange(xsMachine *the)
{
	int range = xsmcToInteger(xsArg(0));
	if (range < 2)
		xsRangeError("invalid range");

#if ESP32
	xsmcSetInteger(xsResult, esp_random() % range);
#elif defined(__ets__)
	xsmcSetInteger(xsResult, (*(volatile uint32_t *)0x3FF20E44) % range);
#else
	#error Unsupported platform
#endif
}
