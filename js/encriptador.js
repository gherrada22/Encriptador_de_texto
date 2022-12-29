const traduccion = {"a": "ai", "e": "enter", "i": "imes", "o": "ober", "u": "ufat"};

const encript = (texto, traduccion = {}) => texto ? texto.split("").map(e => traduccion[e] || e).join("") : "";

const decript = (texto, traduccion = {}) => {
    let newText = texto;
    for (let [key, value] of Object.entries(traduccion)) newText = newText.replace(new RegExp(value, "g"), key);
    return newText;
}

const colocarValores = () => {
    document.querySelector("#warning").removeAttribute("style");
    const texto = document.querySelector("#texto").value;
    var area_default = document.querySelector("#default");
    var area_result = document.querySelector("#result");
    var texto_out = document.querySelector("#texto_out");
    return {
        texto,
        area_result,
        area_default,
        texto_out
    }
}

function encriptar(traduccion){
    let {texto, area_result, area_default, texto_out} = colocarValores();
    if (!texto) return;

    if(/[A-Záéíóú]|[^\w ]/.test(texto)){
            document.querySelector("#warning").style.color = "red";
            document.querySelector("#warning").style.fontSize = "16px";
            return;
    } else if(/^ +$/.test(texto)) {
            area_default.classList.remove("invisible");
            area_result.classList.add("invisible");
            return;
    }
    area_default.classList.add("invisible");
    area_result.classList.remove("invisible");
    texto_out.innerHTML = encript(texto, traduccion);
    
    return;
}

function desencriptar(traduccion){
    let {texto, area_result, area_default, texto_out} = colocarValores();
    if(!texto) return;

    if (/[A-Záéíóú]|[^\w ]/.test(texto)) {
            document.querySelector("#warning").style.color = "red";
            document.querySelector("#warning").style.fontSize = "16px";
            return;
    } else if(/^ +$/.test(texto)) {
            area_default.classList.remove("invisible");
            area_result.classList.add("invisible");
            return;
    }
    area_default.classList.add("invisible");
    area_result.classList.remove("invisible");
    texto_out.innerHTML = decript(texto, traduccion);
    return;
}

function clipboard(){
    const texto_out = document.querySelector("#texto_out");
    navigator.clipboard.writeText(texto_out.value);
}

const enc = document.querySelector('#enc'); enc.onclick = () => {encriptar(traduccion)};
const des = document.querySelector('#des'); des.onclick = () => {desencriptar(traduccion)};
const copy = document.querySelector('#copiar'); copy.onclick = () => {clipboard(traduccion)};
