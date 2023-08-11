/*
 * Copyright (c) 2016-2023 Moddable Tech, Inc.
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

#if nrf52
	#include "nrf_crypto.h"
#endif

void xs_randomInt(xsMachine *the)
{
#if ESP32
	xsmcSetInteger(xsResult, esp_random());
#elif defined(__ets__)
	xsmcSetInteger(xsResult, (*(volatile int32_t *)0x3FF20E44));
#elif nrf52
	static uint8_t inited = 0;
	if (!inited) {
		nrf_crypto_init();
		inited = 1;
	}
	int32_t random;
	nrf_crypto_rng_vector_generate((uint8_t *)&random, sizeof(random));
	xsmcSetInteger(xsResult, random);
#else
	#error Unsupported platform
#endif
}
