/**
 * ARCHIVO DE CONFIGURACIÓN
 * Valores, constantes y configuración central de la aplicación
 */

// ==========================================
// INFORMACIÓN DE LA APLICACIÓN
// ==========================================

const CONFIG = {
  nombre: 'Sistema de Gestión de Incapacidades',
  version: '1.0.0',
  descripcion: 'Sistema web para gestionar boletas de incapacidad',
  autor: 'Desarrollo 2026',
  año: 2026,
  
  // ==========================================
  // CONFIGURACIÓN DE ALMACENAMIENTO
  // ==========================================
  
  almacenamiento: {
    clave_db: 'incapacidades_db',
    clave_usuario: 'usuario_actual',
    clave_sesion: 'sesion_activa',
    tipo: 'localStorage' // 'localStorage' o 'sessionStorage'
  },
  
  // ==========================================
  // CONFIGURACIÓN DE VALIDACIÓN
  // ==========================================
  
  validacion: {
    // Nombre
    nombre_minimo: 3,
    nombre_maximo: 100,
    
    // Cédula (Costa Rica)
    cedula_formato: /^\d{3}-\d{6}-\d{1}$/,
    cedula_ejemplo: '123-456789-0',
    
    // Archivo
    archivo_peso_maximo: 1024 * 1024, // 1 MB
    archivo_formatos: ['application/pdf', 'image/jpeg', 'image/png', 'image/gif'],
    archivo_extensiones: ['pdf', 'jpg', 'jpeg', 'png', 'gif'],
    
    // Días
    dias_minimo: 1,
    dias_maximo: 365,
    
    // Boleta
    boleta_formato: /^[A-Z0-9\-]+$/,
    boleta_ejemplo: 'BOL-2026-001',
  },
  
  // ==========================================
  // CONFIGURACIÓN DE DATOS
  // ==========================================
  
  datos: {
    tipos_incapacidad: [
      'Médica',
      'Maternidad',
      'Paternidad',
      'Accidente Laboral',
      'Enfermedad Profesional'
    ],
    
    estados: [
      'Activa',
      'Finalizada',
      'Prorroga'
    ],
    
    departamentos: [
      'Recursos Humanos',
      'Operaciones',
      'Contabilidad',
      'Ventas',
      'IT',
      'Finanzas',
      'Marketing',
      'Logística'
    ]
  },
  
  // ==========================================
  // CONFIGURACIÓN DE INTERFAZ
  // ==========================================
  
  interfaz: {
    // Paginación
    registros_por_pagina: 10,
    
    // Notificaciones
    duracion_notificacion: 4000, // ms
    posicion_notificacion: 'top-right',
    
    // Animaciones
    velocidad_animacion: 300, // ms
    efectos_activados: true,
    
    // Tema
    tema_oscuro: false,
    
    // Idioma
    idioma: 'es-CR'
  },
  
  // ==========================================
  // CONFIGURACIÓN DE REPORTES
  // ==========================================
  
  reportes: {
    // Formatos soportados
    formatos: ['PDF', 'CSV', 'JSON', 'EXCEL'],
    
    // Campos a incluir en reportes
    campos_incluir: [
      'nombre',
      'cedula',
      'departamento',
      'tipo',
      'numBoleta',
      'fechaInicio',
      'fechaFin',
      'diasIncapacidad',
      'estado'
    ],
    
    // Nombre de archivo por defecto
    nombre_archivo: 'incapacidades'
  },
  
  // ==========================================
  // CONFIGURACIÓN DE API (si existe backend)
  // ==========================================
  
  api: {
    base_url: 'http://localhost:3000/api',
    timeout: 30000, // ms
    reintentos: 3,
    endpoints: {
      incapacidades: '/incapacidades',
      usuarios: '/usuarios',
      reportes: '/reportes'
    }
  },
  
  // ==========================================
  // MENSAJES DE LA APLICACIÓN
  // ==========================================
  
  mensajes: {
    exito: {
      guardado: '✅ Guardado correctamente',
      actualizado: '✏️ Actualizado correctamente',
      eliminado: '🗑️ Eliminado correctamente',
      exportado: '📤 Exportado correctamente'
    },
    
    error: {
      guardado: '❌ Error al guardar',
      actualizado: '❌ Error al actualizar',
      eliminado: '❌ Error al eliminar',
      carga: '❌ Error al cargar datos',
      validacion: '⚠️ Error de validación'
    },
    
    advertencia: {
      campos_vacios: '⚠️ Completa todos los campos requeridos',
      confirmar_eliminacion: '¿Estás seguro que deseas eliminar este registro?',
      datos_no_guardados: '⚠️ Hay cambios sin guardar'
    }
  },
  
  // ==========================================
  // PERMISOS Y ROLES (para futuro)
  // ==========================================
  
  roles: {
    admin: {
      nombre: 'Administrador',
      permisos: ['crear', 'leer', 'actualizar', 'eliminar', 'exportar', 'configurar']
    },
    gerente: {
      nombre: 'Gerente',
      permisos: ['crear', 'leer', 'actualizar', 'exportar']
    },
    usuario: {
      nombre: 'Usuario',
      permisos: ['leer']
    }
  },
  
  // ==========================================
  // INTEGRACIÓN CON SERVICIOS EXTERNOS
  // ==========================================
  
  servicios: {
    // Google Analytics (si se desea)
    analytics_id: '',
    
    // Sentry (para monitoreo de errores)
    sentry_dsn: ''
  }
};

// ==========================================
// FUNCIONES DE CONFIGURACIÓN
// ==========================================

/**
 * Obtiene un valor de configuración
 */
function obtenerConfiguracion(ruta) {
  const partes = ruta.split('.');
  let valor = CONFIG;
  
  for (const parte of partes) {
    if (valor && typeof valor === 'object' && parte in valor) {
      valor = valor[parte];
    } else {
      return undefined;
    }
  }
  
  return valor;
}

/**
 * Establece un valor de configuración
 */
function establecerConfiguracion(ruta, valor) {
  const partes = ruta.split('.');
  let obj = CONFIG;
  
  for (let i = 0; i < partes.length - 1; i++) {
    const parte = partes[i];
    if (!(parte in obj)) {
      obj[parte] = {};
    }
    obj = obj[parte];
  }
  
  obj[partes[partes.length - 1]] = valor;
}

/**
 * Valida que todos los valores de configuración sean válidos
 */
function validarConfiguracion() {
  const errores = [];
  
  // Validar almacenamiento
  if (!['localStorage', 'sessionStorage'].includes(CONFIG.almacenamiento.tipo)) {
    errores.push('Tipo de almacenamiento inválido');
  }
  
  // Validar idioma
  if (!/^[a-z]{2}-[A-Z]{2}$/.test(CONFIG.interfaz.idioma)) {
    errores.push('Formato de idioma inválido');
  }
  
  // Validar configuración de validación
  if (CONFIG.validacion.dias_minimo >= CONFIG.validacion.dias_maximo) {
    errores.push('Configuración de días inválida');
  }
  
  if (errores.length > 0) {
    console.warn('⚠️ Errores en configuración:', errores);
    return false;
  }
  
  return true;
}

/**
 * Reinicia la configuración a valores por defecto
 */
function reiniciarConfiguracion() {
  // Guardar valores actuales como respaldo
  const respaldo = localStorage.getItem('config_respaldo');
  if (!respaldo) {
    localStorage.setItem('config_respaldo', JSON.stringify(CONFIG));
  }
  
  // Reiniciar desde respaldo
  location.reload();
}

/**
 * Exporta la configuración actual
 */
