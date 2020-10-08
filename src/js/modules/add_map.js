import ymaps from "ymaps";

export const buildMap = () => {
    let mapLeft = "",
        mapTop = document.querySelector("[am-map]").offsetHeight,
        mapBottom;
    if (window.innerWidth < 720) {
        mapLeft = "5%";
        mapBottom = '50px';
        mapTop = 'auto';
    } else if (window.innerWidth > 719 && window.innerWidth < 959) {
        mapLeft = "10%";
        mapTop = mapTop / 3;
        mapBottom = 'initial';
    } else if (window.innerWidth > 960 && window.innerWidth < 1159) {
        mapLeft = "15%";
        mapTop = mapTop / 4;
        mapBottom = 'initial';
    } else {
        mapLeft = "25%";
        mapTop = mapTop / 4;
        mapBottom = 'initial';
    }

    //Инициализация яндекс.карт
    ymaps
        .load("https://api-maps.yandex.ru/2.1/?lang=ru_RU")
        .then(maps => {  
            //Настройки интерфейса
            let customZoomControl = new maps.control.ZoomControl({
                    options: {
                        position: {
                            top: mapTop,
                            left: mapLeft,                            
                            bottom: mapBottom,
                            yandexMapAutoSwitch: true
                        }
                    }
                }),
                myGeoObjects = [],
                myClusterer;
                
            //Создаем карту
            const map = new maps.Map("map", {
                center: [59.91807704072416,30.304899499999895],
                zoom: 4,
                controls: [customZoomControl, "fullscreenControl"]
            });

            //Создаем кластер
            myClusterer = new maps.Clusterer({
                preset:'islands#redClusterIcons'
            });

            //Настройки поведения карты
            window.addEventListener("resize", () => {
                map.container.fitToViewport();
                map.behaviors.enable("multiTouch");
                map.behaviors.disable("multiTouch");
                if (window.innerWidth < 720) {
                   map.setCenter([59.91807704072416,30.304899499999895]);
                } else {
                    //map.setCenter([59.91807704072416,30.304899499999895]);
                }
            });
            if (window.innerWidth < 720) {
                map.behaviors.enable("multiTouch");
                map.behaviors.disable("multiTouch");
                map.setCenter([59.91807704072416,30.304899499999895]);
            } else {
               map.setCenter([59.91807704072416,30.304899499999895]);
            }
            map.behaviors.disable("scrollZoom");

            //Создаем метку для вывода через группировку (кластеры)
            var myGeoObject = new maps.GeoObject({
                geometry: {
                    type: "Point",
                    coordinates: [55.75, 37.61]
                },
                properties: {
                    // hintContent: "Москва",
                    // balloonContentHeader: "Москва",
                    // balloonContentBody: "Столица России",
                }
                }, {
                    preset: "islands#redDotIcon",
                    draggable: false,
                    iconLayout: "default#image",
                    iconImageHref: "/src/img/icons/dot_city.svg",
                    iconImageSize: [33, 53],
                    iconImageOffset: [-17, -55],
                    zIndex: 55
            });
            
            myGeoObject.events.add('click', function() {
                map.setCenter(myGeoObject.geometry.getCoordinates(), 17, {checkZoomRange: true});
            });
            
            myGeoObjects[0] = myGeoObject; 
            myClusterer.add(myGeoObjects);
            map.geoObjects.add(myClusterer);

            if (myGeoObjects.length > 1) {
                map.setBounds(collectionDot.getBounds());
            }
        })
        .catch(error => console.log("Failed to load Yandex Maps", error));
};
