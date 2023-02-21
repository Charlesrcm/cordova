// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);


function onDeviceReady() {

    // root
    const homeNav = document.querySelector('#home-nav');
    const homePage = document.querySelector('#home-page');
    homeNav.root = homePage;

    const pizzasNav = document.querySelector('#pizzas-nav');
    const pizzasPage = document.querySelector('#pizzas-page');
    pizzasNav.root = pizzasPage;

    const pizzasTag = document.querySelector('#pizzas-list');
    const btCreatePizza = document.querySelector('#bt-create-pizza');

    async function addAlert() {
        const alert = document.createElement('ion-alert');
        alert.header = 'Ajouter une pizza';
        alert.mode = 'ios';
        alert.inputs = [
            {
                type: 'text',
                name: 'nomPizza',
                id: 'nomPizza',
                placeholder: 'ajouter un nom',
            },
            {
                type: 'text',
                name: 'ingredients',
                id: 'ingredients',
                placeholder: 'Ajouter les ingrédients',
            },
        ];
        alert.buttons = [
            {
                text: "OK",
                role: 'confirm',
                handler: (value) => {
                    const ionItem = document.createElement('ion-item');
                    ionItem.innerHTML = `
                    <ion-label>
                        <h2>${capitalizeFirst(nomPizza.value)}</h2>
                        <h3>${formatIngredients(ingredients.value)}</h3>
                    </ion-label>
                    `;
                    pizzasTag.insertBefore(ionItem, pizzasTag.firstElementChild);
                }
            }];

        document.body.appendChild(alert);
        await alert.present();
    }
    btCreatePizza.addEventListener('click', addAlert)

    // const pizzaForm = document.querySelector('#pizzaForm');
    // const pizzasTag = document.querySelector('.pizzas');
    // const errorTag = document.querySelector('.error');

    // pizzaForm.addEventListener('submit', e => {
    //     e.preventDefault();
    //     const pizzaName = pizzaForm.nomPizza.value;
    //     const ingredients = pizzaForm.ingredient.value;

    //     if (isValid(pizzaName) && isValid(ingredients)) {

    //         const pizzaTag = document.createElement('ion-col');

    //         pizzaTag.setAttribute('size', '6');
    //         pizzaTag.className = 'pizza';
    //         pizzaTag.innerHTML = `
    //                 <ion-card id="pizzaCard">
    //                     <img alt="image de la pizza" src="../imports/pizza.jpg" />
    //                     <ion-card-header>
    //                     <ion-card-title>${capitalizeFirst(pizzaName)}</ion-card-title>
    //                     </ion-card-header>

    //                     <ion-card-content>
    //                     ${formatIngredients(ingredients)}
    //                     </ion-card-content>
    //                     <ion-button fill="clear" id="delete" onclick="presentAlert()">
    //                         <ion-icon name="trash-bin" color="danger"></ion-icon>
    //                     </ion-button>
    //                 </ion-card>
    //         `;


    //         pizzasTag.insertBefore(
    //             pizzaTag,
    //             pizzasTag.firsElementChild,
    //         );

    //         pizzaForm.requestFullscreen();

    //         // gestion de la suppression d'une pizza
    //         const btDelete = document.querySelector('#delete');
    //         btDelete.addEventListener('click', deleteAlert);

    //         async function deleteAlert() {
    //             const pizzaCard = document.querySelector('.pizza');

    //             const alert = document.createElement('ion-alert');
    //             alert.header = 'Attention vous allez supprimer la pizza!';
    //             alert.buttons = [
    //                 {
    //                     text: 'Retour',
    //                     role: 'cancel',
    //                 },
    //                 {
    //                     text: 'OK',
    //                     role: 'confirm',
    //                     handler: () => { pizzaCard.remove(); }
    //                 }
    //             ];

    //             document.body.appendChild(alert);
    //             await alert.present();

    //             const { role } = await alert.onDidDismiss();
    //         }

    //     } else {
    //         errorTag.innerHTML = '<p>Formulaire invalide ! </p>';
    //         setTimeout(() => errorTag.innerHTML = '', 2000);
    //     }
    // });


    function capitalizeFirst(value) {
        return value.trim().slice(0, 1).toUpperCase() + value.trim().slice(1);
    }

    function formatIngredients(value) {
        return value.trim().replaceAll(' ', ', ');
    }

    function isValid(value) {
        return value && value.length > 2 && value.length < 50;
    }

    // const btAlert = document.querySelector('#bt-alert');
    // btAlert.addEventListener('click', presentAlert);
}

// async function presentAlert() {
//     const alert = document.createElement('ion-alert');
//     alert.mode = 'ios';
//     alert.header = 'Alert';
//     alert.subHeader = 'Important message';
//     alert.message = 'This is an alert!';
//     alert.buttons = ['OK'];

//     document.body.appendChild(alert);
//     await alert.present();
// }
