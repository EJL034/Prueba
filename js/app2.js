// JS/app.js

function formatearFecha(fechaISO) {
  if (!fechaISO) return '-';
  const fecha = new Date(fechaISO);
  if (Number.isNaN(fecha.getTime())) return fechaISO;
  return fecha.toLocaleDateString('es-CR');
}

function obtenerEstadoClass(estado) {
  return `estado-${String(estado).replace(/\s+/g, '-').toLowerCase()}`;
}

function renderTablaIncapacidades() {
  const tbody = document.getElementById('tablaIncapacidadesBody');
  if (!tbody) return;

  const incapacidades = obtenerIncapacidades();

  tbody.innerHTML = incapacidades
    .map(
      (item) => `
        <tr data-incapacidad-id="${item.id}">
          <td>${item.id}</td>
          <td>${item.nombre}</td>
          <td>${item.departamento}</td>
          <td>${item.tipo}</td>
          <td>${formatearFecha(item.fechaInicio)} - ${formatearFecha(item.fechaFin)}</td>
          <td>
            <span class="badge badge-estado ${obtenerEstadoClass(item.estado)}">
              ${item.estado}
            </span>
          </td>
          <td class="acciones-columna">
            <select class="input-mini" data-accion="estado" data-id="${item.id}">
              <option value="">Cambiar...</option>
              <option value="En revision">En revision</option>
              <option value="Aprobada">Aprobada</option>
              <option value="Prorrogada">Prorrogada</option>
              <option value="Finalizada">Finalizada</option>
            </select>
            <button class="btn btn-small" data-accion="reincorporar" data-id="${item.id}">Reincorporar</button>
            <button class="btn btn-small btn-alt" data-accion="comprobante" data-id="${item.id}">Comprobante</button>
          </td>
        </tr>
      `
    )
    .join('');
}

function renderListaSimple(lista, limite = 4) {
  if (!lista.length) return '<li>Sin datos</li>';

  return lista
    .slice(0, limite)
    .map((item) => `<li>${item.nombre} - ${item.estado}</li>`)
    .join('');
}

function actualizarDashboard() {
  const datos = obtenerIncapacidades();
  const hoy = new Date().toISOString().slice(0, 10);

  const activas = datos.filter((item) => item.estado !== 'Finalizada').length;
  const finalizadas = datos.filter((item) => item.estado === 'Finalizada').length;
  const reincorporacionesHoy = datos.filter(
    (item) => item.fechaReincorporacion === hoy
  ).length;
  const promedioDias =
    datos.length > 0
      ? Math.round(
          datos.reduce((acum, item) => acum + Number(item.diasIncapacidad || 0), 0) /
              datos.length
        )
      : 0;

  const topDepartamento = Object.entries(
    datos.reduce((acum, item) => {
      const key = item.departamento || 'Sin definir';
      acum[key] = (acum[key] || 0) + 1;
      return acum;
    }, {})
  ).sort((a, b) => b[1] - a[1])[0];

  const indicadores = [
    { titulo: 'Total incapacidades', valor: datos.length },
    { titulo: 'Incapacidades activas', valor: activas },
    { titulo: 'Incapacidades finalizadas', valor: finalizadas },
    { titulo: 'Reincorporaciones del dia', valor: reincorporacionesHoy },
    { titulo: 'Promedio dias', valor: promedioDias },
    {
      titulo: 'Departamento con mas casos',
      valor: topDepartamento ? `${topDepartamento[0]} (${topDepartamento[1]})` : 'N/A'
    }
  ];

  const panel = document.getElementById('dashboardIndicadores');
  if (panel) {
    panel.innerHTML = indicadores
      .map(
        (item) => `
          <article class="kpi-card">
            <h4>${item.titulo}</h4>
            <p>${item.valor}</p>
          </article>
        `
      )
      .join('');
  }

  const recientes = [...datos]
    .sort((a, b) => String(b.fechaCreacion).localeCompare(String(a.fechaCreacion)));

  const listaRecientes = document.getElementById('dashboardRecientes');
  if (listaRecientes) {
    listaRecientes.innerHTML = renderListaSimple(recientes, 5);
  }
}

