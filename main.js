// ALU
// registers
// Cur Command - TD
// Operands - A, B

// Commands
// add 000
// sub 001
// mul 010
// div 011
// mod 100
// pow 101

// CU
// registers
// Instruction Pointer - IP

function memArray(memAmount) {
	this.memam = memAmount
	for (let i = 0; i < this.memam; i++) {
		this[i] = false;
	}

	this.getSect = function(startAddress, endAddress) {
		let s = "";
		for (let i = startAddress; i < Math.min(endAddress, this.memam); i++) {
			s += this[i] - 0;
		}
		return s;
	}

	this.setSect = function(startAddress, endAddress, valueBin) {
		for (let i = 0; i < endAddress - startAddress; i++) {
			this[startAddress + i] = valueBin.length > i && valueBin[i] == 1;
		}
	}
}

function ALU() {
	this.TD = 0;
	this.TD_SIZE = 3;
	this.A = this.TD + this.TD_SIZE;
	this.A_SIZE = this.B_SIZE = 8;
	this.B = this.A + this.A_SIZE;
	this.mem = new memArray(this.TD_SIZE + this.B_SIZE + this.A_SIZE);

	this.roll = function() {
		switch (this.mem.getSect(this.TD, this.TD_SIZE)) {
			case "000": {
				let s = "";
				let flag = false;
				let op1 = this.mem.getSect(this.A, this.A + this.A_SIZE);
				let op2 = this.mem.getSect(this.B, this.B + this.B_SIZE);
				for (let i = this.A_SIZE - 1; i >= 0; i--) {
					s = ((op1[i] != op2[i]) != flag) - 0 + s;
					flag = (op1[i] - 0) + (op2[i] - 0) + flag >= 2;
				}
				this.mem.setSect(this.A, this.A + this.A_SIZE, s);
				break;
			}
			case "001": {
				this.mem[this.A] = this.mem[this.A] - this.mem[this.B];
				break;
			}
			case "010": {
				this.mem[this.A] = this.mem[this.A] * this.mem[this.B];
				break;
			}
			case "011": {
				this.mem[this.A] = this.mem[this.A] / this.mem[this.B];
				break;
			}
			case "100": {
				this.mem[this.A] = this.mem[this.A] % this.mem[this.B];
				break;
			}
			case "101": {
				this.mem[this.A] = this.mem[this.A] ** this.mem[this.B];
				break;
			}
		}
	}

	this.getReg = function(reg) {
		if (this.hasOwnProperty(reg))
			return this.mem.getSect(this[reg], this[reg] + this[reg + "_SIZE"]);
		return;
	}

	this.setReg = function(reg, valueInt) {
		if (this.hasOwnProperty(reg))
			this.mem.setSect(this[reg], this[reg] + this[reg + "_SIZE"], valueInt.toString(2).slice(-this[reg + "_SIZE"]).padStart(this[reg + "_SIZE"], "0"));
		return;
	}
}

function CPU() {
	alu = new ALU();
}

const alu = new ALU();
alu.setReg("TD", 0);
alu.setReg("A", 17);
alu.setReg("B", 22);
alu.roll();
console.log(alu.getReg("A"), alu.getReg("B"));
