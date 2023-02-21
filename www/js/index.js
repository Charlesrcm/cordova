document.addEventListener('deviceready', onDeviceReady);

const pizzasTag = document.querySelector('#pizzas-list');
const ingredients = [
    "mozza",
    "tomate",
    "jambon",
    "olives",
    "raclette",
];

let ingredientsSelected = '';

function onDeviceReady() {
    const homeNav = document.querySelector('#home-nav');
    const homePage = document.querySelector('#home-page');
    homeNav.root = homePage;

    const pizzasNav = document.querySelector('#pizzas-nav');
    const pizzasPage = document.querySelector('#pizzas-page');
    pizzasNav.root = pizzasPage;

    const btCreatePizza = document.querySelector('#bt-create-pizza');

    btCreatePizza.addEventListener('click', promptPizza);
}


function createItemList(pizzaName, ingredients) {
    const ionItem = document.createElement('ion-item');
    ionItem.innerHTML = `
    <ion-label>
      <h1>${pizzaName}</h1>
      <h3>(${ingredients})</h3>
    </ion-label>
  `;
    pizzasTag.insertBefore(ionItem, pizzasTag.firstElementChild);
}

async function promptPizza(title = 'Choisissez vos ingrédients', firstLaunch = true) {
    const alert = document.createElement('ion-alert');
    alert.header = title;

    if (firstLaunch) {
        alert.backdropDismiss = false;
        alert.inputs = ingredients.map(ingredient => ({
            label: capitalizeFirstLetter(ingredient),
            value: ingredient,
            type: "checkbox",
        }));
        alert.buttons = [
            {
                text: "Ok",
                handler: (ingredients) => {
                    // ici ingredients récupère les valeurs ingredient indiqué plus haut
                    ingredientsSelected = formatIngredients(ingredients);
                    return !!ingredients.length;
                    // si on inverse deux la valeur devient bool en locurence false=0 true>=1
                }
            }
        ]

    } else {
        alert.inputs = [
            {
                type: 'text',
                name: 'pizzaName',
                placeholder: 'Nouvelle pizza',
                attibutes: {
                    maxlength: 50
                }
            }
        ];
        alert.buttons = [
            {
                text: 'Go !',
                handler: ({ pizzaName }) => {
                    if (!isValid(pizzaName)) return false;
                    createItemList(
                        capitalizeFirstLetter(pizzaName),
                        ingredientsSelected,
                    );
                }
            }
        ];
    }


    document.body.appendChild(alert);
    await alert.present();

    if (firstLaunch) {
        alert.onDidDismiss().then(() => promptPizza('Créer une pizza', false));
    }

    function capitalizeFirstLetter(value) {
        return value.trim().slice(0, 1).toUpperCase() + value.trim().slice(1);
    }

    function formatIngredients(value) {
        return value.join(' ').trim().replaceAll(' ', ', ');
    }

    function isValid(value) {
        return value && value.length > 2 && value.length < 50;
    }
}