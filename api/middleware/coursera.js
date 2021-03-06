//const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
//require('dotenv').config();
const mongoose = require('mongoose');
const puppeteer = require('puppeteer-extra');
const Search = require('../models/search');
const Skill = require('../models/skills');

module.exports = (req, res, next) => {
	//const decoded = jwt.decode();
	try{
		//const token = req.headers.authorization.split(" ")[1];
		//console.log(token);
		//const decoded = jwt.verify(token, process.env.JWT_KEY);	
		//req.userData = decoded;
		const query = new Search({
						q: req.body.q
					});
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

async function scrapeProduct(url) {
	
	puppeteer.launch({ headless: true }).then(async browser => {
	console.log('Running tests.. inside middleware');
	const page = await browser.newPage();
	await page.goto(url);
	await page.waitFor(5000);
	
	
	
let data = await page.evaluate(() =>{	
//
	// var skus = document.querySelectorAll('div[class="udlite-heading-sm udlite-focus-visible-target course-card--course-title--2f7tE"],div[class="price-text--price-part--Tu6MH course-card--discount-price--3TaBk udlite-heading-md"] >span >span, div[class="udlite-text-xs course-card--instructor-list--lIA4f"]');
	// //
	// return [...skus,].map(function(el) {

	// }); 
	//var courseName = document.querySelectorAll('div[class="horizontal-box"]');
	var courseName = document.querySelectorAll('h2[class="color-primary-text card-title headline-1-text"]');
	//var price = document.querySelectorAll('div[class="price-text--price-part--Tu6MH course-card--discount-price--3TaBk udlite-heading-md"] >span >span');
	
	var instructorName = document.querySelectorAll(".partner-name");
	var link = document.querySelectorAll('li[class="ais-InfiniteHits-item"] >div >a');
	//
	//var json = JSON.stringify(price);
	//return courseName;
	//,price:[""]  courseName 
	var json = {courseName:["wow"],instructorName:["wow"],link:["wow"]};
	for(let i = 0; i < courseName.length; i++){
		json.courseName.push(JSON.stringify(courseName[i].innerText));
		//json.price.push(JSON.stringify(price[i].innerText));
		json.instructorName.push(JSON.stringify(instructorName[i].innerText));
		json.link.push(JSON.stringify(link[i].href));
	}
	
		return json;

	
});

				const skill = new Skill({
						nameSkill: query.q,
						Courses: [ {NameofCourse: data.courseName[1], Price: data.instructorName[1],LinkToCourse: data.link[1]},
									{NameofCourse: data.courseName[2], Price: data.instructorName[2],LinkToCourse: data.link[2]},
									{NameofCourse: data.courseName[3], Price: data.instructorName[3],LinkToCourse: data.link[3]},
									{NameofCourse: data.courseName[4], Price: data.instructorName[4],LinkToCourse: data.link[4]},]
					});
					console.log('YYYYYYYYYYYYY');
					skill
					.save()
					.then(result => {
						console.log(result);
					})
					.catch(err => {
						console.log(err);
						res.status(500).json({
								error: err
						})
					});





console.log(data);
browser.close();
								//res.status(200).json({
								//	message:'Search Results from HARVARD !',
								//	query: query.q,
								//	Data: data
								//});
				
		});
}

//var query = 'web';
scrapeProduct('https://www.coursera.org/search?query='+ query.q);		
		next();
	}
	catch(error){
		return res.status(401).json({
			message: 'Authorizationss Coursera Failed'
		});
	}
	
	
};