function exportarConfiguracion() {
  const json = JSON.stringify(CONFIG, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `configuracion-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Importa configuración desde archivo
 */
function importarConfiguracion(archivo) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const nueva_config = JSON.parse(e.target.result);
      Object.assign(CONFIG, nueva_config);
      mostrarNotificacion('✅ Configuración importada', 'success');
      location.reload();
    } catch (error) {
      mostrarNotificacion('❌ Error al importar configuración', 'error');
    }
  };
  reader.readAsText(archivo);
}

/**
 * Obtiene el almacenamiento configurado
 */
function obtenerAlmacenamiento() {
  return CONFIG.almacenamiento.tipo === 'localStorage' ? localStorage : sessionStorage;
}

// ==========================================
// INICIALIZACIÓN
// ==========================================

// Validar configuración al cargar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', validarConfiguracion);
} else {
  validarConfiguracion();
}

// Exportar para uso global
window.CONFIG = CONFIG;
window.configuracion = {
  obtenerConfiguracion,
  establecerConfiguracion,
  validarConfiguracion,
  reiniciarConfiguracion,
  exportarConfiguracion,
  importarConfiguracion,
  obtenerAlmacenamiento
};
/**
 * MÓDULO DE PERSISTENCIA Y DATOS
 * Gestiona la lectura, escritura y manipulación de datos de incapacidades en localStorage
 */

const CLAVE_DB = 'incapacidades_db';

/**
 * Obtiene todas las incapacidades del almacenamiento local
 * @returns {Array} Arreglo de objetos con registros de incapacidades
 */
function obtenerIncapacidades() {
  try {
    const datos = localStorage.getItem(CLAVE_DB);
    if (!datos) {
      inicializarDatosPrueba();
      return obtenerIncapacidades();
    }
    return JSON.parse(datos);
  } catch (error) {
    console.error('Error al obtener incapacidades:', error);
    return [];
  }
}

/**
 * Guarda una nueva incapacidad en el almacenamiento
 * @param {Object} registro - Objeto con datos de la incapacidad
 * @param {string} registro.id - Identificador único (ej: generado con UUID)
 * @param {string} registro.nombre - Nombre completo del trabajador
 * @param {string} registro.cedula - Número de cédula
 * @param {string} registro.departamento - Departamento del trabajador
 * @param {string} registro.tipo - Tipo de incapacidad (ej: 'Médica', 'Maternidad')
 * @param {string} registro.numBoleta - Número de comprobante
 * @param {string} registro.fechaInicio - Fecha inicio (formato: YYYY-MM-DD)
 * @param {string} registro.fechaFin - Fecha fin (formato: YYYY-MM-DD)
 * @param {string} registro.diasIncapacidad - Cantidad de días
 * @param {string} registro.estado - Estado actual (ej: 'Activa', 'Finalizada', 'Prorroga')
 * @param {string} registro.urlAdjunto - URL o ruta del archivo adjunto
 * @param {string} registro.fechaRegistro - Fecha de creación del registro
 * @returns {boolean} true si se guardó correctamente
 */
function guardarIncapacidad(registro) {
  try {
    const incapacidades = obtenerIncapacidades();
    
    // Validar que el registro tenga ID
    if (!registro.id) {
      registro.id = generarIdUnico();
    }
    
    // Agregar fecha de registro si no existe
    if (!registro.fechaRegistro) {
      registro.fechaRegistro = new Date().toISOString();
    }
    
    incapacidades.push(registro);
    localStorage.setItem(CLAVE_DB, JSON.stringify(incapacidades));
    
    console.log(`Incapacidad guardada: ${registro.id}`);
    return true;
  } catch (error) {
    console.error('Error al guardar incapacidad:', error);
    return false;
  }
}

/**
 * Obtiene una incapacidad específica por su ID
 * @param {string} id - Identificador único de la incapacidad
 * @returns {Object|null} Objeto incapacidad o null si no existe
 */
function obtenerIncapacidadPorId(id) {
  try {
    const incapacidades = obtenerIncapacidades();
    return incapacidades.find(item => item.id === id) || null;
  } catch (error) {
    console.error('Error al obtener incapacidad por ID:', error);
    return null;
  }
}

/**
 * Actualiza los datos de una incapacidad existente
 * @param {string} id - Identificador único de la incapacidad
 * @param {Object} datosActualizados - Propiedades a actualizar
 * @returns {boolean} true si la actualización fue exitosa
 */
function actualizarIncapacidad(id, datosActualizados) {
  try {
    const incapacidades = obtenerIncapacidades();
    const index = incapacidades.findIndex(item => item.id === id);
    
    if (index === -1) {
      console.warn(`No se encontró incapacidad con ID: ${id}`);
      return false;
    }
    
    // Mantener la fecha de registro original
    const fechaRegistroOriginal = incapacidades[index].fechaRegistro;
    
    // Realizar la actualización
    incapacidades[index] = {
      ...incapacidades[index],
      ...datosActualizados,
      fechaRegistro: fechaRegistroOriginal, // Preservar fecha original
      fechaActualizacion: new Date().toISOString() // Agregar timestamp de actualización
    };
    
    localStorage.setItem(CLAVE_DB, JSON.stringify(incapacidades));
    console.log(`Incapacidad actualizada: ${id}`);
    return true;
  } catch (error) {
    console.error('Error al actualizar incapacidad:', error);
    return false;
  }
}

/**
 * Elimina una incapacidad del almacenamiento
 * @param {string} id - Identificador único de la incapacidad a eliminar
 * @returns {boolean} true si la eliminación fue exitosa
 */
function eliminarIncapacidad(id) {
  try {
    const incapacidades = obtenerIncapacidades();
    const index = incapacidades.findIndex(item => item.id === id);
    
    if (index === -1) {
      console.warn(`No se encontró incapacidad con ID: ${id}`);
      return false;
    }
    
    const registroEliminado = incapacidades.splice(index, 1);
    localStorage.setItem(CLAVE_DB, JSON.stringify(incapacidades));
    
    console.log(`Incapacidad eliminada: ${id}`);
    return true;
  } catch (error) {
    console.error('Error al eliminar incapacidad:', error);
    return false;
  }
}

/**
 * Inicializa la base de datos con registros de prueba
 * Solo se ejecuta si localStorage está vacío
 */
function inicializarDatosPrueba() {
  try {
    // Verificar si ya hay datos
    const datosExistentes = localStorage.getItem(CLAVE_DB);
    if (datosExistentes) {
      return;
    }
    
    const datosPrueba = [
      {
        id: 'INC-001-2026',
        nombre: 'María García López',
        cedula: '101-234567-8',
        departamento: 'Recursos Humanos',
        tipo: 'Médica',
        numBoleta: 'BOL-2026-001',
        fechaInicio: '2026-08-01',
        fechaFin: '2026-08-15',
        diasIncapacidad: 15,
        estado: 'Activa',
        urlAdjunto: '/documentos/boleta_001.pdf',
        fechaRegistro: new Date('2026-08-01').toISOString(),
        observaciones: 'Cirugía menor, reposo recomendado'
      },
      {
        id: 'INC-002-2026',
        nombre: 'Juan Carlos Rodríguez',
        cedula: '102-345678-9',
        departamento: 'Operaciones',
        tipo: 'Maternidad',
        numBoleta: 'BOL-2026-002',
        fechaInicio: '2026-07-15',
        fechaFin: '2026-09-15',
        diasIncapacidad: 63,
        estado: 'Finalizada',
        urlAdjunto: '/documentos/boleta_002.pdf',
        fechaRegistro: new Date('2026-07-15').toISOString(),
        observaciones: 'Licencia por maternidad completada'
      },
      {
        id: 'INC-003-2026',
        nombre: 'Sandra Mendoza Vargas',
        cedula: '103-456789-0',
        departamento: 'Contabilidad',
        tipo: 'Accidente Laboral',
        numBoleta: 'BOL-2026-003',
        fechaInicio: '2026-08-10',
        fechaFin: '2026-08-25',
        diasIncapacidad: 16,
        estado: 'Prorroga',
        urlAdjunto: '/documentos/boleta_003.pdf',
        fechaRegistro: new Date('2026-08-10').toISOString(),
        observaciones: 'Prorroga solicitada por médico',
        fechaActualizacion: new Date('2026-08-20').toISOString()
      }
    ];
    
    localStorage.setItem(CLAVE_DB, JSON.stringify(datosPrueba));
    console.log('Base de datos inicializada con datos de prueba');
  } catch (error) {
    console.error('Error al inicializar datos de prueba:', error);
  }
}

/**
 * Genera un ID único para nuevos registros
 * Formato: INC-NNN-YYYY donde NNN es secuencial y YYYY es el año
 * @returns {string} ID único
 */
function generarIdUnico() {
  try {
    const incapacidades = JSON.parse(localStorage.getItem(CLAVE_DB)) || [];
    const anio = new Date().getFullYear();
    
    // Obtener el número más alto del año actual
    const registrosAnio = incapacidades.filter(reg => reg.id.includes(`-${anio}`));
    const numeros = registrosAnio.map(reg => {
      const match = reg.id.match(/INC-(\d+)-/);
      return match ? parseInt(match[1]) : 0;
    });
    
    const proximoNumero = Math.max(...numeros, 0) + 1;
    return `INC-${String(proximoNumero).padStart(3, '0')}-${anio}`;
  } catch (error) {
    console.error('Error al generar ID único:', error);
    return `INC-TEMP-${Date.now()}`;
  }
}

/**
 * Limpia completamente la base de datos (uso solo en desarrollo/pruebas)
 * @returns {boolean} true si se limpió correctamente
 */
function limpiarBaseDatos() {
  try {
    localStorage.removeItem(CLAVE_DB);
    console.warn('Base de datos limpiada completamente');
    return true;
  } catch (error) {
    console.error('Error al limpiar base de datos:', error);
    return false;
  }
}

/**
 * Obtiene estadísticas de las incapacidades registradas
 * @returns {Object} Objeto con estadísticas
 */
function obtenerEstadisticas() {
  try {
    const incapacidades = obtenerIncapacidades();
    
    return {
      total: incapacidades.length,
      activas: incapacidades.filter(i => i.estado === 'Activa').length,
      finalizadas: incapacidades.filter(i => i.estado === 'Finalizada').length,
      prorroga: incapacidades.filter(i => i.estado === 'Prorroga').length,
      diasTotales: incapacidades.reduce((suma, i) => suma + (parseInt(i.diasIncapacidad) || 0), 0)
    };
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    return {};
  }
}
/**
 * MÓDULO DE VALIDACIONES Y REGLAS DE NEGOCIO
 * Contiene la lógica pura de verificación antes de procesar o guardar datos
 */

// Constantes de validación
const PESO_MAXIMO_ARCHIVO = 1024 * 1024; // 1 MB en bytes
const FORMATOS_PERMITIDOS = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif'];
const EXTENSIONES_PERMITIDAS = ['pdf', 'jpg', 'jpeg', 'png', 'gif'];

/**
 * Calcula la cantidad de días consecutivos entre dos fechas
 * @param {string} fechaInicio - Fecha inicial (formato: YYYY-MM-DD)
 * @param {string} fechaFin - Fecha final (formato: YYYY-MM-DD)
 * @returns {Object} Objeto con { diasCalculados, valido, mensaje }
 */
function calcularDiasIncapacidad(fechaInicio, fechaFin) {
  const resultado = {
    diasCalculados: 0,
    valido: true,
    mensaje: ''
  };

  try {
    // Validar que las fechas sean válidas
    if (!fechaInicio || !fechaFin) {
      resultado.valido = false;
      resultado.mensaje = 'Las fechas de inicio y fin son requeridas';
      return resultado;
    }

    // Convertir strings a objetos Date
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    // Validar que sean fechas válidas
    if (isNaN(inicio.getTime()) || isNaN(fin.getTime())) {
      resultado.valido = false;
      resultado.mensaje = 'Las fechas ingresadas no tienen un formato válido';
      return resultado;
    }

    // Validar que la fecha final no sea anterior a la inicial
    if (fin < inicio) {
      resultado.valido = false;
      resultado.mensaje = 'La fecha de fin no puede ser anterior a la fecha de inicio';
      return resultado;
    }

    // Calcular diferencia en milisegundos y convertir a días
    const diferenciaMilisegundos = fin - inicio;
    const diasCalculados = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24)) + 1; // +1 incluye el día inicial

    // Validar rango de días (entre 1 y 365)
    if (diasCalculados < 1) {
      resultado.valido = false;
      resultado.mensaje = 'La incapacidad debe tener al menos 1 día';
      return resultado;
    }

    if (diasCalculados > 365) {
      resultado.valido = false;
      resultado.mensaje = 'La incapacidad no puede exceder 365 días consecutivos';
      return resultado;
    }

    resultado.diasCalculados = diasCalculados;
    resultado.mensaje = `Incapacidad válida: ${diasCalculados} día${diasCalculados > 1 ? 's' : ''}`;

    return resultado;
  } catch (error) {
    resultado.valido = false;
    resultado.mensaje = `Error al calcular días: ${error.message}`;
    return resultado;
  }
}

/**
 * Verifica que el número de boleta sea único en el sistema
 * @param {string} numBoleta - Número de comprobante a validar
 * @param {string} idActual - ID de la incapacidad actual (null para registros nuevos)
 * @returns {Object} Objeto con { unico, valido, mensaje }
 */
function validarBoletaUnica(numBoleta, idActual = null) {
  const resultado = {
    unico: true,
    valido: true,
    mensaje: ''
  };

  try {
    // Validar que el número de boleta exista
    if (!numBoleta || numBoleta.trim() === '') {
      resultado.valido = false;
      resultado.mensaje = 'El número de boleta es requerido';
      return resultado;
    }

    // Limpiar espacios en blanco
    const boletaLimpia = numBoleta.trim().toUpperCase();

    // Validar formato básico (alfanumérico con guiones permitidos)
    if (!/^[A-Z0-9\-]+$/.test(boletaLimpia)) {
      resultado.valido = false;
      resultado.mensaje = 'El número de boleta contiene caracteres inválidos';
      return resultado;
    }

    // Obtener todas las incapacidades del almacenamiento
    const incapacidades = obtenerIncapacidades();

    // Buscar si existe una boleta duplicada (excluyendo el registro actual)
    const boletaDuplicada = incapacidades.find(
      incapacidad => 
        incapacidad.numBoleta.toUpperCase() === boletaLimpia && 
        incapacidad.id !== idActual
    );

    if (boletaDuplicada) {
      resultado.unico = false;
      resultado.valido = false;
      resultado.mensaje = `El número de boleta "${boletaLimpia}" ya está registrado en el expediente ${boletaDuplicada.id}`;
      return resultado;
    }

    resultado.mensaje = 'Número de boleta válido y único';
    return resultado;
  } catch (error) {
    resultado.valido = false;
    resultado.mensaje = `Error al validar boleta: ${error.message}`;
    return resultado;
  }
}

/**
 * Valida que el formulario de registro tenga todos los campos obligatorios
 * @param {Object} datos - Objeto con los datos del formulario
 * @param {string} datos.nombre - Nombre completo del trabajador
 * @param {string} datos.cedula - Número de cédula
 * @param {string} datos.departamento - Departamento
 * @param {string} datos.tipo - Tipo de incapacidad
 * @param {string} datos.fechaInicio - Fecha inicio
 * @param {string} datos.fechaFin - Fecha fin
 * @param {string} datos.numBoleta - Número de boleta
 * @param {File} datos.archivo - Archivo adjunto
 * @param {string} datos.idActual - ID actual para actualización (opcional)
 * @returns {Object} Objeto con { valido, errores: [] }
 */
function validarFormularioRegistro(datos) {
  const resultado = {
    valido: true,
    errores: []
  };

  try {
    // Validar nombre
    if (!datos.nombre || datos.nombre.trim() === '') {
      resultado.errores.push('El nombre del trabajador es requerido');
    } else if (datos.nombre.length < 3) {
      resultado.errores.push('El nombre debe tener al menos 3 caracteres');
    } else if (datos.nombre.length > 100) {
      resultado.errores.push('El nombre no puede exceder 100 caracteres');
    }

    // Validar cédula
    if (!datos.cedula || datos.cedula.trim() === '') {
      resultado.errores.push('El número de cédula es requerido');
    } else if (!validarFormatoCedula(datos.cedula)) {
      resultado.errores.push('El formato de cédula no es válido (ej: 123-456789-0)');
    }

    // Validar departamento
    if (!datos.departamento || datos.departamento.trim() === '') {
      resultado.errores.push('El departamento es requerido');
    }

    // Validar tipo de incapacidad
    if (!datos.tipo || datos.tipo.trim() === '') {
      resultado.errores.push('El tipo de incapacidad es requerido');
    }

    // Validar número de boleta
    if (!datos.numBoleta || datos.numBoleta.trim() === '') {
      resultado.errores.push('El número de boleta es requerido');
    } else {
      const validacionBoleta = validarBoletaUnica(datos.numBoleta, datos.idActual || null);
      if (!validacionBoleta.valido) {
        resultado.errores.push(validacionBoleta.mensaje);
      }
    }

    // Validar fechas
    if (!datos.fechaInicio || !datos.fechaFin) {
      resultado.errores.push('Las fechas de inicio y fin son requeridas');
    } else {
      const validacionDias = calcularDiasIncapacidad(datos.fechaInicio, datos.fechaFin);
      if (!validacionDias.valido) {
        resultado.errores.push(validacionDias.mensaje);
      }
    }

    // Validar archivo adjunto (solo si es un registro nuevo o se proporciona nuevo archivo)
    if (datos.archivo) {
      const validacionArchivo = validarFormatoArchivo(datos.archivo);
      if (!validacionArchivo.valido) {
        resultado.errores.push(validacionArchivo.mensaje);
      }
    } else if (!datos.idActual && !datos.urlAdjunto) {
      // Si es nuevo registro, debe tener archivo
      resultado.errores.push('El archivo adjunto es requerido');
    }

    // Asignar validez general
    resultado.valido = resultado.errores.length === 0;

    return resultado;
  } catch (error) {
    resultado.valido = false;
    resultado.errores.push(`Error en validación: ${error.message}`);
    return resultado;
  }
}

/**
 * Valida el formato y peso del archivo adjunto
 * @param {File} archivo - Objeto File del archivo
 * @returns {Object} Objeto con { valido, mensaje, tamanio, tipo }
 */
function validarFormatoArchivo(archivo) {
  const resultado = {
    valido: true,
    mensaje: '',
    tamanio: 0,
    tipo: ''
  };

  try {
    // Validar que existe archivo
    if (!archivo) {
      resultado.valido = false;
      resultado.mensaje = 'No se proporcionó archivo';
      return resultado;
    }

    // Obtener información del archivo
    const tamanio = archivo.size;
    const nombre = archivo.name;
    const tipo = archivo.type;
    const extension = nombre.split('.').pop().toLowerCase();

    resultado.tamanio = tamanio;
    resultado.tipo = tipo;

    // Validar peso
    if (tamanio > PESO_MAXIMO_ARCHIVO) {
      const pesoMB = (PESO_MAXIMO_ARCHIVO / (1024 * 1024)).toFixed(1);
      resultado.valido = false;
      resultado.mensaje = `El archivo es muy pesado. Máximo permitido: ${pesoMB} MB`;
      return resultado;
    }

    // Validar tipo MIME
    if (!FORMATOS_PERMITIDOS.includes(tipo)) {
      resultado.valido = false;
      resultado.mensaje = `Tipo de archivo no permitido. Formatos válidos: PDF, JPG, PNG, GIF`;
      return resultado;
    }

    // Validar extensión como segunda capa de seguridad
    if (!EXTENSIONES_PERMITIDAS.includes(extension)) {
      resultado.valido = false;
      resultado.mensaje = `Extensión de archivo no permitida. Válidas: ${EXTENSIONES_PERMITIDAS.join(', ')}`;
      return resultado;
    }

    // Validaciones adicionales según tipo
    if (tipo === 'application/pdf') {
      resultado.mensaje = 'Archivo PDF válido';
    } else if (tipo.startsWith('image/')) {
      resultado.mensaje = 'Archivo imagen válido';
    }

    return resultado;
  } catch (error) {
    resultado.valido = false;
    resultado.mensaje = `Error al validar archivo: ${error.message}`;
    return resultado;
  }
}

/**
 * Valida el formato de cédula (Costa Rica: XXX-XXXXXX-X)
 * @param {string} cedula - Número de cédula
 * @returns {boolean} true si el formato es válido
 */
function validarFormatoCedula(cedula) {
  if (!cedula) return false;
  
  // Patrón: 3-6-1 dígitos separados por guiones
  const patronCedula = /^\d{3}-\d{6}-\d{1}$/;
  return patronCedula.test(cedula.trim());
}

/**
 * Valida que una fecha sea válida y no sea futura
 * @param {string} fecha - Fecha a validar (formato: YYYY-MM-DD)
 * @param {boolean} permitirFutura - Si se permiten fechas futuras
 * @returns {Object} Objeto con { valido, mensaje }
 */
function validarFecha(fecha, permitirFutura = false) {
  const resultado = {
    valido: true,
    mensaje: ''
  };

  try {
    if (!fecha) {
      resultado.valido = false;
      resultado.mensaje = 'La fecha es requerida';
      return resultado;
    }

    const fechaObj = new Date(fecha);
    if (isNaN(fechaObj.getTime())) {
      resultado.valido = false;
      resultado.mensaje = 'El formato de fecha no es válido';
      return resultado;
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (!permitirFutura && fechaObj > hoy) {
      resultado.valido = false;
      resultado.mensaje = 'No se pueden ingresar fechas futuras';
      return resultado;
    }

    resultado.mensaje = 'Fecha válida';
    return resultado;
  } catch (error) {
    resultado.valido = false;
    resultado.mensaje = `Error al validar fecha: ${error.message}`;
    return resultado;
  }
}

/**
 * Obtiene un resumen de todos los errores de validación
 * @param {Object} validaciones - Objeto con resultados de múltiples validaciones
 * @returns {Array} Arreglo de mensajes de error
 */
function obtenerErroresValidacion(validaciones) {
  const errores = [];

  for (const [campo, resultado] of Object.entries(validaciones)) {
    if (Array.isArray(resultado.errores)) {
      errores.push(...resultado.errores);
    } else if (resultado.mensaje && !resultado.valido) {
      errores.push(resultado.mensaje);
    }
  }

  return errores;
}

/**
 * Limpia y normaliza datos de entrada antes de guardar
 * @param {Object} datos - Objeto con datos a limpiar
 * @returns {Object} Objeto limpio y normalizado
 */
function normalizarDatos(datos) {
  return {
    nombre: (datos.nombre || '').trim(),
    cedula: (datos.cedula || '').trim().toUpperCase(),
    departamento: (datos.departamento || '').trim(),
    tipo: (datos.tipo || '').trim(),
    numBoleta: (datos.numBoleta || '').trim().toUpperCase(),
    fechaInicio: (datos.fechaInicio || '').trim(),
    fechaFin: (datos.fechaFin || '').trim(),
    estado: (datos.estado || 'Activa').trim(),
    observaciones: (datos.observaciones || '').trim()
  };
}
/**
 * MÓDULO DE UTILIDADES
 * Funciones auxiliares para la aplicación
 */

/**
 * Clase para manejar la paginación de datos
 */
class Paginador {
  constructor(datos, porPagina = 10) {
    this.datos = datos;
    this.porPagina = porPagina;
    this.paginaActual = 1;
    this.totalPaginas = Math.ceil(datos.length / porPagina);
  }

  obtenerPagina(numero) {
    this.paginaActual = numero;
    const inicio = (numero - 1) * this.porPagina;
    const fin = inicio + this.porPagina;
    return this.datos.slice(inicio, fin);
  }

  siguiente() {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
      return this.obtenerPagina(this.paginaActual);
    }
    return null;
  }

  anterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      return this.obtenerPagina(this.paginaActual);
    }
    return null;
  }

  ir(numero) {
    if (numero >= 1 && numero <= this.totalPaginas) {
      return this.obtenerPagina(numero);
    }
    return null;
  }
}

/**
 * Ordena un arreglo de incapacidades
 */
function ordenarIncapacidades(incapacidades, campo = 'nombre', direccion = 'asc') {
  const copia = [...incapacidades];
  
  copia.sort((a, b) => {
    let valorA = a[campo];
    let valorB = b[campo];
    
    // Convertir a minúsculas si son strings
    if (typeof valorA === 'string') valorA = valorA.toLowerCase();
    if (typeof valorB === 'string') valorB = valorB.toLowerCase();
    
    // Comparación
    if (valorA < valorB) return direccion === 'asc' ? -1 : 1;
    if (valorA > valorB) return direccion === 'asc' ? 1 : -1;
    return 0;
  });
  
  return copia;
}

/**
 * Busca registros por múltiples criterios
 */
function buscarAvanzado(incapacidades, criterios) {
  return incapacidades.filter(inc => {
    // Criterios soportados: nombre, cedula, departamento, tipo, estado, rango_dias
    
    if (criterios.nombre && !inc.nombre.toLowerCase().includes(criterios.nombre.toLowerCase())) {
      return false;
    }
    
    if (criterios.cedula && !inc.cedula.includes(criterios.cedula)) {
      return false;
    }
    
    if (criterios.departamento && inc.departamento !== criterios.departamento) {
      return false;
    }
    
    if (criterios.tipo && inc.tipo !== criterios.tipo) {
      return false;
    }
    
    if (criterios.estado && inc.estado !== criterios.estado) {
      return false;
    }
    
    if (criterios.rango_dias) {
      const { min, max } = criterios.rango_dias;
      if (inc.diasIncapacidad < min || inc.diasIncapacidad > max) {
        return false;
      }
    }
    
    if (criterios.fecha_inicio && criterios.fecha_fin) {
      const inicio = new Date(criterios.fecha_inicio);
      const fin = new Date(criterios.fecha_fin);
      const fechaReg = new Date(inc.fechaRegistro);
      
      if (fechaReg < inicio || fechaReg > fin) {
        return false;
      }
    }
    
    return true;
  });
}

/**
 * Agrupa incapacidades por un campo específico
 */
function agruparIncapacidades(incapacidades, campo) {
  const grupos = {};
  
  incapacidades.forEach(inc => {
    const clave = inc[campo];
    if (!grupos[clave]) {
      grupos[clave] = [];
    }
    grupos[clave].push(inc);
  });
  
  return grupos;
}

/**
 * Calcula el rango de fechas entre incapacidades
 */
function calcularRangoFechas(incapacidades) {
  if (incapacidades.length === 0) {
    return { minima: null, maxima: null };
  }
  
  const fechas = incapacidades.map(inc => new Date(inc.fechaInicio));
  
  return {
    minima: new Date(Math.min(...fechas.map(f => f.getTime()))),
    maxima: new Date(Math.max(...fechas.map(f => f.getTime())))
  };
}

/**
 * Valida si un email es válido
 */
function validarEmail(email) {
  const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return patron.test(email);
}

/**
 * Valida si un teléfono es válido
 */
function validarTelefono(telefono) {
  const patron = /^[0-9]{8}$/;
  return patron.test(telefono.replace(/[\s\-()]/g, ''));
}

/**
 * Convierte un string a formato de moneda
 */
function formatearMoneda(valor, moneda = 'CRC') {
  return new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: moneda
  }).format(valor);
}

/**
 * Calcula la edad a partir de la fecha de nacimiento
 */
function calcularEdad(fechaNacimiento) {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  
  return edad;
}

/**
 * Obtiene el día de la semana
 */
function obtenerDiaSemana(fecha) {
  const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  return dias[new Date(fecha).getDay()];
}

/**
 * Copia texto al portapapeles
 */
function copiarAlPortapapeles(texto) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(texto).then(() => {
      mostrarNotificacion('✅ Copiado al portapapeles', 'success');
    }).catch(err => {
      console.error('Error al copiar:', err);
    });
  } else {
    // Fallback para navegadores antiguos
    const textarea = document.createElement('textarea');
    textarea.value = texto;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    mostrarNotificacion('✅ Copiado al portapapeles', 'success');
  }
}

/**
 * Espera un tiempo determinado
 */
function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Recarga la página
 */
function recargarPagina() {
  location.reload();
}

/**
 * Redirige a una URL
 */
function redirigir(url) {
  window.location.href = url;
}

/**
 * Obtiene un parámetro de la URL
 */
function obtenerParametroURL(nombre) {
  const params = new URLSearchParams(window.location.search);
  return params.get(nombre);
}

/**
 * Abre un link en una nueva pestaña
 */
function abrirEnPestana(url) {
  window.open(url, '_blank');
}

/**
 * Verifica si el navegador es móvil
 */
function esMovil() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Obtiene la resolución de pantalla
 */
function obtenerResolucion() {
  return {
    ancho: window.innerWidth,
    alto: window.innerHeight,
    dispositivo: esMovil() ? 'móvil' : 'escritorio'
  };
}

/**
 * Localiza el navegador
 */
function obtenerIdioma() {
  return navigator.language || navigator.userLanguage;
}

/**
 * Genera un color aleatorio
 */
function generarColorAleatorio() {
  const colores = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe', '#43e97b', '#fa709a'];
  return colores[Math.floor(Math.random() * colores.length)];
}

/**
 * Anima un elemento (scrollIntoView)
 */
function animarElemento(elemento) {
  if (typeof elemento === 'string') {
    elemento = document.getElementById(elemento);
  }
  
  if (elemento) {
    elemento.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

/**
 * Valida si una contraseña es segura
 */
function validarContraseniaSegura(contrasenia) {
  const requisitos = {
    minimo8: contrasenia.length >= 8,
    mayuscula: /[A-Z]/.test(contrasenia),
    minuscula: /[a-z]/.test(contrasenia),
    numero: /[0-9]/.test(contrasenia),
    especial: /[!@#$%^&*]/.test(contrasenia)
  };
  
  const cumple = Object.values(requisitos).filter(v => v).length;
  
  return {
    segura: cumple >= 4,
    cumple: requisitos,
    fortaleza: cumple <= 1 ? 'débil' : cumple <= 3 ? 'media' : 'fuerte'
  };
}

/**
 * Genera un hash simple de un string
 */
function generarHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(16);
}

/**
 * Cachea datos en sessionStorage
 */
function cachearDatos(clave, datos, minutos = 60) {
  const ahora = new Date().getTime();
  const expiracion = ahora + (minutos * 60 * 1000);
  
  sessionStorage.setItem(clave, JSON.stringify({
    datos: datos,
    expiracion: expiracion
  }));
}

/**
 * Obtiene datos del cache
 */
function obtenerDelCache(clave) {
  const item = sessionStorage.getItem(clave);
  
  if (!item) return null;
  
  const { datos, expiracion } = JSON.parse(item);
  const ahora = new Date().getTime();
  
  if (ahora > expiracion) {
    sessionStorage.removeItem(clave);
    return null;
  }
  
  return datos;
}

/**
 * Limpia el cache
 */
function limpiarCache() {
  sessionStorage.clear();
}

/**
 * Clona un objeto profundamente
 */
function clonarObjeto(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Obtiene las propiedades únicas de un array de objetos
 */
function obtenerUnicos(array, propiedad) {
  return [...new Set(array.map(item => item[propiedad]))];
}

/**
 * Cuenta ocurrencias de un elemento
 */
function contarOcurrencias(array, elemento) {
  return array.filter(item => item === elemento).length;
}

/**
 * Exportar utilidades
 */
window.utilidades = {
  Paginador,
  ordenarIncapacidades,
  buscarAvanzado,
  agruparIncapacidades,
  calcularRangoFechas,
  validarEmail,
  validarTelefono,
  formatearMoneda,
  calcularEdad,
  obtenerDiaSemana,
  copiarAlPortapapeles,
  esperar,
  recargarPagina,
  redirigir,
  obtenerParametroURL,
  abrirEnPestana,
  esMovil,
  obtenerResolucion,
  obtenerIdioma,
  generarColorAleatorio,
  animarElemento,
  validarContraseniaSegura,
  generarHash,
  cachearDatos,
  obtenerDelCache,
  limpiarCache,
  clonarObjeto,
  obtenerUnicos,
  contarOcurrencias
};
/**
 * MÓDULO DE AUTENTICACIÓN
 * Manejo de sesión + control de permisos (preparado para backend)
 */

const autenticacion = (function () {
  const CLAVE_USUARIO = 'usuario_actual';
  const CLAVE_SESION = 'sesion_activa';

  // Usuarios de prueba (después se reemplazan por base de datos)
  const USUARIOS = [
    {
      id: 1,
      nombre: 'Administrador',
      email: 'admin@empresa.com',
      password: 'admin123',
      rol: 'admin'
    },
    {
      id: 2,
      nombre: 'Usuario Demo',
      email: 'usuario@empresa.com',
      password: 'user123',
      rol: 'usuario'
    }
  ];

  // Permisos por rol
  const PERMISOS = {
    admin: ['crear', 'leer', 'actualizar', 'eliminar', 'exportar', 'prorroga', 'configurar'],
    usuario: ['leer', 'crear', 'actualizar'] // el usuario normal no puede eliminar ni exportar
  };

  /**
   * Inicia sesión
   */
  function iniciarSesion(email, password) {
    const usuario = USUARIOS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!usuario) {
      return {
        exito: false,
        mensaje: 'Correo o contraseña incorrectos'
      };
    }

    const sesion = {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      fechaLogin: new Date().toISOString()
    };

    localStorage.setItem(CLAVE_USUARIO, JSON.stringify(sesion));
    localStorage.setItem(CLAVE_SESION, 'true');

    return {
      exito: true,
      usuario: sesion
    };
  }

  /**
   * Cierra la sesión
   */
  function cerrarSesion() {
    localStorage.removeItem(CLAVE_USUARIO);
    localStorage.removeItem(CLAVE_SESION);
  }

  /**
   * Verifica si hay sesión activa
   */
  function tieneSesionActiva() {
    return localStorage.getItem(CLAVE_SESION) === 'true' &&
           localStorage.getItem(CLAVE_USUARIO) !== null;
  }

  /**
   * Obtiene el usuario actual
   */
  function obtenerUsuarioActual() {
    const data = localStorage.getItem(CLAVE_USUARIO);
    return data ? JSON.parse(data) : null;
  }

  /**
   * Verifica si el usuario tiene un permiso específico
   */
  function tienePermiso(permiso) {
    const usuario = obtenerUsuarioActual();
    if (!usuario) return false;

    const permisosRol = PERMISOS[usuario.rol] || [];
    return permisosRol.includes(permiso);
  }

  /**
   * Verifica si es administrador
   */
  function esAdministrador() {
    const usuario = obtenerUsuarioActual();
    return usuario && usuario.rol === 'admin';
  }

  /**
   * Verifica si es usuario normal
   */
  function esUsuario() {
    const usuario = obtenerUsuarioActual();
    return usuario && usuario.rol === 'usuario';
  }

  // API pública
  return {
    iniciarSesion,
    cerrarSesion,
    tieneSesionActiva,
    obtenerUsuarioActual,
    tienePermiso,
    esAdministrador,
    esUsuario
  };
})();

window.autenticacion = autenticacion;/**
 * MÓDULO DE REPORTES Y EXPORTACIÓN
 * Genera reportes en PDF, Excel y otros formatos
 */

/**
 * Exporta los datos a formato JSON y descarga
 */
function exportarJSON() {
  try {
    const incapacidades = obtenerIncapacidades();
    const datos = {
      fecha_exportacion: new Date().toISOString(),
      total_registros: incapacidades.length,
      registros: incapacidades
    };
    
    const contenido = JSON.stringify(datos, null, 2);
    descargarArchivo(contenido, 'incapacidades-' + generarTimestamp() + '.json', 'application/json');
    
    mostrarNotificacion('✅ Archivo JSON exportado correctamente', 'success');
  } catch (error) {
    console.error('Error al exportar JSON:', error);
    mostrarNotificacion('❌ Error al exportar JSON', 'error');
  }
}

/**
 * Exporta los datos a formato CSV (Excel compatible)
 */
function exportarCSV() {
  try {
    const incapacidades = obtenerIncapacidades();
    
    // Encabezados
    const encabezados = [
      'ID',
      'Nombre',
      'Cédula',
      'Departamento',
      'Tipo',
      'Boleta',
      'Fecha Inicio',
      'Fecha Fin',
      'Días',
      'Estado',
      'Observaciones',
      'Fecha Registro'
    ];
    
    // Convertir a CSV
    let csv = encabezados.join(',') + '\n';
    
    incapacidades.forEach(inc => {
      const fila = [
        inc.id,
        `"${inc.nombre}"`,
        inc.cedula,
        `"${inc.departamento}"`,
        `"${inc.tipo}"`,
        inc.numBoleta,
        inc.fechaInicio,
        inc.fechaFin,
        inc.diasIncapacidad,
        inc.estado,
        `"${(inc.observaciones || '').replace(/"/g, '""')}"`,
        formatearFechaCompleta(inc.fechaRegistro)
      ];
      csv += fila.join(',') + '\n';
    });
    
    descargarArchivo(csv, 'incapacidades-' + generarTimestamp() + '.csv', 'text/csv;charset=utf-8;');
    
    mostrarNotificacion('✅ Archivo CSV exportado correctamente', 'success');
  } catch (error) {
    console.error('Error al exportar CSV:', error);
    mostrarNotificacion('❌ Error al exportar CSV', 'error');
  }
}

