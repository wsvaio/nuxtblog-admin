import jsQR from "jsqr";

export const resolveQRCode = async (src: string) => {
	const image = document.createElement("img");
	image.src = src;
	await new Promise((resolve, reject) => {
		image.onload = resolve;
		image.onerror = reject;
	});
	const canvas = document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;
	const ctx = canvas.getContext("2d");
	if (!ctx) return null;
	ctx.drawImage(image, 0, 0, image.width, image.height);
	const imageData = ctx.getImageData(0, 0, image.width, image.height);
	return jsQR(imageData.data, imageData.width, imageData.height);
};

export const parseEquipQrCode = (str: string, type = "IMEI" as "IMEI" | "VALUE" | string) => {
	const result = {
		TP: "",
		DT: "",
		IMEI: "",
		SN: "",
		PN: "",
	};

	if (type == "IMEI") {
		str
			.slice(1, -1)
			.split(",")
			.map(item => item.split(":"))
			.forEach(([key, val]) => (result[key] = val));
	}
	else {
		result.IMEI = str;
	}
	return result;
};
