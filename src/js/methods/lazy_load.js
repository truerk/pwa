export const lazyLoad = () => {
  let images = [...document.querySelectorAll('img[load-src]')]

  const interactSettings = {
    root: document.querySelector('.center'),
    rootMargin: '0px 0px 200px 0px'
  }

  function onIntersection(imageEntites) {
    imageEntites.forEach(image => {
      if (image.isIntersecting) {
        observer.unobserve(image.target)
        image.target.src = image.target.dataset.src
        image.target.onload = () => image.target.classList.add('loaded')
      }
    })
  }

  let observer = new IntersectionObserver(onIntersection, interactSettings)

  images.forEach(image => { observer.observe(image) })
}