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

import { File, Iterator } from "file";
import config from "mc/config";

const root = config.file.root;

File.delete(root + "test.txt");
File.delete(root + "test.bin");

/* Reading and writing text */
let file = new File(root + "test.txt", true);
file.write("this is a test");
file.close();

file = new File(root + "test.txt");
let string = file.read(String);
trace(string + "\n");
file.close();
trace("\n");

/* Reading and writing binary data */
let bytes = Uint32Array.of(0, 1, 2, 3, 4);
file = new File(root + "test.bin", true);
file.write(bytes.buffer);
file.close();

file = new File(config.file.root + "test.bin");
let buffer = file.read(ArrayBuffer);
file.close();

bytes = new Uint8Array(buffer);
for (let i = 0; i < bytes.length; i++)
	trace(bytes[i].toString(16).padStart(2, "0"), "\n");
trace("\n");

/* Iterating */
let iterator = new Iterator(root);
let item;
while (item = iterator.next()) {
	if (undefined == item.length)
		trace(`${item.name.padEnd(32)} directory\n`);
	else
		trace(`${item.name.padEnd(32)} file ${item.length} bytes\n`);
}