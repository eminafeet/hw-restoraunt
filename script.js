const DEBUG = false;
const BASE_URL = '/meal';
const UI = {
    SIDEBAR_BUTTONS: {
        MENU: document.getElementById('sidebar-first-menu'),
        ENTERTAINMENT: document.getElementById('sidebar-first-entertainment'),
        ABOUT: document.getElementById('sidebar-first-about'),
    },
    SIDEBAR_SECOND: document.getElementById('second-sidebar'),
    SECOND_SIDEBAR_OVERLAY: document.getElementById('second-sidebar-bg'),

    REST_MENU: document.getElementById('menu'),
    REST_ABOUT: document.getElementById('about'),
    REST_SHOPPING_BUCKET: document.getElementById('shopping-bucket'),
}

function second_sidebar_close(){
    UI.SIDEBAR_SECOND.classList.remove('active');
    UI.SECOND_SIDEBAR_OVERLAY.classList.remove('active');
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

function sidebar_chose_tab(tab_name) {
    switch(tab_name) {
        case 'MENU':
            UI.SIDEBAR_SECOND.classList.remove('active');
            UI.SECOND_SIDEBAR_OVERLAY.classList.remove('active');
            UI.REST_SHOPPING_BUCKET.classList.remove('active');
            UI.REST_MENU.classList.add('active');
            UI.REST_ABOUT.classList.remove('active');
            break;
        case 'ENTERTAINMENT':
            UI.SIDEBAR_SECOND.classList.toggle('active');
            UI.SECOND_SIDEBAR_OVERLAY.classList.toggle('active');
            UI.REST_SHOPPING_BUCKET.classList.remove('active');
            UI.REST_MENU.classList.add('active');
            UI.REST_ABOUT.classList.remove('active');
            break;
        case 'ABOUT':
            UI.SIDEBAR_SECOND.classList.remove('active');
            UI.REST_SHOPPING_BUCKET.classList.remove('active');
            UI.SECOND_SIDEBAR_OVERLAY.classList.remove('active');
            UI.REST_MENU.classList.remove('active');
            UI.REST_ABOUT.classList.add('active');
            break;
        case 'SHOPPING_BUCKET':
            UI.REST_SHOPPING_BUCKET.classList.add('active');
            UI.SECOND_SIDEBAR_OVERLAY.classList.remove('active');
            UI.SIDEBAR_SECOND.classList.remove('active');
            UI.REST_MENU.classList.remove('active');
            UI.REST_ABOUT.classList.remove('active');
            break;
    }
}
const api_mock = {
    "data": [
    {
        "id": 1,
        "name": "Акции",
        "meals": [
            {
                "id": 1,
                "name": "Обеденный сет «Быстро и сытно»",
                "price": null,
                "img_url": "https://plus.unsplash.com/premium_photo-1670601440146-3b33dfcd7e17"
            },
            {
                "id": 2,
                "name": "Второй десерт за полцены",
                "price": null,
                "img_url": "https://images.unsplash.com/photo-1641835078422-42a9f101435d"
            },
            {
                "id": 3,
                "name": "Напиток в подарок к горячему",
                "price": null,
                "img_url": "https://images.unsplash.com/photo-1570696516188-ade861b84a49"
            },
            {
                "id": 4,
                "name": "Салат недели со скидкой",
                "price": null,
                "img_url": "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea"
            },
            {
                "id": 5,
                "name": "Семейный ужин на четверых",
                "price": null,
                "img_url": "https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22"
            },
            {
                "id": 6,
                "name": "Суп дня по специальной цене",
                "price": null,
                "img_url": "https://plus.unsplash.com/premium_photo-1700752343056-e89926bf5ff9"
            },
            {
                "id": 7,
                "name": "Вечерний сет «Горячее + десерт»",
                "price": null,
                "img_url": "https://images.unsplash.com/photo-1494390248081-4e521a5940db"
            }
        ]
    },
    {
        "id": 2,
        "name": "Салаты",
        "meals": [
            {
                "id": 8,
                "name": "Салат «Цезарь» с креветками",
                "price": 690,
                "img_url": "https://images.unsplash.com/photo-1607532941433-304659e8198a"
            },
            {
                "id": 9,
                "name": "Греческий салат с фетой",
                "price": 520,
                "img_url": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
            },
            {
                "id": 10,
                "name": "Салат с ростбифом и рукколой",
                "price": 740,
                "img_url": "https://images.unsplash.com/photo-1543339308-43e59d6b73a6"
            },
            {
                "id": 11,
                "name": "Тёплый салат с курицей и грибами",
                "price": 610,
                "img_url": "https://images.unsplash.com/photo-1608032077018-c9aad9565d29"
            },
            {
                "id": 12,
                "name": "Салат с киноа и авокадо",
                "price": 580,
                "img_url": "https://images.unsplash.com/photo-1550304943-4f24f54ddde9"
            },
            {
                "id": 13,
                "name": "Салат с тунцом и яйцом",
                "price": 650,
                "img_url": "https://images.unsplash.com/photo-1549745708-fa4a8423a0b4"
            },
            {
                "id": 14,
                "name": "Свекольный салат с козьим сыром",
                "price": 540,
                "img_url": "https://plus.unsplash.com/premium_photo-1693077048670-8ad385655ffb"
            }
        ]
    },
    {
        "id": 4,
        "name": "Горячее",
        "meals": [
            {
                "id": 22,
                "name": "Стейк из говядины с картофельным пюре",
                "price": 1190,
                "img_url": "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1"
            },
            {
                "id": 23,
                "name": "Куриное филе с грибным соусом",
                "price": 720,
                "img_url": "https://images.unsplash.com/photo-1475332363216-323c9b7f1e81"
            },
            {
                "id": 24,
                "name": "Лосось на гриле с овощами",
                "price": 1080,
                "img_url": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2"
            },
            {
                "id": 25,
                "name": "Паста карбонара",
                "price": 690,
                "img_url": "https://plus.unsplash.com/premium_photo-1674511582428-58ce834ce172"
            },
            {
                "id": 26,
                "name": "Ризотто с белыми грибами",
                "price": 760,
                "img_url": "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9"
            },
            {
                "id": 27,
                "name": "Бургер с мраморной говядиной",
                "price": 850,
                "img_url": "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9"
            },
            {
                "id": 28,
                "name": "Утиная грудка с вишнёвым соусом",
                "price": 990,
                "img_url": "https://images.unsplash.com/photo-1563072915-8201ebcf6047"
            }
        ]
    },
    {
        "id": 5,
        "name": "Десерты",
        "meals": [
            {
                "id": 29,
                "name": "Чизкейк «Нью-Йорк»",
                "price": 420,
                "img_url": "https://plus.unsplash.com/premium_photo-1667546202654-e7574a20872c"
            },
            {
                "id": 30,
                "name": "Тирамису",
                "price": 460,
                "img_url": "https://images.unsplash.com/photo-1674649204485-ecb4e5bd0db5"
            },
            {
                "id": 31,
                "name": "Шоколадный фондан",
                "price": 490,
                "img_url": "https://plus.unsplash.com/premium_photo-1695028377519-70fb0c385db2"
            },
            {
                "id": 32,
                "name": "Медовик",
                "price": 390,
                "img_url": "https://images.unsplash.com/photo-1615560725129-a1fa6edc3b93"
            },
            {
                "id": 33,
                "name": "Панна-котта с манго",
                "price": 430,
                "img_url": "https://images.unsplash.com/photo-1592992010171-f9d4d40a4981"
            },
            {
                "id": 34,
                "name": "Яблочный штрудель",
                "price": 410,
                "img_url": "https://images.unsplash.com/photo-1660500680327-07bc299fc3e6"
            },
            {
                "id": 35,
                "name": "Морковный торт",
                "price": 440,
                "img_url": "https://images.unsplash.com/photo-1562806915-856ffd14d1bd"
            }
        ]
    },
    {
        "id": 3,
        "name": "Супы",
        "meals": [
            {
                "id": 15,
                "name": "Крем-суп из шампиньонов",
                "price": 430,
                "img_url": "https://images.unsplash.com/photo-1547592166-23ac45744acd"
            },
            {
                "id": 16,
                "name": "Борщ с говядиной",
                "price": 490,
                "img_url": "https://images.unsplash.com/photo-1616501268826-ee9731c915d4"
            },
            {
                "id": 17,
                "name": "Куриный суп с домашней лапшой",
                "price": 390,
                "img_url": "https://images.unsplash.com/photo-1665593998976-d957f2827fe7"
            },
            {
                "id": 18,
                "name": "Том-ям с креветками",
                "price": 620,
                "img_url": "https://plus.unsplash.com/premium_photo-1700673590238-a0e3a3795ae2"
            },
            {
                "id": 19,
                "name": "Томатный суп с базиликом",
                "price": 420,
                "img_url": "https://images.unsplash.com/photo-1603208614636-aa308b918a32"
            },
            {
                "id": 20,
                "name": "Сырный суп с беконом",
                "price": 510,
                "img_url": "https://images.unsplash.com/photo-1527976746453-f363eac4d889"
            },
            {
                "id": 21,
                "name": "Овощной минестроне",
                "price": 450,
                "img_url": "https://images.unsplash.com/photo-1621608953630-00d9eb860392"
            }
        ]
    },
    {
        "id": 6,
        "name": "Напитки",
        "meals": [
            {
                "id": 36,
                "name": "Домашний лимонад «Цитрус-мята»",
                "price": 290,
                "img_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87"
            },
            {
                "id": 37,
                "name": "Ягодный морс",
                "price": 250,
                "img_url": "https://images.unsplash.com/photo-1636144982427-5773bf2fd42c"
            },
            {
                "id": 38,
                "name": "Облепиховый чай",
                "price": 310,
                "img_url": "https://plus.unsplash.com/premium_photo-1674406481284-43eba097a291"
            },
            {
                "id": 39,
                "name": "Капучино",
                "price": 240,
                "img_url": "https://plus.unsplash.com/premium_photo-1674327105074-46dd8319164b"
            },
            {
                "id": 40,
                "name": "Айс-латте с ванилью",
                "price": 320,
                "img_url": "https://images.unsplash.com/photo-1470337458703-46ad1756a187"
            },
            {
                "id": 41,
                "name": "Смузи «Манго-банан»",
                "price": 360,
                "img_url": "https://images.unsplash.com/photo-1662130187270-a4d52c700eb6"
            },
            {
                "id": 42,
                "name": "Матча-латте",
                "price": 340,
                "img_url": "https://images.unsplash.com/photo-1515823064-d6e0c04616a7"
            }
        ]
    }
]
}

function open_food_card(food_id){
    window.location.href += BASE_URL + '?id=' + food_id;
}

function build_restaurant_menu(from_api, container = UI.REST_MENU) {
    container.innerHTML = ``;
    const fragment = document.createDocumentFragment();
    const topbar = document.createElement("div");
    topbar.className = "menu__topbar";
    const topbarFragment = document.createDocumentFragment();

    for (const item of from_api) {
        const topbar_item = document.createElement("div");
        topbar_item.className = "menu__topbar__item";
        topbar_item.textContent = item.name;
        topbar_item.dataset.id = item.id;
        topbar_item.addEventListener("click", () => {
            const el = document.getElementById(`menu_header_item_${item.id}`);
            if (!el) return;
            container.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
        });
        topbarFragment.appendChild(topbar_item);
    }
    topbar.appendChild(topbarFragment);
    if (topbar.firstChild) {
        topbar.firstChild.className = "menu__topbar__item active";
        fragment.appendChild(topbar);
    }
    const bgObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                el.style.backgroundImage = `url(${el.dataset.bg})`;
                el.removeAttribute("data-bg");
                obs.unobserve(el);
            }
        });
    }, { rootMargin: "200px" });
    const menu_list = document.createElement("div");
    menu_list.className = "menu__list";
    const listFragment = document.createDocumentFragment();
    const stocks_from_api = from_api.find(u => u.name.includes("Акции"));
    if (stocks_from_api) {
        const menu_stock = document.createElement("div");
        menu_stock.className = "menu__stock";
        const menu_stock_header = document.createElement("h2");
        menu_stock_header.id = `menu_header_item_${stocks_from_api.id}`;
        menu_stock_header.dataset.id = stocks_from_api.id;
        menu_stock_header.className = "menu__group__items__header";
        menu_stock_header.textContent = "Акции";
        menu_stock.appendChild(menu_stock_header);
        const stock_items = document.createElement("div");
        stock_items.className = "menu__stock__items";
        const stockFragment = document.createDocumentFragment();
        stocks_from_api.meals.slice(0, 6).forEach((u, i) => {
            const stock_item = document.createElement("div");
            stock_item.className = `menu__stock__item item__${i + 1}`;
            let stock_name = document.createElement("div");
            stock_name.textContent = u.name;
            stock_item.appendChild(stock_name);
            stock_item.dataset.bg = u.img_url;
            bgObserver.observe(stock_item);
            stockFragment.appendChild(stock_item);
        });
        stock_items.appendChild(stockFragment);
        menu_stock.appendChild(stock_items);
        listFragment.appendChild(menu_stock);
    }
    from_api.forEach(items => {
        if (items.name.includes("Акции"))
            return;
        const group_items = document.createElement("div");
        group_items.className = "menu__group__items";
        const group_items_name = document.createElement("h2");
        group_items_name.className = "menu__group__items__header";
        group_items_name.dataset.id = items.id;
        group_items_name.id = `menu_header_item_${items.id}`;
        group_items_name.textContent = items.name;
        group_items.appendChild(group_items_name);
        const group_container = document.createElement("div");
        group_container.className = "menu__group__items__container";
        const groupFragment = document.createDocumentFragment();
        for (const item of items.meals) {
            const food_card = document.createElement("div");
            food_card.className = "food__card";
            food_card.onclick = function () { open_food_card(item.id); };
            const food_card_img = document.createElement("img");
            food_card_img.className = "food__card__img";
            food_card_img.alt = `Изображение ${item.name}`;
            food_card_img.loading = "lazy";
            food_card_img.decoding = "async";
            food_card_img.width = 300;
            food_card_img.height = 200;
            food_card_img.src = item.img_url;
            food_card.appendChild(food_card_img);
            const food_card_name = document.createElement("div");
            food_card_name.className = "food__card__title";
            food_card_name.textContent = item.name;
            food_card.appendChild(food_card_name);
            const food_card_footer = document.createElement("div");
            food_card_footer.className = "food__card__footer";
            const food_price = document.createElement("div");
            food_price.className = "food__card__cost";
            food_price.textContent = `${item.price} ₽`;
            food_card_footer.appendChild(food_price);
            const btn_buy = document.createElement("button");
            btn_buy.className = "food__card__btn__buy";
            btn_buy.textContent = "Заказать";
            btn_buy.onclick = async function (ev) {
                ev.stopPropagation();
                await place_order(item.id, btn_buy);
            };
            food_card_footer.appendChild(btn_buy);
            food_card.appendChild(food_card_footer);
            groupFragment.appendChild(food_card);
        }
        group_container.appendChild(groupFragment);
        group_items.appendChild(group_container);
        listFragment.appendChild(group_items);
    });

    menu_list.appendChild(listFragment);
    fragment.appendChild(menu_list);
    container.appendChild(fragment);
    const links = container.querySelectorAll(".menu__topbar__item");
    const sections = container.querySelectorAll(".menu__group__items__header");
    const activeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.dataset.id;
                links.forEach(l => l.classList.toggle("active", l.dataset.id === id));
            }
        });
    }, {
        root: container,
        rootMargin: "-10% 0px -85% 0px",
        threshold: 0
    });
    sections.forEach(s => activeObserver.observe(s));
}

