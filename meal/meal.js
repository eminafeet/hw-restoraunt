const DEBUG = false;
const BASE_URL = '/meal';

const API_URL = 'https://script.google.com/macros/s/AKfycbzkwYMazwXGWbK1sLAkcM0Dstr5Oym20xO2fnqhT1-JEjrIWJQtIAwK5urGfBuO3QDX/exec';
const urlParams = new URLSearchParams(window.location.search);
const food_id = urlParams.get('id');
const UI ={
    FOOD_CARD_ROTATE: ".main__food__card__rotate",
    FOOD_DLC_CONTAINER: document.getElementById("dlc-food-container"),
    FOOD_MAIN: document.getElementById("main-food-title"),
}

const mock_api_main = {
    "data":{
        "category_id":2,
        "id":11,
        "name":"Тёплый салат с курицей и грибами",
        "description":"Куриное филе обжаривается с шампиньонами и подаётся на миксе салатов. Сливочная заправка делает вкус мягким и плотным. Хорошо подходит для сытного перекуса.",
        "price":610,
        "ingredients":["куриное филе","шампиньоны","микс салатов","черри","сливочный соус","лук","зелень"],
        "nutritions":460,
        "proteins":34,
        "fats":30,
        "carbs":13,
        "img_url":"https://images.unsplash.com/photo-1608032077018-c9aad9565d29"
    }
};
const mock_api_dlc = {"data":[{"category_id":3,"id":15,"name":"Крем-суп из шампиньонов","description":"Нежный грибной суп со сливочной текстурой. Вкус строится на шампиньонах и лёгкой луковой сладости. Подаётся с хрустящими гренками.","price":430,"ingredients":["шампиньоны","сливки","картофель","лук","чеснок","овощной бульон","гренки"],"nutritions":350,"proteins":9,"fats":24,"carbs":25,"img_url":"https://images.unsplash.com/photo-1547592166-23ac45744acd"},{"category_id":4,"id":23,"name":"Куриное филе с грибным соусом","description":"Нежное куриное филе готовится до золотистой корочки. Грибной соус делает блюдо более ароматным и сливочным. Подаётся с рисом или овощами.","price":720,"ingredients":["куриное филе","шампиньоны","сливки","рис","лук","чеснок","зелень"],"nutritions":610,"proteins":48,"fats":25,"carbs":47,"img_url":"https://images.unsplash.com/photo-1475332363216-323c9b7f1e81"},{"category_id":4,"id":26,"name":"Ризотто с белыми грибами","description":"Кремовое ризотто с насыщенным грибным ароматом. Рис сохраняет лёгкую плотность в центре. Пармезан и сливочное масло делают вкус более глубоким.","price":760,"ingredients":["рис арборио","белые грибы","шампиньоны","пармезан","сливочное масло","овощной бульон","лук"],"nutritions":670,"proteins":18,"fats":31,"carbs":78,"img_url":"https://images.unsplash.com/photo-1633964913295-ceb43826e7c9"},{"category_id":5,"id":34,"name":"Яблочный штрудель","description":"Тонкое тесто запекается с яблоками, корицей и изюмом. Начинка получается тёплой и ароматной. Подаётся с ванильным соусом.","price":410,"ingredients":["слоёное тесто","яблоки","корица","изюм","сахар","сливочное масло","ванильный соус"],"nutritions":510,"proteins":6,"fats":25,"carbs":67,"img_url":"https://images.unsplash.com/photo-1660500680327-07bc299fc3e6"},{"category_id":6,"id":38,"name":"Облепиховый чай","description":"Горячий напиток с облепихой, мёдом и имбирём. Вкус кисло-сладкий и согревающий. Хорошо подходит для холодного сезона.","price":310,"ingredients":["вода","облепиха","мёд","имбирь","лимон","мята"],"nutritions":160,"proteins":1,"fats":2,"carbs":36,"img_url":"https://plus.unsplash.com/premium_photo-1674406481284-43eba097a291"}]};

function rotation_card(){
    document.querySelector(UI.FOOD_CARD_ROTATE).classList.toggle('flipped');
}
function goto_selected_meal(meal_id){
    window.location.href = BASE_URL + '?id=' + meal_id;
}

