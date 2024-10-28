/*
Every memory cell contains one byte e.g. in number in range 0-255
*/

const reg_size = 1; // 8 bit
//registers
const CC = 0 * reg_size; // current command
const IP = 1 * reg_size;
const SP = 2 * reg_size;
const Flags = 3 * reg_size;
const reg_amount = 4;

const ram_size = 1024; // bytes
const disk_size = 8192; // bytes
const memory_length = reg_amount * reg_size + ram_size;
var memory = new Array(memory_length);

memory[IP] = reg_amount * reg_size;
memory[SP] = 0;
memory[Flags] = 0;

memory[memory[IP]] = 255;

/*
Machine codes (hex view)
FF - print("a liar!")
*/

// CPU cycle
while (memory[IP] < memory_length) {
	for (let i = 0; i < reg_size; i++) {
		memory[CC + i] = memory[memory[IP] + i];
	}
	memory[IP] += reg_size;
	switch (memory[CC]) {
		case 255: {
			console.log("am I ;]")
		}
	}
}
