const bookNowButton = document.getElementsByClassName('booknowbtn');
const popupForm = document.getElementById('popupForm');
const closeButton = document.querySelector('.close');

bookNowButton.addEventListener('click', () => {
    popupForm.style.display = 'flex';
});

closeButton.addEventListener('click', () => {
    popupForm.style.display = 'none';
});
const availabilityButton = document.getElementsByClassName('check-availability');

        availabilityButton.addEventListener('click', function() {
            // Redirect to the signup page
            window.location.href = 'signup.html'; // Replace 'signup.html' with the actual path to your signup page
        });
    