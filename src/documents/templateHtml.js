const templateEngine = (order ) => {
    return `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Test PDF</title>
        </head>

        <style>
        .parcel-information {
            display: flex;
            flex-direction: column;
            padding: 0 1rem;
            position: relative;
          
            .boxes {
              background-color: #fff;
              display: grid;
              grid-template-columns: 1fr 1fr;
              grid-template-rows: 1fr 3fr;
              border: 1px solid black;
              flex: 1;
              margin-top: 1rem;
              .box,
              .box-3,
              .box-4 {
                border: 1px solid black;
                p {
                  font-size: 1.3rem;
                  margin: 0;
                  // color: #7d7c7c;
                  // font-weight: 500;
                }
              }
          
              .box {
                padding: 7px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .code {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                }
              }
          
              .box-3 {
                .section {
                  padding: 7px;
                  .parcel-type {
                    display: flex;
                    gap: 5px;
                    flex-direction: column;
                    margin-bottom: 5px;
                    .check-box-group {
                      display: flex;
                      justify-content: space-around;
                      align-items: center;
                      label {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        gap: 0.5rem;
                        font-size: 1.1rem;
                        .input[type="checkbox"] {
                          display: none;
                        }
          
                        /* Style for the custom checkbox */
                        .custom-checkbox {
                          display: inline-block;
                          width: 15px;
                          height: 15px;
                          border: 2px solid #333;
                          border-radius: 4px;
                          position: relative;
                          cursor: pointer;
                        }
          
                        /* Style for the custom checkmark */
                        .custom-checkbox::after {
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
          
                        /* Show the checkmark when checkbox is checked */
                        .input[type="checkbox"]:checked + .custom-checkbox::after {
                          opacity: 1;
                        }
                      }
                    }
                  }
                  .parcel-content-value-table {
                    tr {
                      td:first-child,
                      td:last-child {
                        max-width: 100px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                      }
                    }
                  }
                  &:first-of-type {
                    border-bottom: 2px solid black;
                  }
                  .sender-signature {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    .signature {
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                    }
                  }
                }
                .sender-instruction {
                  padding: 7px;
                  display: flex;
                  flex-direction: column;
                  gap: 5px;
                  border-bottom: 2px solid black;
                  .check-box-group {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    label {
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      gap: 0.5rem;
                      font-size: 1.1rem;
                      overflow: hidden;
                      .input[type="checkbox"] {
                        display: none;
                      }
          
                      /* Style for the custom checkbox */
                      .custom-checkbox {
                        display: inline-block;
                        width: 15px;
                        height: 15px;
                        border: 2px solid #333;
                        border-radius: 4px;
                        position: relative;
                        cursor: pointer;
                      }
          
                      /* Style for the custom checkmark */
                      .custom-checkbox::after {
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
          
                      /* Show the checkmark when checkbox is checked */
                      .input[type="checkbox"]:checked + .custom-checkbox::after {
                        opacity: 1;
                      }
                    }
                  }
                }
              }
          
              .box-4 {
                display: flex;
                flex-direction: column;
                .section {
                  display: grid;
                  grid-template-columns: 7fr 4fr;
                  .left {
                    border-right: 2px solid black;
                    .delivery-fare,
                    .recipient-fare {
                      padding: 7px;
                      .fare {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        p {
                          font-size: 1.2rem;
                        }
                        &:last-of-type {
                          font-weight: bold;
                        }
                      }
                    }
                    .delivery-fare {
                      border-bottom: 2px solid black;
                    }
                  }
                  .right {
                    display: flex;
                    flex-direction: column;
                    .parcel-weight {
                      padding: 5px;
                      border-bottom: 2px solid black;
                      .weight {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        p {
                          font-size: 1.2rem;
                        }
                      }
                    }
                    .parcel-note {
                      padding: 7px;
                      flex: 1;
                    }
                  }
                }
                .section {
                  height: 100%;
                  .parcel-approval {
                    padding: 7px;
                    border-right: 2px solid black;
                    border-top: 2px solid black;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    // justify-content: space-between;
                    flex: 1;
                    height: 100%;
                  }
                  .delivery-date {
                    padding: 7px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    border-top: 2px solid black;
                    p:not(:first-child) {
                      font-size: 1.2rem;
                    }
                  }
                }
              }
            }
          }
          
        </style>
        <body>
          <h1>Order Details</h1>
          <p>Order ID: ${order._id}</p>
          <div>
      <div className="flex items-center justify-around w-full">
        <h1>Magic Post</h1>
        <QRCode
          size={160}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        />
      </div>
      <div className="parcel-information">
        <h2>Thông tin đơn hàng</h2>
        <div className="boxes">
          <div className="box">
            <div className="header">
              <p>
                <b>1. Tên và địa chỉ người gửi</b>
              </p>
              <p>${order.sender}</p>
            </div>
            <div>
              <p>
                <b>Số điện thoại:</b> ${order.senderPhone}
              </p>
              <div className="code">
                <p>
                  <b>Mã bưu chính:</b> 1000
                </p>
              </div>
            </div>
          </div>
          <div className="box">
            <div className="header">
              <p>
                <b>2. Tên và địa chỉ người nhận</b>
              </p>
              <p>${order.receiver}</p> 
            </div>
            <div>
              <p>
                <b>Mã vận đơn:</b> #{parcelId}
              </p>
              <div className="code">
                <p>
                  <b>Số điện thoại:</b> {"fafwa"}
                </p>
                <p>
                  <b>Mã bưu chính:</b> 1000
                </p>
              </div>
            </div>
          </div>
          <div className="box-3">
            <div className="section">
              <div className="parcel-type">
                <p>
                  <b>3. Loại hàng gửi</b>
                </p>

                <div className="check-box-group">
                  <label className="checkBox">
                    <input
                      type="checkbox"
                      className="input"
                      checked={typeOfParcel.isDocument}
                      disabled
                    />
                    <span className="custom-checkbox"></span>
                    Tài liệu
                  </label>
                  <label className="checkBox">
                    <input
                      type="checkbox"
                      className="input"
                      // checked={!typeOfParcel.isDocument}
                      disabled
                    />
                    <span className="custom-checkbox"></span>
                    Hàng hóa
                  </label>
                </div>
              </div>
              <div className="parcel-value">
                <p>
                  <b>4. Nội dung trị giá bưu gửi</b>
                </p>
                <p>${order.price}</p>
              </div>
              <div className="parcel-service">
                <p>
                  <b>5. Dịch vụ đặc biệt/Cộng thêm</b>
                </p>
                <p>${order.COD}</p>
                <p style={{ fontSize: "1.2rem" }}>Mã hợp đồng: EMSC/PPA</p>
              </div>
            </div>
            <div className="sender-instruction">
              <p>
                <b>6. Chỉ dẫn của người gửi khi không phát được bưu gửi</b>
              </p>
              <div className="check-box-group">
                <label className="checkBox">
                  <input
                    type="checkbox"
                    className="input"
                    //   checked={senderInstruction.returnImmediately}
                    disabled
                  />
                  <span className="custom-checkbox"></span>
                  Chuyển hoàn ngay
                </label>
                <label className="checkBox">
                  <input
                    type="checkbox"
                    className="input"
                    //   checked={senderInstruction.callRecipient}
                    disabled
                  />
                  <span className="custom-checkbox"></span>
                  Gọi điện cho người gửi
                </label>
                <label className="checkBox">
                  <input
                    type="checkbox"
                    className="input"
                    //   checked={senderInstruction.cancel}
                    disabled
                  />
                  <span className="custom-checkbox"></span>
                  Hủy
                </label>
              </div>
              <div className="check-box-group">
                <label className="checkBox">
                  <input
                    type="checkbox"
                    className="input"
                    //   checked={senderInstruction.returnBefore}
                    disabled
                  />
                  <span className="custom-checkbox"></span>
                  Chuyển hoàn trước ngày
                </label>
                <label className="checkBox">
                  <input
                    type="checkbox"
                    className="input"
                    //   checked={senderInstruction.returnAfterStorage}
                    disabled
                  />
                  <span className="custom-checkbox"></span>
                  Chuyển hoàn khi hết thời gian lưu trữ
                </label>
              </div>
            </div>
            <div className="section">
              <div className="sender-commiment">
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
              <div className="sender-signature">
                <div className="date">
                  <p>
                    <b>8. Ngày giờ gửi</b>
                  </p>
                  {/* <p>{paths[0].time.timeArrived}</p> */}
                </div>
                <div className="signature">
                  <p>
                    <b>Chữ ký người gửi</b>
                  </p>
                  <p>
                    {/* <i>
                    {senderInfo.nameAddress
                      ?.split(".")[0]
                      .replace(/\s+/g, "")
                      .toLowerCase()}
                  </i> */}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="box-4">
            <div className="section">
              <div className="left">
                <div className="delivery-fare">
                  <p>
                    <b>9. Cước:</b>
                  </p>
                  {/* {deliveryFare.map((fare, index) => {
                  return (
                    <div className="fare" key={index}>
                      <p>
                        {fare.index}. {fare.title}
                      </p>
                      <p>{fare.value}</p>
                    </div>
                  );
                })} */}
                </div>
                <div className="recipient-fare">
                  <p>
                    <b>11. Thu của người nhận:</b>
                  </p>
                  {/* {recipientFare.map((fare, index) => {
                  return (
                    <div className="fare" key={index}>
                      <p>{fare.title}</p>
                      <p>{fare.value}</p>
                    </div>
                  );
                })} */}
                </div>
              </div>
              <div className="right">
                <div className="parcel-weight">
                  <p>
                    <b>10. Khối lượng (kg):</b>
                  </p>
                  {/* {weight.map((weight, index) => {
                  return (
                    <div className="weight" key={index}>
                      <p>{weight.title}</p>
                      <p>{weight.value}</p>
                    </div>
                  );
                })} */}
                </div>
                <div className="parcel-note">
                  <p>
                    <b>12. Chú dẫn nghiệp vụ:</b>
                  </p>
                  <p>{notes}</p>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="parcel-approval">
                <p>
                  <b>13. Bưu cục chấp nhận</b>
                </p>
                <p>Chữ ký GDV nhận</p>
                <div className="relative w-[138px] h-[138px] bg-transparent border-solid border-2 border-black rounded-full mt-4">
                  <svg
                    className="absolute top-0 left-0 w-full h-full"
                    viewBox="0 0 100 100"
                  >
                    <path
                      id="curve"
                      d="M50,50 m-50,0 a50,50 0 1,0 100,0"
                      fill="transparent"
                    />

                    {/* Text along the curve */}
                    <text>
                      <textPath href="#curve" startOffset="36%">
                        129100
                      </textPath>
                    </text>

                    {/* Text in the center of the circle */}
                    <text
                      x="50"
                      y="50"
                      textAnchor="middle"
                      alignmentBaseline="middle"
                    >
                      12/12/2023
                    </text>

                    {/* Text on top */}
                    <text
                      x="50"
                      y="20"
                      textAnchor="middle"
                      alignmentBaseline="middle"
                    >
                      Thăng Long
                    </text>
                  </svg>
                </div>
              </div>
              <div className="delivery-date">
                <p>
                  <b>14. Ngày giờ nhận</b>
                </p>
                <p style={{ fontSize: "1.1rem" }}>Người nhận</p>
                (Ký, ghi rõ họ tên)
                {delivered && (
                  <p>
                    {/* <i>
                    {recipientInfo.nameAddress
                      ?.split(".")[0]
                      .replace(/\s+/g, "")
                      .toLowerCase()}
                  </i> */}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

        </body>
      </html>`;
  };
  
  module.exports = {
    templateEngine
  };
  