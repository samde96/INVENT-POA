import nodemailer from "nodemailer"

const  sendEmail = async (subject, message, send_to, sent_from, reply_to) => {

    // create Email transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false  //not compulsory  only if you get 'not secure'
        }
    })

 
        // Options

        const options = {
            from: sent_from,
            to: send_to,
            replyTo: reply_to,
            subject: subject,
            html: message,

        }

        // send the email

        transporter.sendMail(options, function (err, info) {
            if(err) {
                console.log(err)
                
            } else{
                console.log(info)
            }
           
        })
};

export default sendEmail;