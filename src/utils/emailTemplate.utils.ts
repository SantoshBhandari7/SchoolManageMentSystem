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

export const ContactEmailHtml = (value: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  return `
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>New Contact Message</title>
</head>

<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0"
style="background:#ffffff;border-radius:10px;overflow:hidden;">

<!-- Header -->
<tr>
<td align="center"
style="background:#000000;color:#ffffff;padding:30px;">

<h1 style="margin:0;font-size:28px;">
📩 New Contact Message
</h1>

</td>
</tr>

<!-- Body -->
<tr>
<td style="padding:40px;">

<h2 style="margin-top:0;color:#000;">
Hello Admin,
</h2>

<p style="font-size:16px;color:#555;line-height:1.8;">
You have received a new message from the contact form on
<strong>Nepali Store</strong>.
</p>

<!-- Contact Details -->
<table width="100%" cellpadding="0" cellspacing="0"
style="border-collapse:collapse;margin-top:25px;">

<tr>

<td style="
padding:12px;
border:1px solid #ddd;
font-weight:bold;
width:180px;
">
Name
</td>

<td style="
padding:12px;
border:1px solid #ddd;
">
${value.name}
</td>

</tr>

<tr>

<td style="
padding:12px;
border:1px solid #ddd;
font-weight:bold;
">
Email
</td>

<td style="
padding:12px;
border:1px solid #ddd;
">
${value.email}
</td>

</tr>

<tr>

<td style="
padding:12px;
border:1px solid #ddd;
font-weight:bold;
">
Subject
</td>

<td style="
padding:12px;
border:1px solid #ddd;
">
${value.subject}
</td>

</tr>

<tr>

<td style="
padding:12px;
border:1px solid #ddd;
font-weight:bold;
vertical-align:top;
">
Message
</td>

<td style="
padding:12px;
border:1px solid #ddd;
line-height:1.6;
">
${value.message}
</td>

</tr>

</table>

<!-- Button -->
<div style="text-align:center;margin-top:35px;">

<a href="mailto:${value.email}"
style="
display:inline-block;
background:#000000;
color:#ffffff;
text-decoration:none;
padding:14px 35px;
border-radius:6px;
font-size:16px;
font-weight:bold;
">

Reply to Customer

</a>

</div>

<p style="
margin-top:35px;
color:#555;
font-size:15px;
line-height:1.7;
">

Please review the customer's message and respond as soon as possible.

</p>

<p style="margin-top:30px;color:#000;">

Regards,<br>

<strong>Nepali Store Team</strong>

</p>

</td>
</tr>

<!-- Footer -->

<tr>

<td align="center"
style="
background:#000000;
color:#ffffff;
padding:20px;
font-size:13px;
">

© ${new Date().getFullYear()} Nepali Store<br>

All Rights Reserved.

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
