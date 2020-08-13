/*
 * ###############################################################################
 * # File: /lib/tem-dia-chi.js
 * # Project: /Users/leopham/Desktop/NodeJs/node-pdfmake
 * # Created Date: Thursday May 21st 2020
 * # Author: Leo Pham (hongthaipro@gmail.com)
 * # -----
 * # Last Modified: Thursday, 21st May 2020 10:06:49 am
 * # -----
 * # Copyright (c) 2020, LeoSoft
 * ###############################################################################
 */
const buildContent = (data) => {
  let dd = {};
  dd = {
    defaultFileName: `DanhSachDiaChi.pdf`,
    pageSize: "A4",
    pageOrientation: "landscape",
    pageMargins: [20, 40, 20, 40],
    info: {
      title: `Danh sách địa chỉ`,
      author: "LHU",
    },
    fontSize: 14,
    aligment: "justified",
    content: [
      {
        table: {
          heights: function (row) {
            if ((row + 1) % 2 === 0) return 15;
            else return 100;
          },
          widths: ["*", 15, "*"],
          body: contentDiaChi(data),
        },
      },
    ],
    defaultStyle: {
      font: "TimeNewRoman",
      columnGap: 20,
    },
  };
  return dd;
};

const contentDiaChi = (data) => {
  let body = [];
  let passData = [];
  let itemPerpage = 8;
  data.forEach((element, index) => {
    if (passData.length === 2) {
      let row = buildRowDiaChi(passData[0], passData[1]);
      body.push(row);

      if (index % itemPerpage === 0) {
        body.push([
          {
            text: "",
            colSpan: 3,
            border: [false, false, false, false],
            pageBreak: "after",
          },
        ]);
      } else {
        body.push([
          {
            text: "",
            colSpan: 3,
            border: [false, false, false, false],
          },
        ]);
      }
      passData = [];
      passData.push(element);
    } else if (passData.length === 1 && index + 1 === data.length) {
      let row = buildRowDiaChi(passData[0], element);
      body.push(row);

      if (index % itemPerpage === 0) {
        body.push([
          {
            text: "",
            colSpan: 3,
            border: [false, false, false, false],
            pageBreak: "after",
          },
        ]);
      } else {
        body.push([
          {
            text: "",
            colSpan: 3,
            border: [false, false, false, false],
          },
        ]);
      }
      passData = [];
    } else {
      passData.push(element);
    }
  });
  return body;
};

const buildRowDiaChi = (col1, col2) => {
  return [
    {
      margin: [5, 5, 5, 5],
      text: [
        {
          text: `GIẤY BÁO TRÚNG TUYỂN ĐẠI HỌC 2020  (${col1.RowNumber}-${col1.MaDangKy})`,
          bold: true,
        },
        {
          text: ["\nNgười nhận:  ", { text: col1.HoTen || "", bold: true }],
        },
        {
          text: ["\nĐịa chỉ:  ", col1.DiaChi.trim() || ""],
        },
        {
          text: ["\nĐiện thoại:  ", { text: col1.DienThoai || "", bold: true }],
        },
      ],
    },
    {
      border: [false, false, false, false],
      text: "",
    },
    {
      margin: [5, 5, 5, 5],
      text: [
        {
          text: `GIẤY BÁO TRÚNG TUYỂN ĐẠI HỌC 2020  (${col2.RowNumber}-${col2.MaDangKy})`,
          bold: true,
        },
        {
          text: ["\nNgười nhận:  ", { text: col2.HoTen || "", bold: true }],
        },
        {
          text: ["\nĐịa chỉ:  ", col2.DiaChi.trim() || ""],
        },
        {
          text: ["\nĐiện thoại:  ", { text: col2.DienThoai || "", bold: true }],
        },
      ],
    },
  ];
};

module.exports = buildContent;