function build_restaurant_menu_loading(container = UI.REST_MENU){
    container.innerHTML = `
    <div class="menu__topbar">
        <div class="menu__topbar__item skeleton"> </div>
        <div class="menu__topbar__item skeleton"> </div>
        <div class="menu__topbar__item skeleton"> </div>
        <div class="menu__topbar__item skeleton"> </div>
        <div class="menu__topbar__item skeleton"> </div>
        <div class="menu__topbar__item skeleton"> </div>
    </div>
    <div class="menu__list">
        <!-- TODO: Add skeleton to stock-->
        <div class="menu__stock">
            <!-- Stock item-->
            <h2 class="menu__stock__item__text skeleton"></h2>
            <div class="menu__stock__items">
                <div class="menu__stock__item item__1 skeleton"></div>
                <div class="menu__stock__item item__2 skeleton"></div>
                <div class="menu__stock__item item__3 skeleton"></div>
                <div class="menu__stock__item item__4 skeleton"></div>
                <div class="menu__stock__item item__5 skeleton"></div>
                <div class="menu__stock__item item__6 skeleton"></div>
            </div>
        </div>
        <div class="menu__group__items">
            <h2 class="menu__group__items__header skeleton"></h2>
            <div class="menu__group__items__container">
                <div class="food__card">
                    <div class="food__card__img skeleton"> </div>
                    <div class="food__card__title skeleton"> </div>
                    <div class="food__card__footer">
                        <div class="food__card__cost skeleton"></div>
                        <div class="food__card__btn__buy skeleton"></div>
                    </div>
                </div>
                <div class="food__card">
                    <div class="food__card__img skeleton"> </div>
                    <div class="food__card__title skeleton"> </div>
                    <div class="food__card__footer">
                        <div class="food__card__cost skeleton"></div>
                        <div class="food__card__btn__buy skeleton"></div>
                    </div>
                </div>
                <div class="food__card">
                    <div class="food__card__img skeleton"> </div>
                    <div class="food__card__title skeleton"> </div>
                    <div class="food__card__footer">
                        <div class="food__card__cost skeleton"></div>
                        <div class="food__card__btn__buy skeleton"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}

function build_restaurant_menu_error(container = UI.REST_MENU){
    container.innerHTML = `
    <div
    style="
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        height: 100vh;"
    >
        <div>Ошибка при загрузке</div>
        <button 
            onclick="location.reload();"
            style="
                margin-top: 1rem;
                border: solid 1px red;
                border-radius: 5px;
                padding: .2rem 1rem;
                background: transparent;
                cursor: pointer;"
            > Повторить</button>
    </div>
`;
}

async function load_restaurant_menu(is_debug=DEBUG) {
    if (is_debug) {
        build_restaurant_menu(api_mock.data);
        return;
    }
    build_restaurant_menu_loading();
    try {
        const response = await fetch(
            'https://script.google.com/macros/s/AKfycbzkwYMazwXGWbK1sLAkcM0Dstr5Oym20xO2fnqhT1-JEjrIWJQtIAwK5urGfBuO3QDX/exec?type=all'
        );

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        const data = await response.json();
        build_restaurant_menu(data.data);


    } catch (error) {
        build_restaurant_menu_error();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    load_restaurant_menu();

})
