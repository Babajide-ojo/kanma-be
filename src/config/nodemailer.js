const nodemailer = require("nodemailer");
//const config = require("../config/auth.config");

const transport = nodemailer.createTransport({
    service: 'gmail',
      auth: {
        user: 'sunettechnologies@gmail.com',
        pass: 'yybo gfdp isgf wzdv',
      },
});

module.exports.sendConfirmationEmail = (name, email) => {
  transport
    .sendMail({
      from: "Juwshewaj",
      to: email,
      subject: "You just signed up on Juwsheyaj",
      html: `<html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Account Created Successfully</title>
        <style>
          body {
            background-color: #ffffff;
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.5;
            color: #333333;
            margin: 0;
            padding: 0;
          }
    
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
    
          h1 {
            color: #881337;
            font-size: 28px;
            font-weight: bold;
            margin-top: 0;
            margin-bottom: 20px;
            text-align: center;
          }
    
          p {
            margin-top: 0;
            margin-bottom: 20px;
            text-align: justify;
          }
    
          .button {
            display: inline-block;
            background-color: #961054;
            color: #ffffff !important;
            font-size: 18px;
            font-weight: bold;
            padding: 5px 40px;
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
          }
    
          .footer {
            margin-top: 50px;
            text-align: center;
          }
    
          .footer a {
            color: #333333;
            text-decoration: none;
            margin-right: 20px;
          }
    
          .sender {
            font-size: 12px;
            margin-top: 20px;
            text-align: center;
          }
    
          .sender span {
            font-weight: bold;
          }
          .login-div{
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Account Created Successfully</h1>
          <p>Dear ${name},</p>
          <p>Your account has been successfully created. You can now log in and start using our services.</p>
         <div class="login-div">
   
          <div class="sender">
         
            Email: support@Juwshewaj.com
          </div>
        </div>
      </body>
    </html>`,
    })
    .catch((err) => console.log(err));
};
module.exports.forgotPasswordEmail = (name, email, resetToken) => {
  transport
    .sendMail({
      from: "Juwsheyaj Hotels",
      to: email,
      subject: "Password Reset Code",
      html: ` <html>
      <head>
        <meta charset="UTF-8">
        <title>Reset Your Password</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.5;
            color: #333333;
          }
      
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
      
          h1 {
            font-size: 24px;
            margin-top: 0;
          }
      
          p {
            margin-bottom: 20px;
          }
      
          a {
            color: #007bff;
            text-decoration: none;
          }
      
          .button {
            display: inline-block;
            background-color: #007bff;
            color: #ffffff;
            padding: 10px 20px;
            border-radius: 4px;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Reset Your Password - Juwsheyaj Hotel</h1>
          <p>Dear ${name},</p>
          <p>We received a request to reset your password for your account. Don't worry; we're here to help you regain access to your account. Please follow the instructions below to reset your password</p>
          <br>
         
          <p>Kindly use the code below to reset your password</p>
          <br>
          <h2>${resetToken}</h2>

          <p>If you did not request a password reset, or if you believe this email was sent to you by mistake, please disregard this message. Your account remains secure, and no changes have been made.</p>
          <p>For any further assistance or if you have any questions, please don't hesitate to contact our support team. We're available  24/7 and will be happy to assist you.</p>
          <p>Thank you for choosing Juwsheyaj Hotel. We appreciate your cooperation in maintaining the security of your account.</p>
          <p>Best regards,<br>
        
          Juwsheyaj Hotel Support Team</p>
        </div>
      </body>
      </html>`,
    })
    .catch((err) => console.log(err));
};
module.exports.bookingRecievedEmail = ( bookingId, name, email, roomId) => {

    transport
      .sendMail({
        from: "Juwsheyaj Hotels",
        to: email,
        subject: "Your booking details - Juwsheyaj Hotels",
        html: `<html>
        <head>
          <meta charset="UTF-8">
          <title>Complaint Logged</title>
          <style>
            /* CSS styles */
            body {
              font-family: Arial, sans-serif;
              font-size: 16px;
              line-height: 1.5;
              margin: 0;
              padding: 0;
              background-color: #fff;
              color: #333;
            }
            h1 {
              font-size: 28px;
              font-weight: bold;
              margin-bottom: 16px;
              color: #fff;
              background-color: #881337;
              padding: 16px;
              text-align: center;
            }
            p {
              margin: 0 0 16px;
            }
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              padding: 8px;
              text-align: left;
              vertical-align: middle;
            }
            th {
              background-color: #f2f2f2;
              font-weight: bold;
            }
            tr:hover {
              background-color: #f5f5f5;
            }
            a {
              color: #881337;
              text-decoration: none;
            }
            a:hover {
              text-decoration: underline;
            }
            .button {
              display: inline-block;
              padding: 8px 16px;
              font-size: 16px;
              font-weight: bold;
              color: #fff;
              background-color: #881337;
              border-radius: 4px;
              text-decoration: none;
              text-align: center;
              transition: background-color 0.3s;
            }
            .button:hover {
              background-color: #881337;
            }
            .footer {
              background-color: #f2f2f2;
              color: #666;
              font-size: 14px;
              padding: 16px;
              text-align: center;
            }
            .footer a {
              color: #333;
              text-decoration: none;
            }
            .footer a:hover {
              text-decoration: underline;
            }
            .tracking-link{
              text-align:center;
            }
          </style>
        </head>
        <body>

          <p>Dear ${name},</p>
          <p> Your room booking with ID has been recieved with the following details:</p>
          <br>
          <br>
          <br>
          <table>
            <tr>
              <th style="background-color: #f2f2f2; font-weight: bold;">Your booking ID is ${bookingId}</th>
              <td></td>
            </tr>
          </table>
          <br>
          <br>
          <p>For any further assistance or if you have any questions, please don't hesitate to contact our support team. We're available  24/7 and will be happy to assist you.</p>
          <p>Thank you for choosing Juwsheyaj Hotel. We appreciate your cooperation in maintaining the security of your account.</p>
          <p>Best regards,<br>
        
          Juwsheyaj Hotel Support Team</p>
          <br>
          </div>
          
            </body>
          </html>
      
      
      
      `,
      })
      .catch((err) => console.log(err));
};

