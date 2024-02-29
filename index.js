const express= require("express");
const bodyParser = require('body-parser');

const app= express();


	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

    app.get("/", (req, res)=>{
        res.send("Welcome to BMI calculator")
    })
	
	// Endpoint to calculate BMI
	app.post('/calculateBMI', (req, res) => {
	    const { height, weight } = req.body;
	    
	    // Input validation
	    if (!height || !weight || isNaN(height) || isNaN(weight)) {
	        return res.status(400).json({ error: 'Invalid input. Height and weight must be numeric values.' });
	    }
	    
	    // Calculate BMI
	    const heightInMeters = height / 100; // Convert height to meters
	    const bmi = weight / (heightInMeters * heightInMeters);
	
	    // Determine interpretation
	    let interpretation;
	    if (bmi < 18.5) {
	        interpretation = 'Underweight';
	    } else if (bmi >= 18.5 && bmi <= 24.9) {
	        interpretation = 'Normal weight';
	    } else if (bmi >= 25 && bmi <= 29.9) {
	        interpretation = 'Overweight';
	    } else {
	        interpretation = 'Obese';
	    }
	
	    res.json({ bmi, interpretation });
	});


app.listen(8080, ()=>{
    console.log("server is running at port 8080")
})