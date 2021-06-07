/*
 * ###############################################################################
 * # File: /lib/contentGiayBaoNhaphoc.js
 * # Project: /Users/leopham/Desktop/NodeJs/node-pdfmake
 * # Created Date: Thursday May 21st 2020
 * # Author: Leo Pham (hongthaipro@gmail.com)
 * # -----
 * # Last Modified: Thursday, 21st May 2020 8:48:21 am
 * # -----
 * # Copyright (c) 2020, LeoSoft
 * ###############################################################################
 */

const getNganhTable = (data) => {
  let dataTable = [];
  if (data && data.length > 0) {
    dataTable = data.map((x, idx) => {
      return [
        { text: idx + 1, alignment: "center" },
        x.NganhTrungTuyen,
        { text: x.TongDiem, alignment: "center" },
        { text: x.PhuongThuc, fontSize: 11 },
        { text: x.HocPhi, alignment: "center" },
        // { text: x.TienDot1, alignment: "center" },
        // { text: x.TienDot2, alignment: "center" },
      ];
    });
  }
  return dataTable;
};

const getHocPhiGiam = (data) => {
  if (!data) return ''
  return data.reduce((sum, cur) => {
    sum += cur['LoaiHB'] ? `${cur['LoaiHB']};` : ''
    return sum
  }, '')
}

const getHocPhiTable = (data) => {
  let dataTable = [];
  if (data && data.length > 0) {
    data.forEach((element) => {
      dataTable.push({
        margin: [15, 0, 0, 0],
        text: [
          `- Học phí ngành ${element.NganhTrungTuyen}: `,
          { text: `${element.HocPhi} đồng/1 học kỳ`, bold: true },
        ],
      });
      if (element.LoaiHB) {
        dataTable.push({
          margin: [15, 0, 0, 0],
          text: element.LoaiHB,
        });
      }
    });
  }
  return dataTable;
};

