const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const { rateLimit } = require("express-rate-limit");
const dotenv = require("dotenv");
const bwipjs = require("bwip-js");


const user = require("./src/routes/userRoutes");

dotenv.config();

const app = express();

const limter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Miniutes
  limit: 30, // Limit each IP to 100 request per
  standardHeaders: "draft-7", // // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  //store: ... , // Redis, Memcached, etc. See below.
});

app.use(limter);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  // Barcode content
  const content = `{
    ID: 1691723,
    ID_pnr: 1363223,
    ID_pax_profiles: null,
    name_first: "Arha",
    name_first_soundex: "A600000000",
    name_middle: "",
    name_middle_soundex: "",
    name_last: "Amir",
    name_last_soundex: "A560000000",
    gender: "F",
    birthday: "2024-03-30",
    pax_weight: null,
    passport: null,
    nationality: "AQ",
    guest_type: 0,
    frequent_flier: "",
    passport_expiry: null,
    passport_issued_by: null,
    residency: "AQ",
    visa_number: "",
    redress_number: "",
    travel_doc: null,
    travel_doc_type: null,
    travel_doc_expiry: "0000-00-00",
    travel_doc_issued_by: "AQ",
    CF1: null,
    CF2: null,
    CF3: null,
    CF4: null,
    CF5: null,
    bags: null,
    PNR_Infants: null,
  }`;

  // Options for barcode generation
  const options = {
    bcid: "pdf417", // Barcode type
    text: content, // Text to encode
    scale: 3, // Scaling factor
    height: 10, // Height of the barcode (in mm)
    includetext: true, // Include text beneath the barcode
    textxalign: "center", // Text alignment
  };

  // Generate the barcode as a base64-encoded PNG

  bwipjs.toBuffer(options, function (err, pngBuffer) {
    if (err) {
      console.error(err);
    } else {
      // pngBuffer now contains the PNG data
      // You can save it to a file or send it directly to the client
      // For example, if you're using Express.js:
      // res.writeHead(200, { 'Content-Type': 'image/png' });
      // // res.end(pngBuffer);
      // const base64String = Buffer.from(pngBuffer).toString('base64');
      // const base64String = pngBuffer.toString('base64');
      // console.log('Base64 encoded barcode:', base64String);
      // console.log('--------------------------------------------------');
      // res.end(`data:image/png;base64,${base64String}`);
      const base64String = `data:image/png;base64,${pngBuffer.toString(
        "base64"
      )}`;
      res.send(base64String);
    }
  });
  // res.status(200).send("User Health OK");
});


app.get("/pdf417", (req, res) => {
  // Barcode content
  const content = `{
    ID: 1691723,
    ID_pnr: 1363223,
    ID_pax_profiles: null,
    name_first: "Arha",
    name_first_soundex: "A600000000",
    name_middle: "",
    name_middle_soundex: "",
    name_last: "Amir",
    name_last_soundex: "A560000000",
    gender: "F",
    birthday: "2024-03-30",
    pax_weight: null,
    passport: null,
    nationality: "AQ",
    guest_type: 0,
    frequent_flier: "",
    passport_expiry: null,
    passport_issued_by: null,
    residency: "AQ",
    visa_number: "",
    redress_number: "",
    travel_doc: null,
    travel_doc_type: null,
    travel_doc_expiry: "0000-00-00",
    travel_doc_issued_by: "AQ",
    CF1: null,
    CF2: null,
    CF3: null,
    CF4: null,
    CF5: null,
    bags: null,
    PNR_Infants: null,
  }`;

  const str =  generateBarcode(code, 10, 3)
  res.send(str);

});

app.use("/api/auth", user);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`User Service is running on the PORT ${PORT}`);
});
