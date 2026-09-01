/* =========================================================
      JAVASCRIPT (Beginner-friendly + well-commented)
    ========================================================== */

    // ---------- Helpers ----------
    function $(id){ return document.getElementById(id); }

    function isValidEmail(email){
      // Simple email regex (good for beginner projects)
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email.trim());
    }

    function setError(el, message){
      el.textContent = message;
      el.style.display = "block";
    }
    function clearError(el){
      el.textContent = "";
      el.style.display = "none";
    }

    // ---------- Footer year ----------
    $("year").textContent = new Date().getFullYear();

    // =========================================================
    // 1) Mobile Navigation Toggle
    // =========================================================
    const mobileToggle = $("mobileToggle");
    const mobilePanel = $("mobilePanel");

    mobileToggle.addEventListener("click", () => {
      mobilePanel.classList.toggle("open");
    });

    // Close mobile panel when a link is clicked
    mobilePanel.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => mobilePanel.classList.remove("open"));
    });

    // =========================================================
    // 2) Dark/Light Mode Toggle (with localStorage)
    // =========================================================
    const themeToggle = $("themeToggle");
    const savedTheme = localStorage.getItem("bp_theme");
    if(savedTheme === "dark"){
      document.body.classList.add("dark");
      themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      localStorage.setItem("bp_theme", isDark ? "dark" : "light");
      themeToggle.innerHTML = isDark
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
    });

    // =========================================================
    // 3) "Click Me" Button Alert
    // =========================================================
    $("clickMeBtn").addEventListener("click", () => {
      alert("Welcome to Our School!");
    });

    // =========================================================
    // 4) Animated Text Effect (Typing)
    // =========================================================
    const typingEl = $("typingText");
    const phrases = ["where learning feels exciting.", "where beginners build real projects.", "where students grow every day."];
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeLoop(){
      const current = phrases[phraseIndex];

      if(!deleting){
        charIndex++;
        typingEl.textContent = " " + current.slice(0, charIndex);
        if(charIndex >= current.length){
          deleting = true;
          setTimeout(typeLoop, 1100);
          return;
        }
      }else{
        charIndex--;
        typingEl.textContent = " " + current.slice(0, charIndex);
        if(charIndex <= 0){
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }
      setTimeout(typeLoop, deleting ? 32 : 46);
    }
    typeLoop();

    // =========================================================
    // 5) Simple Image Slider
    // =========================================================
    const slides = Array.from(document.querySelectorAll(".slide"));
    const caption = $("sliderCaption");
    const captions = [
      { title: "Inspiring Classrooms", text: "Modern learning spaces with hands-on activities." },
      { title: "Supportive Community", text: "Friendly mentors and teamwork-focused learning." },
      { title: "Creative Learning", text: "Projects, clubs, and events to build confidence." }
    ];

    let slideIndex = 0;
    let sliderTimer = null;

    function showSlide(i){
      slideIndex = (i + slides.length) % slides.length;
      slides.forEach((s, idx) => s.classList.toggle("active", idx === slideIndex));
      caption.innerHTML = "<strong>" + captions[slideIndex].title + "</strong><span>" + captions[slideIndex].text + "</span>";
    }

    function startSlider(){
      stopSlider();
      sliderTimer = setInterval(() => showSlide(slideIndex + 1), 4500);
    }
    function stopSlider(){
      if(sliderTimer) clearInterval(sliderTimer);
    }

    $("prevSlide").addEventListener("click", () => { showSlide(slideIndex - 1); startSlider(); });
    $("nextSlide").addEventListener("click", () => { showSlide(slideIndex + 1); startSlider(); });

    startSlider();

    // =========================================================
    // 6) Contact Form Validation + Success Alert
    // =========================================================
    const contactForm = $("contactForm");
    const contactError = $("contactError");

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      clearError(contactError);

      const name = $("name").value.trim();
      const email = $("email").value.trim();
      const message = $("message").value.trim();

      if(!name || !email || !message){
        setError(contactError, "Please fill in: Name, Email, and Message.");
        return;
      }
      if(!isValidEmail(email)){
        setError(contactError, "Please enter a valid email address (example: name@gmail.com).");
        return;
      }

      // If valid, show success message
      alert("Thank you! Your message has been submitted successfully.");
      contactForm.reset();
    });

    // =========================================================
    // 7) Entrance Animations (reveal on scroll)
    // =========================================================
    const revealEls = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add("show");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => revealObserver.observe(el));

    // =========================================================
    // 8) Animated Counters (when visible)
    // =========================================================
    const counterEls = document.querySelectorAll(".counter");
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(!entry.isIntersecting) return;

        const el = entry.target;
        const target = Number(el.dataset.target || "0");
        let current = 0;

        const step = Math.max(1, Math.floor(target / 75)); // speed control
        const timer = setInterval(() => {
          current += step;
          if(current >= target){
            el.textContent = target.toString();
            clearInterval(timer);
          }else{
            el.textContent = current.toString();
          }
        }, 22);

        counterObserver.unobserve(el);
      });
    }, { threshold: 0.35 });

    counterEls.forEach(el => counterObserver.observe(el));

    // =========================================================
    // 9) Course Cards -> Open Enrollment Modal (WORKING FLOW)
    // =========================================================
    const modalBackdrop = $("modalBackdrop");
    const closeModalBtn = $("closeModal");
    const enrollForm = $("enrollForm");
    const enrollError = $("enrollError");

    function openModal(){
      modalBackdrop.classList.add("open");
      modalBackdrop.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function closeModal(){
      modalBackdrop.classList.remove("open");
      modalBackdrop.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      clearError(enrollError);
      enrollForm.reset();
    }

    closeModalBtn.addEventListener("click", closeModal);

    // Close when clicking outside modal
    modalBackdrop.addEventListener("click", (e) => {
      if(e.target === modalBackdrop) closeModal();
    });

    // Close with ESC key
    document.addEventListener("keydown", (e) => {
      if(e.key === "Escape" && modalBackdrop.classList.contains("open")){
        closeModal();
      }
    });

    function loadCourseIntoModal(card){
      const course = card.dataset.course;
      const duration = card.dataset.duration;
      const level = card.dataset.level;
      const fee = card.dataset.fee;
      const highlights = (card.dataset.highlights || "").split(",").map(s => s.trim()).filter(Boolean);

      $("modalTitle").textContent = "Enroll: " + course;
      $("courseName").textContent = course;
      $("courseDuration").textContent = duration;
      $("courseLevel").textContent = level;
      $("courseFee").textContent = fee;

      $("selectedCourse").value = course;

      const ul = $("courseHighlights");
      ul.innerHTML = "";
      highlights.forEach(h => {
        const li = document.createElement("li");
        li.textContent = h;
        ul.appendChild(li);
      });
    }

    document.querySelectorAll(".course-card").forEach(card => {
      card.addEventListener("click", () => {
        loadCourseIntoModal(card);
        openModal();
      });
    });

    // Also allow the "Choose a Course" button to open the first course quickly
    $("openCourseChooser").addEventListener("click", (e) => {
      e.preventDefault();
      const first = document.querySelector(".course-card");
      if(first){
        loadCourseIntoModal(first);
        openModal();
      }
    });

    // Enrollment form validation + success alert
    enrollForm.addEventListener("submit", (e) => {
      e.preventDefault();
      clearError(enrollError);

      const course = $("selectedCourse").value.trim();
      const studentName = $("studentName").value.trim();
      const studentEmail = $("studentEmail").value.trim();
      const grade = $("grade").value.trim();
      const mode = $("mode").value.trim();

      if(!course){
        setError(enrollError, "Course not selected. Please open the modal from a course card.");
        return;
      }
      if(!studentName || !studentEmail || !grade || !mode){
        setError(enrollError, "Please fill in: Student Name, Email, Grade, and Learning Mode.");
        return;
      }
      if(!isValidEmail(studentEmail)){
        setError(enrollError, "Please enter a valid email address for enrollment.");
        return;
      }

      alert("Enrollment submitted successfully!\n\nCourse: " + course + "\nStudent: " + studentName);
      closeModal();
    });

    // Demo fill (nice for beginners to test quickly)
    $("fillDemo").addEventListener("click", () => {
      $("studentName").value = "Demo Student";
      $("studentEmail").value = "demo@student.com";
      $("grade").value = "Grade 10";
      $("mode").value = "On Campus";
      $("notes").value = "I want to learn step-by-step and build projects.";
    });

    // =========================================================
    // 10) Highlight active nav link while scrolling (optional polish)
    // =========================================================
    const sectionIds = ["home","about","courses","gallery","testimonials","contact"];
    const navAnchors = Array.from(document.querySelectorAll('#navLinks a'));

    const activeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          navAnchors.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id));
        }
      });
    }, { threshold: 0.35 });

    sectionIds.forEach(id => {
      const sec = document.getElementById(id);
      if(sec) activeObserver.observe(sec);
    });
