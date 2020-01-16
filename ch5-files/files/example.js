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