const sgMail = require('@sendgrid/mail');
SENDGRID_API_KEY="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"
sgMail.setApiKey(SENDGRID_API_KEY);



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

