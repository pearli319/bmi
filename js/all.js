const resultBtn = document.querySelector('.result-btn');
const returnBtn = document.querySelector('.return-btn');
const resultDemo = document.querySelector(".result-demo");
let userData = [];

// 印出資料
function printData() {
    userData = JSON.parse(localStorage.getItem('user_data'));
    for(let i=userData.length-1;i>=0;i--){
        const listData = `<span class="color" style="background: ${userData[i].color}; box-shadow: 2px 0 3px 0 ${userData[i].shadow};"></span>
        <span class="data status">${userData[i].status}</span>
        <span class="data bmi"><span class="small">BMI</span> ${userData[i].bmi}</span>
        <span class="data w"><span class="small">weight</span> ${userData[i].weight}kg</span>
        <span class="data h"><span class="small">height</span> ${userData[i].height}cm</span>
        <span class="data date">${userData[i].date}</span>
        <span class="delete" onclick=deleted(${i})><i class="fas fa-times"></i></span>`
    
        const add = document.createElement('li');
        add.innerHTML = listData;
        document.querySelector('ul').appendChild(add);
    }
}

// 載入頁面時，localStorage 是否有存值
if(JSON.parse(localStorage.getItem('user_data')) != null) {
    printData();
}

resultBtn.addEventListener('click', clicked);
function clicked() {
    const h = document.querySelector('#height');
    const w = document.querySelector('#weight');
    const userH = parseInt(h.value);
    const userW = parseInt(w.value);
    if (!userH || !userW) { //使用者沒輸入直接返回
        return;
    }
    let bmi = userW / ((userH/100)*(userH/100))
    bmi = bmi.toFixed(2);

    console.log(bmi);
    let status = '';
    let color = '';
    let shadow = '';

    if (bmi >= 35) {
        status = '重度肥胖';
        color = '#FF1200';
        shadow = 'rgba(255,17,0,0.29)';
    } else if (30 <= bmi && bmi < 35) {
        status = '中度肥胖';
        color = '#FF6C02';
        shadow = 'rgba(255,108,2,0.29)';
    } else if(27 <= bmi && bmi < 30) {
        status = '輕度肥胖';
        color = '#FF6C02';
        shadow = 'rgba(255,108,2,0.29)';
    } else if(24 <= bmi && bmi < 27) {
        status = '過重';
        color = '#FF982D';
        shadow = 'rgba(255,152,45,0.29)';
    } else if(18.5 <= bmi && bmi <24) {
        status = '理想';
        color = '#86D73F';
        shadow = 'rgba(133,215,63,0.29)';
    } else if(bmi < 18.5) {
        status = '過輕';
        color = '#31BAF9';
        shadow = 'rgba(49,186,249,0.29)';
    }

    const today = new Date();
    const date = (today.getMonth()+1)+ "-" + today.getDate() + "-" + today.getFullYear();

    const showBmiNum = document.querySelector('.show-bmi-num')
    showBmiNum.textContent = bmi;
    resultDemo.style.color = color;
    resultDemo.style.borderColor = color;
    returnBtn.style.backgroundColor = color;

    userData.push({
        color: color,
        shadow: shadow,
        status: status,
        bmi: bmi,
        weight: userW,
        height: userH,
        date: date
    })
    localStorage.setItem('user_data', JSON.stringify(userData));
    document.querySelector('ul').innerHTML=''; // 先清空

    printData();

    resultDemo.style.display = "inline-block";
    resultBtn.style.display = "none";

}

returnBtn.addEventListener('click', returnBmi);
function returnBmi() {
    resultDemo.style.display = "none";
    resultBtn.style.display = "inline-block";
    document.getElementById("height").value = '';
    document.getElementById('weight').value = '';
}

function deleted(index) {
    let dataList = JSON.parse(localStorage.getItem('user_data'));

    dataList.splice(index, 1);

    localStorage.setItem('user_data', JSON.stringify(dataList));
    document.querySelector('ul').innerHTML=''; 
    printData();
}




