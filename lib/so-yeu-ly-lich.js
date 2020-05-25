/*
 * ###############################################################################
 * # File: /lib/so-yeu-ly-loch.js
 * # Project: /Users/leopham/Desktop/NodeJs/node-pdfmake
 * # Created Date: Thursday May 21st 2020
 * # Author: Leo Pham (hongthaipro@gmail.com)
 * # -----
 * # Last Modified: Thursday, 21st May 2020 10:04:04 am
 * # -----
 * # Copyright (c) 2020, LeoSoft
 * ###############################################################################
 */
const contentSoYeuLyLich = require("./contentSoYeuLyLich");
const buildContent = (data) => {
  let dd = {};

  if (data) {
    dd = {
      pageSize: "A4",
      pageMargins: [60, 40, 20, 50],
      info: {
        title: "Bìa hồ sơ trúng tuyển",
        author: "LHU",
      },
      fontSize: 13,
      content: contentSoYeuLyLich(data),
      defaultStyle: {
        font: "TimeNewRoman",
      },
    };
  } else {
    dd = {
      pageSize: "A4",
      pageMargins: [60, 40, 20, 50],
      info: {
        title: "Bìa hồ sơ trúng tuyển",
        author: "LHU",
      },
      fontSize: 13,
      content: [],
      defaultStyle: {
        font: "TimeNewRoman",
      },
    };
  }
  return dd;
};

module.exports = buildContent;
