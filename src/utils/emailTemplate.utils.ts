export const AccountCreatedEmailHtml = (user: {
  name: string;
  email: string;
  createdAt: any;
}) => {
  return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>Account Created</title>
</head>

<body
  style="
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
    font-family: Arial, Helvetica, sans-serif;
  "
>

  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="background-color: #f4f4f4; padding: 40px 0;"
  >
    <tr>
      <td align="center">

        <!-- Main Container -->
        <table
          width="600"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            max-width: 600px;
            width: 100%;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
          "
        >

          <!-- Header -->
          <tr>
            <td
              style="
                background-color: #2563eb;
                padding: 30px;
                text-align: center;
              "
            >
              <h1
                style="
                  margin: 0;
                  color: #ffffff;
                  font-size: 26px;
                "
              >
                School Management System
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 35px;">

              <h2
                style="
                  margin: 0 0 20px;
                  color: #222222;
                  font-size: 24px;
                "
              >
                Welcome, ${user.name}!
              </h2>

              <p
                style="
                  margin: 0 0 15px;
                  color: #555555;
                  font-size: 16px;
                  line-height: 1.6;
                "
              >
                Your account has been successfully created
                in our School Management System.
              </p>

              <p
                style="
                  margin: 0 0 25px;
                  color: #555555;
                  font-size: 16px;
                  line-height: 1.6;
                "
              >
                Here are your account details:
              </p>

              <!-- Account Details -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  background-color: #f8f9fa;
                  border-radius: 6px;
                  margin-bottom: 25px;
                "
              >

                <tr>
                  <td
                    style="
                      padding: 12px 15px;
                      color: #555555;
                      font-size: 14px;
                      font-weight: bold;
                    "
                  >
                    Full Name
                  </td>

                  <td
                    style="
                      padding: 12px 15px;
                      color: #333333;
                      font-size: 14px;
                    "
                  >
                    ${user.name}
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding: 12px 15px;
                      color: #555555;
                      font-size: 14px;
                      font-weight: bold;
                    "
                  >
                    Email
                  </td>

                  <td
                    style="
                      padding: 12px 15px;
                      color: #333333;
                      font-size: 14px;
                    "
                  >
                    ${user.email}
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding: 12px 15px;
                      color: #555555;
                      font-size: 14px;
                      font-weight: bold;
                    "
                  >
                    Created At
                  </td>

                  <td
                    style="
                      padding: 12px 15px;
                      color: #333333;
                      font-size: 14px;
                    "
                  >
                    ${new Date(user.createdAt).toLocaleString()}
                  </td>
                </tr>

              </table>

              <p
                style="
                  margin: 0 0 15px;
                  color: #555555;
                  font-size: 15px;
                  line-height: 1.6;
                "
              >
                You can now use your account to access
                the School Management System.
              </p>

              <p
                style="
                  margin: 0;
                  color: #777777;
                  font-size: 14px;
                  line-height: 1.6;
                "
              >
                If you did not request this account,
                please contact the system administrator.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td
              style="
                padding: 20px;
                text-align: center;
                background-color: #f8f8f8;
              "
            >

              <p
                style="
                  margin: 0;
                  color: #999999;
                  font-size: 13px;
                "
              >
                © ${new Date().getFullYear()}
                School Management System
              </p>

              <p
                style="
                  margin: 8px 0 0;
                  color: #999999;
                  font-size: 13px;
                "
              >
                This is an automated email.
                Please do not reply.
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
};

// import { NativeDate } from "mongoose";

export const LoginEmailHtml = (user: {
  name: string;
  email: string;
  loginAt: NativeDate;
}) => {
  return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>Login Notification</title>
</head>

<body
  style="
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
    font-family: Arial, Helvetica, sans-serif;
  "
>

  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
      background-color: #f4f4f4;
      padding: 40px 0;
    "
  >
    <tr>
      <td align="center">

        <!-- Main Container -->
        <table
          width="600"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            max-width: 600px;
            width: 100%;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
          "
        >

          <!-- Header -->
          <tr>
            <td
              style="
                background-color: #2563eb;
                padding: 30px;
                text-align: center;
              "
            >
              <h1
                style="
                  margin: 0;
                  color: #ffffff;
                  font-size: 26px;
                "
              >
                School Management System
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 35px;">

              <h2
                style="
                  margin: 0 0 20px;
                  color: #222222;
                  font-size: 24px;
                "
              >
                Welcome Back, ${user.name}!
              </h2>

              <p
                style="
                  margin: 0 0 15px;
                  color: #555555;
                  font-size: 16px;
                  line-height: 1.6;
                "
              >
                You have successfully logged in to your
                School Management System account.
              </p>

              <p
                style="
                  margin: 0 0 25px;
                  color: #555555;
                  font-size: 16px;
                  line-height: 1.6;
                "
              >
                Here are the details of your recent login:
              </p>

              <!-- Login Details -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  background-color: #f8f9fa;
                  border-radius: 6px;
                  margin-bottom: 25px;
                "
              >

                <tr>
                  <td
                    style="
                      padding: 12px 15px;
                      color: #555555;
                      font-size: 14px;
                      font-weight: bold;
                    "
                  >
                    Name
                  </td>

                  <td
                    style="
                      padding: 12px 15px;
                      color: #333333;
                      font-size: 14px;
                    "
                  >
                    ${user.name}
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding: 12px 15px;
                      color: #555555;
                      font-size: 14px;
                      font-weight: bold;
                    "
                  >
                    Email
                  </td>

                  <td
                    style="
                      padding: 12px 15px;
                      color: #333333;
                      font-size: 14px;
                    "
                  >
                    ${user.email}
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding: 12px 15px;
                      color: #555555;
                      font-size: 14px;
                      font-weight: bold;
                    "
                  >
                    Login Time
                  </td>

                  <td
                    style="
                      padding: 12px 15px;
                      color: #333333;
                      font-size: 14px;
                    "
                  >
                    ${new Date(user.loginAt).toLocaleString()}
                  </td>
                </tr>

              </table>

              <p
                style="
                  margin: 0 0 15px;
                  color: #555555;
                  font-size: 15px;
                  line-height: 1.6;
                "
              >
                If this login was made by you, no further
                action is required.
              </p>

              <p
                style="
                  margin: 0;
                  color: #777777;
                  font-size: 14px;
                  line-height: 1.6;
                "
              >
                If you did not log in to your account,
                please change your password immediately
                and contact the system administrator.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td
              style="
                padding: 20px;
                text-align: center;
                background-color: #f8f8f8;
              "
            >

              <p
                style="
                  margin: 0;
                  color: #999999;
                  font-size: 13px;
                "
              >
                © ${new Date().getFullYear()}
                School Management System
              </p>

              <p
                style="
                  margin: 8px 0 0;
                  color: #999999;
                  font-size: 13px;
                "
              >
                This is an automated email.
                Please do not reply.
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
};
