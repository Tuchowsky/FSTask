window.addEventListener('load', ()=>{

    //rendering view which depends of window size
    function drawView(){
        if(window.innerWidth <= 360){
            drawMobileView();
        }else if(window.innerWidth > 360){
            drawDesktopView();
        }
    }
    drawView();

    window.addEventListener('resize', ()=>{
        drawView();
    });

    //view for desktops
    function drawDesktopView(){
        let body = document.querySelector('body');
        body.innerHTML = `
        <div class="form-container">
            <div class="logo"></div>
            <form class="form no-error" novalidate>
                <div class="form-input">
                    <label class="mail-icon icon icon-no-error"></label>
                    <input class="border-no-error"
                        type="email"
                        placeholder="Adres e-mail..."
                        required/>
                </div>
            
                <div class="form-input">
                    <label class="sms-pass-icon icon icon-no-error"></label>
                    <input class="border-no-error"
                            type="text"
                            placeholder="Wpisz hasło otrzymane w SMS..."
                            required/>
                </div>
                <div class="form-check center">
                    <input id="acceptRules" class="form-check-input" type="checkbox" name="acceptRadio" value="opt">
                    <span class="checkmark"></span>
                    <label class="form-check-label" for="acceptRules">
                        Akceptuję <a href="#">regulamin</a> i <a href="#">politykę prywatności</a>
                    </label>
                </div>
                <button type="submit">Zaloguj</button>
            </form>
        </div>
        `;
    }

    //view for mobile
    function drawMobileView(){
        let body = document.querySelector('body');
        body.innerHTML = `
        <div class="form-container">
            <div class="logo"></div>
            <form class="form no-error" novalidate>
                <div class="form-input">
                    <label class="mail-icon icon icon-no-error"></label>
                    <input class="border-no-error"
                        type="email"
                        placeholder="Adres e-mail..."
                        required/>
                </div>
            
                <div class="form-input">
                    <label class="phone-icon icon icon-no-error"></label>
                    <input class="border-no-error"
                            type="text"
                            placeholder="+__ _________"
                            required/>
                </div>
                <div class="form-check vertical-center">
                    <input id="acceptRules" class="form-check-input" type="checkbox" name="acceptRadio" value="opt">
                    <span class="checkmark"></span>
                    <label class="form-check-label" for="acceptRules">
                        Akceptuję <a href="#">regulamin</a> i <a href="#">politykę prywatności</a>
                    </label>

                </div>
                <button type="submit">Zaloguj</button>
            </form>
        </div>
        `;
    }

    const button = document.querySelector('button');
    let form = document.querySelector('.form');
    
    function deleteClass(cl, element){
        element.classList.remove(cl);
    }

    function changeClass(clr, cla, element){
        element.classList.remove(clr);
        element.classList.add(cla);
    }

    let errorCheck = false;
    button.addEventListener('click', (e) => {
        e.preventDefault();
        let inputMail = document.querySelector('input[type=email]');
        let inputSmsPass = document.querySelector('input[type=text]');
        let checkmark = document.querySelector('.form-check-input');

        if((inputMail.value.length <= 3 || inputSmsPass.value.length <= 3 || checkmark.checked === false) && errorCheck === false){
            errorCheck = true;

            //shadowing form when form validating
            form.classList.add('validating-progress');
            setTimeout(()=>{
                deleteClass('validating-progress', form);
            },500);

            //main variables
            let formInput = document.querySelector('.form-input');
            let checkboxInput = document.querySelector('.checkmark');
            let icons = document.querySelectorAll('.icon');

            let errorBox = document.createElement('div');
            errorBox.setAttribute('class', 'error-box');
            errorBox.innerText = 'Wpisz poprawny e-mail';
                    
            //add error box
            form.insertBefore(errorBox, formInput);
            
            //display error color when form is not valid
            deleteClass('no-error', form);
            changeClass('border-no-error','border-error', inputMail);
            changeClass('border-no-error','border-error', inputSmsPass);
            checkboxInput.classList.add('checkmark-error');
            for(let i = 0; i < icons.length; i++){
                changeClass('icon-no-error','icon-error', icons[i]);
            }

        } else if(inputMail.value.length > 3 && inputSmsPass.value.length > 3 && checkmark.checked === true){
            alert('Formularz wypełniono poprawnie');
        } 
        else {
            alert('Popraw formularz');
        }
        
    });

});
    


