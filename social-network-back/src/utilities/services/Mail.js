const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);



const sendMailAsync=( to='test@example.com',
                      link='',
                      subject='Confirm account',
                      )=>{

    const html=`<div>
                    <a href=${link}>Click Here</a>
                </div>`
    
    const msg={to,from: 'akash.se.sust@gmail.com',subject,html};  
  

    return new Promise((resolve,reject)=>{
          try {      
              sgMail.send(msg);
              resolve(true)
          } catch (error) {
            reject(false)
          }
    })
                        
}

module.exports=sendMailAsync

