const express = require('express');

const router = express.Router(); // Changed `Router` to `router` to match express syntax
const signUpTemplateCopy = require('../model/SignupModel');

router.post('/signup', (request, response) => {
    const signedUpUser = new signUpTemplateCopy({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
        contact: request.body.contact,
        age: request.body.age,
        jobRole: request.body.jobRole
    });
    signedUpUser
        .save()
        .then(data => {
            response.json(data);
            console.log('Data added successfully');
        })
        .catch(error => {
            response.json(error);
        });
}); // Fixed extra closing braces issue

module.exports = router; // Added export to make the router usable in other files
