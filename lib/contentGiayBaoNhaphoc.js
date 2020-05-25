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
const buildContent = (data) => {
  let date = new Date();
  return [
    {
      table: {
        widths: ["*"],
        body: [
          [
            {
              text: "BỘ GIÁO DỤC VÀ ĐÀO TẠO",
              alignment: "center",
              bold: true,
              margin: [0, 0, 0, 0],
              border: [false],
            },
          ],
          [
            {
              text: "TRƯỜNG ĐẠI HỌC LẠC HỒNG",
              alignment: "center",
              bold: true,
              border: [false],
            },
          ],
          [
            {
              text:
                "Số 10 Huỳnh Văn Nghệ, P. Bửu Long, Tp. Biên Hòa, Tỉnh Đồng Nai",
              alignment: "center",
              border: [false],
            },
          ],
          [
            {
              text:
                "Điện thoại tư vấn tuyển sinh: (0251) 73.000.73 - (0251) 3.952.188 - 0981.50.33.99",
              alignment: "center",
              border: [false, false, false, true],
            },
          ],
        ],
      },
    },
    {
      columns: [
        {
          text: `Số ${data.RowNumber || data.MaDangKy}/ĐH/2020`,
          italic: true,
          margin: [10, 0, 0, 0],
        },
        {
          text: `Đồng Nai, ngày ${("0" + date.getDate()).slice(-2)} tháng ${(
            "0" +
            (date.getMonth() + 1)
          ).slice(-2)} năm ${date.getFullYear()}`,
          alignment: "right",
          italic: true,
          margin: [0, 0, 10, 0],
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
      text: "CHỦ TỊCH HỘI ĐỒNG TUYỂN SINH TRƯỜNG ĐẠI HỌC LẠC HỒNG",
      bold: true,
      alignment: "center",
      margin: [0, 0, 0, 0],
    },
    {
      text: "Căn cứ kết quả xét tuyển học bạ THPT năm 2020, xin thông báo đến:",
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
        {
          text: ["- SBD: ", data.SoBD],
          width: "30%",
        },
      ],
    },
    {
      columns: [
        {
          text: ["- Đã trúng tuyển hệ: ", "Đại học chính quy"],
          width: "70%",
        },
        {
          text: ["- Hình thức: ", data.TenPhuongThuc || ""],
          width: "30%",
        },
      ],
    },
    {
      columns: [
        {
          text: ["- Ngành: ", data.TenNganh || ""],
          width: "70%",
        },
        {
          text: ["- Mã ngành: ", data.MaNganh || ""],
          width: "30%",
        },
      ],
    },
    {
      columns: [
        {
          text: ["- Điểm: ", data.TongDiem || ""],
          width: "70%",
        },
        {
          text: ["- Tổ hợp: ", data.MoTaMon || ""],
          width: "30%",
        },
      ],
    },
    {
      text: data.LoiMoi || "",
    },
    {
      text: "I. Hồ sơ nhập học",
      bold: true,
    },
    {
      margin: [15, 0, 0, 0],
      text: "1 - Hồ sơ trúng tuyển (mẫu trường đã điền sẵn thông tin).",
    },
    {
      margin: [15, 0, 0, 0],
      text:
        "2 - Giấy báo nhập học do Hội đồng tuyển sinh Nhà trường cấp (tờ giấy này).",
    },
    {
      margin: [15, 0, 0, 0],
      text:
        "3 - Bằng tốt nghiệp THPT hoặc Giấy chứng nhận tốt nghiệp tạm thời (bản sao có công chứng) và học bạ THPT (bản sao có công chứng). Nếu chưa có giấy chứng nhận tốt nghiệp tạm thời thì có thể bổ sung sau.",
    },
    {
      margin: [15, 0, 0, 0],
      text:
        "4 - Giấy khai sinh hoặc chứng minh nhân dân (bản sao có công chứng).",
    },
    {
      margin: [15, 0, 0, 0],
      text: "5 - Giấy khám sức khoẻ.",
    },
    {
      margin: [15, 0, 0, 0],
      text: data.DiemTHPT ? "6 - Giấy chứng nhận kết quả thi (Bản chính)." : "",
    },
    {
      text: "II. Học phí và lệ phí nhập học",
      bold: true,
    },
    {
      margin: [15, 0, 0, 0],
      layout: "noBorders",
      table: {
        widths: [60, 220, "*", 0],
        body: [
          [
            {
              text: `1 - Học phí:`,
            },
            {
              text: data.HocPhi ? data.HocPhi : "",
              alignment: "right",
              bold: true,
            },
            {
              text: data.HocPhi ? "đồng/1 học kỳ." : "",
              bold: true,
              colSpan: 2,
            },
            {
              text: "",
            },
          ],
        ],
      },
    },
    {
      margin: [15, 0, 0, 0],
      layout: "noBorders",
      table: {
        widths: [60, 220, "*", 0],
        body: [
          [
            {
              text: data.LoaiHB || "",
              colSpan: 4,
              alignment: "center",
            },
            {
              text: "",
            },
            {
              text: "",
            },
            {
              text: "",
            },
          ],
        ],
      },
    },
    // getHB(data),
    {
      margin: [15, 0, 0, 0],
      text:
        "(Một năm có 2 học kỳ. Nếu điều kiện gia đình khó khăn, thí sinh có thể chia làm nhiều lần đóng. Học phí không thay đổi trong suốt quá trình học).",
    },

    {
      margin: [15, 0, 0, 0],
      layout: "noBorders",

      table: {
        widths: [200, 80, 60, 100],
        body: [
          [
            {
              text: "2 - Lệ phí nhập học và thẻ sinh viên:",
            },
            {
              text: "250.000",
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
              text: "3 - Đồng phục giáo dục thể chất:",
            },
            {
              text: "220.000",
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
              text: "4 - Phí bảo hiểm y tế:",
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
              text: "5 - Phí bảo hiểm học sinh toàn diện:",
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
      margin: [22, 0, 0, 0],
      text: "Thí sinh nhập học sớm sẽ nhận được gói ưu đãi:",
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
    // {
    //   margin: [15, 0, 0, 0],
    //   text: '- Tặng vé xe nhập học / vé xe về tết.'
    // },
    // {
    //   margin: [30, 0, 0, 0],
    //   text:
    //     'Nếu điều kiện gia đình khó khăn, thí sinh có thể chia làm nhiều lần đóng. Học phí không thay đổi trong suốt quá trình học'
    // },
    // {
    //   text: 'III. Các ưu tiên và quyền lợi',
    //   bold: true
    // },
    // {
    //   text:
    //     'Sinh viên Trường Đại học Lạc Hồng được hưởng ưu tiên và quyền lợi như sau:'
    // },
    // {
    //   margin: [20, 0, 0, 0],
    //   text:
    //     '-  Sinh viên được nhận ngay một trong các học bổng sau: Học bổng thủ khoa đầu vào (100% học phí); Học bổng khoa học kỹ thuật (học sinh đạt giải nhất nhì cuộc thi KHKT học sinh THPT cấp tỉnh trở lên hoặc nhất nhì cuộc thi học sinh giỏi cấp tỉnh 100% học phí).'
    // },
    // {
    //   margin: [20, 0, 0, 0],
    //   text:
    //     '-  Ngoài ra, hàng năm Nhà trường có xét, cấp học bổng cho sinh viên khá, giỏi và những sinh viên có hoàn cảnh khó khăn vượt khó trong học tập.'
    // },
    // {
    //   margin: [20, 0, 0, 0],
    //   text:
    //     '-  Sinh viên được vay vốn của quỹ học bổng Mabuchi lãi suất không đồng, vay vốn hỗ trợ học tập theo quy định của Nhà nước. Được hưởng các chế độ chính sách của Nhà nước.'
    // },
    // {
    //   margin: [20, 0, 0, 0],
    //   text: '-  Nhà trường có ký túc xá 1.500 chỗ dành cho sinh viên ở xa.'
    // },
    // {
    //   margin: [20, 0, 0, 0],
    //   text:
    //     '-  Nhà trường ký cam kết đảm bảo việc làm cho sinh viên sau khi tốt nghiệp. Đồng thời, có thể tiếp tục học lên thạc sĩ, tiến sĩ hoặc được giới thiệu miễn phí đi du học ở nước ngoài.'
    // },
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
          text: "HIỆU TRƯỞNG",
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
          text: "ĐỖ HỮU TÀI",
          bold: true,
          alignment: "center",
        },
      ],
    },
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