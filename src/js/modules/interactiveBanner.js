export const interactiveBanner = (advantages, orders) => {
    let advantagesInterval;

    function advantagesStage() {
        let interactiveButton = advantages.querySelectorAll("[am-interactive-button]"),
            currentStage, 
            nextStage;

        //Вычисляем текущую стадию
        interactiveButton.forEach(buttonStage => {
            if (buttonStage.hasAttribute("active")) {
                currentStage = buttonStage.getAttribute("am-interactive-button");
            }
        });

        //Вычисляем следующую стадию
        switch (currentStage) {
            case "stage-1":
                nextStage = 'stage-2';
                break;
            case "stage-2":
                nextStage = 'stage-3';
                break;
            case "stage-3":
                nextStage = 'stage-4';
                break;
            case "stage-4":
                nextStage = 'stage-1';
                break;
            default:
                console.log('warning advantages: switch stage');
                return false;
                break;
        }

        //Меняем стадии
        advantages.querySelector('[am-interactive-button="'+ currentStage +'"]').removeAttribute('active');
        advantages.querySelector('[am-interactive-button="'+ currentStage +'"] [am-icon]').removeAttribute('active');
        advantages.querySelector('[am-interactive-text="'+ currentStage +'"]').removeAttribute('active');
        advantages.querySelector('[am-interactive-stage="'+ currentStage +'"]').removeAttribute('active');
        advantages.querySelector('[am-interactive-button="'+ currentStage +'"] [am-progress] circle').removeAttribute('am-progress-start');

        advantages.querySelector('[am-interactive-button="'+ nextStage +'"]').setAttribute('active', '');
        advantages.querySelector('[am-interactive-button="'+ nextStage +'"] [am-icon]').setAttribute('active', '');
        advantages.querySelector('[am-interactive-button="'+ nextStage +'"] [am-progress] circle').setAttribute('am-progress-start', '');
        advantages.querySelector('[am-interactive-text="'+ nextStage +'"]').setAttribute('active', '');
        advantages.querySelector('[am-interactive-stage="'+ nextStage +'"]').setAttribute('active', '');
    }

    //Меняем стадии по клику на иконку
    advantages.querySelectorAll("[am-interactive-button]").forEach(buttonStage => {
        buttonStage.addEventListener('click', () => {
            clearInterval(advantagesInterval);
            let needStage = buttonStage.getAttribute('am-interactive-button');            
            
            advantages.querySelector('[am-interactive-button][active] [am-icon]').removeAttribute('active');
            advantages.querySelector('[am-interactive-button][active] [am-progress] circle').removeAttribute('am-progress-start');
            advantages.querySelector('[am-interactive-button][active]').removeAttribute('active');
            advantages.querySelector('[am-interactive-text][active]').removeAttribute('active');
            advantages.querySelector('[am-interactive-stage][active]').removeAttribute('active');
            
            setTimeout(() => {
                advantages.querySelector('[am-interactive-button="'+ needStage +'"]').setAttribute('active', '');
                advantages.querySelector('[am-interactive-button="'+ needStage +'"] [am-icon]').setAttribute('active', '');
                advantages.querySelector('[am-interactive-button="'+ needStage +'"] [am-progress] circle').setAttribute('am-progress-start', '');
                advantages.querySelector('[am-interactive-text="'+ needStage +'"]').setAttribute('active', '');
                advantages.querySelector('[am-interactive-stage="'+ needStage +'"]').setAttribute('active', '');

                advantagesInterval = setInterval(() => {
                    advantagesStage();
                }, 8000);
            }, 50);
            
            
        });        
    });

    advantagesInterval = setInterval(() => {
        advantagesStage();
    }, 8000);

    //Меняем стадии по клику на кнопки
    function ordersStages() {
        let buttonPrev = orders.querySelectorAll('[am-interactive-prev]'),
            buttonNext = orders.querySelectorAll('[am-interactive-next]');

        function nextStage() {
            let stages = orders.querySelectorAll("[am-interactive-stage]"),
                currentStage,
                needStage;

            //Вычисляем текущую стадию
            stages.forEach(stage => {
                if (stage.hasAttribute("active")) {
                    currentStage = stage.getAttribute("am-interactive-stage");
                }
            });
            
            //Вычисляем следующую стадию
            if (this.hasAttribute('am-interactive-next')) {
                switch (currentStage) {
                    case "stage-1":
                        needStage = 'stage-2';
                        console.log(1);
                        break;
                    case "stage-2":
                        needStage = 'stage-3';
                        console.log(2);
                        break;
                    case "stage-3":
                        needStage = 'stage-4';
                        console.log(3);
                        break;
                    default:
                        console.log('warning advantages: switch stage');
                        return false;
                        break;
                }
            } else {
                switch (currentStage) {
                    case "stage-2":
                        needStage = 'stage-1';
                        console.log(11);
                        break;
                    case "stage-3":
                        needStage = 'stage-2';
                        console.log(22);
                        break;
                    case "stage-4":
                        needStage = 'stage-3';
                        console.log(33);                    
                        break;
                    default:
                        console.log('warning advantages: switch stage');
                        return false;
                        break;
                }
            }

            buttonPrev.forEach(button => {
                button.setAttribute('active', '');
            });
            buttonNext.forEach(button => {
                button.setAttribute('active', '');
            });
            //Обновляем кнопки
            if (needStage == 'stage-4') {
                buttonNext.forEach(button => {
                    button.removeAttribute('active');
                });
                buttonPrev.forEach(button => {              
                    button.setAttribute('active', ''); 
                });
            } 
            else if (needStage == 'stage-1') {
                buttonPrev.forEach(button => {
                    button.removeAttribute('active');
                });
                buttonNext.forEach(button => {            
                    button.setAttribute('active', ''); 
                });
            }
            
            
            //Обновляем баннер
            orders.querySelector('[am-interactive-text][active]').removeAttribute('active');
            orders.querySelector('[am-interactive-stage][active]').removeAttribute('active');

            orders.querySelector('[am-interactive-text="'+ needStage +'"]').setAttribute('active', '');
            orders.querySelector('[am-interactive-stage="'+ needStage +'"]').setAttribute('active', '');          
        }
        
        buttonPrev.forEach(button => {
            button.addEventListener('click', nextStage);
        });
        buttonNext.forEach(button => {            
            button.addEventListener('click', nextStage);
        });
    } 

    ordersStages();
};