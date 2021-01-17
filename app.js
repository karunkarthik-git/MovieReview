const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const request = require('request')
// "request" -> npm package to request data from api

app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/search',(req,res)=>{
    res.render('search');
})

app.get('/resultpage',(req,res)=>{
    // req is request
    //query is a method
    //search is name of field in search.ejx
    let queryMade = req.query.search;

    request('https://api.themoviedb.org/3/search/movie?api_key=e8883b4a0deab053e03698ceb4373b45&query='+queryMade,(error,response,body)=>{
        if(error){
            console.log(error);
        }
        // body will be in string so it is parsed into JSON format
        let data = JSON.parse(body);
        res.render('movies',{data:data,searchQuery:req.query});  
    })
})

app.listen(3000,()=>{
    console.log('Listening on port 3000!');
})



{/* <img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2<%=movie['poster_path']%>" class="card-img img-fluid" /> */}