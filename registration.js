// Date validation
const checkInInput = document.getElementById('check-in');
const checkOutInput = document.getElementById('check-out');

if (checkInInput && checkOutInput) {
    // Set minimum check-in date to today
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayString = `${yyyy}-${mm}-${dd}`;
    
    checkInInput.setAttribute('min', todayString);
    
    // Update check-out min date when check-in changes
    checkInInput.addEventListener('change', function() {
        checkOutInput.setAttribute('min', this.value);
        
        // If check-out date is before new check-in date, reset it
        if (checkOutInput.value && checkOutInput.value < this.value) {
            checkOutInput.value = '';
        }
    });
}

// Calculate and display booking summary
const registrationForm = document.querySelector('.registration-form');
const destinationSelect = document.getElementById('destination');
const accommodationSelect = document.getElementById('accommodation');
const adultsInput = document.getElementById('adults');
const childrenInput = document.getElementById('children');
const checkInDateInput = document.getElementById('check-in');
const checkOutDateInput = document.getElementById('check-out');
const serviceCheckboxes = document.querySelectorAll('input[name="services[]"]');

// Create booking summary element if it doesn't exist
if (registrationForm && !document.querySelector('.booking-summary')) {
    const summarySection = document.createElement('div');
    summarySection.className = 'form-section booking-summary';
    summarySection.innerHTML = `
        <h2>Booking Summary</h2>
        <div class="summary-content">
            <p>Please fill out the form to see your booking summary.</p>
        </div>
    `;
    
    // Insert before payment section
    const paymentSection = document.querySelector('.form-section:nth-last-of-type(2)');
    if (paymentSection) {
        registrationForm.insertBefore(summarySection, paymentSection);
    }
}

// Update booking summary when form inputs change
function updateBookingSummary() {
    const summaryContent = document.querySelector('.summary-content');
    if (!summaryContent) return;
    
    const destination = destinationSelect.value ? destinationSelect.options[destinationSelect.selectedIndex].text : '';
    const accommodation = accommodationSelect.value ? accommodationSelect.options[accommodationSelect.selectedIndex].text : '';
    const adults = adultsInput.value || 0;
    const children = childrenInput.value || 0;
    const checkIn = checkInDateInput.value;
    const checkOut = checkOutDateInput.value;
    
    // Calculate number of nights
    let nights = 0;
    if (checkIn && checkOut) {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        nights = Math.round((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    }
    
    // Base rates (simplified for demo)
    const accommodationRates = {
        'tent': 30,
        'cabin': 100,
        'glamping': 80,
        'rv': 45,
        'treehouse': 120
    };
    
    // Calculate accommodation cost
    const baseRate = accommodationRates[accommodationSelect.value] || 0;
    const accommodationCost = baseRate * nights;
    
    // Calculate additional services cost
    let servicesCost = 0;
    let servicesHtml = '';
    
    serviceCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            let serviceCost = 0;
            let serviceLabel = checkbox.nextElementSibling.textContent;
            
            switch (checkbox.value) {
                case 'breakfast':
                    serviceCost = 15 * (parseInt(adults) + parseInt(children)) * nights;
                    break;
                case 'guided-hike':
                    serviceCost = 25 * (parseInt(adults) + parseInt(children));
                    break;
                case 'equipment':
                    serviceCost = 40;
                    break;
                case 'firewood':
                    serviceCost = 10;
                    break;
            }
            
            servicesCost += serviceCost;
            servicesHtml += `<tr>
                <td>${serviceLabel}</td>
                <td>$${serviceCost.toFixed(2)}</td>
            </tr>`;
        }
    });
    
    // Calculate total
    const totalCost = accommodationCost + servicesCost;
    
    // Update summary HTML
    if (destination && accommodation && nights > 0) {
        summaryContent.innerHTML = `
            <table class="summary-table">
                <tr>
                    <th colspan="2">Booking Details</th>
                </tr>
                <tr>
                    <td>Destination:</td>
                    <td>${destination}</td>
                </tr>
                <tr>
                    <td>Accommodation:</td>
                    <td>${accommodation}</td>
                </tr>
                <tr>
                    <td>Check-in:</td>
                    <td>${formatDate(checkIn)}</td>
                </tr>
                <tr>
                    <td>Check-out:</td>
                    <td>${formatDate(checkOut)}</td>
                </tr>
                <tr>
                    <td>Duration:</td>
                    <td>${nights} night${nights !== 1 ? 's' : ''}</td>
                </tr>
                <tr>
                    <td>Guests:</td>
                    <td>${adults} adult${adults !== '1' ? 's' : ''}, ${children} child${children !== '1' ? 'ren' : ''}</td>
                </tr>
                <tr class="summary-divider">
                    <th colspan="2">Cost Breakdown</th>
                </tr>
                <tr>
                    <td>${accommodation} (${nights} night${nights !== 1 ? 's' : ''} × $${baseRate}/night):</td>
                    <td>$${accommodationCost.toFixed(2)}</td>
                </tr>
                ${servicesHtml}
                <tr class="summary-total">
                    <td>Total:</td>
                    <td>$${totalCost.toFixed(2)}</td>
                </tr>
            </table>
        `;
        
        // Add CSS for the summary table if not already added
        if (!document.getElementById('summary-styles')) {
            const style = document.createElement('style');
            style.id = 'summary-styles';
            style.textContent = `
                .summary-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                
                .summary-table th {
                    background-color: var(--primary-color);
                    color: var(--white);
                    text-align: left;
                }
                
                .summary-table th, .summary-table td {
                    padding: 12px 15px;
                    border-bottom: 1px solid var(--gray);
                }
                
                .summary-divider {
                    border-top: 2px solid var(--gray);
                }
                
                .summary-total {
                    font-weight: bold;
                    font-size: 1.1em;
                    border-top: 2px solid var(--gray);
                }
                
                .summary-total td {
                    padding-top: 15px;
                }
            `;
            document.head.appendChild(style);
        }
    } else {
        summaryContent.innerHTML = `
            <p>Please complete the booking details to see your summary.</p>
        `;
    }
}

