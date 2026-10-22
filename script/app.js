const fooddatapath = "../src/json/food.json"
const random_btn = document.getElementById("random-btn");

async function showtherandom(path, select) {
    const response = await fetch(path)
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json()
    if (!data[select] == undefined) {
        throw new Error(`Random error! status: select is undefined`);
    }
    const food = data[select]
    set_food(food[0], food[1], food[2], food[3])
}

function set_food(name, desc, price, imgpath) {
    const img_box = document.getElementById("food-img");
    const name_label = document.getElementById("name-label");
    const desc_label = document.getElementById("desc-label");
    const price_label = document.getElementById("price-label");
    img_box.src = imgpath;
    name_label.textContent = name;
    desc_label.textContent = desc;
    price_label.textContent = "ราคา " + price + " บาท"
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let ran = -1
let prev = -1
let datalen = 6
random_btn.addEventListener("click", () => {
    ran = getRandomInt(0, datalen)
    while (ran == prev) {
        // ไม่เอาเมนูก่อนหน้า
        ran = getRandomInt(0, datalen)
    }
    showtherandom(fooddatapath, ran)
    prev = ran
});
