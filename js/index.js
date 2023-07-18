$(document).ready(function () {
  "use strict";

  const els = document.querySelectorAll("section");
  const links = document.querySelectorAll("header nav a");
  const valNumDisplay = document.querySelectorAll(".numCount");
  const boxVal = document.querySelectorAll(".box");
  const inputs = document.querySelectorAll("input");

  const form = document.getElementById("form");
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const position = document.getElementById("position");
  const file = document.getElementById("file");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const vals = checkInputs();
    if (Object.keys(vals).length === 5) {
      inputs.forEach((v) => {
        const val = v.parentElement;
        if(v.type === 'file') {
          val.classList="drop-container"
          val.parentElement.classList="form-control"
        } else {
          val.classList="form-control"
        }
      })
      form.reset();
      Swal.fire({
        icon: 'success',
        title: 'Bạn đã nộp CV thành công!',
      })
    }
  });

  function checkInputs() {
    // trim to remove the whitespaces
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const phoneV = phone.value.trim();
    const positionV = position.value.trim();
    const fileV = file.files[0];
    let params = {};

    if (!fileV) {
      setErrorFor(file, "File không được để trống!", "file");
    } else if (fileV.size / 1024 > 25000) {
      setErrorFor(file, "File không được quá 25MB!", "file");
    } else {
      setSuccessFor(file,"File OK", "file");
      params.file = fileV;
    }

    if (usernameValue === "") {
      setErrorFor(username, "Họ và Tên không được để trống!");
    } else {
      setSuccessFor(username);
      params.username = usernameValue;
    }

    if (emailValue === "") {
      setErrorFor(email, "Email không được để trống!");
    } else if (!isEmail(emailValue)) {
      setErrorFor(email, "Email không đúng định dạng");
    } else {
      setSuccessFor(email);
      params.email = emailValue;
    }

    if (phoneV === "") {
      setErrorFor(phone, "Số điện thoại không được bỏ trống!");
    } else if (hasWhiteSpace(phoneV) || phoneV.length > 14) {
      setErrorFor(
        phone,
        "Số điện thoại không được phép có khoảng trống và có hơn 14 kí tự!"
      );
    } else {
      setSuccessFor(phone);
      params.phone = phoneV;
    }

    if (positionV === "") {
      setErrorFor(position, "Vị trí tuyển dụng không được bỏ trống");
    } else {
      setSuccessFor(position);
      params.position = positionV;
    }
    return params;
  }

  function setErrorFor(input, message, type) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    if (type === "file") {
      const smallF = formControl.parentElement.querySelector("small")
      formControl.parentElement.className="form-control error"
      formControl.className = "drop-container error";
      smallF.innerText = message;
    } else {
      formControl.className = "form-control error";
      small.innerText = message;
    }
  }

  function setSuccessFor(input, val, type) {
    const formControl = input.parentElement;
    if (type === "file") {
      formControl.parentElement.className="form-control success"
      formControl.className = "drop-container success";
    } else {
      formControl.className = "form-control success";
    }
  }

  function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  }
  function hasWhiteSpace(s) {
    return /\s/g.test(s);
  }

  new Swiper(".swiper", {
    spaceBetween: window.location.href.includes("Employee") ? 40 : 0,
    centeredSlides: true,
    direction: "horizontal",
    autoplay: {
      delay: 1300,
      disableOnInteraction: true,
    },
    speed: 800,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      parallax: true,
    },
    autoplayDisableOnInteraction: false,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    loop: true,
  });

  new Swiper(".swiperlogo", {
    spaceBetween: 50,
    slidesPerGroup: 1,
    direction: "horizontal",
    autoplay: {
      delay: 1300,
      disableOnInteraction: false,
    },
    speed: 800,
    loopFillGroupBlank: true,
    loop: true,
    breakpoints: {
      500: {
        slidesPerView: 1,
      },
      868: {
        slidesPerView: 2,
      },
      1000: {
        slidesPerView: 4,
      },
      1250: {
        slidesPerView: 5,
      },
    },
  });

  $("#next").on("click", function () {
    let tabAres = document.querySelectorAll(".iArea");
    $("#slide").append(tabAres[0]);
  });
  $("#prev").on("click", function () {
    let tabAres = document.querySelectorAll(".iArea");
    $("#slide").prepend(tabAres[tabAres.length - 1]);
  });

  $("#boxValue .box-val").on("click", function (e) {
    e.preventDefault();
    $("#boxValue").removeAttr("data-aos");
    $("#boxValue").removeClass("aos-init");
    $("#boxValue .box-val.active").removeClass("active");
    const classesPar = $("#boxValue").attr("class").split(" ");
    if (classesPar.length > 1) {
      $("#boxValue").removeClass(classesPar.pop());
    }
    $(this).addClass("active").parent().addClass($(this).attr("data-id"));
  });

  $("#icScrollTop").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, "fast");
    return false;
  });

  $(".popup-gallery")
    .find("a.popup4")
    ?.magnificPopup({
      type: "iframe",
      gallery: {
        enabled: false,
      },
    });

  $(window).on("scroll", function () {
    const scrollY = window.scrollY;
    if (scrollY < 200) {
      $("#icScrollTop").removeClass("ic-scrollTop-show");
      $(".navbar-expand-lg").removeClass("oque");
    } else {
      $("#icScrollTop").addClass("ic-scrollTop-show");
      $(".navbar-expand-lg").addClass("oque");
    }

    els.forEach((e) => {
      const top = e.offsetTop - 200;
      const height = e.offsetHeight;
      const id = e.getAttribute("id");
      if (scrollY >= top && top + height >= scrollY) {
        links.forEach((e, i) => {
          e.classList.remove("active");
          document
            .querySelector(`header nav a[href="#${id}"]`)
            ?.classList.add("active");
          if (e.getAttribute("id") === "cvalue") {
            console.log("alo ha");
          }
        });
      }
    });
  });

  $(".navbar-nav>li>a").on("click", function () {
    $(".navbar-collapse").collapse("hide");
  });

  setTimeout(() => {
    $("#loading-overlay").remove();
  }, 1000);

  valNumDisplay.forEach((val) => {
    let start = 0;
    let end = parseInt(val.getAttribute("data-val"));

    let duration = Math.floor(4000 / end);

    let counter = setInterval(() => {
      start += 1;
      if(val.getAttribute('data-val')==='98') {
        val.textContent = `${start}%`;
      } else {
        val.textContent = `${start}+`;
      }

      if (start == end) {
        clearInterval(counter);
      }
    }, duration);
  });

  $(".card .card-body").removeClass("active").slideUp();

  $(window).on("resize", function () {
    const width = $(window).width();
    if (width <= 992) {
      $(".wrHeader").removeClass("container");
      $(".wrHeader").addClass("container-fluid");
    } else {
      $(".wrHeader").addClass("container");
      $(".wrHeader").removeClass("container-fluid");
    }
  });
  AOS.init({
    debounceDelay: 50,
    startEvent: "DOMContentLoaded",
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 700, // values from 0 to 3000, with step 50ms
    once: false, // whether animation should happen only once - while scrolling down
    mirror: true, // whether elements should animate out while scrolling past them
    anchorPlacement: "top-bottom",
    offset: 200,
  });
  AOS.refresh();
});
