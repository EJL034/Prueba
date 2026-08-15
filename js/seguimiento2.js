// JS/seguimiento.js

const TRANSICIONES_ESTADO = {
  'En revision': ['Aprobada', 'Finalizada'],
  Aprobada: ['Prorrogada', 'Finalizada'],
  Prorrogada: ['Finalizada'],
  Finalizada: []
};

function normalizarEstado(estado) {
  const valor = String(estado || '').trim().toLowerCase();

  if (valor === 'en revision' || valor === 'en revisión') return 'En revision';
  if (valor === 'aprobada') return 'Aprobada';
  if (valor === 'prorrogada' || valor === 'prorrogado') return 'Prorrogada';
  if (valor === 'finalizada' || valor === 'finalizado') return 'Finalizada';

  return estado;
}

function validarCambioEstado(estadoActual, estadoNuevo) {
  const actual = normalizarEstado(estadoActual);
  const nuevo = normalizarEstado(estadoNuevo);

  if (!TRANSICIONES_ESTADO[actual]) {
    return { valido: false, mensaje: 'Estado actual no reconocido.' };
  }

  if (actual === nuevo) {
    return { valido: false, mensaje: 'El estado nuevo debe ser diferente al actual.' };
  }

  if (!TRANSICIONES_ESTADO[actual].includes(nuevo)) {
    return {
      valido: false,
      mensaje: `No se permite pasar de ${actual} a ${nuevo}.`
    };
  }

  return { valido: true, mensaje: 'Transicion valida.' };
}

function registrarCambio(idIncapacidad, detalle) {
  const incapacidad = obtenerIncapacidadPorId(idIncapacidad);
  if (!incapacidad) return false;

  const historial = Array.isArray(incapacidad.historialCambios)
    ? incapacidad.historialCambios
    : [];

  historial.push({
    fecha: new Date().toISOString(),
    ...detalle
  });

  return actualizarIncapacidad(idIncapacidad, { historialCambios: historial });
}

function actualizarBadges() {
  const filas = document.querySelectorAll('[data-incapacidad-id]');
  filas.forEach((fila) => {
    const id = fila.getAttribute('data-incapacidad-id');
    const incapacidad = obtenerIncapacidadPorId(id);
    if (!incapacidad) return;

    const badge = fila.querySelector('.badge-estado');
    if (!badge) return;

    badge.textContent = incapacidad.estado;
    badge.className = `badge badge-estado estado-${normalizarEstado(
      incapacidad.estado
    ).replace(/\s+/g, '-').toLowerCase()}`;
  });
}

function procesarCambioEstado(idIncapacidad, nuevoEstado, usuario = 'Operador') {
  const incapacidad = obtenerIncapacidadPorId(idIncapacidad);

  if (!incapacidad) {
    return { exito: false, mensaje: 'La incapacidad no existe.' };
  }

  const validacion = validarCambioEstado(incapacidad.estado, nuevoEstado);

  if (!validacion.valido) {
    return { exito: false, mensaje: validacion.mensaje };
  }

  const estadoAnterior = incapacidad.estado;
  const estadoActualizado = normalizarEstado(nuevoEstado);

  const actualizado = actualizarIncapacidad(idIncapacidad, {
    estado: estadoActualizado
  });

  if (!actualizado) {
    return { exito: false, mensaje: 'No se pudo actualizar el estado.' };
  }

  registrarCambio(idIncapacidad, {
    tipo: 'Cambio de estado',
    estadoAnterior,
    estadoNuevo: estadoActualizado,
    usuario
  });

  actualizarBadges();

  return {
    exito: true,
    mensaje: `Estado actualizado a ${estadoActualizado}.`,
    estadoAnterior,
    estadoNuevo: estadoActualizado
  };
}

function procesarReincorporacion(idIncapacidad, fechaReincorporacion, usuario = 'Operador') {
  const incapacidad = obtenerIncapacidadPorId(idIncapacidad);

  if (!incapacidad) {
    return { exito: false, mensaje: 'La incapacidad no existe.' };
  }

  if (!fechaReincorporacion) {
    return { exito: false, mensaje: 'Debe indicar una fecha de reincorporacion.' };
  }

  const fechaReingreso = new Date(fechaReincorporacion);
  const fechaInicio = new Date(incapacidad.fechaInicio);

  if (Number.isNaN(fechaReingreso.getTime())) {
    return { exito: false, mensaje: 'La fecha de reincorporacion no es valida.' };
  }

  if (fechaReingreso < fechaInicio) {
    return {
      exito: false,
      mensaje: 'La fecha de reincorporacion no puede ser anterior al inicio.'
    };
  }

  const estadoAnterior = incapacidad.estado;

  const actualizado = actualizarIncapacidad(idIncapacidad, {
    fechaReincorporacion,
    estado: 'Finalizada'
  });

  if (!actualizado) {
    return { exito: false, mensaje: 'No se pudo registrar la reincorporacion.' };
  }

  registrarCambio(idIncapacidad, {
    tipo: 'Reincorporacion',
    estadoAnterior,
    estadoNuevo: 'Finalizada',
    fechaReincorporacion,
    usuario
  });

  actualizarBadges();

  return {
    exito: true,
    mensaje: 'Reincorporacion registrada y estado actualizado a Finalizada.',
    estadoAnterior,
    estadoNuevo: 'Finalizada',
    fechaReincorporacion
  };
}
