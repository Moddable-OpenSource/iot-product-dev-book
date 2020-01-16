import Flash from "flash";

let partition = new Flash("storage");

partition.erase(0);

let buffer = Uint8Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).buffer;
partition.write(0, 10, buffer);

buffer = partition.read(0, 10);
let bytes = new Uint8Array(buffer);
for (let i = 0; i < bytes.byteLength; i++)
    trace(bytes[i] + "\n");
