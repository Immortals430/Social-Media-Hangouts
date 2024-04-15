import { createTransport } from "nodemailer"
import smtp from 'nodemailer-smtp-transport';


const transporter = createTransport(smtp({
    "service": process.env.NODEMAILER_SERVICE,
    "auth": { 
              "user":  process.env.NODEMAILER_USER,
              "pass":  process.env.NODEMAILER_PASS
            }
    }));

export const sendResetLinkMail = async (user, otp) => {
    try{
        const res = await transporter.sendMail({
            from: process.env.NODEMAILER_USER,
            to: user,
            subject: `One-Time Password (OTP) Confirmation for ${user}  ${new Date().toLocaleDateString()}`,
            html: `<h3>${otp}</h3>`
               
        })
        console.log(res)
    }
    catch(err){
        console.log(err)
    }
}


export const sendAccountCreationLink = async (user, link) => {
    try{
        const res = await transporter.sendMail({
            from: process.env.NODEMAILER_USER,
            to: user,
            subject: `Account confirmation for ${user}  ${new Date().toLocaleDateString()}`,
            html: `<html>
            <head>
            <body>        
                <p>Click on Link to confirm your account creation <a href="${process.env.SERVERURL}/api/v1/user/confirm-account/?link=${link}">Create Account</button></p>                     
            </body>
            </head>
            </html>
          `
               
        })
        console.log(res)
    }
    catch(err){
        console.log(err)
    }
}


















// `    
//                     <style>
//                     *{
//                         margin: 0;
//                         padding: 0;
//                         box-sizing: border-box;
//                     }
//                     body{
//                         text-align: center;
//                         font-weight: 600;
//                         font-size: larger;
//                         font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
//                         background-color: aliceblue;
//                         padding-top: 50px;
//                     }
//                     main{
//                         margin-top: 50px;
//                         margin-bottom: 50px;
//                     }
//                     .otp{
//                         width: 200px;
//                         margin: auto;
//                         margin-top: 50px;
//                         background-color: rgb(188, 255, 233);
//                     }
//                     a{
//                         color: red;
//                     }              
//                 </style>
//                 <h1>PROJECT NAME</h1>
//                 <main>
//                     <p>Use this otp to change your password</p>
//                     <div class="otp" onclick="reveal()"> 
//                         <h1 id="otp">****</h1>
//                         <p>click to reveal otp</p>
//                     </div>
            
//                 </main>
//                 <footer>
//                     <p>If this wasn't you, click <a href="">here</a> to delete open sessions. Do not share your OTP anyone under any circumstances. Change your password from <a href="">here</a></p>
//                 </footer>
            
//                 <script>
//                     function reveal(){
//                     document.getElementById('otp').innerText = ${otp}
//                     }
//                 </script>
//                 `