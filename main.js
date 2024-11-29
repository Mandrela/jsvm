// ALU
// registers
// Cur Command - TD
// Operands - A, B

// Commands
// add 0
// sub 1
// mul 2
// div 3
// mod 4
// pow 5

// CU
// registers
// Instruction Pointer - IP

class ALU {
	mem = new Array(3);
	TD = 0;
	A = 1;
	B = 2;

	roll() {
		switch (this.mem[0]) {
			case 0: {
				this.mem[this.A] = this.mem[this.A] + this.mem[this.B];
				break;
			}
			case 1: {
				this.mem[this.A] = this.mem[this.A] - this.mem[this.B];
				break;
			}
			case 2: {
				this.mem[this.A] = this.mem[this.A] * this.mem[this.B];
				break;
			}
			case 3: {
				this.mem[this.A] = this.mem[this.A] / this.mem[this.B];
				break;
			}
			case 4: {
				this.mem[this.A] = this.mem[this.A] % this.mem[this.B];
				break;
			}
			case 5: {
				this.mem[this.A] = this.mem[this.A] ** this.mem[this.B];
				break;
			}
		}
	}

	getReg(reg) {
		return this.mem[this[reg]];
	}

	setReg(reg, value) {
		this.mem[this[reg]] = value;
		return;
	}
}

const alu = new ALU();
alu.setReg("TD", 100);
alu.setReg("A", 17);
alu.setReg("B", 22);
alu.roll();
console.log(alu.getReg("A"), alu.getReg("B"));