module.exports.bookingConfirmedEmail = ( bookingId, name, email, roomId) => {

  transport
    .sendMail({
      from: "Juwsheyaj Hotels",
      to: email,
      subject: "Your booking is confirmed!",
      html: `<html>
      <head>
        <meta charset="UTF-8">
        <title>Complaint Logged</title>
        <style>
          /* CSS styles */
          body {
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.5;
            margin: 0;
            padding: 0;
            background-color: #fff;
            color: #333;
          }
          h1 {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 16px;
            color: #fff;
            background-color: #881337;
            padding: 16px;
            text-align: center;
          }
          p {
            margin: 0 0 16px;
          }
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            padding: 8px;
            text-align: left;
            vertical-align: middle;
          }
          th {
            background-color: #f2f2f2;
            font-weight: bold;
          }
          tr:hover {
            background-color: #f5f5f5;
          }
          a {
            color: #881337;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          .button {
            display: inline-block;
            padding: 8px 16px;
            font-size: 16px;
            font-weight: bold;
            color: #fff;
            background-color: #881337;
            border-radius: 4px;
            text-decoration: none;
            text-align: center;
            transition: background-color 0.3s;
          }
          .button:hover {
            background-color: #881337;
          }
          .footer {
            background-color: #f2f2f2;
            color: #666;
            font-size: 14px;
            padding: 16px;
            text-align: center;
          }
          .footer a {
            color: #333;
            text-decoration: none;
          }
          .footer a:hover {
            text-decoration: underline;
          }
          .tracking-link{
            text-align:center;
          }
        </style>
      </head>
      <body>

        <p>Dear ${name},</p>
        <p> Your room booking has been confirmed with the following details:</p>
        <br>
        <br>
        <br>
        <table>
          <tr>
            <th style="background-color: #f2f2f2; font-weight: bold;">Your booking ID is ${bookingId}</th>
            <td></td>
          </tr>
        </table>
        <br>
        <br>
        <p>For any further assistance or if you have any questions, please don't hesitate to contact our support team. We're available  24/7 and will be happy to assist you.</p>
        <p>Thank you for choosing Juwsheyaj Hotel. We appreciate your cooperation in maintaining the security of your account.</p>
        <p>Best regards,<br>
      
        Juwsheyaj Hotel Support Team</p>
        <br>
        </div>
        
          </body>
        </html>
    
    
    
    `,
    })
    .catch((err) => console.log(err));
};

