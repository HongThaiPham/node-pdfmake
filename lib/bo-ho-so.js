/*
 * ###############################################################################
 * # File: /lib/bo-ho-so.js
 * # Project: /Users/leopham/Desktop/NodeJs/node-pdfmake
 * # Created Date: Wednesday May 13th 2020
 * # Author: Leo Pham (hongthaipro@gmail.com)
 * # -----
 * # Last Modified: Wednesday, 13th May 2020 2:59:38 pm
 * # -----
 * # Copyright (c) 2020, LeoSoft
 * ###############################################################################
 */
const buildContent = (data) => {
  if (data) {
    return {
      defaultFileName: `BoHoSo_${data.HoTen}_${data.MaDangKy}.pdf`,
      pageSize: "A4",
      pageMargins: [30, 30, 30, 50],
      info: {
        title: `BoHoSo_${data.HoTen}_${data.MaDangKy}`,
        author: "LHU",
      },
      fontSize: 11,
      aligment: "justified",

      content: [
        // ...contentPhieuDangKy(data),
        // {
        //   text: "",
        //   pageBreak: "before",
        // },
        ...contentGiayBaoNhaphoc(data),
        {
          text: "",
          pageBreak: "before",
        },
        ...contentSoYeuLyLich(data),
      ],
      defaultStyle: {
        font: "TimeNewRoman",
      },
    };
  } else {
    return {
      defaultFileName: `BoHoSo.pdf`,
      pageSize: "A4",
      pageMargins: [30, 30, 30, 50],
      info: {
        title: `BoHoSo`,
        author: "LHU",
      },
      fontSize: 11,
      aligment: "justified",
      content: [],
      footer: {},
      defaultStyle: {
        font: "TimeNewRoman",
      },
    };
  }
};

module.exports = buildContent;
