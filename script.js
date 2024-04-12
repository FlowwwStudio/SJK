gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
  var i = 0;
  var txtElement = document.querySelector("[fs-text='typewritter']");

  // Check if the element exists in the DOM
  if (txtElement !== null) {
      var txt = txtElement.textContent; // Capture the text to be typed
      var speed = 45; // Speed of typing each character

      // Clear the text inside the fs-text element and make it invisible initially
      txtElement.textContent = '';
      txtElement.style.opacity = 0;

      // Function to initiate the typewriter effect
      function startTyping() {
          // Make the text element visible
          txtElement.style.opacity = 1;

          // Function for the typewriter effect
          function typeWriter() {
              if (i < txt.length) {
                  txtElement.innerHTML += txt.charAt(i);
                  i++;
                  setTimeout(typeWriter, speed);
              }
          }

          // Start the typewriter effect
          typeWriter();
      }

      // Delay the start of the typewriter effect by 500ms
      setTimeout(startTyping, 800);
  }
});



const lenis = new Lenis({
  smooth: true, // Enable smooth scrolling
  autoResize: true,
  smoothWheel: true,
});

lenis.on("scroll", (e) => {
  // console.log(e);
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 900);
});

gsap.ticker.lagSmoothing(0);

const headlineTarget = document.querySelector("[fs-typewritter='text']");

// Check if the element exists in the DOM
if (headlineTarget) {
  const text = headlineTarget.textContent; // Get the text content from the element

  function textTypingEffect(element, text, i = 0) {
    if (i === 0) {
      element.textContent = ""; // Clear the content at the start
    }

    element.textContent += text[i]; // Add the next character

    // If we haven't reached the end of the string
    if (i < text.length - 1) {
      // Only proceed if we haven't reached the end
      setTimeout(() => textTypingEffect(element, text, i + 1), 15); // Move to the next character
    }
  }

  // Start the typing effect
  textTypingEffect(headlineTarget, text);
}

// ––– button hover effect –––
$("[data-btn='wrap']").each(function () {
  // Check if data-button-style is 'link' and skip if true
  if ($(this).attr("data-button-style") === "link") {
    return; // Skip the rest of the code for this element
  }

  const clipEl = $(this).find("[data-btn='clip']").attr("aria-hidden", "true");
  const durationSetting = 0.6;
  const easeSetting = "sine.out";

  function getPercentTop(el, e) {
    let elTop = el.offset().top - $(window).scrollTop();
    let mouseTop = e.pageY - $(window).scrollTop() - elTop;
    return (mouseTop / el.innerHeight()) * 100;
  }
  function getPercentLeft(el, e) {
    let elLeft = el.offset().left;
    let mouseLeft = e.pageX - elLeft;
    return (mouseLeft / el.innerWidth()) * 100;
  }

  $(this).on("mouseenter", function (e) {
    let percentTop = getPercentTop($(this), e);
    let percentLeft = getPercentLeft($(this), e);
    gsap.set(clipEl, { display: "flex" });
    gsap.fromTo(
      clipEl,
      { clipPath: `circle(0% at ${percentLeft}% ${percentTop}%)` },
      {
        clipPath: `circle(141.4% at ${percentLeft}% ${percentTop}%)`,
        duration: durationSetting,
        ease: easeSetting,
      },
    );
  });

  $(this).on("mouseleave", function (e) {
    let percentTop = getPercentTop($(this), e);
    let percentLeft = getPercentLeft($(this), e);
    gsap.to(clipEl, {
      clipPath: `circle(0% at ${percentLeft}% ${percentTop}%)`,
      overwrite: true,
      duration: durationSetting,
      ease: easeSetting,
    });
  });
});

// ––– Navigation logo animation –––

let mm = gsap.matchMedia();

const pageWrapper = document.querySelector(".page-wrapper");
const logoObject = document.querySelector("[fs-logo='object']");
const logo = document.querySelector("[fs-logo='svg']");
const logoTarget = document.querySelector("[fs-logo='target']");
const logoWrapper = document.querySelector("[fs-logo='wrapper']");
const logoTrigger = document.querySelector("[fs-logo='trigger']"); // Selector for the trigger element
const navTlDuration = 1;

const navTl = gsap.timeline({
  ease: "power1.inOut",
  scrollTrigger: {
    trigger: pageWrapper,
    markers: false,
    start: "100 top",
    end: "bottom bottom",
    toggleActions: "play none none reverse",
  },
  onStart: () => logoTrigger.click(), // Clicks the trigger to play the Lottie animation when the timeline starts
  onReverseComplete: () => logoTrigger.click(), // Clicks the trigger to reverse the Lottie animation when the timeline reverses completely
});

// --- Desktop –––
mm.add("(min-width: 800px)", () => {
  // desktop setup code here...
  navTl
    .to(logo, {
      duration: navTlDuration,
      width: "auto",
      height: "2rem",
    })
    .to(
      ".navbar_container",
      {
        borderTop: "1px solid var(--color-brand--black)!important",
        borderBottom: "1px solid var(--color-brand--black)!important",
      },
      "<",
    )
    .to(
      logoTarget,
      {
        duration: navTlDuration,
        width: "13rem",
        height: "2rem",
      },
      "<",
    )
    .to(
      logoWrapper,
      {
        duration: navTlDuration,
        height: 0,
        paddingTop: "1.25rem",
      },
      "<",
    )
    .to(
      logo,
      {
        y: "1.8125rem",
        x: "-0.8125rem",
      },
      "<",
    );
});

