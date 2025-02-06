let chave = "cebcd482eda57fa9a6714c1c2ba91885";

function colocarNaTela(dados) {
    console.log(dados);
    document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name;
    document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "°C";
    document.querySelector(".descricao").innerHTML = dados.weather[0].description;
    document.querySelector(".icone").src = "https://openweathermap.org/img/wn/" + dados.weather[0].icon + ".png";

    // Interage com o Spline Viewer de acordo com o clima
    interagirComSpline(dados.weather[0].main);
}

async function buscarCidade(cidade) {
    let dados = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        cidade +
        "&appid=" +
        chave +
        "&lang=pt_br" +
        "&units=metric"
    )
    .then(resposta => resposta.json());

    colocarNaTela(dados);
}

function cliqueiNoBotao() {
    let cidade = document.querySelector(".input-cidade").value;
    buscarCidade(cidade);
}

// Função para interagir com o Spline Viewer
function interagirComSpline(condicaoClimatica) {
    const splineViewer = document.getElementById("spline-viewer");

    // Verifica a condição climática e atualiza o Spline Viewer
    if (condicaoClimatica.toLowerCase().includes("rain") || condicaoClimatica.toLowerCase().includes("chuva")) {
        // Cena para chuva
        splineViewer.setAttribute("url", "https://prod.spline.design/f4krgKsfE3oIdMad/scene.splinecode");
    } else if (condicaoClimatica.toLowerCase().includes("clear") || condicaoClimatica.toLowerCase().includes("sol")) {
        // Cena para sol
        splineViewer.setAttribute("url", "https://prod.spline.design/S4T2FmGSuQXmb7Jb/scene.splinecode");
    } else if (condicaoClimatica.toLowerCase().includes("clouds") || condicaoClimatica.toLowerCase().includes("nublado")) {
        // Cena para nublado (substitua pela URL da cena nublado)
        splineViewer.setAttribute("url", "URL_DO_MODELO_3D_PARA_NUBLADO");
    } else if (condicaoClimatica.toLowerCase().includes("snow") || condicaoClimatica.toLowerCase().includes("neve")) {
        // Cena para neve (substitua pela URL da cena neve)
        splineViewer.setAttribute("url", "URL_DO_MODELO_3D_PARA_NEVE");
    } else {
        // Cena padrão (substitua pela URL da cena padrão)
        splineViewer.setAttribute("url", "https://prod.spline.design/NjelZSTpuPRA1DOK/scene.splinecode");
    }
}