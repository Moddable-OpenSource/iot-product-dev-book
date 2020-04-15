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
#include "mc.xs.h"			// for xsID_ values

void xs_bitarray_set(xsMachine *the)
{
	int index = xsmcToInteger(xsArg(0));
	int byteIndex = index >> 3;
	int bitIndex = index & 0x07;

	xsmcVars(1);

	xsmcGet(xsVar(0), xsThis, xsID_buffer);
	uint8_t *buffer = xsmcToArrayBuffer(xsVar(0));

	int value = xsmcToInteger(xsArg(1));
	if (value)
		buffer[byteIndex] |= 1 << bitIndex;
	else
		buffer[byteIndex] &= ~(1 << bitIndex);
}

void xs_bitarray_get(xsMachine *the)
{
	int index = xsmcToInteger(xsArg(0));
	int byteIndex = index >> 3;
	int bitIndex = index & 0x07;

	xsmcVars(1);

	xsmcGet(xsVar(0), xsThis, xsID_buffer);
	uint8_t *buffer = xsmcToArrayBuffer(xsVar(0));

	if (buffer[byteIndex] & (1 << bitIndex))
		xsmcSetInteger(xsResult, 1);
	else
		xsmcSetInteger(xsResult, 0);
}
