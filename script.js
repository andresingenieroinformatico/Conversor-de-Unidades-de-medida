const conversiones = {
    longitud: ["metros", "kilómetros", "centímetros", "milímetros", "pulgadas", "pies", "yardas"],
    peso: ["kilogramos", "gramos", "libras", "onzas"],
    volumen: ["litros", "mililitros", "galones", "metros cúbicos"],
    temperatura: ["celsius", "fahrenheit", "kelvin"],
    energia: ["julios", "calorías", "kilocalorías"],
    tiempo: ["segundos", "minutos", "horas"]
};

function cambiarUnidad() {
    const unidad = document.getElementById("unidad").value;
    const formulario = document.getElementById("formulario");
    const unidades = conversiones[unidad];

    formulario.innerHTML = `
    <label>Valor:</label>
    <input type="number" id="valor" placeholder="Ingresa el valor" />

    <label>Convertir de:</label>
    <select id="convertirDe">
        ${unidades.map(u => `<option value="${u}">${u}</option>`).join("")}
    </select>

    <label>Convertir a:</label>
    <select id="convertirA">
        ${unidades.map(u => `<option value="${u}">${u}</option>`).join("")}
    </select>

    <button onclick="convertir('${unidad}')">Convertir</button>

    <div id="resultado"></div>
    `;
}

function convertir(tipo) {
    const valor = parseFloat(document.getElementById("valor").value);
    const origen = document.getElementById("convertirDe").value;
    const destino = document.getElementById("convertirA").value;
    let resultado;

    switch (tipo) {
    case "longitud":
        resultado = convertirLongitud(valor, origen, destino);
        break;
    case "peso":
        resultado = convertirPeso(valor, origen, destino);
        break;
    case "volumen":
        resultado = convertirVolumen(valor, origen, destino);
        break;
    case "temperatura":
        resultado = convertirTemperatura(valor, origen, destino);
        break;
    case "energia":
        resultado = convertirEnergia(valor, origen, destino);
        break;
    case "tiempo":
        resultado = convertirTiempo(valor, origen, destino);
        break;
    }

    document.getElementById("resultado").innerText = `Resultado: ${resultado}`;
}

function convertirLongitud(v, de, a) {
    const factores = {
    metros: 1,
    kilómetros: 1000,
    centímetros: 0.01,
    milímetros: 0.001,
    pulgadas: 0.0254,
    pies: 0.3048,
    yardas: 0.9144
    };
  return (v * factores[de] / factores[a]).toFixed(4) + ' ' + a;
}

function convertirPeso(v, de, a) {
    const factores = {
    kilogramos: 1,
    gramos: 0.001,
    libras: 0.453592,
    onzas: 0.0283495
    };
  return (v * factores[de] / factores[a]).toFixed(4) + ' ' + a;
}

function convertirVolumen(v, de, a) {
    const factores = {
    litros: 1,
    mililitros: 0.001,
    galones: 3.78541,
    "metros cúbicos": 1000
    };
  return (v * factores[de] / factores[a]).toFixed(4) + ' ' + a;
}

function convertirTemperatura(v, de, a) {
    const convertirACelsius = {
    celsius: x => x,
    fahrenheit: x => (x - 32) * 5 / 9,
    kelvin: x => x - 273.15
    };
    const convertirDesdeCelsius = {
    celsius: x => x,
    fahrenheit: x => (x * 9 / 5) + 32,
    kelvin: x => x + 273.15
    };
    const c = convertirACelsius[de](v);
    return convertirDesdeCelsius[a](c).toFixed(2) + ' ' + a;
}

function convertirEnergia(v, de, a) {
    const factores = {
    julios: 1,
    calorías: 4.184,
    kilocalorías: 4184
    };
  return (v * factores[de] / factores[a]).toFixed(4) + ' ' + a;
}

function convertirTiempo(v, de, a) {
    const factores = {
    segundos: 1,
    minutos: 60,
    horas: 3600
    };
  return (v * factores[de] / factores[a]).toFixed(4) + ' ' + a;
}

cambiarUnidad();
