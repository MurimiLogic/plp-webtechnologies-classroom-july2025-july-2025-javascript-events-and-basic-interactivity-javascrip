// the js script file affects pages to my made up hotel website.(nairobi street eats) 
// so there will be mentions of hotel, menu, catering etc.( food related stuff)
// you'll also find extra styling in here.







// Part 1: JavaScript Event Handling


// Highlight navigation for current page
document.addEventListener('DOMContentLoaded', function() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || '../html/mp_index.html';
    
    // Highlight the current page in navigation
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.style.fontWeight = 'bold';
            link.style.color = '#b34a48';
        }
    });
    
    // hover effects to menu items
    const menuItems = document.querySelectorAll('dt');
    menuItems.forEach(item => {
        item.addEventListener('mouseover', function() {
            this.style.backgroundColor = '#ffdcdb';
            this.style.padding = '5px';
            this.style.borderRadius = '3px';
        });
        
        item.addEventListener('mouseout', function() {
            this.style.backgroundColor = '';
            this.style.padding = '';
            this.style.borderRadius = '';
        });
    });
    
    // click event to logo 
    const logo = document.querySelector('header img');
    if (logo) {
        logo.addEventListener('click', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
        });
    }
    
    // Keyboard navigation
    if (document.querySelector('article div h1')) {
        document.addEventListener('keydown', function(e) {
            const eventDays = document.querySelectorAll('article div');
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                let currentIndex = -1;
                
                // Find currently focused day
                eventDays.forEach((day, index) => {
                    if (day === document.activeElement.parentElement) {
                        currentIndex = index;
                    }
                });
                
                // Navigate to next/previous day
                if (e.key === 'ArrowDown' && currentIndex < eventDays.length - 1) {
                    eventDays[currentIndex + 1].focus();
                } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                    eventDays[currentIndex - 1].focus();
                }
            }
        });
        
        // Make event days able to be focused
        const eventDays = document.querySelectorAll('article div');
        eventDays.forEach(day => {
            day.setAttribute('tabindex', '0');
            day.addEventListener('focus', function() {
                this.style.outline = '2px solid #b34a48';
            });
            day.addEventListener('blur', function() {
                this.style.outline = '';
            });
        });
    }
});


// Part 2:  Interactive Elements


// 1. Dark/Light Mode Toggle
function createDarkModeToggle() {
    // Check if toggle already exists
    if (document.getElementById('darkModeToggle')) return;
    
    // Create toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'darkModeToggle';
    toggleBtn.textContent = '🌙 Dark Mode';
    toggleBtn.style.position = 'fixed';
    toggleBtn.style.top = '10px';
    toggleBtn.style.right = '10px';
    toggleBtn.style.zIndex = '1000';
    toggleBtn.style.padding = '5px 10px';
    toggleBtn.style.backgroundColor = '#b34a48';
    toggleBtn.style.color = 'white';
    toggleBtn.style.border = 'none';
    toggleBtn.style.borderRadius = '3px';
    toggleBtn.style.cursor = 'pointer';
    
    // Add to page
    document.body.appendChild(toggleBtn);
    
    // Toggle functionality
    toggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            toggleBtn.textContent = '☀️ Light Mode';
            // Apply dark mode styles
            document.body.style.backgroundColor = '#1a1a1a';
            document.body.style.color = '#f0f0f0';
            document.querySelector('footer').style.borderTopColor = '#cf7b79';
            
            // Adjust text colors for better contrast
            const allElements = document.querySelectorAll('*');
            allElements.forEach(el => {
                if (getComputedStyle(el).color === 'rgb(34, 34, 34)') {
                    el.style.color = '#f0f0f0';
                }
            });
            
            // Adjust link colors
            const links = document.querySelectorAll('a');
            links.forEach(link => {
                link.style.color = '#ff9999';
            });
        } else {
            toggleBtn.textContent = '🌙 Dark Mode';
            // Revert to light mode
            document.body.style.backgroundColor = '';
            document.body.style.color = '';
            document.querySelector('footer').style.borderTopColor = '';
            
            // Revert text colors
            const allElements = document.querySelectorAll('*');
            allElements.forEach(el => {
                if (el.style.color === 'rgb(240, 240, 240)') {
                    el.style.color = '';
                }
            });
            
            // Revert link colors
            const links = document.querySelectorAll('a');
            links.forEach(link => {
                link.style.color = '';
            });
        }
    });
}




