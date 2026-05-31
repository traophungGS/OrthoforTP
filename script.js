// Handle email form submission
document.getElementById('emailForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailInput = document.getElementById('emailInput');
    const email = emailInput.value;
    
    // Create a log entry
    const logEntry = {
        email: email,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer
    };
    
    // Send to GitHub via a webhook or logging service
    // For now, we'll create an issue in the repository to log the email
    logEmail(email, logEntry);
    
    // Clear input and show confirmation
    emailInput.value = '';
    showConfirmation();
});

function logEmail(email, logEntry) {
    // Create a GitHub issue with the email signup
    const issueBody = `
New Campaign Signup:
- Email: ${email}
- Timestamp: ${logEntry.timestamp}
- User Agent: ${logEntry.userAgent}

[Logged from campaign website]
    `;
    
    // Store in localStorage as backup
    let emailLogs = JSON.parse(localStorage.getItem('campaignEmails') || '[]');
    emailLogs.push(logEntry);
    localStorage.setItem('campaignEmails', JSON.stringify(emailLogs));
    
    // Log to console for debugging
    console.log('Email captured:', email);
    console.log('All captured emails:', emailLogs);
}

function showConfirmation() {
    const button = document.querySelector('.email-signup button');
    const originalText = button.textContent;
    
    button.textContent = 'Thank you for signing up!';
    button.style.backgroundColor = '#28a745';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = '#E31C23';
    }, 3000);
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