async function place_order(order_id, btn) {
    btn.classList.add('skeleton');
    
    try {
        const formData = new URLSearchParams();
        formData.append('meal_id', order_id);

        const response = await fetch('https://script.google.com/macros/s/AKfycbzkwYMazwXGWbK1sLAkcM0Dstr5Oym20xO2fnqhT1-JEjrIWJQtIAwK5urGfBuO3QDX/exec', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        console.log('Результат POST запроса:', result);
    } catch (error) {
        console.error('Ошибка:', error);
    } finally {
        btn.classList.remove('skeleton');
    }
}

function build_main_food_loading(container=UI.FOOD_MAIN){
    container.innerHTML = `
    <div class="main__food__title__img skeleton"></div>
    <div class="main__food__card">
        <div class="main__food__card__rotate" id="main-food-card-rotate">
            <div class="main__food__card__inner">
                <div class="main__food__card__face front">
                    <div class="food__card__container">
                        <div class="main__food_name skeleton"></div>
                        <div class="main_food_desc skeleton"></div>
                        <div class="main_food_desc skeleton"></div>
                        <div class="main_food_desc skeleton" style="width: 50%"></div>
                    </div>
                    <div class="food__card__footer right">
                        <div class="food_card_btn_rotate skeleton"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="main__food__card__footer">
            <h3 class="skeleton"></h3>
            <button class="btn_order skeleton"></button>
        </div>
    </div>
    `;
}

function build_main_food(from_api, container=UI.FOOD_MAIN){
    container.innerHTML = `
    <div class="main__food__title__img" style="background-image: url('${from_api.img_url}')"></div>
    <div class="main__food__card">
        <div class="main__food__card__rotate" id="main-food-card-rotate">
            <div class="main__food__card__inner">
                <div class="main__food__card__face front">
                    <div class="food__card__container">
                        <div class="main__food_name">${from_api.name}</div>
                        <div class="main_food_desc">${from_api.description}</div>
                    </div>
                    <div class="food__card__footer right">
                        <div class="food_card_btn_rotate" onclick="rotation_card()">
                            <span>Посмотреть состав</span>
                            <img src="public/icons-arrow-right.svg" alt="" width="24px" height="24px" />
                        </div>
                    </div>
                </div>
                <div class="main__food__card__face back">
                    <div class="food__card__container">
                        <div class="main__food_name">Состав</div>
                        <ul>${from_api.ingredients.map(u=> "<li>" + u + "</li>").join('\n')}</ul>
                        <div class="main__food__info">
                            <div class="main__food__info__item">
                                <div>Углеводы</div>
                                <span>${from_api.carbs}</span>
                            </div>
                            <div class="main__food__info__item">
                                <div>Белки</div>
                                <span>${from_api.proteins}</span>
                            </div>
                            <div class="main__food__info__item">
                                <div>Жиры</div>
                                <span>${from_api.fats}</span>
                            </div>
                            <div class="main__food__info__item">
                                <div>Калории</div>
                                <span>${from_api.nutritions}</span>
                            </div>
                        </div>
                    </div>
                    <div class="food__card__footer left">
                        <div class="food_card_btn_rotate left" onclick="rotation_card()">
                            <img src="public/icons-arrow-left.svg" alt="" width="24px" height="24px" />
                            <span>Посмотреть описание</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="main__food__card__footer">
            <h3> ${from_api.price} ₽</h3>
            <button class="btn_order" onclick="place_order(${from_api.id}, this)"> Заказать</button>
        </div>
    </div>
    `;
}

async function load_main_food(is_debug=DEBUG){
    if (is_debug){
        // build_main_food(mock_api_main.data);
        build_main_food_loading();
        return;
    }
    build_main_food_loading();
    try {
        const response = await fetch(`${API_URL}?type=meal&id=${food_id}`);

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        const data = await response.json();
        console.log("data", data);
        build_main_food(data.data);
    } catch (error) {
        // build_restaurant_menu_error();
    }
}

function build_food_dlc(from_api, container=UI.FOOD_DLC_CONTAINER){
    container.innerHTML = ``;
    const groupFragment = document.createDocumentFragment();
    for (let item of from_api){
        const food_card = document.createElement("div");
        food_card.className = "dlc_food_card";
        food_card.onclick = function () { goto_selected_meal(item.id); };
        const food_card_img = document.createElement("img");
        food_card_img.className = "dlc_food__card__img";
        food_card_img.alt = `Изображение ${item.name}`;
        food_card_img.loading = "lazy";
        food_card_img.decoding = "async";
        food_card_img.width = 300;
        food_card_img.height = 200;
        food_card_img.src = item.img_url;
        food_card.appendChild(food_card_img);
        const food_card_name = document.createElement("div");
        food_card_name.className = "dlc_food__card__title";
        food_card_name.textContent = item.name;
        food_card.appendChild(food_card_name);
        const food_card_footer = document.createElement("div");
        food_card_footer.className = "dlc_food__card__footer";
        const food_price = document.createElement("div");
        food_price.className = "dlc_food__card__cost";
        food_price.textContent = `${item.price} ₽`;
        food_card_footer.appendChild(food_price);
        food_card.appendChild(food_card_footer);
        groupFragment.appendChild(food_card);
    }
    container.appendChild(groupFragment);
}

function build_food_dlc_loading(container=UI.FOOD_DLC_CONTAINER){
    container.innerHTML = ``;
    const skeleton_rec = `
    <div class="dlc_food_card disable">
        <div class="dlc_food__card__img skeleton"></div>
        <div class="dlc_food__card__title skeleton"></div>
        <div class="dlc_food__card__footer">
            <div class="dlc_food__card__cost skeleton"></div>
        </div>
    </div>
    `;
    var loading_skeleton = ``;
    for (let i = 0; i < 3; i++) {
        loading_skeleton += skeleton_rec;
    }
    container.innerHTML = loading_skeleton;
}

async function load_recommendations_for_food(is_debug=DEBUG) {
    if (is_debug) {
        build_food_dlc_loading();
        return;
    }
    build_food_dlc_loading();
    try {
        const response = await fetch(`${API_URL}?type=recommendations&id=${food_id}`);

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        const data = await response.json();
        console.log("data", data);
        build_food_dlc(data.data);
    } catch (error) {
        // build_restaurant_menu_error();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    load_main_food();
    load_recommendations_for_food();
});