import Flash from "flash";

let partition = new Flash("storage");
let buffer = partition.map();
let bytes = new Uint8Array(buffer);

for (let i=0; i<8; i++)
	trace(`${bytes[i].toString(16).padStart(2, 0)} `);
trace("\n");
