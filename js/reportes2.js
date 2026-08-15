// JS/reportes.js

function filtrarPorRangoFechas(lista, fechaInicio, fechaFin) {
  const inicio = fechaInicio ? new Date(fechaInicio) : null;
  const fin = fechaFin ? new Date(fechaFin) : null;

  return lista.filter((item) => {
    const itemInicio = new Date(item.fechaInicio);

    if (inicio && itemInicio < inicio) return false;
    if (fin && itemInicio > fin) return false;

    return true;
  });
}

function agruparPorCampo(lista, campo) {
  return lista.reduce((acum, item) => {
    const llave = item[campo] || 'Sin definir';
    acum[llave] = (acum[llave] || 0) + 1;
    return acum;
  }, {});
}

function calcularDiasAusencia(lista) {
  return lista.reduce((acum, item) => acum + Number(item.diasIncapacidad || 0), 0);
}

function inicializarModuloReportes() {
  const inputInicio = document.getElementById('filtroFechaInicio');
  const inputFin = document.getElementById('filtroFechaFin');
  const botonResumen = document.getElementById('btnGenerarResumen');

  if (!inputInicio || !inputFin || !botonResumen) return;

  const hoy = new Date();
  const primerDiaMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);

  inputInicio.value = primerDiaMes.toISOString().slice(0, 10);
  inputFin.value = hoy.toISOString().slice(0, 10);

  botonResumen.addEventListener('click', () => {
    generarResumenEjecutivo();
  });
}

function generarResumenEjecutivo() {
  const inicio = document.getElementById('filtroFechaInicio')?.value || '';
  const fin = document.getElementById('filtroFechaFin')?.value || '';

  const lista = obtenerIncapacidades();
  const filtradas = filtrarPorRangoFechas(lista, inicio, fin);

  const resumen = {
    totalIncapacidades: filtradas.length,
    diasAusencia: calcularDiasAusencia(filtradas),
    porDepartamento: agruparPorCampo(filtradas, 'departamento'),
    porTipo: agruparPorCampo(filtradas, 'tipo')
  };

  renderResumen(resumen);
  return resumen;
}

function renderResumen(resumen) {
  const contenedorTotales = document.getElementById('resumenTotales');
  const contenedorDepto = document.getElementById('resumenDepartamento');
  const contenedorTipo = document.getElementById('resumenTipo');

  if (contenedorTotales) {
    contenedorTotales.innerHTML = `
      <article class="kpi-card">
        <h4>Total incapacidades</h4>
        <p>${resumen.totalIncapacidades}</p>
      </article>
      <article class="kpi-card">
        <h4>Dias de ausencia</h4>
        <p>${resumen.diasAusencia}</p>
      </article>
    `;
  }

  if (contenedorDepto) {
    contenedorDepto.innerHTML = Object.entries(resumen.porDepartamento)
      .map(([key, value]) => `<li><span>${key}</span><strong>${value}</strong></li>`)
      .join('');
  }

  if (contenedorTipo) {
    contenedorTipo.innerHTML = Object.entries(resumen.porTipo)
      .map(([key, value]) => `<li><span>${key}</span><strong>${value}</strong></li>`)
      .join('');
  }
}

function generarComprobanteImprimible(idIncapacidad) {
  const incapacidad = obtenerIncapacidadPorId(idIncapacidad);

  if (!incapacidad) return '';

  const html = `
    <section class="comprobante-print" id="comprobanteArea">
      <h3>Comprobante interno de incapacidad</h3>
      <p><strong>ID:</strong> ${incapacidad.id}</p>
      <p><strong>Empleado:</strong> ${incapacidad.nombre}</p>
      <p><strong>Cedula:</strong> ${incapacidad.cedula}</p>
      <p><strong>Boleta:</strong> ${incapacidad.numBoleta}</p>
      <p><strong>Departamento:</strong> ${incapacidad.departamento}</p>
      <p><strong>Tipo:</strong> ${incapacidad.tipo}</p>
      <p><strong>Estado:</strong> ${incapacidad.estado}</p>
      <p><strong>Fecha inicio:</strong> ${incapacidad.fechaInicio}</p>
      <p><strong>Fecha fin:</strong> ${incapacidad.fechaFin}</p>
      <p><strong>Dias:</strong> ${incapacidad.diasIncapacidad}</p>
      <p><strong>Reincorporacion:</strong> ${incapacidad.fechaReincorporacion || 'Pendiente'}</p>
    </section>
  `;

  const contenedor = document.getElementById('comprobanteContenido');
  if (contenedor) contenedor.innerHTML = html;

  return html;
}

function imprimirComprobante() {
  window.print();
}
