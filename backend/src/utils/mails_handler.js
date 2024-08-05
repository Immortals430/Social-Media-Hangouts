import transporter from "../middlewares/nodemailer.js";

export const sendAccountCreationLink = async (user, id) => {
  try {
    const res = await transporter.sendMail({
      from: process.env.NODEMAILER_USER,
      to: user,
      subject: `Account confirmation for ${user}  ${new Date().toLocaleDateString()}`,
      html: `<html>
              <head>
              <body>        
                  <p>Click on Link to confirm your account creation <a href="${process.env.SERVERURL}/api/v1/user/confirm-signup/${id}">Create Account</button></p>                     
              </body>
              </head>
              </html>
            `,
    });
    console.log("email sent to", res.accepted);
  } catch (err) {
    console.log(err);
  }
};




export const sendResetLinkMail = async (user, otp) => {
  try {
    const res = await transporter.sendMail({
      from: process.env.NODEMAILER_USER,
      to: user,
      subject: `One-Time Password (OTP) Confirmation for ${user}  ${new Date().toLocaleDateString()}`,
      html: `<h3>${otp}</h3>`,
    });
    console.log("otp sent to", res.accepted);
  } catch (err) {
    console.log(err);
  }
};