const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");
const cors = require("cors");

const bodyParser = require("body-parser");
const pdfMakePrinter = require("pdfmake/src/printer");
const buldGiayBaoCoDieuKien = require("./lib/giay-bao-co-dieu-kien");
const PORT = 5004;

const whitelist = ["https://am.lhu.edu.vn"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS").message);
    }
  },
};

// app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

function createPdfBinary(pdfDoc, callback) {
  var fontDescriptors = {
    Roboto: {
      normal: path.join(__dirname, "/fonts/Roboto/Roboto-Regular.ttf"),
      bold: path.join(__dirname, "/fonts/Roboto/Roboto-Medium.ttf"),
      italics: path.join(__dirname, "/fonts/Roboto/Roboto-Italic.ttf"),
      bolditalics: path.join(
        __dirname,
        "/fonts/Roboto/Roboto-MediumItalic.ttf"
      ),
    },
    TimeNewRoman: {
      normal: path.join(
        __dirname,
        "/fonts/Time-New-Roman/Time-New-Roman-Regular.ttf"
      ),
      bold: path.join(
        __dirname,
        "/fonts/Time-New-Roman/Time-New-Roman-Bold.ttf"
      ),
      italics: path.join(
        __dirname,
        "/fonts/Time-New-Roman/Time-New-Roman-Italic.ttf"
      ),
      bolditalics: path.join(
        __dirname,
        "/fonts/Time-New-Roman/Time-New-Roman-Bold-Italic.ttf"
      ),
    },
  };

  var printer = new pdfMakePrinter(fontDescriptors);

  var doc = printer.createPdfKitDocument(pdfDoc);

  var chunks = [];
  var result;

  doc.on("data", function (chunk) {
    chunks.push(chunk);
  });
  doc.on("end", function () {
    result = Buffer.concat(chunks);
    // callback("data:application/pdf;base64," + result.toString("base64"));
    callback(Buffer.from(result, "base64"));
  });
  doc.end();
}

function buildPdfData(id, onSucess, onError) {
  let pdfData = {};

  axios
    .post("https://tapi.lhu.edu.vn/ts/auth/obj/DangKyOnline_byId", {
      MaDangKy: id,
    })
    .then(
      ({ data }) => {
        // console.log(data);
        pdfData = buldGiayBaoCoDieuKien(data.data);
        onSucess(pdfData);
      },
      (error) => {
        onError(error);
      }
    );
}

app.get("/makepdf-codieukien/:id", (req, res) => {
  const { id } = req.params;
  const MaDangKy = id;
  try {
    buildPdfData(
      MaDangKy,
      (pdfData) => {
        createPdfBinary(
          pdfData,
          (binary) => {
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader(
              "Content-Disposition",
              `attachment; filename="${MaDangKy}.pdf"`
            );

            res.end(binary);
          },
          (error) => {
            res.send("ERROR:" + error.message);
          }
        );
      },
      (error) => {
        res.send("ERROR:" + error.message);
      }
    );
  } catch (error) {
    res.send("ERROR:" + error.message);
    console.error(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
