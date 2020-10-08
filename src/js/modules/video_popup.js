import { createElement } from '../methods/create_element';
import { closeAction } from '../methods/popup_interaction';

export const videoPopup = () => {
    const popupContainer = document.querySelector('#wrapper');
    const openButtons = document.querySelectorAll('[am-popup-video]');
    
    openButtons.forEach(button => {
        button.addEventListener('click', () => {
            createPopupVideo(popupContainer, button.getAttribute('am-popup-video'));
        });
    });
}

const createPopupVideo = (container, type) => {
    const sourceWebm = createElement('source', {'src': 'src/img/video/pobeda_'+ type +'.webm', 'type': 'video/webm'}, []);
    const sourceMp4 = createElement('source', {'src': 'src/img/video/pobeda_'+ type +'.mp4', 'type': 'video/mp4'}, []);
    const sourceOgv = createElement('source', {'src': 'src/img/video/pobeda_'+ type +'.ogv', 'type': 'video/ogg'}, []);    

    const video = createElement('video', {'loop': '', /*'autoplay': '', 'muted': '',*/ 'controls': ''}, [sourceWebm, sourceMp4, sourceOgv]);
    const close = createElement('div', {'am-button-close': ''});
    let tooltip = createElement('div', {'am-tooltip': 'send'}, [close, video]);
    const field = createElement('div', {'am-popup': 'send-popup', 'show-popup': 'true', 'id': 'popup'}, [tooltip]);

    closeAction(close, container, field);
    container.insertBefore(field, container.children[0]);    
}