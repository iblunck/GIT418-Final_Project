// Enforce strict mode for better error checking
"use strict";
// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Select input fields and elements used later in the script
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const successMessage = document.getElementById('successMessage');
    const contactForm = document.getElementById('contactForm');
    const toggle = document.getElementById('mode-toggle');
    const body = document.body;

    // Set initial theme based on saved preference in localStorage
    if (localStorage.getItem('theme') === 'dark') {
        // Add dark mode class
        body.classList.add('dark-mode');
        toggle.checked = true;
    } else {
        // Default to light mode
        body.classList.add('light-mode');
    }
    // Event listener for the theme toggle checkbox
    toggle.addEventListener('change', () => {
        if (body.classList.contains('dark-mode')) {
            console.log('Switching to light mode');
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            console.log('Switching to dark mode');
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        }
    });
    // Variables for managing the product display
    let currentItem = null;
    const buttons = document.querySelectorAll('#switcherButtons button');
    const products = document.querySelectorAll('#products section');

    // Initially hide all products except the first one
    products.forEach(product => {
        if (product.classList.contains('currentItem')) {
            product.classList.remove('hiddenItem');
            currentItem = product;
        } else {
            product.classList.add('hiddenItem');
        }
    });
    // Event listeners for product switcher buttons
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            console.log(`Button clicked: ${targetId}`);
            if (currentItem) {
                currentItem.classList.add('hiddenItem');
                currentItem.classList.remove('currentItem');
                console.log(`Hiding: ${currentItem.id}`);
            }
            // Hide all products
            products.forEach(product => {
                product.classList.add('hiddenItem');
                console.log(`Hiding: ${product.id}`);
            });
            // Show the selected product
            if (targetId) {
                const targetProduct = document.getElementById(targetId);
                if (targetProduct) {
                    targetProduct.classList.remove('hiddenItem');
                    currentItem = targetProduct;
                    console.log(`Showing: ${targetProduct.id}`);
                }
            }
        });
    });
    // Select the form and necessary elements for the guessing game
    const form = document.querySelector('form');
    const numGuessInput = document.getElementById('numGuess');
    const userNumDisplay = document.querySelector('#userNum span');
    const randomNumDisplay = document.querySelector('#randomNum span');
    const gameMsg = document.getElementById('gameMsg');
    const errorMsg = document.getElementById('errorMsg');
    // Handle form submission for the guessing game
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        const userGuess = parseInt(numGuessInput.value);
        // const userGuess = Number(numGuessInput.value.trim());
        const randomNum = Math.floor(Math.random() * 10) + 1; // Generate a random number between 1 and 10
        errorMsg.style.display = 'none';
        gameMsg.textContent = ''; // Clear previous game messages
        // Validate user input
        if (userGuess < 1 || userGuess > 10 || isNaN(userGuess)) {
            errorMsg.style.display = 'block'; 
            gameMsg.style.display = 'none';
            return;
        }
        userNumDisplay.textContent = userGuess; // Display user's guess
        randomNumDisplay.textContent = randomNum; // Display the generated number
        // Check if the user's guess matches the random number
        if (userGuess === randomNum) {
            gameMsg.textContent = 'Congratulations! You guessed the winning number!';
        } else {
            gameMsg.textContent = 'Sorry! Try again.';
        }
        gameMsg.style.display = 'block';
    });
    // Handle submission for the contact form
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        clearMessages();
        let isValid = true;
        // Validate name input
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Please enter your full name.');
            isValid = false;
        }
        // Validate name input
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Please enter a valid email address.');
            isValid = false;
        } else if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email address.');
            isValid = false;
        }
        // Validate phone input
        if (phoneInput.value.trim() === '') {
            showError(phoneInput, 'Please enter a phone number.');
            isValid = false;
        }
        // Validate message input
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Please enter a message.');
            isValid = false;
        }
        // Validate contact method selection
        const contactRadios = document.getElementsByName('contact');
        let isSelected = false;
        let selectedContactMethod = '';
        for (const radio of contactRadios) {
            if (radio.checked) {
                isSelected = true;
                // Store the selected value
                selectedContactMethod = radio.value; 
                // Exit loop once selected
                break; 
            }
        }
        if (!isSelected) {
            contactError.textContent = 'Please select a preferred method of contact.';
            // Show error message
            contactError.style.display = 'block';
            isValid = false;
        } else {
            // Clear error message
            contactError.textContent = ''; 
            // Hide error message
            contactError.style.display = 'none';
        }
        // If the form is valid, display the submitted information
        if (isValid) {
            document.getElementById('displayName').textContent = nameInput.value;
            document.getElementById('displayEmail').textContent = emailInput.value;
            document.getElementById('displayPhone').textContent = phoneInput.value;
            document.getElementById('displayMessage').textContent = messageInput.value;
            document.getElementById('displayContactMethod').textContent = selectedContactMethod;
            document.getElementById('submittedInfo').style.display = 'block';
            // Reset the form
            contactForm.reset();
            // Set success message
            successMessage.textContent = "Your message has been sent successfully!";
            // Show success message
            successMessage.style.display = "block";
            // Clear contact error message
            contactError.textContent = '';
            // Hide contact error message
            contactError.style.display = 'none';
        }
    });
    // Function to show an error message next to the input field
    function showError(input, message) {
        // Get the next sibling (error message span)
        const errorSpan = input.nextElementSibling;
        errorSpan.textContent = message;
        // Show the error message
        errorSpan.style.display = 'block';
    }
    // Function to clear all error and success messages
    function clearMessages() {
        // Get all error message spans
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(span => {
            // Clear text content
            span.textContent = '';
            // Hide error messages
            span.style.display = 'none';
        });
        // Hide success message
        successMessage.style.display = 'none';
        // Clear contact error
        contactError.textContent = ''; 
        // Hide contact error
        contactError.style.display = 'none';
    }
    // Function to validate the email format
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    async function fetchSearchResults(query) {
        const apiKey = 'cfce4386e00e40f09da2d634b2317c61';
        const endpoint = 'https://api.bing.microsoft.com/v7.0/search';
        const headers = {
            'Ocp-Apim-Subscription-Key': apiKey
        };
        try {
            const response = await fetch(`${endpoint}?q=${encodeURIComponent(query)}`, { headers });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data.webPages && data.webPages.value.length > 0) {
                displaySearchResults(data.webPages.value);
            } else {
                document.getElementById('search-results').innerHTML = 'No results found.';
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
            document.getElementById('searchErrorMsg').textContent = 'Failed to load results. Please try again.';
            document.getElementById('searchErrorMsg').style.display = 'block';
        }
    }
    // Function to display search results
    function displaySearchResults(results) {
        const resultsContainer = document.getElementById('search-results');
        resultsContainer.innerHTML = ''; // Clear any existing content
        const limitedResults = results.slice(0, 5);
        limitedResults.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.classList.add('result');
            resultElement.innerHTML = `
                <h3><a href="${result.url}" target="_blank">${result.name}</a></h3>
                <p>${result.snippet}</p>
                <p><a href="${result.url}" target="_blank">Read more</a></p>`;
                resultsContainer.appendChild(resultElement);
        });
    }
     $('.nextBtn1').click(function(){
        // select image slides
        let current = document.querySelector('.current1'); 
        let prev = document.querySelector('.prev1'); 
        let next = document.querySelector('.next1'); 
        // remove class 
        $(current).removeClass('current1'); 
        $(prev).removeClass('prev1'); 
        $(next).removeClass('next1'); 
        // add class 
        $(current).addClass('prev1'); 
        $(prev).addClass('next1'); 
        $(next).addClass('current1'); 
      })
      // prev button click event
      $('.prevBtn1').click(function(){
        // select image slides
        let current = document.querySelector('.current1'); 
        let prev = document.querySelector('.prev1'); 
        let next = document.querySelector('.next1'); 
        // remove class 
        $(current).removeClass('current1'); 
        $(prev).removeClass('prev1'); 
        $(next).removeClass('next1'); 
        // add class 
        $(current).addClass('next1'); 
        $(prev).addClass('current1'); 
        $(next).addClass('prev1'); 
      })
      $('.nextBtn2').click(function(){
        // select image slides
        let current = document.querySelector('.current2'); 
        let prev = document.querySelector('.prev2'); 
        let next = document.querySelector('.next2'); 
        // remove class 
        $(current).removeClass('current2'); 
        $(prev).removeClass('prev2'); 
        $(next).removeClass('next2'); 
        // add class 
        $(current).addClass('prev2'); 
        $(prev).addClass('next2'); 
        $(next).addClass('current2'); 
      })
      // prev button click event
      $('.prevBtn2').click(function(){
        // select image slides
        let current = document.querySelector('.current2'); 
        let prev = document.querySelector('.prev2'); 
        let next = document.querySelector('.next2'); 
        // remove class 
        $(current).removeClass('current2'); 
        $(prev).removeClass('prev2'); 
        $(next).removeClass('next2'); 
        // add class 
        $(current).addClass('next2'); 
        $(prev).addClass('current2'); 
        $(next).addClass('prev2'); 
      })
    function randomColor() {
        let color = [];
        for (let i = 0; i < 3; i++) {
          color.push(Math.floor(Math.random() * 256));
        }
        return 'rgb(' + color.join(', ') + ')';
    } 
    $("#artist").hover(function(){
        jQuery.Color.hook( "fill" );
        console.log("Hovered over path!");
        $("#artist path").animate({
            fill: randomColor()
        }, "slow");
        $("#star polygon").animate({
            fill: randomColor()
        }, "slow");
    });
    fetchSearchResults('Erik Foss Art');  // Search for "Erik Foss"
    document.getElementById('search-btn').addEventListener('click', () => {
        console.log('Button clicked!');
        const query = document.getElementById('search-input').value.trim();
        fetchSearchResults(query);  // Trigger the search when the user clicks the button
    });
});