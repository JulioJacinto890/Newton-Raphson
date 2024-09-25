// Función para calcular la derivada
function derivative(func, x) {
    const h = 1e-10; 
    return (func(x + h) - func(x - h)) / (2 * h);
}

// Método de Newton-Raphson
function newtonRaphson() {
    const funcInput = document.getElementById('function').value;
    const x0 = parseFloat(document.getElementById('x0').value);
    const tolerance = parseFloat(document.getElementById('tolerance').value);

    if (!funcInput || isNaN(x0) || isNaN(tolerance)) {
        alert("Por favor, ingrese valores válidos.");
        return;
    }

    let f;
    try {
        f = new Function('x', `return ${funcInput};`);
    } catch (error) {
        alert("Error en la función ingresada. Asegúrese de que sea válida.");
        return;
    }

    let x = x0;
    let iteration = 0;
    let error = Infinity;
    let results = []; // Array para almacenar los resultados

    while (error > tolerance) {
        const fx = f(x);
        const fpx = derivative(f, x);

        if (fpx === 0) {
            alert("Error: La derivada es cero, no se puede continuar.");
            return;
        }

        const x1 = x - fx / fpx;
        error = Math.abs(x1 - x);
        results.push(`Iteración ${iteration + 1}: x1 = ${x1.toFixed(6)}, error = ${error.toFixed(6)}`);
        x = x1;
        iteration++;

        if (iteration > 1000) {
            alert("No converge después de 1000 iteraciones.");
            return;
        }
    }

    // Mostrar resultados
    document.getElementById('popupResult').innerHTML = `
        <p>Raíz aproximada: ${x.toFixed(6)}</p>
        <p>Error: ${error.toFixed(6)}</p>
        <h3>Iteraciones:</h3>
        <p>${results.join('<br>')}</p>
    `;
    document.getElementById('popup').style.display = "block";
}

// Función para cerrar la ventana
function closePopup() {
    document.getElementById('popup').style.display = "none";
}

// Función para abrir y cerrar panel de informacion
function toggleInfo() {
    const panel = document.getElementById('infoPanel');
    panel.style.display = panel.style.display === "none" ? "block" : "none";
}
