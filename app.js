const burger = document.querySelector("nav svg");

burger.addEventListener("click", () => {
  if (burger.classList.contains("active")) {
    gsap.to(".links", { x: "100%" });
    gsap.to(".line", { stroke: "white" });
    gsap.set("body", { overflow: "auto" });
    gsap.set("body", { overflowX: "hidden" });
  } else {
    gsap.to(".links", { x: "0%" });
    gsap.to(".line", { stroke: "black" });
    gsap.fromTo(
      ".links a",
      { opacity: 0, y: 0 },
      { opacity: 1, y: 20, delay: 0.25, stagger: 0.25 }
    );
    gsap.set("body", { overflow: "hidden" });
  }
  burger.classList.toggle("active");
});

const videos = gsap.utils.toArray(".video");
gsap.set(videos, { opacity: 0 });

videos.forEach((video) => {
  ScrollTrigger.create({
    trigger: video,
    start: "top center",
    end: "bottom center",

    onEnter: () => {
      gsap.to(video, { opacity: 1 });
      video.play();
    },
    onEnterBack: () => video.play(),
    onLeave: () => video.pause(),
    onLeaveBack: () => video.pause(),
  });
});

document.getElementById("newsletter-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const messageElement = document.getElementById("form-message");

  if (!validateEmail(email)) {
    messageElement.textContent = "Please enter a valid email address";
    messageElement.style.color = "red";
    return;
  }

  // preparing data
  const formData = new FormData();
  formData.append("email", email);

  // Submiting form using fetch API
  fetch("http://localhost:3000/api/subscribe", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the server
      if (data.success) {
        messageElement.textContent = "Thank you for subscribing!";
        messageElement.style.color = "green";
      } else {
        messageElement.textContent =
          "An error occurred. Please try again later.";
        messageElement.style.color = "red";
      }
    })
    .catch((error) => {
      // Handle fetch error
      console.error("There was an error submitting the form:", error);
      messageElement.textContent = "An error occurred. Please try again later.";
      messageElement.style.color = "red";
    });

  function validateEmail(email) {
    // regex to validate email
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  }
});