// Helper function to format date
function formatDate(dateString) {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

// Add event listeners to update summary
if (registrationForm) {
    const formInputs = registrationForm.querySelectorAll('input, select');
    formInputs.forEach(input => {
        input.addEventListener('change', updateBookingSummary);
    });
}

// Form validation
if (registrationForm) {
    registrationForm.addEventListener('submit', function(e) {
        let isValid = true;
        
        // Validate check-in and check-out dates
        if (checkInDateInput.value && checkOutDateInput.value) {
            const checkInDate = new Date(checkInDateInput.value);
            const checkOutDate = new Date(checkOutDateInput.value);
            
            if (checkOutDate <= checkInDate) {
                isValid = false;
                alert('Check-out date must be after check-in date');
            }
        }
        
        // Validate credit card (simple validation for demo)
        const cardNumber = document.getElementById('card-number');
        if (cardNumber && cardNumber.value) {
            // Remove spaces and check if it's a number with 13-19 digits
            const cardValue = cardNumber.value.replace(/\s/g, '');
            if (!/^\d{13,19}$/.test(cardValue)) {
                isValid = false;
                alert('Please enter a valid credit card number');
            }
        }
        
        // Validate expiry date (MM/YY format)
        const expiryDate = document.getElementById('expiry-date');
        if (expiryDate && expiryDate.value) {
            if (!/^\d{2}\/\d{2}$/.test(expiryDate.value)) {
                isValid = false;
                alert('Please enter expiry date in MM/YY format');
            } else {
                const [month, year] = expiryDate.value.split('/');
                const now = new Date();
                const currentYear = now.getFullYear() % 100; // Get last 2 digits
                const currentMonth = now.getMonth() + 1;
                
                if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
                    isValid = false;
                    alert('Your card has expired');
                }
            }
        }
        
        // Validate CVV (3-4 digits)
        const cvv = document.getElementById('cvv');
        if (cvv && cvv.value) {
            if (!/^\d{3,4}$/.test(cvv.value)) {
                isValid = false;
                alert('Please enter a valid CVV (3-4 digits)');
            }
        }
        
        if (!isValid) {
            e.preventDefault();
        }
    });
}

// Format credit card number with spaces
const cardNumberInput = document.getElementById('card-number');
if (cardNumberInput) {
    cardNumberInput.addEventListener('input', function(e) {
        let value = this.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = '';
        
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        
        this.value = formattedValue;
    });
}

// Format expiry date with slash
const expiryDateInput = document.getElementById('expiry-date');
if (expiryDateInput) {
    expiryDateInput.addEventListener('input', function(e) {
        let value = this.value.replace(/\D/g, '');
        
        if (value.length > 2) {
            this.value = value.substring(0, 2) + '/' + value.substring(2, 4);
        } else {
            this.value = value;
        }
    });
}