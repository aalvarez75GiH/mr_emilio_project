/* eslint-disable */

const buildCustomerAccessCodeEmail = ({
  firstName,
  verificationCode,
  expiresInMinutes,
}) => {
  const normalizedFirstName =
    typeof firstName === "string" && firstName.trim()
      ? firstName.trim()
      : "there";

  const normalizedCode = String(verificationCode || "").trim();

  const normalizedExpiration = Number(expiresInMinutes);

  if (!normalizedCode) {
    throw new Error(
      "Verification code is required to build customer access email"
    );
  }

  const expirationMinutes =
    Number.isInteger(normalizedExpiration) && normalizedExpiration > 0
      ? normalizedExpiration
      : 10;

  const subject = "Your Mr. Emilio verification code";

  const text = [
    `Hi ${normalizedFirstName},`,
    "",
    "Use this verification code to access your Mr. Emilio orders:",
    "",
    normalizedCode,
    "",
    `This code expires in ${expirationMinutes} minutes.`,
    "",
    "If you did not request access to your orders, you can ignore this email.",
    "",
    "Mr. Emilio",
  ].join("\n");

  const html = `
      <!DOCTYPE html>
  
      <html>
        <body
          style="
            margin: 0;
            padding: 0;
            background-color: #f5f7fb;
            font-family: Arial, Helvetica, sans-serif;
            color: #1d2a44;
          "
        >
          <table
            role="presentation"
            width="100%"
            cellspacing="0"
            cellpadding="0"
            border="0"
            style="background-color: #f5f7fb; padding: 32px 16px;"
          >
            <tr>
              <td align="center">
                <table
                  role="presentation"
                  width="100%"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  style="
                    max-width: 560px;
                    background-color: #ffffff;
                    border-radius: 16px;
                    padding: 40px;
                  "
                >
                  <tr>
                    <td>
                      <h1
                        style="
                          margin: 0 0 20px;
                          font-size: 26px;
                          line-height: 1.25;
                          color: #173b8f;
                        "
                      >
                        Access your orders
                      </h1>
  
                      <p
                        style="
                          margin: 0 0 16px;
                          font-size: 16px;
                          line-height: 1.6;
                        "
                      >
                        Hi ${normalizedFirstName},
                      </p>
  
                      <p
                        style="
                          margin: 0 0 24px;
                          font-size: 16px;
                          line-height: 1.6;
                        "
                      >
                        Use this verification code to securely access
                        your Mr. Emilio orders.
                      </p>
  
                      <div
                        style="
                          margin: 0 0 24px;
                          padding: 20px;
                          border-radius: 12px;
                          background-color: #f2f5fb;
                          text-align: center;
                          font-size: 32px;
                          font-weight: 700;
                          letter-spacing: 8px;
                          color: #173b8f;
                        "
                      >
                        ${normalizedCode}
                      </div>
  
                      <p
                        style="
                          margin: 0 0 16px;
                          font-size: 14px;
                          line-height: 1.6;
                          color: #60708f;
                        "
                      >
                        This code expires in ${expirationMinutes} minutes.
                      </p>
  
                      <p
                        style="
                          margin: 0;
                          font-size: 14px;
                          line-height: 1.6;
                          color: #60708f;
                        "
                      >
                        If you did not request access to your orders,
                        you can safely ignore this email.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

  return {
    subject,
    text,
    html,
  };
};

module.exports = {
  buildCustomerAccessCodeEmail,
};
