const express = require('express');
const fileRoutes = express.Router();

fileRoutes
    .get('/', (req,res) => {
        res.render('index', { isAuthenticated: req.session.isAuthenticated, user: req.session.user });
    })
    .get('/index', (req,res) => {
        res.render('index', { isAuthenticated: req.session.isAuthenticated, user: req.session.user });
    })
    .get('/Delivery&Payment', (req, res) => {
        res.render('Delivery&Payment')
    })
    .get('/profile', (req, res) => {
        res.render('profile')
    })
    .get('/login', (req, res) => {
        res.render('login')
    })
    .get('/ExploreMenu', (req, res) => {
        res.redirect('/index#ExploreMenu')
    })
    .get('/registerPage', (req, res) => {
        res.redirect('/login')
    })
    .get('/passwordChangedSuccessfully', (req, res) => {
        res.render('/pwdUpdate')
    })
    .get('/DosaVarieties', (req, res) => {
        try{       
            res.render('./foodItem pages/DosaVariety.ejs');
        }catch(e){
            console.error(e.message);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/IdliVarieties', (req, res) => {
        try{
            res.render('./foodItem pages/IdliVarieties.ejs')
        }catch(e){
            console.error(e.message);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/PongalVarieties', (req, res) => {
        try{
            res.render('./foodItem pages/pongal.ejs')
        }catch(e){
            console.error(e.message);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/PakorasVarieties', (req, res) => {
        try{
            res.render('./foodItem pages/pakora.ejs')
        }catch(e){
            console.error(e.message);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/SamosasVarieties', (req, res) => {
        try{
            res.render('./foodItem pages/samosa.ejs')
        }catch(e){
            console.error(e.message);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/ChaatVarieties', (req, res) => {
        try{
            res.render('./foodItem pages/chaat.ejs')
        }catch(e){
            console.error(e.message);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/TikkasVarieties', (req, res) => {
        try{
            res.render('./foodItem pages/tikkas.ejs')
        }catch(e){
            console.error(e.message);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/VegetarianVarieties', (req, res) => {
        try{
            res.render('./foodItem pages/veg.ejs')
        }catch(e){
            console.error(e.message);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/Non-VegetarianVarieties', (req, res) => {
        try{
            res.render('./foodItem pages/non-veg.ejs')
        }catch(e){
            console.error(e.message);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/RiceVarieties', (req, res) => {
        try{
            res.render('./foodItem pages/rice.ejs')
        }catch(e){
            console.error(e.message);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/RotiVarieties', (req, res) => {
        try{
            res.render('./foodItem pages/roti.ejs')
        }catch(e){
            console.error(e.message);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/ParathasVarieties', (req, res) => {
        try{
            res.render('./foodItem pages/paratha.ejs')
        }catch(e){
            console.error(e.message);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/IndianSweetsVarieties', (req, res) => {
        try{
            res.render('./foodItem pages/IndianSweets.ejs')
        }catch(e){
            console.error(e.message);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/HalwaVarietiesVarieties', (req, res) => {
        try{
            res.render('./foodItem pages/HalwaVarieties.ejs')
        }catch(e){
            console.error(e.message);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/ColdBeveragesVarieties', (req, res) => {
        try{
            res.render('./foodItem pages/ColdBeverages.ejs')
        }catch(e){
            console.error(e.message);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/HotBeverageVarieties', (req, res) => {
        try{
            res.render('./foodItem pages/HotBeverage.ejs')
        }catch(e){
            console.error(e.message);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/SouthIndianVarieties', (req, res) => {
        try{
            res.render('./foodItem pages/SouthIndian.ejs')
        }catch(e){
            console.error(e.message);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/NorthIndianVarieties', (req, res) => {
        try{
            res.render('./foodItem pages/NorthIndian.ejs')
        }catch(e){
            console.error(e.message);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/EastIndianVarieties', (req, res) => {
        try{
            res.render('./foodItem pages/EastIndian.ejs')
        }catch(e){
            console.error(e.message);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/WestIndianVarieties', (req, res) => {
        try{
            res.render('./foodItem pages/WestIndian.ejs')
        }catch(e){
            console.error(e.message);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/puriiVarieties', (req, res) => {
        try{
            res.render('./foodItem pages/purii.ejs')
        }catch(e){
            console.error(e.message);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/vadaVarieties', (req, res) => {
        try{
            res.render('./foodItem pages/vadaVarieties.ejs')
        }catch(e){
            console.error(e.message);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/Sandwiches', (req, res) => {
        try{
            res.render('./foodItem pages/Sandwiches.ejs')
        }catch(e){
            console.error(e.message);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/StreetFoods', (req, res) => {
        try{
            res.render('./foodItem pages/StreetFoods.ejs')
        }catch(e){
            console.error(e.message);
            res.status(500).json({ message: 'Server error' });
        }
    })

    
module.exports = fileRoutes; 
