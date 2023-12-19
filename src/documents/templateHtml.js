const UtilFunc = require("../utils/utils");

const templateEngine = (order, qrCode) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Test receipt note</title>
    <link rel="stylesheet" href="style.css" />
  </head>
    <style>
    * {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
    }
    html,
    body,
    div,
    span,
    applet,
    object,
    iframe,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {

      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
    }

    ol,
    ul {
      list-style: none;
    }
    .parcel-information {
      display: flex;
      flex-direction: column;
      padding: 0 1rem;
      position: relative;
    }

    .parcel-information .boxes {
      background-color: #fff;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 3fr;
      border: 1px solid black;
      flex: 1;
      margin-top: 1rem;
    }

    .parcel-information .boxes .box,
    .parcel-information .boxes .box-3,
    .parcel-information .boxes .box-4 {
      border: 1px solid black;
    }

    .parcel-information .boxes .box p,
    .parcel-information .boxes .box-3 p,
    .parcel-information .boxes .box-4 p {
      font-size: 1.3rem;
      margin: 0;
    }

    .parcel-information .boxes .box {
      padding: 7px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .parcel-information .boxes .box .code {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .parcel-information .boxes .box-3 .section {
      padding: 7px;
    }

    .parcel-information .boxes .box-3 .section .parcel-type {
      display: flex;
      gap: 5px;
      flex-direction: column;
      margin-bottom: 5px;
    }

    .parcel-information .boxes .box-3 .section .parcel-type .check-box-group {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    .parcel-information .boxes .box-3 .section .parcel-type .check-box-group label {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.1rem;
      /* Style for the custom checkbox */
      /* Style for the custom checkmark */
      /* Show the checkmark when checkbox is checked */
    }

    .parcel-information .boxes .box-3 .section .parcel-type .check-box-group label .input[type="checkbox"] {
      display: none;
    }

    .parcel-information .boxes .box-3 .section .parcel-type .check-box-group label .custom-checkbox {
      display: inline-block;
      width: 15px;
      height: 15px;
      border: 2px solid #333;
      border-radius: 4px;
      position: relative;
      cursor: pointer;
    }

    .parcel-information .boxes .box-3 .section .parcel-type .check-box-group label .custom-checkbox::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 10px;
      height: 10px;
      background-color: #333;
      border-radius: 2px;
      opacity: 0;
    }

    .parcel-information .boxes .box-3 .section .parcel-type .check-box-group label .input[type="checkbox"]:checked+.custom-checkbox::after {
      opacity: 1;
    }

    .parcel-information .boxes .box-3 .section .parcel-content-value-table tr td:first-child,
    .parcel-information .boxes .box-3 .section .parcel-content-value-table tr td:last-child {
      max-width: 100px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .parcel-information .boxes .box-3 .section:first-of-type {
      border-bottom: 2px solid black;
    }

    .parcel-information .boxes .box-3 .section .sender-signature {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .parcel-information .boxes .box-3 .section .sender-signature .signature {
      display: flex;
      align-items: center;
      flex-direction: column;
    }

    .parcel-information .boxes .box-3 .sender-instruction {
      padding: 7px;
      display: flex;
      flex-direction: column;
      gap: 5px;
      border-bottom: 2px solid black;
    }

    .parcel-information .boxes .box-3 .sender-instruction .check-box-group {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .parcel-information .boxes .box-3 .sender-instruction .check-box-group label {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.1rem;
      overflow: hidden;
      /* Style for the custom checkbox */
      /* Style for the custom checkmark */
      /* Show the checkmark when checkbox is checked */
    }

    .parcel-information .boxes .box-3 .sender-instruction .check-box-group label .input[type="checkbox"] {
      display: none;
    }

    .parcel-information .boxes .box-3 .sender-instruction .check-box-group label .custom-checkbox {
      display: inline-block;
      width: 15px;
      height: 15px;
      border: 2px solid #333;
      border-radius: 4px;
      position: relative;
      cursor: pointer;
    }

    .parcel-information .boxes .box-3 .sender-instruction .check-box-group label .custom-checkbox::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 10px;
      height: 10px;
      background-color: #333;
      border-radius: 2px;
      opacity: 0;
    }

    .parcel-information .boxes .box-3 .sender-instruction .check-box-group label .input[type="checkbox"]:checked+.custom-checkbox::after {
      opacity: 1;
    }

    .parcel-information .boxes .box-4 {
      display: flex;
      flex-direction: column;
    }

    .parcel-information .boxes .box-4 .section {
      display: grid;
      grid-template-columns: 7fr 4fr;
    }

    .parcel-information .boxes .box-4 .section .left {
      border-right: 2px solid black;
    }

    .parcel-information .boxes .box-4 .section .left .delivery-fare,
    .parcel-information .boxes .box-4 .section .left .recipient-fare {
      padding: 7px;
    }

    .parcel-information .boxes .box-4 .section .left .delivery-fare .fare,
    .parcel-information .boxes .box-4 .section .left .recipient-fare .fare {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .parcel-information .boxes .box-4 .section .left .delivery-fare .fare p,
    .parcel-information .boxes .box-4 .section .left .recipient-fare .fare p {
      font-size: 1.2rem;
    }

    .parcel-information .boxes .box-4 .section .left .delivery-fare .fare:last-of-type,
    .parcel-information .boxes .box-4 .section .left .recipient-fare .fare:last-of-type {
      font-weight: bold;
    }

    .parcel-information .boxes .box-4 .section .left .delivery-fare {
      border-bottom: 2px solid black;
    }

    .parcel-information .boxes .box-4 .section .right {
      display: flex;
      flex-direction: column;
    }

    .parcel-information .boxes .box-4 .section .right .parcel-weight {
      padding: 5px;
      border-bottom: 2px solid black;
    }

    .parcel-information .boxes .box-4 .section .right .parcel-weight .weight {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .parcel-information .boxes .box-4 .section .right .parcel-weight .weight p {
      font-size: 1.2rem;
    }

    .parcel-information .boxes .box-4 .section .right .parcel-note {
      padding: 7px;
      flex: 1;
    }

    .parcel-information .boxes .box-4 .section {
      height: 100%;
    }

    .parcel-information .boxes .box-4 .section .parcel-approval {
      padding: 7px;
      border-right: 2px solid black;
      border-top: 2px solid black;
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      /* height: 100%; */
    }

    .parcel-information .boxes .box-4 .section .delivery-date {
      padding: 7px;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-top: 2px solid black;
    }

    .parcel-information .boxes .box-4 .section .delivery-date p:not(:first-child) {
      font-size: 1.2rem;
    }
    .parcel-content {
      border: 1px solid black;
      width: 100%;
      height: 60px;
      border-collapse: collapse;

    }

    .parcel-content th,
    .parcel-content td {
      text-align: center;
      border: 1px solid black;
    }
  </style>
    <body>
      <div style="padding: 20px 0">
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        "
      >
        <h1>Magic Post</h1>
        <img style="height: auto; max-width: 30%; width: 30%" alt="QR code" src=${qrCode} />
      </div>
      <div class="parcel-information">
        <div class="boxes">
          <div class="box">
            <div class="header">
              <p>
                <b>1. Tên và địa chỉ người gửi</b>
              </p>
              <p>${order.sender}</p>
              <br />
              <p>${order.send_department.name}</p>
            </div>
            <div>
              <p><b>Số điện thoại:</b>${order.senderPhone}</p>
              <div class="code">
                <p><b>Customer Id:</b> 02932131</p>

                <p><b>Mã bưu chính:</b> 1000</p>
              </div>
            </div>
          </div>
          <div class="box">
            <div class="header">
              <p>
                <b>2. Tên và địa chỉ người nhận</b>
              </p>

              <p>${order.receiver}</p>
              <br />
              <p>${order.receive_department.name}</p>
            </div>
            <div>
              <p><b>Mã vận đơn:</b>${order._id}</p>
              <div class="code">
                <p><b>Số điện thoại:</b> ${order.receiverPhone}</p>
                <p><b>Mã bưu chính:</b> 1000</p>
              </div>
            </div>
          </div>
          <div class="box-3">
            <div class="section">
              <div class="parcel-type">
                <p>
                  <b>3. Loại hàng gửi</b>
                </p>

                <div class="check-box-group">
                  <label class="checkBox">
                    <input type="checkbox" class="input" ${order.type === 'document' ? 'checked' : ''} disabled />
                    <span class="custom-checkbox"></span>
                    Tài liệu
                  </label>
                  <label class="checkBox">
                    <input type="checkbox" class="input" ${order.type === 'goods' ? 'checked' : ''} disabled />
                    <span class="custom-checkbox"></span>
                    Hàng hóa
                  </label>
                </div>
              </div>
              <div class="parcel-value">
                <p>
                  <b>4. Nội dung trị giá bưu gửi</b>
                </p>
                <table class="parcel-content">
                  <tr>
                    <th>Nội dung</th>
                    <th>Số lượng</th>
                    <th>Trị giá</th>
                    <th>Giấy tờ đính kèm</th>
                  </tr>
                  <tr>
                    <td>Tổng</td>
                    <td>0</td>
                    <td></td>
                    <td></td>
                  </tr>
                </table>
              </div>
              <div class="parcel-service">
                <p>
                  <b>5. Dịch vụ đặc biệt/Cộng thêm</b>
                </p>
                <p>Linh tinh khong biet ghi j</p>
                <p style="font-size: 1.2rem">Mã hợp đồng: EMSC/PPA</p>
              </div>
            </div>
            <div class="sender-instruction">
              <p>
                <b>6. Chỉ dẫn của người gửi khi không phát được bưu gửi</b>
              </p>
              <div class="check-box-group">
                <label class="checkBox">
                  <input
                    type="checkbox"
                    class="input"
                    checked="{senderInstruction.returnImmediately}"
                    disabled
                  />
                  <span class="custom-checkbox"></span>
                  Chuyển hoàn ngay
                </label>
                <label class="checkBox">
                  <input
                    type="checkbox"
                    class="input"
                    checked="{senderInstruction.callRecipient}"
                    disabled
                  />
                  <span class="custom-checkbox"></span>
                  Gọi điện cho người gửi
                </label>
                <label class="checkBox">
                  <input
                    type="checkbox"
                    class="input"
                    checked="{senderInstruction.cancel}"
                    disabled
                  />
                  <span class="custom-checkbox"></span>
                  Hủy
                </label>
              </div>
              <div class="check-box-group">
                <label class="checkBox">
                  <input
                    type="checkbox"
                    class="input"
                    checked="{senderInstruction.returnBefore}"
                    disabled
                  />
                  <span class="custom-checkbox"></span>
                  Chuyển hoàn trước ngày
                </label>
                <label class="checkBox">
                  <input
                    type="checkbox"
                    class="input"
                    checked="{senderInstruction.returnAfterStorage}"
                    disabled
                  />
                  <span class="custom-checkbox"></span>
                  Chuyển hoàn khi hết thời gian lưu trữ
                </label>
              </div>
            </div>
            <div class="section">
              <div class="sender-commiment">
                <p>
                  <b>7. Cam kết của người gửi</b>
                </p>
                <p>
                  Tôi chấp nhận các điều khoản tại mặt sau phiếu gửi và cam đoan
                  bưu gửi này không chứa những mặt hàng nguy hiểm, cấm gửi.
                  Trường hợp không phát được hãy thực thi chỉ dẫn tại Mục 6, tôi
                  sẽ trả cước chuyển hoàn.
                </p>
              </div>
              <div class="sender-signature">
                <div class="date">
                  <p>
                    <b>8. Ngày giờ gửi</b>
                  </p>

                  <p>${UtilFunc.formatCustomDate(order.createdAt)}</p>
                </div>
                <div class="signature">
                  <p>
                    <b>Chữ ký người gửi</b>
                  </p>
                  <p>
                    <i> </i>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="box-4">
            <div class="section">
              <div class="left">
                <div class="delivery-fare">
                  <p>
                    <b>9. Cước:</b>
                  </p>

                  <div class="fare">
                    <p>${UtilFunc.formatCurrency(order.price)}</p>
                  </div>
                </div>
                <div class="recipient-fare">
                  <p>
                    <b>11. Thu của người nhận:</b>
                  </p>

                  <div class="fare">
                    <p>${UtilFunc.formatCurrency(order.price)}</p>
                  </div>
                </div>
              </div>
              <div class="right">
                <div class="parcel-weight">
                  <p>
                    <b>10. Khối lượng (kg):</b>
                  </p>

                  <div class="weight">
                    <p> ${order.weight} kg</p>
                  </div>
                </div>
                <div class="parcel-note">
                  <p>
                    <b>12. Chú dẫn nghiệp vụ:</b>
                  </p>
                  <p>Linh tinh ko biet</p>
                </div>
              </div>
            </div>
            <div class="section">
              <div class="parcel-approval">
                <p>
                  <b>13. Bưu cục chấp nhận</b>
                </p>
                <p>Chữ ký GDV nhận</p>
                <div
                  style="
                    position: relative;
                    margin-top: 1rem;
                    border-radius: 9999px;
                    border-width: 2px;
                    border-color: #000000;
                    border-style: solid;
                    background-color: transparent;
                    width: 138px;
                    height: 138px;
                  "
                >
                  <svg
                    style="
                      position: absolute;
                      top: 0;
                      left: 0;
                      width: 100%;
                      height: 100%;
                    "
                    viewBox="0 0 100 100"
                  >
                    <path
                      id="curve"
                      d="M50,50 m-50,0 a50,50 0 1,0 100,0"
                      fill="transparent"
                    />

                    <text>
                      <textPath href="#curve" startOffset="36%">
                        129100
                      </textPath>
                    </text>

                    <text
                      x="50"
                      y="50"
                      text-anchor="middle"
                      alignment-baseline="middle"
                    >
                      12/12/2023
                    </text>

                    <text
                      x="50"
                      y="20"
                      text-anchor="middle"
                      alignment-baseline="middle"
                    >
                      Thăng Long
                    </text>
                  </svg>
                </div>
              </div>
              <div class="delivery-date">
                <p>
                  <b>14. Ngày giờ nhận</b>
                </p>

                <p>Giao hang thanh cong</p>

                <p style="font-size: 1.1rem">Người nhận</p>
                (Ký, ghi rõ họ tên)
                <p>
                  <i> Ten nguoi nhan </i>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </body>
  </html>
`;
  
  module.exports = {
    templateEngine
  };
  