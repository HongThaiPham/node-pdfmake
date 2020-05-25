/*
 * ###############################################################################
 * # File: /lib/phieu-dang-ky-hoc-ba.js
 * # Project: /Users/leopham/Desktop/NodeJs/node-pdfmake
 * # Created Date: Thursday May 21st 2020
 * # Author: Leo Pham (hongthaipro@gmail.com)
 * # -----
 * # Last Modified: Thursday, 21st May 2020 9:58:50 am
 * # -----
 * # Copyright (c) 2020, LeoSoft
 * ###############################################################################
 */
const contentPhieuDangKy = require("./contentPhieuDangKy");

const buildContent = (data) => {
  const MonHoc =
    data.MoTaMon.split(",").length > 2 ? data.MoTaMon.split(",") : ["", "", ""];

  if (data) {
    return {
      defaultFileName: `Phiếu đăng ký_${data.HoTen}_${data.MaDangKy}.pdf`,
      pageSize: "A4",
      pageMargins: [20, 20, 20, 20],
      info: {
        title: `Phiếu đăng ký_${data.HoTen}_${data.MaDangKy}`,
        author: "LHU",
      },
      fontSize: 13,
      content: contentPhieuDangKy(data, MonHoc),
      styles: {
        header: {
          fontSize: 13,
          bold: true,
          alignment: "center",
        },
      },
      defaultStyle: {
        font: "TimeNewRoman",
      },
    };
  } else {
    return {
      defaultFileName: `Phiếu đăng ký.pdf`,
      pageSize: "A4",
      pageMargins: [30, 30, 30, 20],
      info: {
        title: `Phiếu đăng ký`,
        author: "LHU",
      },
      fontSize: 13,
      content: [],
      styles: {
        header: {
          fontSize: 13,
          bold: true,
          alignment: "center",
        },
      },
      defaultStyle: {
        font: "TimeNewRoman",
      },
    };
  }
};

module.exports = buildContent;
