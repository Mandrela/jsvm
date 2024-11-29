const readline = require("readline/promises");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/*
Every memory cell contains one byte e.g. in number in range 0-255
*/

//registers
const IP = 0;
const SP = 1;
const Flags = 2;
const reg_amount = 3;

const ram_size = 1024;
const disk_size = 8192;
const memory_length = reg_amount + ram_size;
var memory = new Array(memory_length);

memory[IP] = reg_amount;
memory[SP] = 0;
memory[Flags] = 0;

memory[memory[IP]] = 85;
memory[memory[IP] + 1] = reg_amount + ram_size - 2;
memory[memory[IP] + 2] = reg_amount + ram_size - 1;
memory[memory[IP] + 3] = 1;
memory[memory[IP] + 4] = 500;
memory[memory[IP] + 5] = 22;
memory[memory[IP] + 6] = reg_amount;

/*
Machine codes (hex view)
01 - STALL V - wait for V ms
16 - JMP A - jump to A
55 - MV A1 A2 - write from A1 to A2
*/

async function simple_terminal() {
	while (true) {
		console.log(memory[reg_amount + ram_size - 1]);
		memory[reg_amount + ram_size - 2] = parseInt(await rl.question('>>> '));
		await sleep(500);
	}
}

async function main() {
	simple_terminal();
	// CPU cycle
	while (memory[IP] < memory_length) {
		let command = memory[memory[IP]];
		memory[IP] += 1;
		switch (command) {
			case 1: {
				await sleep(memory[memory[IP]]);
				memory[IP] += 1;
				break;
			}
			case 22: {
				memory[IP] = memory[memory[IP]];
				break;
			}
			case 85: {
				memory[memory[memory[IP] + 1]] = memory[memory[memory[IP]]];
				memory[IP] += 2;
				break;
			}
		}
	}
}

main();
