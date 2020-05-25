/*
 * ###############################################################################
 * # File: /lib/contentSoYeuLyLich.js
 * # Project: /Users/leopham/Desktop/NodeJs/node-pdfmake
 * # Created Date: Thursday May 21st 2020
 * # Author: Leo Pham (hongthaipro@gmail.com)
 * # -----
 * # Last Modified: Thursday, 21st May 2020 9:55:26 am
 * # -----
 * # Copyright (c) 2020, LeoSoft
 * ###############################################################################
 */
const buildContent = (data) => {
  let date = new Date(data.CreatedAt);
  return [
    {
      table: {
        widths: ["*"],
        body: [
          [
            {
              border: [true, true, true, false],
              margin: [0, 30, 0, 10],
              columns: [
                {
                  alignment: "center",
                  text: ["BỘ GIÁO DỤC VÀ ĐÀO TẠO \n", "---------------------"],
                  bold: true,
                },
                {
                  alignment: "center",
                  text: [
                    "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM \n",
                    "Độc lập - Tự do - Hạnh phúc \n",
                    "-------------------------------------",
                  ],
                  bold: true,
                },
              ],
            },
          ],
          [
            {
              border: [true, false, true, false],
              margin: [0, 5, 0, 0],
              alignment: "left",
              qr: data.MaDangKy,
              fit: 45,
              width: 45,
            },
          ],
          [
            {
              border: [true, false, true, false],
              margin: [0, 1, 0, 0],
              alignment: "left",
              text: data.MaDangKy,
              width: 45,
            },
          ],
          [
            {
              border: [true, false, true, false],
              margin: [10, 40, 10, 10],
              text: "HỒ SƠ",
              fontSize: 37,
              bold: true,
              alignment: "center",
            },
          ],
          [
            {
              border: [true, false, true, false],
              margin: [10, 20, 10, 10],
              text: "TRÚNG TUYỂN",
              fontSize: 25,
              bold: true,
              alignment: "center",
            },
          ],
          [
            {
              border: [true, false, true, false],
              margin: [10, 20, 10, 10],
              text:
                "(Dùng cho thí sinh trúng tuyển vào Trường Đại học Lạc Hồng)",
              fontSize: 11,
              alignment: "center",
            },
          ],
          [
            {
              border: [true, false, true, false],
              margin: [30, 50, 20, 5],
              text: [
                {
                  text: "HỌ VÀ TÊN: ",
                  bold: true,
                },
                {
                  text: data.HoTen.toUpperCase(),
                  bold: true,
                },
              ],
              alignment: "justified",
            },
          ],
          [
            {
              border: [true, false, true, false],
              margin: [30, 5, 20, 5],
              text: ["Ngày, tháng, năm sinh: ", data.NgaySinh || ""],
              alignment: "justified",
            },
          ],
          [
            {
              border: [true, false, true, false],
              margin: [30, 5, 20, 5],
              text: [
                "Hộ khẩu thường trú: ",
                "................................................................................................",
              ],
              alignment: "justified",
            },
          ],
          [
            {
              border: [true, false, true, false],
              margin: [30, 5, 30, 5],
              text: ["Khi cần báo tin cho ai? ở đâu: ", data.DiaChi || ""],
              alignment: "justified",
            },
          ],
          [
            {
              border: [true, false, true, false],
              margin: [250, 100, 30, 5],
              text: ["Điện thoại liên hệ: ", data.DienThoai || ""],
              alignment: "left",
            },
          ],
          [
            {
              border: [true, false, true, true],
              margin: [300, 100, 10, 30],
              text: "",
              alignment: "left",
            },
          ],
        ],
      },
    },
    {
      text: "",
      pageBreak: "after",
    },
    {
      text: "CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM",
      alignment: "center",
      bold: true,
    },
    {
      text: "Độc lập - Tự do - Hạnh phúc",
      alignment: "center",
      bold: true,
    },
    {
      text: "----------------------------------",
      alignment: "center",
    },
    {
      columns: [
        {
          alignment: "center",
          qr: data.MaDangKy,
          fit: 45,
          width: 45,
        },
        {
          alignment: "center",
          width: "90%",
          margin: [0, 15, 0, 0],
          text: "SƠ YẾU LÝ LỊCH SINH VIÊN",
          fontSize: 16,
          bold: true,
        },
      ],
    },
    {
      columns: [
        {
          alignment: "center",
          text: data.MaDangKy,
          fontSize: 9,
          width: 45,
        },
        {
          alignment: "center",
          width: "90%",
          text: "",
        },
      ],
    },
    {
      margin: [0, 10, 0, 0],
      text: "I. PHẦN BẢN THÂN SINH VIÊN",
      alignment: "center",
      bold: true,
    },
    {
      margin: [0, 20, 0, 0],
      columns: [
        {
          text: ["- Họ và tên: ", data.HoTen || ""],
          width: "60%",
        },
        {
          text: ["- Giới tính: ", data.Nu ? "Nữ" : "Nam"],
          width: "40%",
        },
      ],
    },
    {
      margin: [0, 5, 0, 0],
      columns: [
        {
          text: ["- Ngày tháng và năm sinh: ", data.NgaySinh || ""],
          width: "60%",
        },
        {
          text: ["- Nơi sinh: ", data.TenNoiSinh || ""],
          width: "40%",
        },
      ],
    },
    {
      margin: [0, 5, 0, 0],
      columns: [
        {
          text: ["- Ngành học: ", data.TenNganh || ""],
          width: "70%",
        },
        {
          text: ["- Mã ngành: ", data.MaNganh || ""],
          width: "30%",
        },
      ],
    },
    {
      margin: [0, 5, 0, 0],
      text: [
        "- Điểm thi Xét Tuyển (Học bạ hoặc THPT): Tổng điểm: ",
        data.TongDiem || "",
      ],
      width: "70%",
    },
    {
      margin: [0, 5, 0, 0],
      text: "- Kết quả ở bậc THPT, THBT:",
      width: "70%",
    },
    {
      margin: [20, 5, 0, 0],
      columns: [
        {
          text: [
            "* Xếp loại tốt nghiệp: ",
            data.TenXepLoai || ".................",
          ],
        },
        {
          text: [
            "- Năm tốt nghiệp: ",
            data.NamTotNghiep || ".....................",
          ],
        },
      ],
    },
    {
      margin: [20, 5, 0, 0],
      text: [
        "* Xếp loại về hạnh kiểm: ",
        data.TenHanhKiem || ".................",
      ],
    },
    {
      margin: [20, 5, 0, 0],
      text: "Tóm tắt quá trình học tập, (ghi 3 năm học cấp 3).",
    },
    {
      margin: [0, 5, 0, 0],
      text: ["Tên trường THPT (lớp 10): ", data.TenTruongLop10 || ""],
    },
    {
      margin: [0, 5, 0, 0],
      text: ["Tên trường THPT (lớp 11): ", data.TenTruongLop11 || ""],
    },
    {
      margin: [0, 5, 0, 0],
      text: ["Tên trường THPT (lớp 12): ", data.TenTruongLop12 || ""],
    },
    {
      margin: [0, 10, 0, 0],
      text: "II. THÀNH PHẦN GIA ĐÌNH",
      alignment: "center",
      bold: true,
    },
    {
      margin: [0, 5, 0, 0],
      text: "1. Cha:",
      bold: true,
    },
    {
      margin: [0, 5, 0, 0],
      text: [
        "- Họ và tên: ",
        data.TenCha ||
          data.HoTenCha ||
          "...........................................................................................",
      ],
    },
    {
      margin: [0, 5, 0, 0],
      text: [
        "- Dân tộc: ",
        data.DanTocCha ||
          "...........................................................................................",
      ],
    },
    {
      margin: [0, 5, 0, 0],
      text: [
        "- Hộ khẩu thường trú: ",
        data.HoKhauThuongTruCha ||
          "...........................................................................................",
      ],
    },
    {
      margin: [0, 5, 0, 0],
      text: [
        "- Nghề nghiệp (làm gì, ở đâu): ",
        data.NgheNghiepCha ||
          "...........................................................................................",
      ],
    },
    {
      margin: [0, 5, 0, 0],
      text: "2. Mẹ:",
      bold: true,
    },
    {
      margin: [0, 5, 0, 0],
      text: [
        "- Họ và tên: ",
        data.HoTenMe ||
          "...........................................................................................",
      ],
    },
    {
      margin: [0, 5, 0, 0],
      text: [
        "- Dân tộc: ",
        data.DanTocMe ||
          "...........................................................................................",
      ],
    },
    {
      margin: [0, 5, 0, 0],
      text: [
        "- Hộ khẩu thường trú: ",
        data.HoKhauThuongTruMe ||
          "...........................................................................................",
      ],
    },
    {
      margin: [0, 5, 0, 0],
      text: [
        "- Nghề nghiệp (làm gì, ở đâu): ",
        data.NgheNghiepMe ||
          "...........................................................................................",
      ],
    },
    {
      margin: [15, 5, 0, 0],
      text:
        "Tôi xin cam đoan những lời khai trên là đúng sự thật. Nếu có gì sai tôi xin chịu trách nhiệm",
    },
    {
      margin: [0, 5, 0, 0],
      text: "xử lý theo Quy chế hiện hành của Bộ Giáo dục và Đào tạo.",
    },
    {
      margin: [0, 10, 0, 0],
      columns: [
        {
          text: "Cam đoan của gia đình",
          alignment: "center",
          width: "50%",
          bold: true,
        },
        {
          text: `Đồng Nai, ngày ${("0" + date.getDate()).slice(-2)} tháng ${(
            "0" +
            (date.getMonth() + 1)
          ).slice(-2)} năm ${date.getFullYear()} \n`,
          alignment: "center",
          width: "50%",
        },
      ],
    },
    {
      margin: [0, 5, 0, 0],
      columns: [
        {
          text: "về lời khai của sinh viên",
          alignment: "center",
          width: "50%",
          bold: true,
        },
        {
          text: "Sinh viên ký tên",
          bold: true,
          alignment: "center",
          width: "50%",
        },
      ],
    },
    {
      margin: [0, 50, 0, 0],
      columns: [
        {
          text: "",
          alignment: "center",
          width: "50%",
          bold: true,
        },
        {
          text: data.HoTen,
          bold: true,
          alignment: "center",
          width: "50%",
        },
      ],
    },
  ];
};

module.exports = buildContent;
