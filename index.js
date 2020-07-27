const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");
const cors = require("cors");
const NodeCache = require("node-cache");
const myCache = new NodeCache();

const bodyParser = require("body-parser");
const pdfMakePrinter = require("pdfmake/src/printer");
const buildGiayBaoCoDieuKien = require("./lib/giay-bao-co-dieu-kien");
const buildBoHoSo = require("./lib/bo-ho-so");
const contentGiayBaoNhaphoc = require("./lib/contentGiayBaoNhaphoc");
const contentSoYeuLyLich = require("./lib/contentSoYeuLyLich");
const contentPhieuDangKy = require("./lib/contentPhieuDangKy");
const buildDiaChi = require("./lib/tem-dia-chi");
const PORT = 5004;
const SLACK_HOOK =
  "https://hooks.slack.com/services/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";

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
function postToSlack(url, type = "info", user = "", message) {
  const curDate = new Date();
  try {
    axios.post(SLACK_HOOK, {
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `You have a new request:\n*<${url}|${url}>*`,
          },
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Type:*\n${type}`,
            },
            {
              type: "mrkdwn",
              text: `*When:*\n${curDate}`,
            },
            {
              type: "mrkdwn",
              text: `*User:*\n${user}`,
            },
          ],
        },
        {
          type: "section",
          text: {
            type: "plain_text",
            text: message,
            emoji: true,
          },
        },
      ],
    });
  } catch (error) {
    throw error;
  }
}

function getDataPrint(begin, end, token, onSucess, onError) {
  const cachedValue = myCache.get(`data-print-${begin}-${end}`);
  if (cachedValue == undefined) {
    axios
      .get(
        `https://tapi.lhu.edu.vn/ts/Report_DangKyOnline_Chunk/${begin}/${end}`,
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then(
        ({ data }) => {
          const item = data.data;
          myCache.set(`data-print-${begin}-${end}`, item);
          onSucess(item);
        },
        (error) => {
          console.log(error);
          onError(error);
        }
      );
  } else {
    onSucess(cachedValue);
  }
}

function buildPdfDanhSachDiaChi(begin, end, token, onSucess, onError) {
  getDataPrint(
    begin,
    end,
    token,
    (data) => {
      const docDefinition = buildDiaChi(data);
      onSucess(docDefinition);
    },
    (error) => {
      onError(error);
    }
  );
}

app.get("/makepdf-list-dia-chi/:begin/:end", (req, res) => {
  const { begin, end } = req.params;
  const token = req.headers.authorization;
  if (!token) res.status(401).send("Token not found");
  try {
    buildPdfDanhSachDiaChi(
      begin,
      end,
      token,
      (pdfData) => {
        createPdfBinary(
          pdfData,
          (binary) => {
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader(
              "Content-Disposition",
              `attachment; filename="DiaChi_${begin}_${end}.pdf"`
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

function buildPdfGiayBaoNhapHoc(begin, end, token, onSucess, onError) {
  getDataPrint(
    begin,
    end,
    token,
    (data) => {
      const docDefinition = buildBoHoSo(null);
      let content = [];
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const gbnh = contentGiayBaoNhaphoc(element);

        content.push([...gbnh], {
          text: "",
          pageBreak: "before",
        });
      }

      docDefinition.content = content;
      onSucess(docDefinition);
    },
    (error) => {
      onError(error);
    }
  );
}

app.get("/makepdf-list-giay-bao-nhap-hoc/:begin/:end", (req, res) => {
  const { begin, end } = req.params;
  const token = req.headers.authorization;
  if (!token) res.status(401).send("Token not found");
  try {
    buildPdfGiayBaoNhapHoc(
      begin,
      end,
      token,
      (pdfData) => {
        createPdfBinary(
          pdfData,
          (binary) => {
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader(
              "Content-Disposition",
              `attachment; filename="GiayBaoNhapHoc_${begin}_${end}.pdf"`
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

function buildPdfBoHoSo(begin, end, token, onSucess, onError) {
  getDataPrint(
    begin,
    end,
    token,
    (data) => {
      const docDefinition = buildBoHoSo(null);
      let content = [];
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        // const gbnh = contentGiayBaoNhaphoc(element);
        const syll = contentSoYeuLyLich(element);
        const pdk = contentPhieuDangKy(element);
        content.push(
          [...pdk],
          {
            text: "",
            pageBreak: "before",
          },
          // [...gbnh],
          // {
          //   text: "",
          //   pageBreak: "before",
          // },
          [...syll],
          {
            text: "",
            pageBreak: "before",
          }
        );
      }

      docDefinition.content = content;
      onSucess(docDefinition);
    },
    (error) => {
      onError(error);
    }
  );
}

app.get("/makepdf-list-bo-ho-so/:begin/:end", (req, res) => {
  const { begin, end } = req.params;
  const token = req.headers.authorization;
  if (!token) res.status(401).send("Token not found");
  try {
    buildPdfBoHoSo(
      begin,
      end,
      token,
      (pdfData) => {
        createPdfBinary(
          pdfData,
          (binary) => {
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader(
              "Content-Disposition",
              `attachment; filename="BoHoSo_${begin}_${end}.pdf"`
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

function getDataPerson(id, onSucess, onError) {
  const cachedValue = myCache.get(`data-print-user-${id}`);
  if (cachedValue == undefined) {
    axios
      .post("https://tapi.lhu.edu.vn/ts/auth/obj/DangKyOnline_byId", {
        MaDangKy: id,
      })
      .then(
        ({ data }) => {
          myCache.set(`data-print-user-${id}`, data.data);
          onSucess(data.data);
        },
        (error) => {
          onError(error);
        }
      );
  } else {
    onSucess(cachedValue);
  }
}

function buildPdfCoDieuKien(id, onSucess, onError) {
  getDataPerson(
    id,
    (data) => {
      const pdfData = buildGiayBaoCoDieuKien(data);
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
    buildPdfCoDieuKien(
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

function buildPdfBoHoSoPerson(id, onSucess, onError) {
  getDataPerson(
    id,
    (data) => {
      const docDefinition = buildBoHoSo(null);
      let content = [];

      const gbnh = contentGiayBaoNhaphoc(data);
      const syll = contentSoYeuLyLich(data);
      const pdk = contentPhieuDangKy(data);
      content.push(
        [...pdk],
        {
          text: "",
          pageBreak: "before",
        },
        [...gbnh],
        {
          text: "",
          pageBreak: "before",
        },
        [...syll],
        {
          text: "",
          pageBreak: "before",
        }
      );

      docDefinition.content = content;
      onSucess(docDefinition);
    },
    (error) => {}
  );
}

app.get("/makepdf-bo-ho-so/:id", (req, res) => {
  const { id } = req.params;
  const MaDangKy = id;
  try {
    buildPdfBoHoSoPerson(
      MaDangKy,
      (pdfData) => {
        createPdfBinary(
          pdfData,
          (binary) => {
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader(
              "Content-Disposition",
              `attachment; filename="BoHoSo_${MaDangKy}.pdf"`
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
