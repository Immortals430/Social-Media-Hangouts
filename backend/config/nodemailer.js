import { createTransport } from "nodemailer"


const transporter = createTransport({
    "service": process.env.NODEMAILER_SERVICE,
   
    "host":  process.env.NODEMAILER_HOST,
    "port":  process.env.NODEMAILER_PORT,
    "secure":  process.env.NODEMAILER_SECURE,
    "auth": { 
              "user":  process.env.NODEMAILER_USER,
              "pass":  process.env.NODEMAILER_PASS
            }
    }); 


export const sendResetLinkMail = async (user, otp) => {
    try{
        const res = await transporter.sendMail({
            from: process.env.NODEMAILER_USER,
            to: user,
            subject: 'One-Time Password (OTP) Confirmation',
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
            subject: 'Account confirmation',
            html: `<html>
            <head>
            <body>
                <form action="${process.env.SERVERURL}/api/v1/user/signup/?link=${link}" method="post" >
                    <p>Click on Link to confirm your account creation <button type="submit">Create Account</button></p>                   
                </form>
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