module.exports.bookingCancelledEmail = ( bookingId, name, email, roomId) => {

  transport
    .sendMail({
      from: "Juwsheyaj Hotels",
      to: email,
      subject: "Your booking has been cancelled!",
      html: `<html>
      <head>
        <meta charset="UTF-8">
        <title>Complaint Logged</title>
        <style>
          /* CSS styles */
          body {
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.5;
            margin: 0;
            padding: 0;
            background-color: #fff;
            color: #333;
          }
          h1 {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 16px;
            color: #fff;
            background-color: #881337;
            padding: 16px;
            text-align: center;
          }
          p {
            margin: 0 0 16px;
          }
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            padding: 8px;
            text-align: left;
            vertical-align: middle;
          }
          th {
            background-color: #f2f2f2;
            font-weight: bold;
          }
          tr:hover {
            background-color: #f5f5f5;
          }
          a {
            color: #881337;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          .button {
            display: inline-block;
            padding: 8px 16px;
            font-size: 16px;
            font-weight: bold;
            color: #fff;
            background-color: #881337;
            border-radius: 4px;
            text-decoration: none;
            text-align: center;
            transition: background-color 0.3s;
          }
          .button:hover {
            background-color: #881337;
          }
          .footer {
            background-color: #f2f2f2;
            color: #666;
            font-size: 14px;
            padding: 16px;
            text-align: center;
          }
          .footer a {
            color: #333;
            text-decoration: none;
          }
          .footer a:hover {
            text-decoration: underline;
          }
          .tracking-link{
            text-align:center;
          }
        </style>
      </head>
      <body>

        <p>Dear ${name},</p>
        <p> Your room booking has been cancelled with the following details:</p>
        <br>
        <br>
        <br>
        <table>
          <tr>
            <th style="background-color: #f2f2f2; font-weight: bold;">Your booking ID is ${bookingId}</th>
            <td></td>
          </tr>
        </table>
        <br>
        <br>
        <p>For any further assistance or if you have any questions, please don't hesitate to contact our support team. We're available  24/7 and will be happy to assist you.</p>
        <p>Thank you for choosing Juwsheyaj Hotel. We appreciate your cooperation in maintaining the security of your account.</p>
        <p>Best regards,<br>
      
        Juwsheyaj Hotel Support Team</p>
        <br>
        </div>
        
          </body>
        </html>
    
    
    
    `,
    })
    .catch((err) => console.log(err));
};

module.exports.complainResolvedEmail = (email, bookingId, name) => {

    transport
      .sendMail({
        from: "Swift Jet Support",
        to: email,
        subject: "Complaint resolved successfully",
        html: `<html>
        <head>
          <meta charset="UTF-8">
          <title>Complaint Logged</title>
          <style>
            /* CSS styles */
            body {
              font-family: Arial, sans-serif;
              font-size: 16px;
              line-height: 1.5;
              margin: 0;
              padding: 0;
              background-color: #fff;
              color: #333;
            }
            h1 {
              font-size: 28px;
              font-weight: bold;
              margin-bottom: 16px;
              color: #fff;
              background-color: #881337;
              padding: 16px;
              text-align: center;
            }
            p {
              margin: 0 0 16px;
            }
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              padding: 8px;
              text-align: left;
              vertical-align: middle;
            }
            th {
              background-color: #f2f2f2;
              font-weight: bold;
            }
            tr:hover {
              background-color: #f5f5f5;
            }
            a {
              color: #881337;
              text-decoration: none;
            }
            a:hover {
              text-decoration: underline;
            }
            .button {
              display: inline-block;
              padding: 8px 16px;
              font-size: 16px;
              font-weight: bold;
              color: #fff;
              background-color: #881337;
              border-radius: 4px;
              text-decoration: none;
              text-align: center;
              transition: background-color 0.3s;
            }
            .button:hover {
              background-color: #881337;
            }
            .footer {
              background-color: #f2f2f2;
              color: #666;
              font-size: 14px;
              padding: 16px;
              text-align: center;
            }
            .footer a {
              color: #333;
              text-decoration: none;
            }
            .footer a:hover {
              text-decoration: underline;
            }
            .tracking-link{
              text-align:center;
            }
          </style>
        </head>
        <body>

          <p>Dear ${name},</p>
          <p> Your complaint has been resolved with the following details:</p>
          <br>
          <br>
          <br>
          <table>
            <tr>
              <th style="background-color: #f2f2f2; font-weight: bold;">Your complaint tracking ID is ${bookingId}</th>
              <td></td>
            </tr>
          </table>
          <br>
          <br>
          <br>
          </div>
          
            </body>
          </html>
      
      
      
      `,
      })
      .catch((err) => console.log(err));
};

