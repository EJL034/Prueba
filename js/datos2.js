// JS/Datos.js

const CLAVE_BD_INCAPACIDADES = 'registro_incapacidades_db';

function obtenerIncapacidades() {
  const raw = localStorage.getItem(CLAVE_BD_INCAPACIDADES);
  if (!raw) return [];

  try {
    const datos = JSON.parse(raw);
    return Array.isArray(datos) ? datos : [];
  } catch (error) {
    console.error('No se pudo leer la base de incapacidades:', error);
    return [];
  }
}

function guardarListaIncapacidades(lista) {
  localStorage.setItem(CLAVE_BD_INCAPACIDADES, JSON.stringify(lista));
}

function obtenerIncapacidadPorId(id) {
  return obtenerIncapacidades().find((item) => item.id === id) || null;
}

function generarIdUnico() {
  const anio = new Date().getFullYear();
  const lista = obtenerIncapacidades();
  const max = lista.reduce((acum, item) => {
    const partes = String(item.id || '').split('-');
    const numero = Number(partes[1]);
    if (Number.isNaN(numero)) return acum;
    return Math.max(acum, numero);
  }, 0);

  return `INC-${String(max + 1).padStart(3, '0')}-${anio}`;
}

function guardarIncapacidad(incapacidad) {
  const lista = obtenerIncapacidades();
  const nuevoRegistro = {
    ...incapacidad,
    id: incapacidad.id || generarIdUnico(),
    estado: incapacidad.estado || 'En revision',
    fechaCreacion: incapacidad.fechaCreacion || new Date().toISOString(),
    historialCambios: Array.isArray(incapacidad.historialCambios)
      ? incapacidad.historialCambios
      : []
  };

  const existeBoleta = lista.some(
    (item) =>
      String(item.numBoleta || '').toLowerCase() ===
      String(nuevoRegistro.numBoleta || '').toLowerCase()
  );

  if (existeBoleta) return false;

  lista.push(nuevoRegistro);
  guardarListaIncapacidades(lista);
  return true;
}

function actualizarIncapacidad(id, cambios) {
  const lista = obtenerIncapacidades();
  const indice = lista.findIndex((item) => item.id === id);

  if (indice === -1) return false;

  lista[indice] = {
    ...lista[indice],
    ...cambios,
    fechaActualizacion: new Date().toISOString()
  };

  guardarListaIncapacidades(lista);
  return true;
}

function limpiarBaseDatos() {
  localStorage.removeItem(CLAVE_BD_INCAPACIDADES);
}

function obtenerEstadisticas() {
  const lista = obtenerIncapacidades();

  const total = lista.length;
  const activas = lista.filter((item) => item.estado !== 'Finalizada').length;
  const finalizadas = lista.filter((item) => item.estado === 'Finalizada').length;
  const enRevision = lista.filter((item) => item.estado === 'En revision').length;
  const aprobadas = lista.filter((item) => item.estado === 'Aprobada').length;
  const prorrogadas = lista.filter((item) => item.estado === 'Prorrogada').length;
  const diasTotales = lista.reduce(
    (acum, item) => acum + Number(item.diasIncapacidad || 0),
    0
  );

  return {
    total,
    activas,
    finalizadas,
    enRevision,
    aprobadas,
    prorrogadas,
    diasTotales
  };
}

