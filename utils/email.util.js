const nodemailer = require('nodemailer'); 

exports.sendMail=async(from,to, subject, text)=>{
    try {
const transporter = nodemailer.createTransport({ 
	service: 'gmail', 
	auth: { 
		user:process.env.USER,
		pass:process.env.PASS,
	} 
}); 
	

const mailConfigurations = { 
	from, 
	to,
	subject,
	text,
  }; 


const info=await transporter.sendMail(mailConfigurations)
 console.log(info); 

} catch(error) {
console.log(error);
}
}