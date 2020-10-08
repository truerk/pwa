import { initDataSrc } from "./methods/init_data_src";
import { smoothScroll } from "./modules/smooth_scroll";
import { buildMap } from "./modules/add_map";
import { videoPopup } from "./modules/video_popup";
import { interactiveBanner } from "./modules/interactiveBanner";
import Swiper from "swiper";

window.addEventListener("resize", () => {
    initDataSrc();
});

interactiveBanner(
    document.getElementById("advantages"),
    document.getElementById("receive")
);

const sliderFirst = new Swiper(document.querySelector("[am-slider-first]"), {
    // Optional parameters
    wrapperClass: "swiper-wrapper",
    slideClass: "swiper-slide",
    direction: "horizontal",
    loop: true,
    simulateTouch: false,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    updateOnWindowResize: true,
    watchOverflow: true,
    observer: true,
    slidesPerView: "auto",
    centeredSlides: true,
    //slidesPerGroup: 2,
    //loopFillGroupWithBlank
    loopedSlides: 6,
    // touchReleaseOnEdges: true,
    autoplay: {
        delay: 1,
        disableOnInteraction: false
    },
    speed: 3000,
    breakpoints: {
        720: {
            direction: "vertical",
        }
    }
});

const sliderSecond = new Swiper(document.querySelector("[am-slider-second]"), {
    // Optional parameters
    wrapperClass: "swiper-wrapper",
    slideClass: "swiper-slide",
    direction: "vertical",
    loop: true,
    simulateTouch: false,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    updateOnWindowResize: true,
    watchOverflow: true,
    observer: true,
    slidesPerView: "auto",
    centeredSlides: true,
    //slidesPerGroup: 2,
    //loopFillGroupWithBlank
    loopedSlides: 6,
    // touchReleaseOnEdges: true,
    autoplay: {
        delay: 1,
        disableOnInteraction: false
    },
    speed: 3000,
    breakpoints: {
        959: {
            direction: "vertical",
        }
    }
});

//Мобильное меню
const openMobileHeader = () => {
    const burger = document.querySelector("[am-burger]");
    const header = document.querySelector('[am-tooltip="mobile-header"]');
    const close = header.querySelector(["[am-close]"]);

    const checkState = e => {
        if (e.target == burger || e.target == close || e.target.closest('[am-menu-item]')) {
            if (header.hasAttribute("active")) {
                header.removeAttribute("active");
            } else {
                header.setAttribute("active", "");
            }
        } else if (!e.target.closest('[am-tooltip="mobile-header"]')) {
            header.removeAttribute("active");
        }
    };

    document.addEventListener("click", checkState, false);
};

window.addEventListener(
    "scroll",
    () => {
        buildMap();
    },
    { once: true }
);

videoPopup();
initDataSrc();
smoothScroll();
openMobileHeader();
