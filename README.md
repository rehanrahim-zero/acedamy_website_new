# BluePeak Academy

A modern, responsive fictional school website built using **HTML, CSS, and JavaScript**.

## Features

- Responsive navigation bar with mobile menu
- Dark / light mode toggle with `localStorage`
- Animated typing text in the hero section
- Hero image slider with previous / next controls and auto-play
- Animated achievement counters
- About, mission, vision, and facilities sections
- Interactive course cards
- Course enrollment modal with validation
- Demo-fill option for the enrollment form
- Contact form with basic validation
- Scroll reveal animations using `IntersectionObserver`
- Active navigation link highlighting while scrolling
- Gallery and achievements section
- Testimonials section
- Responsive layout for desktop, tablet, and mobile
- Font Awesome icons loaded through CDN

## Project Structure

```text
bluepeak-academy/
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to Run

No installation or build process is required.

1. Extract the project files.
2. Open `index.html` in a modern web browser.
3. Make sure you have an internet connection so the external images and Font Awesome icons can load.

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- Font Awesome 6.5.0 CDN
- Unsplash / StockCake image URLs

## Main Sections

### Home
Contains the hero introduction, animated typing text, call-to-action buttons, achievement counters, and image slider.

### About
Contains the school's mission, vision, and facilities.

### Courses
Displays interactive course cards. Clicking a course opens an enrollment modal where users can submit their details.

### Gallery & Achievements
Displays school-related imagery in a responsive gallery layout.

### Testimonials
Shows sample student testimonials with star ratings.

### Contact
Provides a validated contact form for name, email, and message.

## JavaScript Functionality

The `script.js` file handles:

- Mobile navigation
- Theme switching
- Typing animation
- Image slider
- Contact form validation
- Scroll reveal animations
- Animated counters
- Course enrollment modal
- Course data loading
- Enrollment form validation
- Demo form filling
- Active navigation state

## Notes

This is a **front-end demonstration project**. The contact and enrollment forms currently validate the input and display success messages, but they do not send data to a backend or database.

The course information is stored in HTML `data-*` attributes, making it easy to add or customize courses.

## License

This project is intended for educational and demonstration purposes.