// 2. Menu Item Counter/Order System (pardon my poor styling on the page)


function createOrderCounter() {
    // Only add to menu page
    if (!document.querySelector('dl')) return;
    
    // Create order counter section
    const orderSection = document.createElement('div');
    orderSection.id = 'orderSection';
    orderSection.innerHTML = `
        <h2>Your Order</h2>
        <div id="orderItems" style="min-height: 100px; max-height: 300px; overflow-y: auto; margin: 10px 0; padding: 10px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;"></div>
        <p style="font-size: 1.2em; font-weight: bold;">Total: Ksh<span id="orderTotal">0.00</span></p>
        <button id="placeOrder" style="margin-right: 10px; padding: 8px 15px; background-color: #b34a48; color: white; border: none; border-radius: 3px; cursor: pointer;">Place Order</button>
        <button id="clearOrder" style="padding: 8px 15px; background-color: #666; color: white; border: none; border-radius: 3px; cursor: pointer;">Clear Order</button>
    `;
    
    // Style the order section
    orderSection.style.marginTop = '20px';
    orderSection.style.padding = '15px';
    orderSection.style.border = '1px solid #cf7b79';
    orderSection.style.borderRadius = '5px';
    orderSection.style.backgroundColor = '#ffdcdb';
    
    // Add to page
    const article = document.querySelector('article');
    article.appendChild(orderSection);
    
    // Add order buttons to each menu item
    const menuItems = document.querySelectorAll('dt');
    menuItems.forEach(item => {
        const orderBtn = document.createElement('button');
        orderBtn.textContent = 'Add to Order';
        orderBtn.style.marginLeft = '10px';
        orderBtn.style.padding = '4px 8px';
        orderBtn.style.backgroundColor = '#b34a48';
        orderBtn.style.color = 'white';
        orderBtn.style.border = 'none';
        orderBtn.style.borderRadius = '3px';
        orderBtn.style.cursor = 'pointer';
        orderBtn.style.fontSize = '0.9em';
        
        item.appendChild(orderBtn);
        
      
        const priceText = item.nextElementSibling.textContent;
       
        const priceMatch = priceText.match(/(?:Ksh|ksh|KSH)?\s*([0-9]+(?:\.[0-9]{2})?)/i);
        const price = priceMatch ? parseFloat(priceMatch[1]) : 0;
        
        console.log('Item:', item.textContent, 'Price text:', priceText, 'Extracted price:', price); 
        
     
        orderBtn.addEventListener('click', function() {
            addToOrder(item.textContent.replace('Add to Order', '').trim(), price);
        });
    });
    
    // Order management functions
    let order = [];
    
    function addToOrder(itemName, price) {
        if (price === 0) {
            // If price is 0, try to extract from the item name itself as fallback
            const priceFallback = itemName.match(/(?:Ksh|ksh|KSH)?\s*([0-9]+(?:\.[0-9]{2})?)/i);
            if (priceFallback) {
                price = parseFloat(priceFallback[1]);
            }
        }
        
        order.push({ name: itemName, price: price });
        updateOrderDisplay();
    }
    
    function updateOrderDisplay() {
        const orderItems = document.getElementById('orderItems');
        const orderTotal = document.getElementById('orderTotal');
        
        orderItems.innerHTML = '';
        let total = 0;
        
        if (order.length === 0) {
            orderItems.innerHTML = '<div style="text-align: center; color: #666; padding: 20px;">No items added yet</div>';
        } else {
            order.forEach((item, index) => {
                total += item.price;
                const itemElement = document.createElement('div');
                itemElement.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; border-bottom: 1px solid #eee; margin-bottom: 5px;">
                        <span style="flex: 2;">${item.name}</span>
                        <span style="flex: 1; text-align: right; font-weight: bold;">Ksh${item.price.toFixed(2)}</span>
                        <button class="remove-item" data-index="${index}" style="margin-left: 10px; padding: 2px 6px; background-color: #ff6b6b; color: white; border: none; border-radius: 2px; cursor: pointer; font-size: 0.8em;">×</button>
                    </div>
                `;
                orderItems.appendChild(itemElement);
            });
        }
        
        orderTotal.textContent = total.toFixed(2);
        
        // Add event listeners to remove buttons
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                removeFromOrder(index);
            });
        });
    }
    
    function removeFromOrder(index) {
        order.splice(index, 1);
        updateOrderDisplay();
    }
    
    // Place order button
    document.getElementById('placeOrder').addEventListener('click', function() {
        if (order.length === 0) {
            alert('Your order is empty!');
            return;
        }
        
        alert(`Thank you for your order! Total: Ksh${document.getElementById('orderTotal').textContent}`);
        order = [];
        updateOrderDisplay();
    });
    
    // Clear order button
    document.getElementById('clearOrder').addEventListener('click', function() {
        order = [];
        updateOrderDisplay();
    });
}


// Part 3: Form Validation


// Create a contact form on the catering page
function createContactForm() {
    // Only add to catering page
    if (!document.querySelector('aside h1') || 
        !document.querySelector('aside h1').textContent.includes('Mobile Kitchen')) return;
    
    // form
    const form = document.createElement('form');
    form.id = 'cateringForm';
    form.innerHTML = `
        <h2>Request Catering Information</h2>
        <div>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
            <span class="error" id="nameError"></span>
        </div>
        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            <span class="error" id="emailError"></span>
        </div>
        <div>
            <label for="phone">Phone:</label>
            <input type="tel" id="phone" name="phone">
            <span class="error" id="phoneError"></span>
        </div>
        <div>
            <label for="eventType">Event Type:</label>
            <select id="eventType" name="eventType">
                <option value="">Select an option</option>
                <option value="wedding">Wedding</option>
                <option value="fundraiser">Fundraiser</option>
                <option value="athletic">Athletic Event</option>
                <option value="birthday">Birthday Party</option>
                <option value="sales">Sales Event</option>
                <option value="other">Other</option>
            </select>
        </div>
        <div>
            <label for="eventDate">Event Date:</label>
            <input type="date" id="eventDate" name="eventDate" required>
            <span class="error" id="dateError"></span>
        </div>
        <div>
            <label for="guests">Number of Guests:</label>
            <input type="number" id="guests" name="guests" min="10" required>
            <span class="error" id="guestsError"></span>
        </div>
        <div>
            <label for="message">Additional Information:</label>
            <textarea id="message" name="message" rows="4"></textarea>
        </div>
        <button type="submit">Submit Request</button>
        <div id="formMessage"></div>
    `;
    
    // Style the form
    form.style.marginTop = '20px';
    form.style.padding = '15px';
    form.style.border = '1px solid #cf7b79';
    form.style.borderRadius = '5px';
    
    const formDivs = form.querySelectorAll('div');
    formDivs.forEach(div => {
        div.style.marginBottom = '10px';
    });
    
    const labels = form.querySelectorAll('label');
    labels.forEach(label => {
        label.style.display = 'inline-block';
        label.style.width = '150px';
        label.style.fontWeight = 'bold';
    });
    
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.style.padding = '5px';
        input.style.width = '200px';
        input.style.border = '1px solid #ccc';
        input.style.borderRadius = '3px';
    });
    
    const errors = form.querySelectorAll('.error');
    errors.forEach(error => {
        error.style.color = 'red';
        error.style.fontSize = '0.8em';
        error.style.marginLeft = '10px';
    });
    
    // Add to page
    const article = document.querySelector('article');
    article.appendChild(form);
    
    // Form validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset errors
        clearErrors();
        
        // Validate fields
        let isValid = true;
        
        // Name validation
        const name = document.getElementById('name').value.trim();
        if (name === '') {
            showError('nameError', 'Name is required');
            isValid = false;
        } else if (name.length < 2) {
            showError('nameError', 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Email validation
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            showError('emailError', 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Phone validation (optional)
        const phone = document.getElementById('phone').value.trim();
        if (phone !== '') {
            const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            if (!phoneRegex.test(phone)) {
                showError('phoneError', 'Please enter a valid phone number');
                isValid = false;
            }
        }
        
        // Date validation
        const eventDate = document.getElementById('eventDate').value;
        if (eventDate === '') {
            showError('dateError', 'Event date is required');
            isValid = false;
        } else {
            const selectedDate = new Date(eventDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                showError('dateError', 'Event date cannot be in the past');
                isValid = false;
            }
        }
        
        // Guest count validation
        const guests = document.getElementById('guests').value;
        if (guests === '') {
            showError('guestsError', 'Number of guests is required');
            isValid = false;
        } else if (parseInt(guests) < 10) {
            showError('guestsError', 'Minimum 10 guests required for catering');
            isValid = false;
        }
        
        // If valid, show success message
        if (isValid) {
            showSuccess('Thank you for your catering request! We will contact you soon.');
            form.reset();
        }
    });
    
    // Real-time validation
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const dateInput = document.getElementById('eventDate');
    const guestsInput = document.getElementById('guests');
    
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    phoneInput.addEventListener('blur', validatePhone);
    dateInput.addEventListener('change', validateDate);
    guestsInput.addEventListener('blur', validateGuests);
    
    function validateName() {
        const name = nameInput.value.trim();
        if (name === '') {
            showError('nameError', 'Name is required');
        } else if (name.length < 2) {
            showError('nameError', 'Name must be at least 2 characters');
        } else {
            clearError('nameError');
        }
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            showError('emailError', 'Email is required');
        } else if (!emailRegex.test(email)) {
            showError('emailError', 'Please enter a valid email address');
        } else {
            clearError('emailError');
        }
    }
    
    function validatePhone() {
        const phone = phoneInput.value.trim();
        if (phone !== '') {
            const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            if (!phoneRegex.test(phone)) {
                showError('phoneError', 'Please enter a valid phone number');
            } else {
                clearError('phoneError');
            }
        } else {
            clearError('phoneError');
        }
    }
    
    function validateDate() {
        const eventDate = dateInput.value;
        if (eventDate === '') {
            showError('dateError', 'Event date is required');
        } else {
            const selectedDate = new Date(eventDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                showError('dateError', 'Event date cannot be in the past');
            } else {
                clearError('dateError');
            }
        }
    }
    
    function validateGuests() {
        const guests = guestsInput.value;
        if (guests === '') {
            showError('guestsError', 'Number of guests is required');
        } else if (parseInt(guests) < 10) {
            showError('guestsError', 'Minimum 10 guests required for catering');
        } else {
            clearError('guestsError');
        }
    }
    
    function showError(elementId, message) {
        document.getElementById(elementId).textContent = message;
    }
    
    function clearError(elementId) {
        document.getElementById(elementId).textContent = '';
    }
    
    function clearErrors() {
        const errors = document.querySelectorAll('.error');
        errors.forEach(error => {
            error.textContent = '';
        });
    }
    
    function showSuccess(message) {
        const formMessage = document.getElementById('formMessage');
        formMessage.textContent = message;
        formMessage.style.color = 'green';
        formMessage.style.fontWeight = 'bold';
        formMessage.style.marginTop = '10px';
        
        setTimeout(() => {
            formMessage.textContent = '';
        }, 5000);
    }
}

// Initialize all interactive features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createDarkModeToggle();
    createOrderCounter();
    createContactForm();
});