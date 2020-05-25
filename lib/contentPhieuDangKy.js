/*
 * ###############################################################################
 * # File: /lib/contentPhieuDangKy.js
 * # Project: /Users/leopham/Desktop/NodeJs/node-pdfmake
 * # Created Date: Thursday May 21st 2020
 * # Author: Leo Pham (hongthaipro@gmail.com)
 * # -----
 * # Last Modified: Thursday, 21st May 2020 9:52:48 am
 * # -----
 * # Copyright (c) 2020, LeoSoft
 * ###############################################################################
 */
const cachDong = 7;
const buildContent = (data) => {
  const MonHoc =
    data.MoTaMon.split(",").length > 2 ? data.MoTaMon.split(",") : ["", "", ""];
  let date = new Date(data.CreatedAt);
  return [
    {
      columns: [
        {
          alignment: "center",
          width: "40%",
          text: "BỘ GIÁO DỤC VÀ ĐÀO TẠO",
          bold: true,
        },
        {
          alignment: "center",
          width: "60%",
          text: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM",
          bold: true,
        },
      ],
    },
    {
      columns: [
        {
          alignment: "center",
          width: "40%",
          text: ["TRƯỜNG ĐẠI HỌC LẠC HỒNG \n", "--------------------"],
          bold: true,
        },
        {
          alignment: "center",
          width: "60%",
          text: [
            "Độc lập - Tự do - Hạnh phúc \n",
            "---------------------------------------",
          ],
          bold: true,
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
        },
        {
          alignment: "center",
          width: "90%",
          text: [
            {
              alignment: "center",
              margin: [0, 10, 0, 10],
              bold: true,
              text: "PHIẾU ĐĂNG KÝ XÉT TUYỂN HỌC BẠ \n",
            },
            {
              alignment: "center",
              margin: [0, 0, 0, 20],
              bold: true,
              text: "TRUNG HỌC PHỔ THÔNG",
            },
          ],
          bold: true,
        },
      ],
    },
    {
      margin: [0, 0, 0, 10],
      columns: [
        {
          alignment: "center",
          text: data.MadangKy,
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
      margin: [0, 0, 0, cachDong],
      columns: [
        {
          width: "60%",
          text: [
            "1. Họ và tên: ",
            {
              text: data.HoTen,
            },
          ],
        },
        {
          width: "40%",
          text: ["Giới tính: ", !data.Nu ? "Nam" : "Nữ"],
        },
      ],
    },
    {
      margin: [0, 0, 0, cachDong],
      columns: [
        {
          width: "60%",
          text: [
            "2. Ngày tháng năm sinh: ",
            {
              text: data.NgaySinh || "",
            },
          ],
        },
        {
          width: "40%",
          text: [
            "Nơi sinh: ",
            {
              text: data.TenNoiSinh || "",
            },
          ],
        },
      ],
    },
    {
      margin: [0, 0, 0, cachDong],
      columns: [
        {
          width: "75%",
          text: "",
        },
        {
          alignment: "center",
          width: "10%",
          text: "Mã tỉnh",
        },
        {
          alignment: "center",
          width: "15%",
          text: "Mã trường",
        },
      ],
    },
    {
      columns: [
        {
          width: "75%",
          margin: [0, 0, 0, cachDong],
          text: [
            "3. Tên trường THPT (lớp 10): ",
            {
              text: data.TenTruongLop10 || "",
            },
          ],
        },
        {
          alignment: "center",
          width: "10%",
          text: data.MaTinhTPLop10 || "",
        },
        {
          alignment: "center",
          width: "15%",
          text: data.MaTruongLop10 || "",
        },
      ],
    },
    {
      columns: [
        {
          width: "75%",
          margin: [14, 0, 0, cachDong],
          text: [
            "Tên trường THPT (lớp 11): ",
            {
              text: data.TenTruongLop11 || "",
            },
          ],
        },
        {
          alignment: "center",
          width: "10%",
          text: data.MaTinhTPLop11 || "",
        },
        {
          alignment: "center",
          width: "15%",
          text: data.MaTruongLop11 || "",
        },
      ],
    },
    {
      columns: [
        {
          width: "75%",
          margin: [14, 0, 0, cachDong],
          text: [
            "Tên trường THPT (lớp 12): ",
            {
              text: data.TenTruongLop12 || "",
            },
          ],
        },
        {
          alignment: "center",
          width: "10%",
          text: data.MaTinhTPLop12 || "",
        },
        {
          alignment: "center",
          width: "15%",
          text: data.MaTruongLop12 || "",
        },
      ],
    },
    {
      margin: [0, 0, 0, cachDong],
      text: [
        "4. Khu vực ưu tiên (KV1, KV2-NT, KV2 hay KV3): ",
        data.TenKhuVuc || "",
      ],
    },
    {
      margin: [0, 0, 0, cachDong],
      text: ["5. Đối tượng ưu tiên (ƯT1 hay ƯT2): ", data.TenDoiTuong || ""],
    },
    {
      margin: [0, 0, 0, cachDong],
      text: "6. Đăng ký xét tuyển hệ đại học ",
    },
    {
      margin: [14, 0, 0, cachDong],
      columns: [
        {
          width: "70%",
          text: ["Ngành: ", data.TenNganh],
        },
        {
          width: "30%",
          text: ["Mã ngành: ", data.MaNganh || ""],
        },
      ],
    },
    {
      margin: [0, 0, 0, cachDong],
      text: "7. Đăng ký xét tuyển theo phương án: ",
    },
    {
      margin: [0, 0, 0, cachDong],
      text: "7.1. Đăng ký xét tuyển theo tổ hợp 3 môn:",
    },
    {
      margin: [0, 0, 0, cachDong],
      columns: [
        {
          width: "15%",
          text: "",
        },
        {
          width: "70%",
          table: {
            widths: ["40%", "60%"],
            body: [
              [
                {
                  alignment: "center",
                  text: "Môn xét tuyển",
                },
                {
                  alignment: "center",
                  text: "Điểm trung bình cả năm lớp 12",
                },
              ],
              [
                {
                  text: ["Môn 1: ", MonHoc[0] || ""],
                },
                {
                  alignment: "center",
                  text: data.DiemMon1 || "",
                },
              ],
              [
                {
                  text: ["Môn 2: ", MonHoc[1] || ""],
                },
                {
                  alignment: "center",
                  text: data.DiemMon2 || "",
                },
              ],
              [
                {
                  text: ["Môn 3: ", MonHoc[2] || ""],
                },
                {
                  alignment: "center",
                  text: data.DiemMon3 || "",
                },
              ],
            ],
          },
        },
        {
          width: "15%",
          text: "",
        },
      ],
    },
    {
      margin: [0, 0, 0, cachDong],
      text: "7.2. Đăng ký xét tuyển theo điểm trung bình cả năm lớp 12: ",
    },
    {
      margin: [0, 0, 0, cachDong],
      columns: [
        {
          width: "15%",
          text: "",
        },
        {
          width: "70%",
          table: {
            widths: ["40%", "60%"],
            body: [
              [
                {
                  text: "Điểm TB cả năm lớp 12",
                },
                {
                  alignment: "center",
                  text: data.PhuongThucXetTuyen === 1 ? data.DiemTB || "" : "",
                },
              ],
            ],
          },
        },
        {
          width: "15%",
          text: "",
        },
      ],
    },
    {
      margin: [0, 0, 0, cachDong],
      text:
        "7.3. Đăng ký xét tuyển theo điểm kỳ thi đánh giá năng lực của Đại học Quốc Gia TPHCM: ",
    },
    {
      margin: [0, 0, 0, cachDong],
      columns: [
        {
          width: "15%",
          text: "",
        },
        {
          width: "70%",
          table: {
            widths: ["40%", "60%"],
            body: [
              [
                {
                  text: "Tổng điểm ĐGNL",
                },
                {
                  alignment: "center",
                  text: data.PhuongThucXetTuyen === 3 ? data.DiemTB || "" : "",
                },
              ],
            ],
          },
        },
        {
          width: "15%",
          text: "",
        },
      ],
    },
    {
      margin: [0, 0, 0, cachDong],
      text:
        "7.4. Đăng ký xét tuyển thẳng, ưu tiên xét tuyển thẳng vào đại học (theo quy định bộ GD&ĐT): ",
    },
    {
      margin: [0, 0, 0, cachDong],
      columns: [
        {
          width: "15%",
          text: "",
        },
        {
          width: "70%",
          table: {
            widths: ["40%", "60%"],
            body: [
              [
                {
                  text: "Đối tượng tuyển thẳng",
                },
                {
                  alignment: "center",
                  text:
                    data.PhuongThucXetTuyen === 4 ? data.TuyenThang || "" : "",
                },
              ],
            ],
          },
        },
        {
          width: "15%",
          text: "",
        },
      ],
    },
    {
      margin: [0, 0, 0, cachDong],
      text: "8. Trường Đại học Lạc Hồng gửi kết quả cho ai, theo địa chỉ nào?:",
    },
    {
      margin: [14, 0, 0, cachDong],
      text: data.DiaChi || "",
    },
    {
      margin: [14, 0, 0, cachDong],
      text: ["Điện thoại liên lạc (bắt buộc): ", data.DienThoai || ""],
    },
    {
      margin: [14, 0, 0, cachDong],
      text: ["Email: ", data.Email || ""],
    },
    {
      margin: [0, 0, 0, cachDong],
      text:
        "Tôi xin cam đoan thông tin đã khai trong phiếu là đúng sự thật. Nếu sai tôi xin hoàn toàn chịu trách nhiệm./.",
    },
    {
      margin: [0, 0, 0, cachDong],
      columns: [
        {
          width: "55%",
          text: "",
        },
        {
          width: "45%",
          alignment: "center",
          text: `Đồng Nai, ngày ${("0" + date.getDate()).slice(-2)} tháng ${(
            "0" +
            (date.getMonth() + 1)
          ).slice(-2)} năm ${date.getFullYear()}`,
        },
      ],
    },
    {
      margin: [0, 0, 0, cachDong],
      columns: [
        {
          width: "60%",
          text: "",
        },
        {
          width: "40%",
          alignment: "center",
          text: [
            "NGƯỜI LÀM ĐƠN \n",
            {
              text: "(Ký và ghi rõ họ tên)",
              italics: true,
              fontSize: 10,
            },
          ],
        },
      ],
    },
    {
      margin: [0, 40, 0, 0],
      columns: [
        {
          width: "60%",
          text: "",
        },
        {
          width: "40%",
          alignment: "center",
          text: data.HoTen,
        },
      ],
    },
  ];
};

module.exports = buildContent;
