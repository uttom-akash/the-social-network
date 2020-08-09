const sgMail = require("@sendgrid/mail");
SENDGRID_API_KEY =
  "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";
sgMail.setApiKey(SENDGRID_API_KEY);

const sendMailAsync = (
  to = "test@example.com",
  link = "",
  subject = "Confirm account"
) => {
  const html = `<div>
                    <a href=${link}>Click Here</a>
                </div>`;

  const msg = { to, from: "akash.se.sust@gmail.com", subject, html };

  return new Promise((resolve, reject) => {
    try {
      sgMail.send(msg);
      resolve(true);
    } catch (error) {
      reject(false);
      console.log(error.message);
    }
  });
};

module.exports = sendMailAsync;
