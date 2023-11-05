// IMC DATA
const data = [
    {
        min: 0,
        max: 18.4,
        classification: "Menor que 18,5",
        info: "Magreza",
        obesity: "0",
    },
    {
        min: 18.5,
        max: 24.9,
        classification: "Entre 18,5 e 24,9",
        info: "Normal",
        obesity: "0",
    },
    {
        min: 25,
        max: 29.9,
        classification: "Entre 25,0 e 29,9",
        info: "Sobrepeso",
        obesity: "0",
    },
    {
        min: 30,
        max: 34.9,
        classification: "Entre 30,0 e 34,9",
        info: "Obesidade I",
        obesity: "I",
    },
    {
        min: 35,
        max: 39.9,
        classification: "Entre 35,0 e 39,9",
        info: "Obesidade II",
        obesity: "II",
    },
    {
        min: 40,
        max: 99,
        classification: "Maior que 40,0",
        info: "Obesidade Mórbida",
        obesity: "III",
    },
];

// Seleção de elementos
const imcTable = document.querySelector("#imc-table");
const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const calcBtn = document.querySelector("#calc-btn");
const clearBtn = document.querySelector("#clear-btn");
const backBtn = document.querySelector("#back-btn");
const resultContainer = document.querySelector("#result-container");
const calcContainer = document.querySelector("#calc-container");
const imcInfo = document.querySelector('#imc-info span');

// Funções
function tableData(data) {
    const dataTable = data;

    dataTable.forEach((item) => {
        const div = document.createElement("div");
        div.className = "table-data";

        const imcText = document.createElement("p");
        imcText.innerHTML = item.classification;

        const classificationText = document.createElement("p");
        classificationText.innerHTML = item.info;

        const obesityText = document.createElement("p");
        obesityText.innerHTML = item.obesity;

        div.appendChild(imcText);
        div.appendChild(classificationText);
        div.appendChild(obesityText);

        imcTable.appendChild(div);
    });
}

function calcImc(height, weight) {
    const resultIMC = weight / (height * height);

    return resultIMC.toFixed(1);
}

function submitForm() {
    const inputValueHeight = +heightInput.value.replace(",", ".");
    const inputValueWeight = +weightInput.value.replace(",", ".");

    if (!inputValueHeight || !inputValueWeight) return;

    
    const valueIMC = calcImc(inputValueHeight, inputValueWeight);
    
    tableData(data);
    
    let info;
    
    data.forEach(item => {
        if(valueIMC >= item.min && valueIMC <= item.max){
            info = item.info;
        }
    })
    
    if(!info) return;

    resultContainer.classList.remove("hide");

    calcContainer.classList.add("hide");

    resultContainer.querySelector("span").innerHTML = valueIMC;
    imcInfo.innerHTML = info;

    let colorTextInfo;

    document.querySelector('#imc-number span').className = '';
    imcInfo.className = '';

    switch(info){
        case 'Magreza': colorTextInfo = 'low'; break;
        case 'Normal': colorTextInfo = 'good'; break;
        case 'Sobrepeso': colorTextInfo = 'medium'; break;
        case 'Obesidade I': colorTextInfo = 'high'; break;
        case 'Obesidade II': colorTextInfo = 'higher'; break;
        case 'Obesidade Mórbida': colorTextInfo = 'highest'; break;
    }

    document.querySelector('#imc-number span').classList.add(colorTextInfo);
    imcInfo.classList.add(colorTextInfo);

}

function cleanInputs() {
    heightInput.value = "";
    weightInput.value = "";
}

function backForm() {
    cleanInputs();
    calcContainer.classList.remove("hide");
    resultContainer.classList.add("hide");
    const node = imcTable.querySelectorAll(".table-data");
    node.forEach((item) => {
        item.parentNode.removeChild(item);
    });
}

function validDigits(text) {
    return text.replace(/[^0-9,]/g,"");
}

// Eventos
[heightInput, weightInput].forEach(el => {
    el.addEventListener("input", e => {
        const updatedValue = validDigits(e.target.value);
        e.target.value = updatedValue;
    })
})
calcBtn.addEventListener("click", (e) => {
    e.preventDefault();
    submitForm();
});

clearBtn.addEventListener("click", (e) => {
    e.preventDefault();
    cleanInputs();
});

backBtn.addEventListener("click", () => {
    backForm();
});