/**
 * Genera un reporte en formato HTML (imprimible)
 */
function generarReportHTML() {
  try {
    const incapacidades = obtenerIncapacidades();
    const stats = obtenerEstadisticas();
    const ahora = new Date().toLocaleDateString('es-CR');
    
    let html = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reporte de Incapacidades</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 1000px; margin: 0 auto; padding: 40px 20px; }
          .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #667eea; padding-bottom: 20px; }
          .header h1 { color: #667eea; font-size: 28px; margin-bottom: 10px; }
          .header p { color: #666; }
          .stats { display: grid; grid-template-columns: repeat(5, 1fr); gap: 15px; margin-bottom: 40px; }
          .stat-box { background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; border-left: 4px solid #667eea; }
          .stat-box .number { font-size: 24px; font-weight: bold; color: #667eea; }
          .stat-box .label { font-size: 12px; color: #666; margin-top: 5px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          table thead { background: #f8f9fa; }
          table th { padding: 12px; text-align: left; font-weight: bold; border-bottom: 2px solid #667eea; }
          table td { padding: 10px 12px; border-bottom: 1px solid #ddd; }
          table tbody tr:nth-child(even) { background: #f9f9f9; }
          .badge { display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; }
          .badge-activa { background: #e8f5e9; color: #2e7d32; }
          .badge-finalizada { background: #f5f5f5; color: #616161; }
          .badge-prorroga { background: #fff3e0; color: #e65100; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 12px; }
          .no-print { display: none; }
          @media print {
            body { margin: 0; padding: 0; }
            .container { max-width: 100%; }
            .btn { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏥 Reporte de Incapacidades</h1>
            <p>Generado el ${ahora}</p>
          </div>
          
          <div class="stats">
            <div class="stat-box">
              <div class="number">${stats.total}</div>
              <div class="label">Total</div>
            </div>
            <div class="stat-box">
              <div class="number">${stats.activas}</div>
              <div class="label">Activas</div>
            </div>
            <div class="stat-box">
              <div class="number">${stats.finalizadas}</div>
              <div class="label">Finalizadas</div>
            </div>
            <div class="stat-box">
              <div class="number">${stats.prorroga}</div>
              <div class="label">Prórrogas</div>
            </div>
            <div class="stat-box">
              <div class="number">${stats.diasTotales}</div>
              <div class="label">Días</div>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cédula</th>
                <th>Departamento</th>
                <th>Tipo</th>
                <th>Inicio</th>
                <th>Fin</th>
                <th>Días</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              ${incapacidades.map(inc => `
                <tr>
                  <td>${inc.nombre}</td>
                  <td>${inc.cedula}</td>
                  <td>${inc.departamento}</td>
                  <td>${inc.tipo}</td>
                  <td>${formatearFecha(inc.fechaInicio)}</td>
                  <td>${formatearFecha(inc.fechaFin)}</td>
                  <td>${inc.diasIncapacidad}</td>
                  <td><span class="badge badge-${inc.estado.toLowerCase().replace(' ', '-')}">${inc.estado}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="footer">
            <p>© 2026 Sistema de Gestión de Incapacidades | Reporte confidencial</p>
          </div>
        </div>
        
        <script>
          window.addEventListener('load', () => {
            setTimeout(() => window.print(), 500);
          });
        </script>
      </body>
      </html>
    `;
    
    // Abrir en nueva pestaña
    const ventana = window.open('', '_blank');
    ventana.document.write(html);
    ventana.document.close();
    
  } catch (error) {
    console.error('Error al generar reporte:', error);
    mostrarNotificacion('❌ Error al generar reporte', 'error');
  }
}

/**
 * Genera reporte detallado de un trabajador
 */
function generarReporteDetalleTrabajador(cedula) {
  try {
    const incapacidades = obtenerIncapacidades();
    const registros = incapacidades.filter(inc => inc.cedula === cedula);
    
    if (registros.length === 0) {
      mostrarNotificacion('⚠️ No se encontraron registros para esta cédula', 'warning');
      return;
    }
    
    const trabajador = registros[0];
    const diasTotales = registros.reduce((sum, inc) => sum + inc.diasIncapacidad, 0);
    
    let html = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Reporte Individual - ${trabajador.nombre}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
          .container { max-width: 900px; margin: 40px auto; padding: 40px; background: white; border-radius: 8px; }
          .header { margin-bottom: 30px; }
          .header h1 { color: #667eea; margin-bottom: 10px; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 30px; background: #f8f9fa; padding: 20px; border-radius: 8px; }
          .info-item { }
          .info-label { font-weight: bold; color: #667eea; font-size: 12px; }
          .info-value { font-size: 16px; margin-top: 5px; }
          table { width: 100%; border-collapse: collapse; margin-top: 30px; }
          table th { background: #667eea; color: white; padding: 12px; text-align: left; }
          table td { padding: 10px 12px; border-bottom: 1px solid #ddd; }
          table tbody tr:nth-child(even) { background: #f9f9f9; }
          .resumen { background: #e8f5e9; padding: 20px; border-radius: 8px; margin-top: 30px; }
          .resumen-item { display: flex; justify-content: space-between; margin: 10px 0; }
          @media print { body { margin: 0; } }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📋 Reporte Individual de Incapacidades</h1>
            <p>Generado: ${new Date().toLocaleDateString('es-CR')}</p>
          </div>
          
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Nombre Completo</div>
              <div class="info-value">${trabajador.nombre}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Cédula</div>
              <div class="info-value">${trabajador.cedula}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Departamento</div>
              <div class="info-value">${trabajador.departamento}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Total de Incapacidades</div>
              <div class="info-value">${registros.length}</div>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Boleta</th>
                <th>Inicio</th>
                <th>Fin</th>
                <th>Días</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              ${registros.map(inc => `
                <tr>
                  <td>${inc.tipo}</td>
                  <td>${inc.numBoleta}</td>
                  <td>${formatearFecha(inc.fechaInicio)}</td>
                  <td>${formatearFecha(inc.fechaFin)}</td>
                  <td><strong>${inc.diasIncapacidad}</strong></td>
                  <td>${inc.estado}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="resumen">
            <h3 style="color: #2e7d32; margin-bottom: 15px;">📊 Resumen</h3>
            <div class="resumen-item">
              <span>Total de Incapacidades:</span>
              <strong>${registros.length}</strong>
            </div>
            <div class="resumen-item">
              <span>Días Totales Acumulados:</span>
              <strong>${diasTotales}</strong>
            </div>
            <div class="resumen-item">
              <span>Promedio de Días por Incapacidad:</span>
              <strong>${(diasTotales / registros.length).toFixed(1)}</strong>
            </div>
          </div>
        </div>
        
        <script>
          window.addEventListener('load', () => {
            setTimeout(() => window.print(), 500);
          });
        </script>
      </body>
      </html>
    `;
    
    const ventana = window.open('', '_blank');
    ventana.document.write(html);
    ventana.document.close();
    
  } catch (error) {
    console.error('Error al generar reporte detallado:', error);
    mostrarNotificacion('❌ Error al generar reporte', 'error');
  }
}

/**
 * Exporta datos filtrados por período
 */
function exportarPorPeriodo(fechaInicio, fechaFin) {
  try {
    const incapacidades = obtenerIncapacidades();
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    
    const filtrados = incapacidades.filter(inc => {
      const fechaReg = new Date(inc.fechaRegistro);
      return fechaReg >= inicio && fechaReg <= fin;
    });
    
    if (filtrados.length === 0) {
      mostrarNotificacion('⚠️ No hay registros en el período seleccionado', 'warning');
      return;
    }
    
    const datos = {
      periodo: `${formatearFecha(fechaInicio)} - ${formatearFecha(fechaFin)}`,
      total_registros: filtrados.length,
      fecha_exportacion: new Date().toISOString(),
      registros: filtrados
    };
    
    const csv = convertirACSV(filtrados);
    descargarArchivo(csv, `incapacidades-${generarTimestamp()}.csv`, 'text/csv');
    
    mostrarNotificacion(`✅ ${filtrados.length} registros exportados`, 'success');
  } catch (error) {
    console.error('Error:', error);
    mostrarNotificacion('❌ Error al exportar', 'error');
  }
}

/**
 * Convierte datos a formato CSV
 */
function convertirACSV(incapacidades) {
  const encabezados = ['ID', 'Nombre', 'Cédula', 'Departamento', 'Tipo', 'Boleta', 'Inicio', 'Fin', 'Días', 'Estado'];
  let csv = encabezados.join(',') + '\n';
  
  incapacidades.forEach(inc => {
    const fila = [
      inc.id,
      `"${inc.nombre}"`,
      inc.cedula,
      `"${inc.departamento}"`,
      `"${inc.tipo}"`,
      inc.numBoleta,
      inc.fechaInicio,
      inc.fechaFin,
      inc.diasIncapacidad,
      inc.estado
    ];
    csv += fila.join(',') + '\n';
  });
  
  return csv;
}

/**
 * Descarga un archivo
 */
function descargarArchivo(contenido, nombre, tipo) {
  const elemento = document.createElement('a');
  const blob = new Blob([contenido], { type: tipo });
  elemento.href = URL.createObjectURL(blob);
  elemento.download = nombre;
  document.body.appendChild(elemento);
  elemento.click();
  document.body.removeChild(elemento);
  URL.revokeObjectURL(elemento.href);
}

/**
 * Genera un timestamp para nombres de archivo
 */
function generarTimestamp() {
  const ahora = new Date();
  const anio = ahora.getFullYear();
  const mes = String(ahora.getMonth() + 1).padStart(2, '0');
  const dia = String(ahora.getDate()).padStart(2, '0');
  const hora = String(ahora.getHours()).padStart(2, '0');
  const minuto = String(ahora.getMinutes()).padStart(2, '0');
  
  return `${anio}${mes}${dia}-${hora}${minuto}`;
}

/**
 * Genera estadísticas por departamento
 */
function obtenerEstadisticasPorDepartamento() {
  const incapacidades = obtenerIncapacidades();
  const estadisticas = {};
  
  incapacidades.forEach(inc => {
    if (!estadisticas[inc.departamento]) {
      estadisticas[inc.departamento] = {
        total: 0,
        dias: 0,
        activas: 0,
        finalizadas: 0
      };
    }
    
    estadisticas[inc.departamento].total++;
    estadisticas[inc.departamento].dias += inc.diasIncapacidad;
    
    if (inc.estado === 'Activa') {
      estadisticas[inc.departamento].activas++;
    } else if (inc.estado === 'Finalizada') {
      estadisticas[inc.departamento].finalizadas++;
    }
  });
  
  return estadisticas;
}

/**
 * Genera estadísticas por tipo de incapacidad
 */
function obtenerEstadisticasPorTipo() {
  const incapacidades = obtenerIncapacidades();
  const estadisticas = {};
  
  incapacidades.forEach(inc => {
    if (!estadisticas[inc.tipo]) {
      estadisticas[inc.tipo] = {
        total: 0,
        dias: 0,
        casos: []
      };
    }
    
    estadisticas[inc.tipo].total++;
    estadisticas[inc.tipo].dias += inc.diasIncapacidad;
    estadisticas[inc.tipo].casos.push({
      nombre: inc.nombre,
      dias: inc.diasIncapacidad
    });
  });
  
  return estadisticas;
}

/**
 * Imprime un registro específico
 */
function imprimirDetalle(id) {
  const incapacidad = obtenerIncapacidadPorId(id);
  if (!incapacidad) return;
  
  let html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>${incapacidad.nombre}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .header { border-bottom: 2px solid #667eea; padding-bottom: 20px; margin-bottom: 30px; }
        .section { margin-bottom: 30px; }
        .section-title { color: #667eea; font-weight: bold; margin-bottom: 10px; border-left: 4px solid #667eea; padding-left: 10px; }
        .item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
        .label { font-weight: bold; color: #333; }
        .value { color: #666; }
        @media print { body { margin: 0; } }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${incapacidad.nombre}</h1>
        <p>Reporte de Incapacidad - Generado: ${new Date().toLocaleDateString('es-CR')}</p>
      </div>
      
      <div class="section">
        <div class="section-title">👤 Datos Personales</div>
        <div class="item">
          <span class="label">Cédula:</span>
          <span class="value">${incapacidad.cedula}</span>
        </div>
        <div class="item">
          <span class="label">Departamento:</span>
          <span class="value">${incapacidad.departamento}</span>
        </div>
      </div>
      
      <div class="section">
        <div class="section-title">🏥 Información de Incapacidad</div>
        <div class="item">
          <span class="label">Tipo:</span>
          <span class="value">${incapacidad.tipo}</span>
        </div>
        <div class="item">
          <span class="label">Número de Boleta:</span>
          <span class="value">${incapacidad.numBoleta}</span>
        </div>
        <div class="item">
          <span class="label">Estado:</span>
          <span class="value">${incapacidad.estado}</span>
        </div>
      </div>
      
      <div class="section">
        <div class="section-title">📅 Fechas</div>
        <div class="item">
          <span class="label">Inicio:</span>
          <span class="value">${formatearFecha(incapacidad.fechaInicio)}</span>
        </div>
        <div class="item">
          <span class="label">Fin:</span>
          <span class="value">${formatearFecha(incapacidad.fechaFin)}</span>
        </div>
        <div class="item">
          <span class="label">Días Totales:</span>
          <span class="value"><strong>${incapacidad.diasIncapacidad}</strong></span>
        </div>
      </div>
      
      ${incapacidad.observaciones ? `
        <div class="section">
          <div class="section-title">📝 Observaciones</div>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
            ${incapacidad.observaciones}
          </div>
        </div>
      ` : ''}
    </body>
    </html>
  `;
  
  const ventana = window.open('', '_blank');
  ventana.document.write(html);
  ventana.document.close();
}

/**
 * Exportar para uso externo
 */
window.reportes = {
  exportarJSON,
  exportarCSV,
  generarReportHTML,
  generarReporteDetalleTrabajador,
  exportarPorPeriodo,
  obtenerEstadisticasPorDepartamento,
  obtenerEstadisticasPorTipo,
  imprimirDetalle
};
/**
 * MÓDULO DE INTERFAZ DE USUARIO
 * Gestiona la interacción con el DOM, eventos y actualizaciones en tiempo real
 */

// Estado global de la aplicación
const appState = {
  currentView: 'lista', // 'lista', 'registro', 'detalle', 'prorroga'
  currentId: null,
  filtro: {
    busqueda: '',
    estado: 'Todas',
    departamento: 'Todos'
  },
  modo: 'crear' // 'crear' o 'editar'
};

// ==========================================
// INICIALIZACIÓN DE LA APLICACIÓN
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Iniciando aplicación...');
  
  actualizarInfoUsuario();
  setupEventListeners();
  cargarListaIncapacidades();
  actualizarEstadisticas();
  aplicarPermisos();
  
  console.log('✅ Aplicación lista');
});

/**
 * Aplica los permisos según el rol del usuario
 */
function aplicarPermisos() {
  const puedeEliminar = autenticacion.tienePermiso('eliminar');
  const puedeExportar = autenticacion.tienePermiso('exportar');
  const puedeCrear = autenticacion.tienePermiso('crear');
  const puedeActualizar = autenticacion.tienePermiso('actualizar');

  // Botón Nueva Incapacidad
  const btnNuevo = document.getElementById('btnNuevo');
  if (btnNuevo) {
    btnNuevo.style.display = puedeCrear ? 'inline-flex' : 'none';
  }

  // Botones de eliminar
  document.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.style.display = puedeEliminar ? 'inline-flex' : 'none';
  });

  // Botones de editar
  document.querySelectorAll('.btn-editar').forEach(btn => {
    btn.style.display = puedeActualizar ? 'inline-flex' : 'none';
  });

  // Opción de exportar en el menú
  const linkExportar = document.querySelector('a[onclick*="mostrarExportarDatos"]');
  if (linkExportar) {
    linkExportar.style.display = puedeExportar ? 'flex' : 'none';
  }
}

/**
 * Actualiza la información del usuario en la navbar
 */
function actualizarInfoUsuario() {
  const usuario = autenticacion.obtenerUsuarioActual();
  if (usuario) {
    const nombreEl = document.getElementById('usuarioNombre');
    if (nombreEl) {
      nombreEl.textContent = usuario.nombre;
    }
  }
}

/**
 * Cierra la sesión del usuario
 */
function cerrarSesionUsuario() {
  if (confirm('¿Deseas cerrar sesión?')) {
    autenticacion.cerrarSesion();
    mostrarNotificacion('✅ Sesión cerrada correctamente', 'success');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 800);
  }
}

/**
 * Muestra el perfil del usuario
 */
function mostrarPerfil() {
  const usuario = autenticacion.obtenerUsuarioActual();
  if (!usuario) return;

  const modal = document.getElementById('modalConfirmacion');
  const contenido = `
    <div class="modal-header">
      <h3>👤 Mi Perfil</h3>
    </div>
    <div class="modal-body">
      <p><strong>Nombre:</strong> ${usuario.nombre}</p>
      <p><strong>Email:</strong> ${usuario.email}</p>
      <p><strong>Rol:</strong> 
        <span style="background: #667eea; color: white; padding: 3px 10px; border-radius: 12px; font-size: 0.85rem;">
          ${usuario.rol === 'admin' ? 'Administrador' : 'Usuario'}
        </span>
      </p>
      <p style="margin-top: 12px; color: #666; font-size: 0.9rem;">
        <strong>Último acceso:</strong> ${new Date(usuario.fechaLogin).toLocaleString('es-CR')}
      </p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="cerrarModal()">Cerrar</button>
    </div>
  `;

  document.querySelector('.modal-content').innerHTML = contenido;
  modal.style.display = 'block';
}

/**
 * Muestra opción de exportar datos
 */
function mostrarExportarDatos() {
  if (!autenticacion.tienePermiso('exportar')) {
    mostrarNotificacion('⛔ No tienes permiso para exportar datos', 'error');
    return;
  }

  const opciones = `
    <div style="background: white; padding: 30px; border-radius: 12px; max-width: 400px; margin: 50px auto;">
      <h2>📤 Exportar Datos</h2>
      <p style="color: #666; margin-bottom: 20px;">Selecciona el formato de descarga:</p>
      <div style="display: grid; gap: 10px;">
        <button class="btn btn-primary" onclick="reportes.exportarJSON(); cerrarModal();">
          <i class="ti ti-json"></i> Descargar JSON
        </button>
        <button class="btn btn-primary" onclick="reportes.exportarCSV(); cerrarModal();">
          <i class="ti ti-file-spreadsheet"></i> Descargar CSV (Excel)
        </button>
        <button class="btn btn-primary" onclick="reportes.generarReportHTML(); cerrarModal();">
          <i class="ti ti-printer"></i> Imprimir Reporte
        </button>
        <button class="btn btn-secondary" onclick="cerrarModal();">
          <i class="ti ti-x"></i> Cancelar
        </button>
      </div>
    </div>
  `;
  
  const modalDiv = document.getElementById('modalConfirmacion');
  modalDiv.style.display = 'block';
  document.querySelector('.modal-content').innerHTML = opciones;
}

/**
 * Configura todos los event listeners de la aplicación
 */
function setupEventListeners() {
  // Botones principales
  document.getElementById('btnNuevo')?.addEventListener('click', mostrarFormulario);
  document.getElementById('btnGuardar')?.addEventListener('click', guardarRegistro);
  document.getElementById('btnCancelar')?.addEventListener('click', cancelarFormulario);
  document.getElementById('btnLimpiarFiltros')?.addEventListener('click', limpiarFiltros);
  
  // Filtros
  document.getElementById('inputBusqueda')?.addEventListener('input', aplicarFiltros);
  document.getElementById('selectEstado')?.addEventListener('change', aplicarFiltros);
  document.getElementById('selectDepartamento')?.addEventListener('change', aplicarFiltros);
  
  // Validación en tiempo real del formulario
  document.getElementById('inputNombre')?.addEventListener('blur', validarCampo);
  document.getElementById('inputCedula')?.addEventListener('blur', validarCampo);
  document.getElementById('inputBoleta')?.addEventListener('blur', validarCampo);
  document.getElementById('inputFechaInicio')?.addEventListener('change', validarCampo);
  document.getElementById('inputFechaFin')?.addEventListener('change', validarCampo);
  document.getElementById('inputArchivo')?.addEventListener('change', validarCampo);
  
  // Actualizar días cuando cambian fechas
  document.getElementById('inputFechaInicio')?.addEventListener('change', calcularDiasFormulario);
  document.getElementById('inputFechaFin')?.addEventListener('change', calcularDiasFormulario);
  
  // Soporte para navegación (evitar recarga de página)
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-ver-detalle')) {
      e.preventDefault();
      mostrarDetalle(e.target.dataset.id);
    }
    if (e.target.classList.contains('btn-editar')) {
      e.preventDefault();
      editarIncapacidad(e.target.dataset.id);
    }
    if (e.target.classList.contains('btn-eliminar')) {
      e.preventDefault();
      confirmarEliminar(e.target.dataset.id);
    }
    if (e.target.classList.contains('btn-prorroga')) {
      e.preventDefault();
      mostrarFormularioProrroga(e.target.dataset.id);
    }
  });
}

// ==========================================
// VISTA DE LISTA DE INCAPACIDADES
// ==========================================

/**
 * Carga y muestra la lista de incapacidades
 */
function cargarListaIncapacidades() {
  appState.currentView = 'lista';
  mostrarVista('vistaLista');

  const incapacidades = obtenerIncapacidades();
  const container = document.getElementById('tablaIncapacidades');

  if (!container) return;

  if (incapacidades.length === 0) {
    container.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; padding: 40px;">
          <p style="color: var(--text-secondary); font-size: 1.1em;">
            📋 No hay incapacidades registradas
          </p>
          <button class="btn btn-primary" onclick="mostrarFormulario()">
            + Nueva Incapacidad
          </button>
        </td>
      </tr>
    `;
  } else {
    // Aquí va el código que renderiza la tabla con los registros
    container.innerHTML = incapacidades.map(incapacidad => `
      <tr class="fila-tabla estado-${incapacidad.estado.toLowerCase().replace(' ', '-')}">
        <td><strong>${incapacidad.nombre}</strong></td>
        <td>${incapacidad.cedula}</td>
        <td>${incapacidad.departamento}</td>
        <td><span class="badge badge-${incapacidad.tipo.toLowerCase().replace(' ', '-')}">${incapacidad.tipo}</span></td>
        <td>${formatearFecha(incapacidad.fechaInicio)}</td>
        <td><strong>${incapacidad.diasIncapacidad}</strong></td>
        <td><span class="badge badge-estado-${incapacidad.estado.toLowerCase()}">${incapacidad.estado}</span></td>
        <td class="columna-acciones">
          <div class="botones-grupo">
            <button class="btn btn-sm btn-info btn-ver-detalle" data-id="${incapacidad.id}" title="Ver detalles">
              👁️
            </button>
            <button class="btn btn-sm btn-warning btn-editar" data-id="${incapacidad.id}" title="Editar">
              ✏️
            </button>
            ${incapacidad.estado === 'Activa' ? `
              <button class="btn btn-sm btn-secondary btn-prorroga" data-id="${incapacidad.id}" title="Solicitar prórroga">
                ⏱️
              </button>
            ` : ''}
            <button class="btn btn-sm btn-danger btn-eliminar" data-id="${incapacidad.id}" title="Eliminar">
              🗑️
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  // Esta línea debe ir al final, fuera del if/else
  aplicarPermisos();
}
/**
 * Aplica filtros a la tabla
 */
function aplicarFiltros() {
  const busqueda = (document.getElementById('inputBusqueda')?.value || '').toLowerCase();
  const estado = document.getElementById('selectEstado')?.value || 'Todas';
  const departamento = document.getElementById('selectDepartamento')?.value || 'Todos';
  
  // Guardar estado del filtro
  appState.filtro = { busqueda, estado, departamento };
  
  const incapacidades = obtenerIncapacidades();
  const filas = document.querySelectorAll('#tablaIncapacidades tr');
  
  let visibles = 0;
  filas.forEach(fila => {
    const nombre = fila.querySelector('td:nth-child(1)')?.textContent.toLowerCase() || '';
    const cedula = fila.querySelector('td:nth-child(2)')?.textContent.toLowerCase() || '';
    const dept = fila.querySelector('td:nth-child(3)')?.textContent.toLowerCase() || '';
    const estadoFila = fila.querySelector('.badge-estado-activa, .badge-estado-finalizada, .badge-estado-prorroga')?.textContent.trim();
    
    const coincideBusqueda = nombre.includes(busqueda) || cedula.includes(busqueda);
    const coincideEstado = estado === 'Todas' || estadoFila === estado;
    const coincideDepartamento = departamento === 'Todos' || dept === departamento.toLowerCase();
    
    const visible = coincideBusqueda && coincideEstado && coincideDepartamento;
    fila.style.display = visible ? '' : 'none';
    if (visible) visibles++;
  });
  
  // Mostrar mensaje si no hay resultados
  if (visibles === 0) {
    const tbody = document.getElementById('tablaIncapacidades');
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; padding: 30px; color: var(--text-secondary);">
          No se encontraron registros que coincidan con los filtros
        </td>
      </tr>
    `;
  }
}

/**
 * Limpia los filtros aplicados
 */
function limpiarFiltros() {
  document.getElementById('inputBusqueda').value = '';
  document.getElementById('selectEstado').value = 'Todas';
  document.getElementById('selectDepartamento').value = 'Todos';
  
  appState.filtro = { busqueda: '', estado: 'Todas', departamento: 'Todos' };
  cargarListaIncapacidades();
}

// ==========================================
// VISTA DE FORMULARIO
// ==========================================

/**
 * Muestra el formulario para crear una nueva incapacidad
 */
function mostrarFormulario() {
  appState.currentView = 'registro';
  appState.modo = 'crear';
  appState.currentId = null;
  
  mostrarVista('vistaFormulario');
  
  // Limpiar formulario
  limpiarFormulario();
  document.getElementById('formTitle').textContent = 'Nueva Incapacidad';
  document.getElementById('btnGuardar').textContent = '💾 Guardar Incapacidad';
}

/**
 * Muestra el formulario en modo edición
 */
function editarIncapacidad(id) {
  appState.currentView = 'registro';
  appState.modo = 'editar';
  appState.currentId = id;
  
  mostrarVista('vistaFormulario');
  
  const incapacidad = obtenerIncapacidadPorId(id);
  if (!incapacidad) return;
  
  document.getElementById('formTitle').textContent = `Editar: ${incapacidad.nombre}`;
  document.getElementById('btnGuardar').textContent = '✏️ Actualizar Incapacidad';
  
  // Llenar formulario con datos
  document.getElementById('inputNombre').value = incapacidad.nombre;
  document.getElementById('inputCedula').value = incapacidad.cedula;
  document.getElementById('selectDepartamentoForm').value = incapacidad.departamento;
  document.getElementById('selectTipo').value = incapacidad.tipo;
  document.getElementById('inputBoleta').value = incapacidad.numBoleta;
  document.getElementById('inputFechaInicio').value = incapacidad.fechaInicio;
  document.getElementById('inputFechaFin').value = incapacidad.fechaFin;
  document.getElementById('selectEstado').value = incapacidad.estado;
  document.getElementById('textObservaciones').value = incapacidad.observaciones || '';
  
  // Mostrar archivo actual si existe
  if (incapacidad.urlAdjunto) {
    const archivoInfo = document.getElementById('archivoActual');
    archivoInfo.innerHTML = `
      <small style="color: var(--text-success);">
        ✓ Archivo actual: ${incapacidad.urlAdjunto.split('/').pop()}
      </small>
    `;
  }
  
  // Calcular días
  calcularDiasFormulario();
}

/**
 * Cancela la edición y vuelve a la lista
 */
function cancelarFormulario() {
  limpiarFormulario();
  cargarListaIncapacidades();
}

/**
 * Limpia todos los campos del formulario
 */
function limpiarFormulario() {
  document.getElementById('formRegistro').reset();
  document.getElementById('archivoActual').innerHTML = '';
  
  // Limpiar mensajes de error
  document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
  document.querySelectorAll('.form-group').forEach(el => el.classList.remove('has-error'));
  
  // Reset de campos
  document.getElementById('inputDias').value = '0';
}

/**
 * Guarda un nuevo registro o actualiza uno existente
 */
function guardarRegistro() {
  const datos = {
    nombre: document.getElementById('inputNombre').value,
    cedula: document.getElementById('inputCedula').value,
    departamento: document.getElementById('selectDepartamentoForm').value,
    tipo: document.getElementById('selectTipo').value,
    numBoleta: document.getElementById('inputBoleta').value,
    fechaInicio: document.getElementById('inputFechaInicio').value,
    fechaFin: document.getElementById('inputFechaFin').value,
    archivo: document.getElementById('inputArchivo').files[0] || null,
    estado: appState.modo === 'editar' ? document.getElementById('selectEstado').value : 'Activa',
    observaciones: document.getElementById('textObservaciones').value
  };
  
  // Validar formulario
  const validacion = validarFormularioRegistro(datos);
  if (!validacion.valido) {
    mostrarErroresFormulario(validacion.errores);
    return;
  }
  
  // Normalizar datos
  const datosLimpios = normalizarDatos(datos);
  
  // Calcular días
  const diasValidacion = calcularDiasIncapacidad(datosLimpios.fechaInicio, datosLimpios.fechaFin);
  
  try {
    if (appState.modo === 'crear') {
      // Crear nuevo registro
      const nuevoRegistro = {
        ...datosLimpios,
        diasIncapacidad: diasValidacion.diasCalculados,
        estado: 'Activa',
        urlAdjunto: '/documentos/incapacidad-' + generarIdUnico() + '.pdf'
      };
      
      if (guardarIncapacidad(nuevoRegistro)) {
        mostrarNotificacion('✅ Incapacidad registrada correctamente', 'success');
        cargarListaIncapacidades();
        actualizarEstadisticas();
      } else {
        mostrarNotificacion('❌ Error al guardar la incapacidad', 'error');
      }
    } else {
      // Actualizar registro existente
      const datosActualizados = {
        ...datosLimpios,
        diasIncapacidad: diasValidacion.diasCalculados,
        estado: document.getElementById('selectEstado').value
      };
      
      if (actualizarIncapacidad(appState.currentId, datosActualizados)) {
        mostrarNotificacion('✏️ Incapacidad actualizada correctamente', 'success');
        cargarListaIncapacidades();
        actualizarEstadisticas();
      } else {
        mostrarNotificacion('❌ Error al actualizar la incapacidad', 'error');
      }
    }
  } catch (error) {
    console.error('Error:', error);
    mostrarNotificacion('❌ Error inesperado', 'error');
  }
}

/**
 * Valida un campo individual en tiempo real
 */
function validarCampo(e) {
  const campo = e.target;
  const id = campo.id;
  const valor = campo.value;
  const errorEl = document.getElementById(`error-${id}`);
  const formGroup = campo.closest('.form-group');
  
  if (!errorEl || !formGroup) return;
  
  let mensaje = '';
  
  switch (id) {
    case 'inputNombre':
      if (!valor || valor.length < 3) {
        mensaje = 'El nombre debe tener al menos 3 caracteres';
      }
      break;
    
    case 'inputCedula':
      if (!validarFormatoCedula(valor)) {
        mensaje = 'Formato inválido. Use: XXX-XXXXXX-X';
      }
      break;
    
    case 'inputBoleta':
      const validBoleta = validarBoletaUnica(valor, appState.currentId);
      if (!validBoleta.valido) {
        mensaje = validBoleta.mensaje;
      }
      break;
    
    case 'inputFechaInicio':
    case 'inputFechaFin':
      const fechaInicio = document.getElementById('inputFechaInicio').value;
      const fechaFin = document.getElementById('inputFechaFin').value;
      if (fechaInicio && fechaFin) {
        const diasVal = calcularDiasIncapacidad(fechaInicio, fechaFin);
        if (!diasVal.valido) {
          mensaje = diasVal.mensaje;
        }
      }
      break;
    
    case 'inputArchivo':
      if (campo.files.length > 0) {
        const validArchivo = validarFormatoArchivo(campo.files[0]);
        if (!validArchivo.valido) {
          mensaje = validArchivo.mensaje;
        }
      }
      break;
  }
  
  if (mensaje) {
    errorEl.textContent = mensaje;
    formGroup.classList.add('has-error');
  } else {
    errorEl.textContent = '';
    formGroup.classList.remove('has-error');
  }
}

/**
 * Calcula automáticamente los días en el formulario
 */
function calcularDiasFormulario() {
  const fechaInicio = document.getElementById('inputFechaInicio').value;
  const fechaFin = document.getElementById('inputFechaFin').value;
  
  if (!fechaInicio || !fechaFin) return;
  
  const resultado = calcularDiasIncapacidad(fechaInicio, fechaFin);
  const inputDias = document.getElementById('inputDias');
  
  if (resultado.valido) {
    inputDias.value = resultado.diasCalculados;
    inputDias.style.color = 'var(--text-success)';
  } else {
    inputDias.value = '0';
    inputDias.style.color = 'var(--text-danger)';
  }
}

/**
 * Muestra errores en el formulario
 */
function mostrarErroresFormulario(errores) {
  // Limpiar errores previos
  document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
  document.querySelectorAll('.form-group').forEach(el => el.classList.remove('has-error'));
  
  // Mostrar nuevos errores
  errores.forEach(error => {
    mostrarNotificacion(`⚠️ ${error}`, 'warning');
  });
}

// ==========================================
// VISTA DE DETALLE
// ==========================================

/**
 * Muestra el detalle de una incapacidad
 */
function mostrarDetalle(id) {
  appState.currentView = 'detalle';
  appState.currentId = id;
  
  mostrarVista('vistaDetalle');
  
  const incapacidad = obtenerIncapacidadPorId(id);
  if (!incapacidad) return;
  
  const container = document.getElementById('detalleContainer');
  
  container.innerHTML = `
    <div class="detalle-header">
      <h2>${incapacidad.nombre}</h2>
      <button class="btn btn-secondary" onclick="cargarListaIncapacidades()">← Volver</button>
    </div>
    
    <div class="detalle-grid">
      <section class="detalle-section">
        <h3>📋 Información Personal</h3>
        <div class="detalle-item">
          <span class="label">Cédula:</span>
          <span class="value">${incapacidad.cedula}</span>
        </div>
        <div class="detalle-item">
          <span class="label">Departamento:</span>
          <span class="value">${incapacidad.departamento}</span>
        </div>
      </section>
      
      <section class="detalle-section">
        <h3>🏥 Información de la Incapacidad</h3>
        <div class="detalle-item">
          <span class="label">Tipo:</span>
          <span class="badge badge-${incapacidad.tipo.toLowerCase().replace(' ', '-')}">${incapacidad.tipo}</span>
        </div>
        <div class="detalle-item">
          <span class="label">Número de Boleta:</span>
          <span class="value">${incapacidad.numBoleta}</span>
        </div>
        <div class="detalle-item">
          <span class="label">Estado:</span>
          <span class="badge badge-estado-${incapacidad.estado.toLowerCase()}">${incapacidad.estado}</span>
        </div>
      </section>
      
      <section class="detalle-section">
        <h3>📅 Fechas</h3>
        <div class="detalle-item">
          <span class="label">Inicio:</span>
          <span class="value">${formatearFecha(incapacidad.fechaInicio)}</span>
        </div>
        <div class="detalle-item">
          <span class="label">Fin:</span>
          <span class="value">${formatearFecha(incapacidad.fechaFin)}</span>
        </div>
        <div class="detalle-item">
          <span class="label">Días totales:</span>
          <span class="value" style="font-weight: bold; color: var(--text-accent);">${incapacidad.diasIncapacidad} días</span>
        </div>
      </section>
      
      ${incapacidad.observaciones ? `
        <section class="detalle-section full-width">
          <h3>📝 Observaciones</h3>
          <div class="observaciones-box">${incapacidad.observaciones}</div>
        </section>
      ` : ''}
      
      <section class="detalle-section full-width">
        <h3>📌 Historial</h3>
        <div class="detalle-item">
          <span class="label">Registrado:</span>
          <span class="value">${formatearFechaCompleta(incapacidad.fechaRegistro)}</span>
        </div>
        ${incapacidad.fechaActualizacion ? `
          <div class="detalle-item">
            <span class="label">Última actualización:</span>
            <span class="value">${formatearFechaCompleta(incapacidad.fechaActualizacion)}</span>
          </div>
        ` : ''}
      </section>
    </div>
    
    <div class="detalle-acciones">
      <button class="btn btn-warning" onclick="editarIncapacidad('${id}')">✏️ Editar</button>
      ${incapacidad.estado === 'Activa' ? `
        <button class="btn btn-secondary" onclick="mostrarFormularioProrroga('${id}')">⏱️ Solicitar Prórroga</button>
      ` : ''}
      <button class="btn btn-danger" onclick="confirmarEliminar('${id}')">🗑️ Eliminar</button>
    </div>
  `;
}

// ==========================================
// VISTA DE PRÓRROGA
// ==========================================

/**
 * Muestra el formulario para solicitar prórroga
 */
function mostrarFormularioProrroga(id) {
  appState.currentView = 'prorroga';
  appState.currentId = id;
  
  mostrarVista('vistaProrroag');
  
  const incapacidad = obtenerIncapacidadPorId(id);
  if (!incapacidad) return;
  
  document.getElementById('prorrogaTitle').textContent = `Prórroga: ${incapacidad.nombre}`;
  document.getElementById('prorrogaNombreActual').textContent = incapacidad.nombre;
  document.getElementById('prorrogaFechaFinActual').value = incapacidad.fechaFin;
  document.getElementById('prorrogaFechaFinNueva').value = incapacidad.fechaFin;
  
  document.getElementById('btnGuardarProrroga').onclick = () => guardarProrroga(id);
}

/**
 * Guarda la prórroga de una incapacidad
 */
function guardarProrroga(id) {
  const fechaFinNueva = document.getElementById('prorrogaFechaFinNueva').value;
  const motivo = document.getElementById('prorrogaMotivo').value;
  
  if (!fechaFinNueva) {
    mostrarNotificacion('⚠️ Ingresa la nueva fecha de fin', 'warning');
    return;
  }
  
  if (!motivo) {
    mostrarNotificacion('⚠️ Ingresa el motivo de la prórroga', 'warning');
    return;
  }
  
  const incapacidad = obtenerIncapacidadPorId(id);
  if (!incapacidad) return;
  
  // Calcular nuevos días
  const diasVal = calcularDiasIncapacidad(incapacidad.fechaInicio, fechaFinNueva);
  
  if (!diasVal.valido) {
    mostrarNotificacion(`❌ ${diasVal.mensaje}`, 'error');
    return;
  }
  
  const datosActualizados = {
    fechaFin: fechaFinNueva,
    diasIncapacidad: diasVal.diasCalculados,
    estado: 'Prorroga',
    observaciones: `${incapacidad.observaciones || ''}\n[Prórroga]: ${motivo}`
  };
  
  if (actualizarIncapacidad(id, datosActualizados)) {
    mostrarNotificacion('✅ Prórroga solicitada correctamente', 'success');
    cargarListaIncapacidades();
    actualizarEstadisticas();
  } else {
    mostrarNotificacion('❌ Error al registrar prórroga', 'error');
  }
}

// ==========================================
// ACCIONES Y CONFIRMACIONES
// ==========================================

/**
 * Solicita confirmación y elimina un registro
 */
function confirmarEliminar(id) {
  // Verificar permiso
  if (!autenticacion.tienePermiso('eliminar')) {
    mostrarNotificacion('⛔ No tienes permiso para eliminar registros', 'error');
    return;
  }

  const incapacidad = obtenerIncapacidadPorId(id);
  if (!incapacidad) return;
  
  const modal = document.getElementById('modalConfirmacion');
  document.getElementById('confirmMensaje').textContent = 
    `¿Estás seguro que deseas eliminar la incapacidad de ${incapacidad.nombre}? Esta acción no se puede deshacer.`;
  
  document.getElementById('btnConfirmarEliminar').onclick = () => {
    if (eliminarIncapacidad(id)) {
      mostrarNotificacion('✅ Incapacidad eliminada correctamente', 'success');
      cerrarModal();
      cargarListaIncapacidades();
      actualizarEstadisticas();
      aplicarPermisos();
    } else {
      mostrarNotificacion('❌ Error al eliminar', 'error');
    }
  };
  
  document.getElementById('btnCancelarEliminar').onclick = cerrarModal;
  modal.style.display = 'block';
}

// ==========================================
// ESTADÍSTICAS
// ==========================================

/**
 * Actualiza las estadísticas mostradas en el dashboard
 */
function actualizarEstadisticas() {
  const stats = obtenerEstadisticas();
  
  document.getElementById('statTotal').textContent = stats.total;
  document.getElementById('statActivas').textContent = stats.activas;
  document.getElementById('statFinalizadas').textContent = stats.finalizadas;
  document.getElementById('statProrroga').textContent = stats.prorroga;
  document.getElementById('statDias').textContent = stats.diasTotales;
}

// ==========================================
// UTILIDADES DE UI
// ==========================================

/**
 * Muestra una vista y oculta las demás
 */
function mostrarVista(vistaId) {
  document.querySelectorAll('[id^="vista"]').forEach(vista => {
    vista.style.display = 'none';
  });
  const vista = document.getElementById(vistaId);
  if (vista) vista.style.display = 'block';
}

/**
 * Muestra una notificación temporal
 */
function mostrarNotificacion(mensaje, tipo = 'info') {
  const container = document.getElementById('notificaciones') || crearContenedorNotificaciones();
  
  const notif = document.createElement('div');
  notif.className = `notificacion notificacion-${tipo}`;
  notif.textContent = mensaje;
  
  container.appendChild(notif);
  
  setTimeout(() => {
    notif.classList.add('saliendo');
    setTimeout(() => notif.remove(), 300);
  }, 4000);
}

/**
 * Crea el contenedor de notificaciones si no existe
 */
function crearContenedorNotificaciones() {
  const container = document.createElement('div');
  container.id = 'notificaciones';
  container.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    max-width: 400px;
  `;
  document.body.appendChild(container);
  return container;
}

/**
 * Cierra el modal de confirmación
 */
function cerrarModal() {
  document.getElementById('modalConfirmacion').style.display = 'none';
}

// ==========================================
// FUNCIONES DE FORMATO
// ==========================================

/**
 * Formatea una fecha en formato DD/MM/YYYY
 */
function formatearFecha(fecha) {
  if (!fecha) return 'Sin fecha';
  const d = new Date(fecha);
  const dia = String(d.getDate()).padStart(2, '0');
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const anio = d.getFullYear();
  return `${dia}/${mes}/${anio}`;
}

/**
 * Formatea una fecha ISO en formato completo
 */
function formatearFechaCompleta(fecha) {
  if (!fecha) return 'Sin fecha';
  const d = new Date(fecha);
  const opciones = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return d.toLocaleDateString('es-CR', opciones);
}

/**
 * Exportar para uso externo
 */
window.app = {
  mostrarFormulario,
  editarIncapacidad,
  cancelarFormulario,
  guardarRegistro,
  cargarListaIncapacidades,
  mostrarDetalle,
  confirmarEliminar,
  mostrarFormularioProrroga,
  guardarProrroga,
  aplicarFiltros,
  limpiarFiltros
};