const buildContent = (data) => {
  let date = new Date();
  const jsonNguyenVong = JSON.parse(data.NguyenVongData)
  const nganhXetTuyen = getNganhTable(jsonNguyenVong);
  // const hocPhiNguyenVong = getHocPhiTable(JSON.parse(data.NguyenVongData));
  const hocPhiGiam = getHocPhiGiam(jsonNguyenVong)

  return [
    {
      table: {
        widths: ["*", "auto"],
        body: [
          // [
          //   {
          //     text: "BỘ GIÁO DỤC VÀ ĐÀO TẠO",
          //     alignment: "center",
          //     bold: true,
          //     margin: [0, 0, 0, 0],
          //     border: [false],
          //   },
          // ],
          // [
          //   {
          //     text: "TRƯỜNG ĐẠI HỌC LẠC HỒNG",
          //     alignment: "center",
          //     bold: true,
          //     border: [false],
          //   },
          // ],
          [
            {
              image: data.BlackLogo
                ? "./assets/logo_chunhat.jpg"
                : "./assets/logo_chunhat_mau.png",
              width: 180,
              height: 50,
              rowSpan: 2,
              alignment: "left",
              border: [false, false, false, true],
              margin: [0, 0, 0, 5],
            },
            {
              text:
                "Số 10 Huỳnh Văn Nghệ, P. Bửu Long, Tp. Biên Hòa, Tỉnh Đồng Nai",
              alignment: "center",
              border: [false],
              margin: [0, 10, 0, 0],
            },
          ],
          [
            {},
            {
              text: "Điện thoại tư vấn: (0251) 73.000.73 - 0981.50.33.99",
              alignment: "center",
              border: [false, false, false, true],
              margin: [0, 0, 0, 5],
            },
          ],
        ],
      },
    },
    {
      columns: [
        {
          text: `Số ${data.RowNumber || data.MaDangKy}/ĐH/2021`,
          italics: true,
          fontSize: 10,
          margin: [10, 5, 0, 5],
        },
        {
          text: `Đồng Nai, ngày ${("0" + date.getDate()).slice(-2)} tháng ${(
            "0" +
            (date.getMonth() + 1)
          ).slice(-2)} năm ${date.getFullYear()}`,
          alignment: "right",
          italics: true,
          margin: [0, 5, 10, 5],
        },
      ],
    },
    {
      columns: [
        {
          alignment: "center",
          qr: data.MaDangKy,
          fit: 45,
          width: 45,
          margin: [0, 0, 0, 0],
        },
        {
          text: ["GIẤY BÁO NHẬP HỌC", "\nNĂM HỌC 2020 - 2021", "\n***"],
          alignment: "center",
          bold: true,
          margin: [0, 0, 0, 0],
          width: "*",
        },
      ],
    },
    {
      columns: [
        {
          text: data.MaDangKy,
          fit: 45,
          width: 45,
          fontSize: 10,
        },
        {
          text: "CHỦ TỊCH HỘI ĐỒNG TUYỂN SINH TRƯỜNG ĐẠI HỌC LẠC HỒNG",
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 0],
          width: "*",
        },
      ],
    },
    {
      text: "Căn cứ kết quả xét tuyển học bạ THPT năm 2021, xin thông báo đến:",
      margin: [0, 5, 0, 5],
    },
    {
      columns: [
        {
          text: [
            "- Anh (chị): ",
            { text: data.HoTen.toUpperCase() || "", bold: true },
          ],
          width: "70%",
        },
        {
          text: ["- Điện thoại: ", data.DienThoai || ""],
          width: "30%",
        },
      ],
    },
    {
      columns: [
        {
          text: ["- Sinh ngày: ", data.NgaySinh || ""],
          width: "70%",
        },
        // {
        //   text: ["- SBD: ", data.SoBD],
        //   width: "30%",
        // },
      ],
    },
    {
      columns: [
        {
          text: ["- Đã trúng tuyển hệ: ", "Đại học chính quy"],
          width: "70%",
          margin: [0, 0, 0, 5],
        },
        // {
        //   text: ["- Hình thức: ", data.TenPhuongThuc || ""],
        //   width: "30%",
        // },
      ],
    },
    // {
    //   columns: [
    //     {
    //       text: ["- Ngành: ", data.TenNganh || ""],
    //       width: "70%",
    //     },
    //     {
    //       text: ["- Mã ngành: ", data.MaNganh || ""],
    //       width: "30%",
    //     },
    //   ],
    // },
    // {
    //   columns: [
    //     {
    //       text: ["- Điểm: ", data.TongDiem || ""],
    //       width: "70%",
    //     },
    //     {
    //       text: ["- Tổ hợp: ", data.MoTaMon || ""],
    //       width: "30%",
    //     },
    //   ],
    // },

    {
      table: {
        widths: [23, "*", 40, 100, 100],
        body: [
          [
            {
              margin: [0, 10, 0, 0],
              text: "STT",
              // rowSpan: 2,
              bold: true,
              alignment: "center",
            },
            {
              margin: [0, 10, 0, 0],
              text: "Ngành trúng tuyển",
              // rowSpan: 2,
              bold: true,
              alignment: "center",
            },
            {
              margin: [0, 5, 0, 0],
              text: "Tổng điểm",
              // rowSpan: 2,
              bold: true,
              alignment: "center",
            },
            {
              margin: [0, 5, 0, 0],
              text: "Phương thức \n xét tuyển",
              // rowSpan: 2,
              bold: true,
              alignment: "center",
            },
            {
              text: "Học phí học kỳ 1 \n (đồng/học kỳ)",
              alignment: "center",
              bold: true,
              // colSpan: 2,
            },
            // {},
          ],
          // [
          //   {},
          //   {},
          //   {},
          //   {},
          //   { text: "Lần 1", alignment: "center", bold: true },
          //   { text: "Lần 2", alignment: "center", bold: true },
          // ],
          ...nganhXetTuyen,
        ],
      },
    },
    {
      text: nganhXetTuyen.length >= 2 ? data.LoiTrungTuyen : "",
    },
    {
      margin: [0, 3, 0, 3],
      text: data.LoiMoi || "",
    },
    {
      text: "I. Hồ sơ nhập học",
      bold: true,
    },
    {
      margin: [15, 0, 0, 0],
      text: "1 - Sơ yếu lý lịch sinh viên.",
    },
    {
      margin: [15, 0, 0, 0],
      text: "2 - Giấy báo nhập học do Hội đồng tuyển sinh Nhà trường cấp.",
    },
    {
      margin: [15, 0, 0, 0],
      text:
        "3 - Giấy chứng nhận tốt nghiệp tạm thời hoặc Bằng tốt nghiệp THPT (bản sao có công chứng). Nếu chưa có giấy chứng nhận tốt nghiệp tạm thời thì có thể bổ sung sau.",
    },
    {
      margin: [15, 0, 0, 0],
      text: "4 - Học bạ THPT (bản sao có công chứng)",
    },
    {
      margin: [15, 0, 0, 0],
      text:
        "5 - Giấy khai sinh hoặc chứng minh nhân dân (bản sao có công chứng).",
    },
    // {
    //   margin: [15, 0, 0, 0],
    //   text: "4 - Giấy khám sức khoẻ.",
    // },
    // {
    //   margin: [15, 0, 0, 0],
    //   text: data.DiemTHPT ? "4 - Giấy chứng nhận kết quả thi (Bản chính)." : "",
    // },
    {
      text: "II. Lệ phí nhập học",
      bold: true,
    },

    {
      margin: [15, 0, 0, 0],
      layout: "noBorders",

      table: {
        widths: [200, 80, 60, 100],
        body: [
          [
            {
              text: "1 - Lệ phí nhập học và thẻ sinh viên:",
            },
            {
              text: "300.000",
              alignment: "right",
              bold: true,
            },
            {
              text: "đồng.",
              bold: true,
            },
            {
              image: "./assets/lephi1.jpg",
              width: 100,
              height: 35,
              rowSpan: 2,
              alignment: "left",
            },
          ],
          [
            {
              text: "2 - Đồng phục giáo dục thể chất:",
            },
            {
              text: "325.000",
              alignment: "right",
              bold: true,
            },
            {
              text: "đồng.",
              bold: true,
            },
          ],
        ],
      },
    },
    {
      margin: [15, 0, 0, 0],
      layout: "noBorders",

      table: {
        widths: [200, 80, 60, 100],
        body: [
          [
            {
              text: "3 - Phí bảo hiểm y tế:",
            },
            {
              text: "564.000",
              alignment: "right",
              bold: true,
            },
            {
              text: "đồng/năm.",
              bold: true,
            },
            {
              image: "./assets/lephi2.jpg",
              width: 160,
              height: 35,
              rowSpan: 2,
              alignment: "left",
            },
          ],
          [
            {
              text: "4 - Phí bảo hiểm học sinh toàn diện:",
            },
            {
              text: "100.000",
              alignment: "right",
              bold: true,
            },
            {
              text: "đồng/năm.",
              bold: true,
            },
          ],
        ],
      },
    },
    {
      margin: [15, 0, 0, 0],
      layout: "noBorders",
      table: {
        widths: [50, "*"],
        body: [
          [
            {
              text: "Cam kết",
              bold: true,
            },
            {
              text: "- Đảm bảo việc làm sau khi tốt nghiệp, không tăng học phí trong suốt quá trình học;",
              italics: true,
            },
          ],
          [
            {
              margin: [57, 0, 0, 0],
              colSpan: 2,
              text: "- Học phí mỗi học kỳ có thể chia thành 2 lần đóng.",
              italics: true,
            },
          ],
        ],
      },
    },
    {
      margin: [22, 0, 0, 0],
      text: data.UuDai1 ? "Thí sinh nhập học sớm sẽ nhận được gói ưu đãi:" : "",
    },
    {
      margin: [15, 0, 0, 0],
      text: data.UuDai1 || "",
    },
    {
      margin: [15, 0, 0, 0],
      text: data.UuDai2 || "",
    },
    {
      margin: [15, 0, 0, 0],
      text: data.UuDai3 || "",
    },
    {
      margin: [15, 0, 0, 0],
      text: data.UuDai4 || "",
    },
    {
      margin: [15, 0, 0, 0],
      text: data.UuDai5 || "",
    },

    {
      margin: [0, 0, 0, 0],
      columns: [
        {
          text: "",
          width: "60%",
        },
        {
          text: "CHỦ TỊCH HỘI ĐỒNG TUYỂN SINH",
          bold: true,
          alignment: "center",
        },
      ],
    },
    {
      margin: [0, 10, 0, 0],
      columns: [
        {
          text: "",
          width: "60%",
        },
        {
          image: "./assets/chuky_thaytai.png",
          alignment: "center",
          fit: [190, 60],
        },
      ],
    },
    {
      columns: [
        {
          text: "",
          width: "60%",
        },
        {
          text: "Q. HIỆU TRƯỞNG",
          bold: true,
          alignment: "center",
        },
      ],
    },
    {
      columns: [
        {
          text: "",
          width: "60%",
        },
        {
          text: "Lâm Thành Hiển",
          bold: true,
          alignment: "center",
        },
      ],
    },
    {
      margin: [-5, 0, 0, 0],
      stack: [
        { text: "Ghi chú: ", bold: true, italics: true },
        hocPhiGiam ? {
          margin: [20, 0, 15, 0],
          text: hocPhiGiam,
        } : '',
        // {
        //   margin: [20, 0, 15, 0],
        //   text:
        //     "- Học phí ngành Dược 19,5tr/ học kỳ, Ngành Tài chính ngân hàng, kĩ thuật công trình, công nghệ thực phẩm 13,5tr/ học kỳ, các ngành còn lại 14tr/ học kỳ.",
        // },
        {
          margin: [20, 0, 15, 0],
          text:
            "- Bạn được áp dụng giảm thêm học phí nếu thuộc nhóm đối tượng hưởng chính sách học bổng Đại học Lạc Hồng dành cho bạn.",
        },
      ],

    }
  ];
};

