export const smoothScroll = () => {
  let menuItems = document.querySelectorAll('[am-menu-item]');

  menuItems.forEach(item => {
    let itemValue = item.getAttribute('am-menu-item');
    const neededSector = document.getElementById(itemValue);    
    const neededId = neededSector.getAttribute('id');
    if (neededId == itemValue) {
      item.addEventListener('click', (e) => {
        e.preventDefault;

        neededSector.scrollIntoView({block: "end", inline: "nearest", behavior: "smooth"});        
      })
    }
  })
}

