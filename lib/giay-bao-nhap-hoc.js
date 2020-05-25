/*
 * ###############################################################################
 * # File: /lib/giay-bao-nhap-hoc.js
 * # Project: /Users/leopham/Desktop/NodeJs/node-pdfmake
 * # Created Date: Thursday May 21st 2020
 * # Author: Leo Pham (hongthaipro@gmail.com)
 * # -----
 * # Last Modified: Thursday, 21st May 2020 9:56:15 am
 * # -----
 * # Copyright (c) 2020, LeoSoft
 * ###############################################################################
 */

const contentGiayBaoNhaphoc = require("./contentGiayBaoNhaphoc");
const buildContent = (data) => {
  if (data) {
    return {
      defaultFileName: `Giấy báo nhập học_${data.HoTen}_${data.MaDangKy}.pdf`,
      pageSize: "A4",
      pageMargins: [30, 10, 30, 10],
      info: {
        title: `Giấy báo nhập học_${data.HoTen}_${data.MaDangKy}`,
        author: "LHU",
      },
      fontSize: 11,
      aligment: "justified",
      content: contentGiayBaoNhaphoc(data),
      defaultStyle: {
        font: "TimeNewRoman",
      },
    };
  } else {
    return {
      defaultFileName: `Giấy báo nhập học.pdf`,
      pageSize: "A4",
      pageMargins: [30, 10, 30, 10],
      info: {
        title: `Giấy báo nhập học`,
        author: "LHU",
      },
      fontSize: 11,
      aligment: "justified",
      content: [],
      defaultStyle: {
        font: "TimeNewRoman",
      },
    };
  }
};

module.exports = buildContent;
