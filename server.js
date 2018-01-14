const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port  = process.env.PORT;

app.set('view engine','hbs');

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n',(err) => {
      if(err) {
        console.log('Unable to append Server log.');
      }
    });
    next();
});

  // app.use((req,res,next)=> {
  //   res.render('maintenance.hbs');
  // });
app.use(express.static(__dirname+'/public'));
hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt",(text)=> {
    return text.toUpperCase();
});

app.get('/',(req,res) => {
    // res.send("<marquee scrollamount='100' scrolldelay='60'><h1>Hello Punjab Express!!</h1></marquee>");
    res.render("home.hbs",{
      person:{name:"Prashanth",age:15},
      pageTitle:"Home Page",
      currentYear:new Date().getFullYear()
    });

});

app.get('/about',(req,res) => {
      res.render("about.hbs",{
        pageTitle:"About Page",
        currentYear:new Date().getFullYear()
      });
});

app.get('/bad',(req,res)=>{
    res.send({errorMessage:"unable to handle request"});
});
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