mm.add("(max-width: 799px)", () => {
  // mobile setup code here...
  navTl.to(logo, {
    duration: 0.5,
    width: "auto",
    height: "2rem",
  });
  $(".navbar_menu-text" || ".w-nav-overlay").click(function () {
    var clicks = $(this).data("clicks");
    if (clicks) {
      // Second clicks
      $(this).text("MENU");
    } else {
      // First clicks
      $(this).text("CLOSE");
    }
    $(this).data("clicks", !clicks);
  });
});

$(document).ready(function () {
  // Check if the element exists before initializing the slider
  if ($("[fs-drag-slider='list']").length > 0) {
    $("[fs-drag-slider='list']").slick({
      dots: false,
      speed: 700,
      infinite: true,
      slidesToShow: 2,
      variableWidth: true,
      slidesToScroll: 1,
      arrows: true,
      appendArrows: $(".home_cases_arrow-container"),
      touchThreshold: 100,
      responsive: [
        {
          // landscape
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          // mobile portrait
          breakpoint: 479,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
  }
});

mm.add("(min-width: 768px)", () => {
  document.addEventListener("DOMContentLoaded", function () {
    // 1. Check if the elements are present in the DOM.
    const wrapper = document.querySelector('[fs-scroll-slider="wrapper"]');
    const list = document.querySelector('[fs-scroll-slider="list"]');
    const items = document.querySelectorAll('[fs-scroll-slider="item"]');

    if (wrapper && list && items.length > 0) {
      // 2. Get the total width of all items together.
      let totalWidth = 0;
      items.forEach((item) => {
        const itemWidth = item.getBoundingClientRect().width;
        totalWidth += itemWidth;
      });

      // 3. Update the CSS variable with the total width of all the items.
      document.documentElement.style.setProperty(
        "--how-we-work-width",
        `${totalWidth}px`,
      );

      // 4. Check when the wrapper is 5% from the top of the screen.
      const scrollTriggerStart = () => {
        const triggerOffset = window.innerHeight * 0.05;
        const wrapperTop = wrapper.getBoundingClientRect().top;

        return wrapperTop <= triggerOffset;
      };

      // 5. GSAP ScrollTrigger timeline.
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top 5%",
          end: "bottom 105%",
          scrub: 1,
          // onEnter: () => tl.play(),
          // onLeaveBack: () => tl.reverse()
        },
      });

      // Calculate the distance to move the list.
      const moveDistance =
        totalWidth - items[items.length - 1].getBoundingClientRect().width;

      // The timeline animation to move the list.
      tl.to(list, {
        x: -moveDistance,
        ease: "none",
      });
    } else {
      return;
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  $("[fs-click='show-more']").on("click", function () {
    $(this).toggleClass("text-style-3lines");
  });
});

// document.addEventListener("DOMContentLoaded", function() {
//   const cursor = document.querySelector("[fs-cursor='drag']");
//   const cursorWrapper = document.querySelector("[fs-cursor='wrapper']");

//   cursorWrapper.appendChild(cursor);

//   if (!cursor || !cursorWrapper) {
//       console.error('Cursor or cursor wrapper not found!');
//       return;
//   }

//   cursorWrapper.addEventListener('mousemove', (e) => {
//       const rect = cursorWrapper.getBoundingClientRect();
//       const cursorWidth = cursor.offsetWidth / 2; // Half the cursor's width
//       const cursorHeight = cursor.offsetHeight / 2; // Half the cursor's height
//       const xPos = e.clientX - rect.left - cursorWidth; // Adjust for cursor width
//       const yPos = e.clientY - rect.top - cursorHeight; // Adjust for cursor height

//       gsap.to(cursor, {
//           x: xPos,
//           y: yPos,
//           scale: 1,
//           opacity: 1,
//           duration: 0.1,
//           ease: 'linear'
//       });
//   });

//   cursorWrapper.addEventListener('mouseleave', () => {
//       gsap.to(cursor, {
//           scale: 0,
//           opacity: 0,
//           duration: 0.8,
//           ease: 'power2.out'
//       });
//   });

//   cursorWrapper.addEventListener('mouseenter', () => {
//       gsap.to(cursor, {
//           scale: 1,
//           opacity: 1,
//           duration: 0.2,
//           ease: 'power2.out'
//       });
//   });
// });

// ––– Mirror click –––

document.addEventListener("DOMContentLoaded", () => {
  $("[fs-mirror='source']").on("click", function () {
    $("[fs-mirror='target']").click();
  });
});
document.addEventListener("DOMContentLoaded", () => {
  // Select all elements with fs-mirror attribute set to "source"
  $("[fs-mirror='source-slick']").each(function () {
    const sourceElement = $(this);

    // Use the data-source-index attribute to determine which child to target
    const sourceIndex = sourceElement.data("source-index");

    // Set up the click event listener for the source element
    sourceElement.on("click", function () {
      // Target the specific child of the parent element based on the source index
      // Note: The index is 1-based for user convenience, so we subtract 1 to get the 0-based index for eq()
      $("[fs-mirror='parent']")
        .children()
        .eq(sourceIndex - 1)
        .click();
    });
  });
});