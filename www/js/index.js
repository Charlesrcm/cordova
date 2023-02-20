// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);


function onDeviceReady() {

    const pizzaForm = document.querySelector('#pizzaForm');
    const pizzasTag = document.querySelector('.pizzas');
    const errorTag = document.querySelector('.error');

    pizzaForm.addEventListener('submit', e => {
        e.preventDefault();
        const pizzaName = pizzaForm.nomPizza.value;
        const ingredients = pizzaForm.ingredient.value;

        if (isValid(pizzaName) && isValid(ingredients)) {

            const pizzaTag = document.createElement('ion-col');

            pizzaTag.setAttribute('size', '6');
            pizzaTag.className = 'pizza';
            pizzaTag.innerHTML = `
                    <ion-card id="pizzaCard">
                        <img alt="image de la pizza" src="../imports/pizza.jpg" />
                        <ion-card-header>
                        <ion-card-title>${capitalizeFirst(pizzaName)}</ion-card-title>
                        </ion-card-header>
                
                        <ion-card-content>
                        ${formatIngredients(ingredients)}
                        </ion-card-content>
                    </ion-card>
            `;

            pizzasTag.insertBefore(
                pizzaTag,
                pizzasTag.firsElementChild,
            );

            pizzaForm.requestFullscreen();
        } else {
            errorTag.innerHTML = '<p>Formulaire invalide ! </p>';
            setTimeout(() => errorTag.innerHTML = '', 2000);
        }
    });

    function capitalizeFirst(value) {
        return value.trim().slice(0, 1).toUpperCase() + value.trim().slice(1);
    }

    function formatIngredients(value) {
        return value.trim().replaceAll(' ', ', ');
    }

    function isValid(value) {
        return value && value.length > 2 && value.length < 50;
    }

    const btAlert = document.querySelector('#bt-alert');
    btAlert.addEventListener('click', presentAlert);
}

async function presentAlert() {
    const alert = document.createElement('ion-alert');
    alert.mode = 'ios';
    alert.header = 'Alert';
    alert.subHeader = 'Important message';
    alert.message = 'This is an alert!';
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    await alert.present();
}