module.exports.bookingInProcess = (email, booking_number, name) => {
  transport
    .sendMail({
      from: "Swift Jet Support",
      to: email,
      subject: "We are computing our Available flight options",
      html: `<html>
      <head>
        <meta charset="UTF-8">
         <title>Booking Confirmation</title>
        <style>
          /* CSS styles */
          body {
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.5;
            margin: 0;
            padding: 0;
            background-color: #fff;
            color: #333;
          }
          h1 {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 16px;
            color: #fff;
            background-color: #881337;
            padding: 16px;
            text-align: center;
          }
          p {
            margin: 0 0 16px;
          }
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            padding: 8px;
            text-align: left;
            vertical-align: middle;
          }
          th {
            background-color: #f2f2f2;
            font-weight: bold;
          }
          tr:hover {
            background-color: #f5f5f5;
          }
          a {
            color: #881337;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          .button {
            display: inline-block;
            padding: 8px 16px;
            font-size: 16px;
            font-weight: bold;
            color: #fff;
            background-color: #881337;
            border-radius: 4px;
            text-decoration: none;
            text-align: center;
            transition: background-color 0.3s;
          }
          .button:hover {
            background-color: #881337;
          }
          .footer {
            background-color: #f2f2f2;
            color: #666;
            font-size: 14px;
            padding: 16px;
            text-align: center;
          }
          .footer a {
            color: #333;
            text-decoration: none;
          }
          .footer a:hover {
            text-decoration: underline;
          }
          .tracking-link{
            text-align:center;
          }
        </style>
      </head>
      <body>
        <h1 style="background-color: #881337; color: #fff; padding: 16px; text-align: center;">Booking Confirmation</h1>
        <p>Dear ${name},</p>
        <p>Your booking is currently being processed, and we are checking our available flight options to serve you best</p>
        <br>
        <br>
        <br>
        <table>
          <tr>
            <th style="background-color: #f2f2f2; font-weight: bold;">Your flight booking number is ${booking_number}</th>
            <td></td>
          </tr>
        </table>
        <br>
        <br>
        <br>
        <p>Please keep this email as your receipt for the booking. If you have any questions or concerns, please contact us at <a href="mailto:support@swiftwingsjet.com">support@swiftwingsjet.com</a>.</p>
        <p>To track your booking, please click the button below:</p>
        <p class="tracking-link"><a href="[Tracking URL]" class="button" style="background-color: #881337; color: #fff; display: inline-block; font-size: 16px; font-weight: bold; padding: 8px 16px; text-align: center; text-decoration
        :none; border-radius: 4px;">Track Booking</a></p>
        <br>
        <br>
        <br>
        <div class="footer">
        <p>Thank you for choosing SwiftWings!</p>
        <p>If you have any questions, please contact us at <a href="mailto:support@swiftwingsjet.com">support@swiftwingsjet.com</a>.</p>
        <p><a href="#">Privacy Policy</a> | <a href="#">Terms and Conditions</a></p>
        </div>
        
          </body>
        </html>
    
    
    
    `,
    })
    .catch((err) => console.log(err));
};
module.exports.bookingCancelled = (email, booking_number, name) => {
  transport
    .sendMail({
      from: "Swift Jet Support",
      to: email,
      subject: "Booking Cancellation Notice",
      html: `<html>
      <head>
        <meta charset="UTF-8">
         <title>Booking Confirmation</title>
        <style>
          /* CSS styles */
          body {
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.5;
            margin: 0;
            padding: 0;
            background-color: #fff;
            color: #333;
          }
          h1 {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 16px;
            color: #fff;
            background-color: #881337;
            padding: 16px;
            text-align: center;
          }
          p {
            margin: 0 0 16px;
          }
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            padding: 8px;
            text-align: left;
            vertical-align: middle;
          }
          th {
            background-color: #f2f2f2;
            font-weight: bold;
          }
          tr:hover {
            background-color: #f5f5f5;
          }
          a {
            color: #881337;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          .button {
            display: inline-block;
            padding: 8px 16px;
            font-size: 16px;
            font-weight: bold;
            color: #fff;
            background-color: #881337;
            border-radius: 4px;
            text-decoration: none;
            text-align: center;
            transition: background-color 0.3s;
          }
          .button:hover {
            background-color: #881337;
          }
          .footer {
            background-color: #f2f2f2;
            color: #666;
            font-size: 14px;
            padding: 16px;
            text-align: center;
          }
          .footer a {
            color: #333;
            text-decoration: none;
          }
          .footer a:hover {
            text-decoration: underline;
          }
          .tracking-link{
            text-align:center;
          }
        </style>
      </head>
      <body>
        <h1 style="background-color: #881337; color: #fff; padding: 16px; text-align: center;">Booking Cancellation Email</h1>
        <p>Dear ${name},</p>
        <p>Following your request, this is to inform you that your booking has been cancelled. Please reach out to us if you need any assistance.</p>
        <br>
        <br>
        <br>
        <table>
          <tr>
            <th style="background-color: #f2f2f2; font-weight: bold;">Your flight booking number is ${booking_number}</th>
            <td></td>
          </tr>
        </table>
        <br>
        <br>
        <br>
        <br>
        <br>
        <div class="footer">
        <p>Thank you for choosing SwiftWings!</p>
        <p>If you have any questions, please contact us at <a href="mailto:support@swiftwingsjet.com">support@swiftwingsjet.com</a>.</p>
        <p><a href="#">Privacy Policy</a> | <a href="#">Terms and Conditions</a></p>
        </div>
        
          </body>
        </html>
    
    
    
    `,
    })
    .catch((err) => console.log(err));
};
module.exports.bookingRecievedAdminEmail = (email, booking_number, name) => {
  transport
    .sendMail({
      from: "Swift Jet Support",
      to: "charter@swiftwingsjet.com",
      subject: "New Flight Booking",
      html: `<html>
      <head>
        <meta charset="UTF-8">
        <title>New Booking Alert</title>
        <style>
          /* CSS styles */
          body {
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.5;
            margin: 0;
            padding: 0;
            background-color: #fff;
            color: #333;
          }
          h1 {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 16px;
            color: #fff;
            background-color: #881337;
            padding: 16px;
            text-align: center;
          }
          p {
            margin: 0 0 16px;
          }
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            padding: 8px;
            text-align: left;
            vertical-align: middle;
          }
          th {
            background-color: #f2f2f2;
            font-weight: bold;
          }
          tr:hover {
            background-color: #f5f5f5;
          }
          a {
            color: #881337;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          .button {
            display: inline-block;
            padding: 8px 16px;
            font-size: 16px;
            font-weight: bold;
            color: #fff;
            background-color: #881337;
            border-radius: 4px;
            text-decoration: none;
            text-align: center;
            transition: background-color 0.3s;
          }
          .button:hover {
            background-color: #881337;
          }
          .footer {
            background-color: #f2f2f2;
            color: #666;
            font-size: 14px;
            padding: 16px;
            text-align: center;
          }
          .footer a {
            color: #333;
            text-decoration: none;
          }
          .footer a:hover {
            text-decoration: underline;
          }
          .tracking-link{
            text-align:center;
          }
        </style>
      </head>
      <body>
  
        <p>Dear Admin</p>
  
        <br>
        <br>
        <table>
          <tr>
            <th style="background-color: #f2f2f2; font-weight: bold;">${name} with email ${email} has booked a flight booking with booking ID ${booking_number}</th>
            <td></td>
          </tr>
        </table>
        <br>
        <br>
        <br>
        <p>Please treat as urgent</p>
        </div>
        
          </body>
        </html>
    
    
    
    `,
    })
    .catch((err) => console.log(err));
};
