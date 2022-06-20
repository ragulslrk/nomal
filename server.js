const  express=require("express")
const mongoose=require("mongoose")  
const user=require("./model/user")
const  bcrypt=require('bcrypt')
const app=express()
app.use(express.urlencoded({extended:true}));
require("dotenv").config()
//mongo db connection 

mongoose.connect( process.env.db,{useNewUrlParser: true,useUnifiedTopology: true})
    .then((res)=>{
        app.listen(process.env.PORT ||3232,()=>{
        console.log("listening nomal")
    })
  
    console.log("success nomal")})
    .catch((err)=>{console.log(err)})

    app.get('/',(req,res)=>{
        res.send('this is  home page')
    })
   

    app.post('/signup_lucid',(req,res)=>{
        console.log('in signup')
        console.log(req.body.fname)
          
          user.findOne({username:req.body.username})
          .then((result)=>{
              if(result)
              {   
                 
                   res.status(400).send('already exists')
              }
              else{
                      const  salt=bcrypt.genSalt(10)
                      const pass=req.body.password.toString();
                      bcrypt.hash(pass,parseInt(salt))
                      .then((hash)=>{
                          const user_data=new user({
                              "username":req.body.username,
                              "password":hash,
                              "fname":req.body.fname,
                              "email":req.body.email
                              
                          })
                          user_data.save()
                          sucess=sucess+1
                          if(sucess>0)
                            {
                              sucess=0
                              console.log('in sign')
                              res.send('created')
                              console.log("user created")
                            }
                            else{
                              res.status(404)
                            }
                            }
                            
                            )
                            
      
              .catch(err=>{
                  res.send(err)})
                  
      
              }
              
         })
         .catch(err=>{
             res.send(err)
         })
      
      
      })

    var error=0;
app.post('/login_lucid',(req,res)=>{
    console.log(req.body)
    user.findOne({username:req.body.username})
    .then((result)=>{
        
        if(result===null)
        {
            res.sendStatus(400)
        }
        else{
            bcrypt.compare(req.body.password,result.password,(err,resu)=>{
                if(err){error=error+1}
                if(resu==false){error=error+1}
                console.log(result)
                console.log(error)
            if(error>0)
            {       error=0
                    res.sendStatus(400)          }
            else{
                console.log('api send')
                res.send(result)
            }
                
            })
            
            
        }
    })
})