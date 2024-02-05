function toggleList(element) {
  const ulElement = element.querySelector("ul");
  ulElement.style.display =
    ulElement.style.display === "none" || ulElement.style.display === ""
      ? "block"
      : "none";
  element.classList.toggle("collapsed");
}

// toggle icon navbar

let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// scroll sections

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });

      sec.classList.add("show-animate");
    } else {
      sec.classList.remove("show-animate");
    }
  });

  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);

  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");

  let footer = document.querySelector("footer");

  footer.classList.toggle(
    "show-animate",
    this.innerHeight + this.scrollY >=
      document.scrollingElement.scrollHeight - 50
  );
};

const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const mess = document.getElementById("message");

function sendEmail() {
  const bodyMessage = `FullName: ${fullName.value}<br> Email: ${email.value}<br> Phone Number: ${phone.value}<br> Message: ${mess.value}`;
  const mailSubject = `From Your Portfolio: ${subject.value}`;

  Email.send({
    SecureToken: "275c13e4-7070-4d93-bde6-f59df213dcb8",
    To: "shubhamp11298@gmail.com",
    From: "shubhamp11298@gmail.com",
    Subject: mailSubject,
    Body: bodyMessage,
  }).then((message) => {
    console.log(message);
    if (message == "OK") {
      Swal.fire({
        title: "Success!",
        text: "Message sent successfully,\nI will get back to you right away.",
        icon: "success",
      });
    } else if (message.includes("Mailbox name not allowed.")) {
      Swal.fire({
        title: "Sorry!",
        text: "Invalid Mail address",
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "Sorry!",
        text: "Something went wrong. Please try after sometime",
        icon: "info",
      });
    }
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  sendEmail();
  form.reset();
  return false;
});