const getHB = (data) => {
  if (data.LoaiHB === "") {
    return {
      margin: [15, 0, 0, 0],
      layout: "noBorders",
      table: {
        widths: ["*", 80, 80],
        body: [
          // [
          //   {
          //     text: `- Nếu nhập học trước ngày 31/07/2019 thí sinh được giảm 20% học phí:`,
          //     bold: true
          //   },
          //   {
          //     text: data.NganhID === 1 ? '13.600.000' : '9.600.000',
          //     alignment: 'right',
          //     bold: true
          //   },
          //   {
          //     text: 'đồng/1 học kỳ'
          //   }
          // ],
          // [
          //   {
          //     text: `- Nếu nhập học từ 01/08 đến 17/08/2019 thí sinh được giảm 15% học phí:`
          //   },
          //   {
          //     text: data.NganhID === 1 ? '14.450.000' : '10.200.000',
          //     alignment: 'right',
          //     bold: true
          //   },
          //   {
          //     text: 'đồng/1 học kỳ'
          //   }
          // ],
          // [
          //   {
          //     text: `- Nếu nhập học từ 01/08 đến 17/08/2019 thí sinh được giảm 10% học phí:`
          //   },
          //   {
          //     text: data.NganhID === 1 ? '15.300.000' : '10.800.000',
          //     alignment: 'right',
          //     bold: true
          //   },
          //   {
          //     text: 'đồng/1 học kỳ'
          //   }
          // ],
          // [
          //   {
          //     text: `- Nếu nhập học sau ngày 17/08/2019 thí sinh phải đóng 100% học phí:`
          //   },
          //   {
          //     text: data.NganhID === 1 ? '17.000.000' : '12.000.000',
          //     alignment: 'right',
          //     bold: true
          //   },
          //   {
          //     text: 'đồng/1 học kỳ'
          //   }
          // ]
        ],
      },
    };
  } else {
    return {
      text: "",
    };
  }
};

module.exports = buildContent;
