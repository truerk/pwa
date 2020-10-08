import { canUseWebP } from './can_use_webp'
import { lazyLoad } from './lazy_load';

export const initDataSrc = (callback) => {
    callback = callback || false
    const imgs = document.querySelectorAll('[load-src]');
    imgs.forEach = [].forEach;
    imgs.forEach((item, i) => {
        const isMobile = screen.width < 720;
        const isTablet = screen.width > 719 && screen.width < 961;
        const isLaptop = screen.width > 959 && screen.width < 1161;
        let src;
        if (isMobile) {
            src = item.getAttribute('data-src-mobile')
        } else if (isTablet) {
            src = item.getAttribute('data-src-tablet')
        } else if (isLaptop) {
            src = item.getAttribute('data-src-laptop')
        } else {
            src = item.getAttribute('data-src-desktop')
        }
        const format = canUseWebP() ? '.webp' : '.png';
        switch (item.constructor.name) {
            case 'HTMLVideoElement':
                item.setAttribute('poster', src + format);
                break;
            case 'HTMLDivElement':
                const compare = src + format;
                return item.style.background = 'url(' + compare + ') no-repeat center bottom / cover';
                break;
            default:
                item.setAttribute('data-src', src + format);
                lazyLoad()
                break;
        }
        if (i === (imgs.length - 1) && callback !== false) {
            callback();
        }
    })
}