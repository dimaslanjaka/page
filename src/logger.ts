import color from 'ansi-colors';

export default class logger {
	basename: string;
	constructor(name: string) {
		this.basename = name;
	}
	log(...msg: any[]) {
		console.log(color.magenta(this.basename) + '\t', ...msg);
	}
	info(...msg: any[]) {
		console.log(color.cyan(this.basename) + '\t', ...msg);
	}
	error(...msg: any[]) {
		console.log(color.red(this.basename) + '\t', ...msg);
	}
}