function inicializarDatosPrueba() {
  if (obtenerIncapacidades().length > 0) return;

  const datosPrueba = [
    {
      id: 'INC-001-2026',
      nombre: 'Ana Solis',
      cedula: '101-456789-0',
      departamento: 'Operaciones',
      tipo: 'Medica',
      numBoleta: 'BOL-2026-001',
      fechaInicio: '2026-08-01',
      fechaFin: '2026-08-08',
      diasIncapacidad: 8,
      estado: 'Aprobada',
      fechaCreacion: '2026-08-01T08:00:00.000Z',
      historialCambios: []
    },
    {
      id: 'INC-002-2026',
      nombre: 'Luis Vargas',
      cedula: '102-345678-1',
      departamento: 'Recursos Humanos',
      tipo: 'Accidente Laboral',
      numBoleta: 'BOL-2026-002',
      fechaInicio: '2026-08-03',
      fechaFin: '2026-08-15',
      diasIncapacidad: 13,
      estado: 'Prorrogada',
      fechaCreacion: '2026-08-03T09:30:00.000Z',
      historialCambios: []
    },
    {
      id: 'INC-003-2026',
      nombre: 'Paola Castro',
      cedula: '104-987654-3',
      departamento: 'Finanzas',
      tipo: 'Maternidad',
      numBoleta: 'BOL-2026-003',
      fechaInicio: '2026-07-20',
      fechaFin: '2026-08-20',
      diasIncapacidad: 32,
      estado: 'Finalizada',
      fechaReincorporacion: '2026-08-21',
      fechaCreacion: '2026-07-20T07:15:00.000Z',
      historialCambios: []
    },
    {
      id: 'INC-004-2026',
      nombre: 'Mario Rojas',
      cedula: '205-765432-1',
      departamento: 'IT',
      tipo: 'Medica',
      numBoleta: 'BOL-2026-004',
      fechaInicio: '2026-08-10',
      fechaFin: '2026-08-14',
      diasIncapacidad: 5,
      estado: 'En revision',
      fechaCreacion: '2026-08-10T11:45:00.000Z',
      historialCambios: []
    },
    {
      id: 'INC-005-2026',
      nombre: 'Luis Mendoza',
      cedula: '201-223344-5',
      departamento: 'Logistica',
      tipo: 'Maternidad',
      numBoleta: 'BOL-2026-005',
      fechaInicio: '2026-08-12',
      fechaFin: '2026-08-25',
      diasIncapacidad: 14,
      estado: 'Aprobada',
      fechaCreacion: '2026-08-12T09:20:00.000Z',
      historialCambios: []
    },
    {
      id: 'INC-006-2026',
      nombre: 'Sofia Ramirez',
      cedula: '204-889900-7',
      departamento: 'Compras',
      tipo: 'Accidente Laboral',
      numBoleta: 'BOL-2026-006',
      fechaInicio: '2026-08-18',
      fechaFin: '2026-08-27',
      diasIncapacidad: 10,
      estado: 'En revision',
      fechaCreacion: '2026-08-18T10:05:00.000Z',
      historialCambios: []
    },
    {
      id: 'INC-007-2026',
      nombre: 'Carlos Vera',
      cedula: '301-774455-2',
      departamento: 'Ventas',
      tipo: 'Medica',
      numBoleta: 'BOL-2026-007',
      fechaInicio: '2026-08-16',
      fechaFin: '2026-08-21',
      diasIncapacidad: 6,
      estado: 'Finalizada',
      fechaReincorporacion: '2026-08-22',
      fechaCreacion: '2026-08-16T14:30:00.000Z',
      historialCambios: []
    },
    {
      id: 'INC-008-2026',
      nombre: 'Marina Lopez',
      cedula: '208-661122-3',
      departamento: 'Atencion al Cliente',
      tipo: 'Maternidad',
      numBoleta: 'BOL-2026-008',
      fechaInicio: '2026-08-20',
      fechaFin: '2026-09-04',
      diasIncapacidad: 16,
      estado: 'Aprobada',
      fechaCreacion: '2026-08-20T08:10:00.000Z',
      historialCambios: []
    },
    {
      id: 'INC-009-2026',
      nombre: 'Daniel Ortiz',
      cedula: '302-998877-4',
      departamento: 'Produccion',
      tipo: 'Accidente Laboral',
      numBoleta: 'BOL-2026-009',
      fechaInicio: '2026-08-22',
      fechaFin: '2026-08-30',
      diasIncapacidad: 9,
      estado: 'Prorrogada',
      fechaCreacion: '2026-08-22T11:20:00.000Z',
      historialCambios: []
    },
    {
      id: 'INC-010-2026',
      nombre: 'Elena Navarro',
      cedula: '103-334455-6',
      departamento: 'Administracion',
      tipo: 'Medica',
      numBoleta: 'BOL-2026-010',
      fechaInicio: '2026-08-24',
      fechaFin: '2026-08-28',
      diasIncapacidad: 5,
      estado: 'En revision',
      fechaCreacion: '2026-08-24T09:40:00.000Z',
      historialCambios: []
    }
  ];

  guardarListaIncapacidades(datosPrueba);
}
