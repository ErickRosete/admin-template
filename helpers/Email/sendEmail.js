
// // codigo ejemplo  https://nodemailer.com/about/
// // config zoho https://www.zoho.com/mail/help/zoho-smtp.html
// // email zoho https://mail.zoho.com/zm/#settings/all/mailaccounts
// // mxtoolbox https://mxtoolbox.com/SuperTool.aspx?action=mx%3azoho._domainkey.oscarrosete.com&run=toolpage#
// // mx lookup oscarrosete.com
// // namesilo manage domain name https://www.namesilo.com/account_domain_manage_dns.php
// // domain status https://mail.zoho.com/cpanel/index.do?tabmode=domain#domains

"use strict";
const nodemailer = require("nodemailer");

exports.sendEmail = async (emailInfo) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.zoho.com",
            port: 465,
            auth: {
                user:"admin@oscarrosete.com",
                pass:"LiaAshanti1!"
            }
        });

        // setup email data with unicode symbols
        const mailOptions = {
            from: '"Oscar Rosete 👻" <admin@oscarrosete.com>', // sender address
            to: emailInfo.to, // list of receivers
            subject: emailInfo.subject, // Subject line
            html: emailInfo.htmlContent // html body
        };
        console.log("dentro de sendEmail")
        console.log(mailOptions.subject)
        // send mail with defined transport object
        const info = await transporter.sendMail(mailOptions)

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// // module.exports = {

// // async..await is not allowed in global scope, must use a wrapper
//     const main= async  (message) => {
//     console.log("hello")
//     // "use strict";
//     const nodemailer = require("nodemailer");
//     // Generate test SMTP service account from ethereal.email
//     // Only needed if you don't have a real mail account for testing
//         // let account = await nodemailer.createTestAccount();

//         // create reusable transporter object using the default SMTP transport
//         let transporter = nodemailer.createTransport({
//             host: "smtp.zoho.com",
//             port: 465,
//             secure: true, // true for 465, false for other ports
//             auth: {
//             //   user: account.user, // generated ethereal user
//             //   pass: account.pass // generated ethereal password
//             user:"admin@oscarrosete.com",
//             pass:"LiaAshanti1!"
//             }
//         });

//         // setup email data with unicode symbols
//         let mailOptions = {
//             from: '"Oscar Rosete 👻" <admin@oscarrosete.com>', // sender address
//             to: "oscaralonso11@outlook.com, oscaralonso11@hotmail.com", // list of receivers
//             subject: "Hello ✔", // Subject line
//             text: message, // plain text body
//             html: "<b>Hello world?</b>" // html body
//         };

//         // send mail with defined transport object
//         let info = await transporter.sendMail(mailOptions)

//         console.log("Message sent: %s", info.messageId);
//         // Preview only available when sending through an Ethereal account
//         console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

//         // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//         // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        
//     }
// // }
// // main().catch(console.error);
// // module.exports.main=main;
// export {main}