import { decrypt, encrypt } from "crypto-js/aes";
import UTF8, { parse } from "crypto-js/enc-utf8";
import ECB from "crypto-js/mode-ecb";

// 注意 key 和 iv 至少都需要 16 位
const AES_KEY = "1000111100010101";
const AES_IV = "1010011110101011";

export class AesEncryption {
	private key;
	private iv;

	constructor(key = AES_KEY, iv = AES_IV) {
		this.key = parse(key);
		this.iv = parse(iv);
	}

	get getOptions() {
		return {
			mode: ECB,
			// padding: pkcs7,
			iv: this.iv,
		};
	}

	encryptByAES(text: string) {
		return encrypt(text, this.key, this.getOptions).toString();
	}

	decryptByAES(text: string) {
		return decrypt(text, this.key, this.getOptions).toString(UTF8);
	}
}