function abrirModalReincorporacion(id) {
  const modal = document.getElementById('modalReincorporacion');
  const inputId = document.getElementById('reincorporacionId');
  const inputFecha = document.getElementById('reincorporacionFecha');

  if (!modal || !inputId || !inputFecha) return;

  inputId.value = id;
  inputFecha.value = new Date().toISOString().slice(0, 10);
  modal.classList.add('is-open');
}

function cerrarModalReincorporacion() {
  const modal = document.getElementById('modalReincorporacion');
  if (modal) modal.classList.remove('is-open');
}

function mostrarToast(mensaje, esError = false) {
  const toast = document.getElementById('toastSistema');
  if (!toast) return;

  toast.textContent = mensaje;
  toast.className = `toast ${esError ? 'toast-error' : 'toast-ok'} is-visible`;

  setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 2600);
}

function navegarAModulo(modulo) {
  document.querySelectorAll('[data-modulo]').forEach((seccion) => {
    const activo = seccion.getAttribute('data-modulo') === modulo;
    seccion.classList.toggle('is-active', activo);
  });

  document.querySelectorAll('[data-nav]').forEach((boton) => {
    const activo = boton.getAttribute('data-nav') === modulo;
    boton.classList.toggle('is-active', activo);
  });
}

function manejarAccionesTabla(evento) {
  const target = evento.target;
  const accion = target.getAttribute('data-accion');
  const id = target.getAttribute('data-id');

  if (!accion || !id) return;

  if (accion === 'estado') {
    if (!target.value) return;

    const resultado = procesarCambioEstado(id, target.value, 'Analista RRHH');

    mostrarToast(resultado.mensaje, !resultado.exito);
    renderTablaIncapacidades();
    actualizarDashboard();
    generarResumenEjecutivo();
  }

  if (accion === 'reincorporar') {
    abrirModalReincorporacion(id);
  }

  if (accion === 'comprobante') {
    generarComprobanteImprimible(id);
    navegarAModulo('reportar');
  }
}

function configurarEventos() {
  document.querySelectorAll('[data-nav]').forEach((boton) => {
    boton.addEventListener('click', () => {
      navegarAModulo(boton.getAttribute('data-nav'));
    });
  });

  const tabla = document.getElementById('tablaIncapacidadesBody');
  if (tabla) {
    tabla.addEventListener('change', manejarAccionesTabla);
    tabla.addEventListener('click', manejarAccionesTabla);
  }

  const modalCerrar = document.getElementById('cerrarModalReincorporacion');
  if (modalCerrar) {
    modalCerrar.addEventListener('click', cerrarModalReincorporacion);
  }

  const formReincorp = document.getElementById('formReincorporacion');
  if (formReincorp) {
    formReincorp.addEventListener('submit', (evento) => {
      evento.preventDefault();

      const id = document.getElementById('reincorporacionId').value;
      const fecha = document.getElementById('reincorporacionFecha').value;

      const resultado = procesarReincorporacion(id, fecha, 'Analista RRHH');
      mostrarToast(resultado.mensaje, !resultado.exito);

      if (resultado.exito) {
        cerrarModalReincorporacion();
        renderTablaIncapacidades();
        actualizarDashboard();
        generarResumenEjecutivo();
      }
    });
  }

  const btnImprimir = document.getElementById('btnImprimirComprobante');
  if (btnImprimir) {
    btnImprimir.addEventListener('click', imprimirComprobante);
  }

  const btnResumen = document.getElementById('btnIrAReportes');
  if (btnResumen) {
    btnResumen.addEventListener('click', () => {
      navegarAModulo('analizar');
      generarResumenEjecutivo();
    });
  }
}

function inicializarSistema() {
  inicializarDatosPrueba();
  inicializarModuloReportes();
  configurarEventos();
  renderTablaIncapacidades();
  generarResumenEjecutivo();
  actualizarDashboard();
  navegarAModulo('consultar');
}

window.addEventListener('DOMContentLoaded', inicializarSistema);
