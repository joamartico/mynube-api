const express = require("express");
const cors = require("cors");
const axios = require("axios")

const app = express();

app.use(express.json());
app.use(cors());

app.get("/hola", (req, res) => {
    res.send('hola')
})

app.get("/api/getPhotoData/", async (req, res) => {
	console.log("/api/getPhotoData");
	const { photo } = req.query;
	const item = JSON.parse(photo);

	// const response = await fetch(
	// 	item.mimeType == "video/mp4"
	// 		? `${item.baseUrl}=dv`
	// 		: `${item.baseUrl}=d`,
	// 	{
	// 		method: "GET",
	// 	}
	// );

	// const arrayBuffer = await response.arrayBuffer();
	// const base64 = Buffer.from(arrayBuffer).toString("base64");

    const response = await axios({
		method: "get",
		url:
			item.mimeType == "video/mp4"
				? `${item.baseUrl}=dv`
				: `${item.baseUrl}=d`,
		responseType: "arraybuffer",
	});

	const base64 = Buffer.from(response.data, "binary").toString("base64");

	const fileDate = item.mediaMetadata.creationTime.split("T")[0];

	const newPhoto = {
		base64,
		filename: fileDate + "__" + item.filename,
	};

    // res.status(200).json(newPhoto);
    console.log('perfecto')
	res.send(newPhoto);
});

app.get("/api/getPhoto/", async (req, res) => {
	const photo = req.query.photo;
	const item = JSON.parse(photo);

	console.log({ item });

	const response = await axios({
		method: "get",
		url:
			item.mimeType == "video/mp4"
				? `${item.baseUrl}=dv`
				: `${item.baseUrl}=d`,
		responseType: "arraybuffer",
	});

	const base64 = Buffer.from(response.data, "binary").toString("base64");

	const fileDate = item.mediaMetadata.creationTime.split("T")[0];

	const newPhoto = {
		base64,
		filename: fileDate + "__" + item.filename,
	};

	res.status(200).json(newPhoto);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
