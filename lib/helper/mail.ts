import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.FROM_MAIL_ADDRESS,
    pass: process.env.GOOGLE_APP_PASSWORD, // The 16-character App Password
  },
});

export const sendMail = async (
  toMailAddress: string,
  subject: "VERIFY" | "FORGET_PASSWORD",
  code: string
) => {
  console.log("here in senidng mail");
  try {
    await transporter.sendMail({
      from: process.env.FROM_MAIL_ADDRESS,
      to: process.env.FROM_MAIL_ADDRESS,
      subject:
        subject === "FORGET_PASSWORD"
          ? "Password Reset"
          : "Verify Your Account",

      html:
        subject === "VERIFY"
          ? `<h3>Please Click on the Link to Verify Your account </h3> <br/> <a href="http://localhost:3000/verify?verifiyToken=${encodeURIComponent(
              code
            )}">Click Here..</a>`
          : `<h3>Please Click on the Link to Reset Your account's Password </h3> <br/> <a href="http://localhost:3000/reset?resetToken=${encodeURIComponent(
              code
            )}">Click Here to reset..</a>`,
    });
    console.log("Mail send successfully!");
  } catch (err) {
    console.log("Error in sending mail: ", err);
  }
};
