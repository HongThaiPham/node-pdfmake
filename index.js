const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");
const cors = require("cors");

const bodyParser = require("body-parser");
const pdfMakePrinter = require("pdfmake/src/printer");

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

app.use(cors(corsOptions));
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
  var d = new Date();
  axios
    .post("https://tapi.lhu.edu.vn/ts/auth/obj/DangKyOnline_byId", {
      MaDangKy: id,
    })
    .then(
      ({ data }) => {
        // console.log(data);
        pdfData = {
          pageSize: "A4",
          pageOrientation: "portrait",
          pageMargins: [50, 25, 50, 25],
          defaultStyle: {
            font: "TimeNewRoman",
          },
          content: [
            {
              image: "./assets/logomoito.png",
              width: 150,
              height: 50,
              alignment: "center",
              margin: [0, 10, 0, 10],
            },
            {
              text:
                "Số 10 Huỳnh Văn Nghệ, P. Bửu Long, Tp. Biên Hòa, Tỉnh Đồng Nai",
              style: "header",
            },
            {
              text:
                "Điện thoại tư vấn tuyển sinh: (0251) 73.000.73 - (0251) 3.952.188 - 0981.50.33.99",
              style: "header",
            },
            {
              text: `Đồng Nai, ngày ${d.getDate()} tháng ${
                d.getMonth() + 1
              } năm ${d.getFullYear()}`,
              style: "time",
            },
            {
              text: "GIẤY BÁO TRÚNG TUYỂN CÓ ĐIỀU KIỆN",
              style: "heading",
            },
            {
              text: "NĂM HỌC 2020 - 2021",
              style: "heading",
            },
            {
              text: "***",
              style: "heading",
            },
            {
              text: "CHỦ TỊCH HỘI ĐỒNG TUYỂN SINH TRƯỜNG ĐẠI HỌC LẠC HỒNG",
              style: "content1",
              bold: true,
            },
            {
              text:
                "Xin chúc mừng Bạn gia nhập thế hệ Sinh viên khóa 2020 trường Đại học Lạc Hồng",
              style: "content1",
              margin: [0, 5, 0, 15],
            },
            {
              text:
                "\u200B\tĐại học Lạc Hồng xin gửi lời cảm ơn chân thành đến bạn vì sự tin tưởng và lựa chọn Đại học Lạc Hồng là điểm đến học tập trong tương lai.",
              style: "content2",
            },
            {
              text:
                "\u200B\tTrong khi chờ tốt nghiệp THPT để có thể nhập học tại Đại học Lạc Hồng.",
              style: "content2",
            },
            {
              columns: [
                {
                  width: 350,
                  text: `- Anh (chị): ${data.data.HoTen}`,
                  style: "content3",
                },
                {
                  width: "auto",
                  text: `- Sinh ngày: ${data.data.NgaySinh}`,
                  style: "content3",
                },
              ],
            },
            {
              text: "- Đã trúng tuyển hệ: Đại học chính quy.",
              style: "content3",
            },
            {
              columns: [
                {
                  width: 350,
                  text: `- Ngành: ${data.data.TenNganh}`,
                  style: "content3",
                },
                {
                  width: "auto",
                  text: `- Mã ngành: ${data.data.MaNganhMoi}`,
                  style: "content3",
                },
              ],
            },

            {
              text: [
                "\u200B\tCùng tham gia cộng đồng Sinh viên Đại học Lạc Hồng tại ",
                {
                  text: "https://www.facebook.com/groups/lhu1997/",
                  link: "https://www.facebook.com/groups/lhu1997/",
                  color: "#0000ff",
                },
                " để nhận các giá trị gồm:",
              ],
              style: "content2",
            },
            {
              text: "1. Minigame tích điểm đổi card điện thoại; ",
              style: "listitem",
            },
            {
              text: "2. Nhận tài liệu ôn luyện thi trực tuyến;",
              style: "listitem",
            },
            {
              text: "3. Tham gia ôn luyện thi trực tuyến;",
              style: "listitem",
            },
            {
              text:
                "4. Tham gia quay số may mắn và nhận các giải thưởng lớn giá trị.",
              style: "listitem",
            },
            {
              text: [
                "\u200B\tĐồng thời, với mỗi hoạt động chia sẻ thông tin tuyển sinh, giới thiệu Bạn cùng Lớp cùng đăng ký xét tuyển và nhập học vào Đại học Lạc Hồng Bạn sẽ nhận được ưu đãi cộng dồn 10% học phí. Giờ thì nhấn vào đường Link: ",
                {
                  text: "https://lhu.fun/170CF9",
                  link: "https://lhu.fun/170CF9",
                  color: "#0000ff",
                },
                " để đăng ký tham gia chương ",
                {
                  text: "“Học bổng đồng hành”",
                  bold: true,
                },
                " nhé.",
              ],
              style: "content2",
            },
            {
              text: [
                "\u200B\tTrong suốt quá trình đến khi nhập học nếu có vấn đề hỗ trợ Em vui lòng liên hệ số tổng đài chăm sóc ",
                {
                  text: "(0251)73.000.73 hoặc 0981.50.33.99",
                  bold: true,
                },
              ],
              style: "content2",
            },
            {
              columns: [
                {
                  text: "",
                  width: 180,
                },
                {
                  text: "CHỦ TỊCH HỘI ĐỒNG TUYỂN SINH",
                  style: "signature",
                  width: 300,
                },
              ],
            },
            {
              text: "",
              margin: [0, 5],
            },
            {
              columns: [
                {
                  text: "",
                  width: 180,
                },
                {
                  text: "HIỆU TRƯỞNG",
                  style: "signature",
                  width: 300,
                },
              ],
            },
            {
              columns: [
                {
                  text: "",
                  width: 180,
                },
                {
                  text: "ĐỖ HỮU TÀI",
                  style: "signature",
                  width: 300,
                },
              ],
            },
          ],

          styles: {
            header: {
              alignment: "center",
              margin: [0, 2, 0, 2],
              fontSize: 12,
            },
            time: {
              alignment: "right",
              italics: true,
              fontSize: 12,
              margin: [0, 5, 0, 20],
            },
            heading: {
              bold: true,
              alignment: "center",
              fontSize: 14,
              margin: [0, 2, 0, 2],
            },
            content1: {
              fontSize: 13,
              alignment: "center",
            },
            content2: {
              fontSize: 13,
              alignment: "justify",
              lineHeight: 1.3,
              margin: [0, 5, 0, 5],
            },
            content3: {
              margin: [5, 2, 0, 5],
              bold: true,
              fontSize: 13,
            },
            listitem: {
              margin: [20, 2, 0, 2],
              fontSize: 13,
            },
            signature: {
              bold: true,
              fontSize: 15,
              alignment: "center",
            },
          },
        };
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
