import { ErrorItem, Achievement } from '../types';

export const ERRORS_DB: ErrorItem[] = [
  {
    id: 1, name: "TypeError", lang: "JavaScript",
    desc: "Ocurre cuando un valor no es del tipo esperado, como llamar una función en algo que no es función.",
    causes: ["Intentar llamar un método en undefined o null", "Variable no inicializada antes de usarla", "Confundir un objeto con un arreglo"],
    solution: "Verifica que la variable tenga el valor correcto antes de usarla. Usa console.log() o typeof para inspeccionarla.",
    bad: `const user = null;\nconsole.log(user.name); // TypeError!`,
    good: `const user = { name: "Ana" };\nconsole.log(user.name); // "Ana"`
  },
  {
    id: 2, name: "ReferenceError", lang: "JavaScript",
    desc: "Intentas usar una variable que no existe o no ha sido declarada en el scope actual.",
    causes: ["Variable escrita con nombre incorrecto", "Variable usada antes de ser declarada con let/const", "Error de scope: variable local usada fuera de su función"],
    solution: "Asegúrate de declarar la variable antes de usarla y que esté en el scope correcto.",
    bad: `console.log(mensaje); // ReferenceError!\nconst mensaje = "Hola";`,
    good: `const mensaje = "Hola";\nconsole.log(mensaje); // "Hola"`
  },
  {
    id: 3, name: "SyntaxError", lang: "JavaScript",
    desc: "El código tiene un error de escritura que impide que el intérprete lo entienda.",
    causes: ["Falta de paréntesis, llaves o comillas de cierre", "Uso incorrecto de palabras reservadas", "Coma extra o faltante en un objeto o arreglo"],
    solution: "Lee el mensaje de error, indica la línea exacta. Revisa el código en esa línea y las anteriores.",
    bad: `function saludar( {\n  return "Hola"; // SyntaxError!\n}`,
    good: `function saludar() {\n  return "Hola"; // Correcto\n}`
  },
  {
    id: 4, name: "NameError", lang: "Python",
    desc: "La variable o función que intentas usar no ha sido definida todavía.",
    causes: ["Variable usada antes de asignarle un valor", "Error tipográfico en el nombre", "Variable definida dentro de un bloque y usada fuera"],
    solution: "Define la variable antes de usarla. Verifica que el nombre esté escrito exactamente igual.",
    bad: `print(nombre)  # NameError!\nnombre = "Ana"`,
    good: `nombre = "Ana"\nprint(nombre)  # "Ana"`
  },
  {
    id: 5, name: "IndentationError", lang: "Python",
    desc: "Python requiere que el código esté correctamente indentado. Un error de espaciado rompe el programa.",
    causes: ["Mezclar tabs y espacios", "Indentación incorrecta en bloques if, for, def", "Código fuera del bloque correcto"],
    solution: "Usa siempre 4 espacios (o tabs consistentes). Configura tu editor para que muestre espacios.",
    bad: `def saludar():\nprint("Hola")  # IndentationError!`,
    good: `def saludar():\n    print("Hola")  # Correcto`
  },
  {
    id: 6, name: "IndexError", lang: "Python",
    desc: "Intentas acceder a una posición de una lista que no existe.",
    causes: ["Índice mayor al tamaño de la lista", "Lista vacía y se intenta acceder al primer elemento", "Error de lógica en un bucle"],
    solution: "Verifica el tamaño de la lista con len() antes de acceder a un índice.",
    bad: `lista = [1, 2, 3]\nprint(lista[5])  # IndexError!`,
    good: `lista = [1, 2, 3]\nif len(lista) > 5:\n    print(lista[5])`
  },
  {
    id: 7, name: "NullPointerException", lang: "Java",
    desc: "Intentas acceder a un método o propiedad de un objeto que tiene valor null.",
    causes: ["Objeto no inicializado", "Método que retorna null usado sin verificación", "Error en la lógica de inicialización"],
    solution: "Verifica que el objeto no sea null antes de usarlo. Usa if (objeto != null) o Optional en Java moderno.",
    bad: `String nombre = null;\nSystem.out.println(nombre.length()); // NPE!`,
    good: `String nombre = "Ana";\nif (nombre != null) {\n    System.out.println(nombre.length());\n}`
  },
  {
    id: 8, name: "ArrayIndexOutOfBoundsException", lang: "Java",
    desc: "Intentas acceder a una posición del arreglo que no existe.",
    causes: ["Índice negativo o mayor al tamaño del arreglo", "Error off-by-one (usar length en vez de length-1)", "Arreglo vacío"],
    solution: "Usa index < array.length como condición en tus bucles. Nunca uses index <= array.length.",
    bad: `int[] nums = {1, 2, 3};\nSystem.out.println(nums[3]); // Error!`,
    good: `int[] nums = {1, 2, 3};\nfor (int i = 0; i < nums.length; i++) {\n    System.out.println(nums[i]);\n}`
  },
  {
    id: 9, name: "CORS Error", lang: "JavaScript",
    desc: "El navegador bloquea una petición HTTP a un dominio diferente al de tu aplicación por razones de seguridad.",
    causes: ["API sin cabeceras CORS configuradas", "Petición desde localhost a un servidor externo", "Método HTTP no permitido por el servidor"],
    solution: "El servidor debe enviar la cabecera Access-Control-Allow-Origin. Si usas Node/Express, instala el paquete cors.",
    bad: `// Servidor sin CORS\nfetch("https://api.otro-dominio.com/data")\n// Bloqueado por el navegador`,
    good: `// En Express (Node.js)\nconst cors = require('cors');\napp.use(cors());\n// Ahora las peticiones funcionan`
  },
  {
    id: 10, name: "Promise Rejection", lang: "JavaScript",
    desc: "Una promesa fue rechazada y el error no fue capturado con .catch() o try/catch.",
    causes: ["Falta de manejo de errores en async/await", "API que falla sin control de error", "Red sin conexión no manejada"],
    solution: "Siempre agrega .catch() a tus promesas o envuelve tu código async en try/catch.",
    bad: `async function getData() {\n  const res = await fetch(url);\n  // Sin manejo de errores!\n}`,
    good: `async function getData() {\n  try {\n    const res = await fetch(url);\n    return await res.json();\n  } catch (err) {\n    console.error("Error:", err);\n  }\n}`
  },
  {
    id: 11, name: "KeyError", lang: "Python",
    desc: "Intentas acceder a una clave de un diccionario que no existe.",
    causes: ["Clave escrita con mayúsculas/minúsculas incorrectas", "Clave eliminada antes de acceder", "Datos externos con estructura diferente a la esperada"],
    solution: "Usa el método .get() para acceder con un valor por defecto, o verifica con 'key in dict'.",
    bad: `usuario = {"nombre": "Ana"}\nprint(usuario["edad"])  # KeyError!`,
    good: `usuario = {"nombre": "Ana"}\nprint(usuario.get("edad", "No definida"))  # "No definida"`
  },
  {
    id: 12, name: "404 Not Found", lang: "HTTP",
    desc: "El servidor no encontró el recurso solicitado en la URL indicada.",
    causes: ["URL mal escrita", "Recurso eliminado o movido", "Ruta del servidor no configurada correctamente"],
    solution: "Verifica la URL exacta. Revisa que las rutas de tu servidor estén bien definidas y que el recurso exista.",
    bad: `// GET /api/usres  ← typo\n// Servidor responde 404`,
    good: `// GET /api/users  ← correcto\n// Servidor responde 200 con los datos`
  },
  {
    id: 13, name: "500 Internal Server Error", lang: "HTTP",
    desc: "El servidor encontró un error inesperado que le impidió procesar la solicitud.",
    causes: ["Error no capturado en el código del servidor", "Base de datos caída o sin conexión", "Variables de entorno faltantes"],
    solution: "Revisa los logs del servidor. El error está en el backend. Agrega try/catch en tu servidor.",
    bad: `app.get('/data', (req, res) => {\n  const result = db.query(); // Si falla → 500\n});`,
    good: `app.get('/data', async (req, res) => {\n  try {\n    const result = await db.query();\n    res.json(result);\n  } catch(e) {\n    res.status(500).json({error: e.message});\n  }\n});`
  },
  {
    id: 14, name: "Uncaught RangeError", lang: "JavaScript",
    desc: "Un valor está fuera del rango permitido, como una recursión infinita o un número inválido.",
    causes: ["Recursión sin caso base (stack overflow)", "Usar new Array(-1)", "toFixed() con número fuera de rango"],
    solution: "Si es recursión, asegúrate de tener un caso base que detenga las llamadas.",
    bad: `function contar(n) {\n  return contar(n + 1); // Sin caso base → RangeError!\n}`,
    good: `function contar(n) {\n  if (n >= 10) return n; // Caso base\n  return contar(n + 1);\n}`
  },
  {
    id: 15, name: "ZeroDivisionError", lang: "Python",
    desc: "Intentas dividir un número entre cero, lo cual es matemáticamente indefinido.",
    causes: ["Divisor que puede ser cero en ciertos casos", "Error de lógica en cálculos", "Entrada del usuario no validada"],
    solution: "Verifica que el divisor no sea cero antes de dividir.",
    bad: `a = 10\nb = 0\nresult = a / b  # ZeroDivisionError!`,
    good: `a = 10\nb = 0\nif b != 0:\n    result = a / b\nelse:\n    print("No se puede dividir entre cero")`
  },
  {
    id: 16, name: "StackOverflowError", lang: "Java",
    desc: "El stack de llamadas se agota, usualmente por una recursión infinita.",
    causes: ["Función recursiva sin caso base", "Llamadas mutuas infinitas entre métodos"],
    solution: "Revisa la lógica de recursión y asegúrate de que siempre exista una condición de salida.",
    bad: `public void loop() { loop(); } // StackOverflow`,
    good: `public void loop(int i) { if (i > 0) loop(i - 1); }`
  },
  {
    id: 17, name: "IllegalStateException", lang: "Java",
    desc: "El objeto está en un estado inadecuado para la operación solicitada.",
    causes: ["Usar un Scanner cerrado", "Llamar a métodos de configuración tras iniciar el objeto"],
    solution: "Asegúrate de que el objeto esté en el ciclo de vida correcto antes de llamar al método.",
    bad: `Iterator it = list.iterator(); list.add(x); it.next(); // Error`,
    good: `Iterator it = list.iterator(); it.next(); list.add(x); // Correcto`
  },
  {
    id: 18, name: "ModuleNotFoundError", lang: "Python",
    desc: "Intentas importar una librería que no está instalada en el entorno.",
    causes: ["Falta ejecutar pip install", "Nombre del paquete mal escrito", "Versión de Python incorrecta"],
    solution: "Verifica el nombre y ejecuta: pip install <nombre-paquete>.",
    bad: `import numpyy # Error`,
    good: `import numpy # Correcto`
  },
  {
    id: 19, name: "Database Connection Timeout", lang: "SQL/Backend",
    desc: "El servidor no puede conectar con la BD en el tiempo límite.",
    causes: ["BD sobrecargada", "Credenciales incorrectas", "Firewall bloqueando el puerto"],
    solution: "Verifica los logs de la BD, el estado del servicio y las reglas de red.",
    bad: `Conexión sin manejo de tiempo de espera.`,
    good: `Implementar pool de conexiones con timeout definido.`
  },
  {
    id: 20, name: "Infinite Loop", lang: "C++/C#",
    desc: "Un bucle que nunca termina, bloqueando el hilo de ejecución.",
    causes: ["Condición siempre verdadera", "Variable de control no se actualiza"],
    solution: "Verifica la condición de salida y el incremento de la variable de control.",
    bad: `while(true) { /* sin break */ }`,
    good: `for(int i = 0; i < 10; i++) { /* correcto */ }`
  },
  {
    id: 21, name: "ConcurrentModificationException", lang: "Java",
    desc: "Modificar una colección mientras se itera sobre ella.",
    causes: ["Añadir/eliminar elementos de una lista durante un bucle for-each"],
    solution: "Usa un iterador explícito o una copia de la lista para modificar.",
    bad: `for(String s : list) { list.remove(s); }`,
    good: `list.removeIf(s -> s.equals(target));`
  },
  {
    id: 22, name: "AttributeError", lang: "Python",
    desc: "Intentas acceder a un atributo o método que no existe en el objeto.",
    causes: ["Typo en nombre de atributo", "Uso de un objeto de una clase diferente a la esperada"],
    solution: "Inspecciona el objeto con dir() o verifica la documentación.",
    bad: `obj.nmae # Error`,
    good: `obj.name # Correcto`
  },
  {
    id: 23, name: "Access Violation / Segfault", lang: "C/C++",
    desc: "Intentar acceder a memoria no asignada o protegida.",
    causes: ["Puntero nulo", "Acceso fuera de límites de un array", "Memoria liberada (dangling pointer)"],
    solution: "Gestiona bien los punteros y comprueba los límites de memoria.",
    bad: `int *p = NULL; *p = 10; // Crash`,
    good: `int *p = malloc(sizeof(int)); if(p) *p = 10;`
  },
  {
    id: 24, name: "JSON Parse Error", lang: "JavaScript",
    desc: "Falla al convertir un string a objeto JSON.",
    causes: ["JSON mal formado (comas extra, quotes simples)", "String vacío"],
    solution: "Usa try/catch en el JSON.parse y valida el string.",
    bad: `JSON.parse('{ "a": 1, }'); // Error por coma final`,
    good: `JSON.parse('{ "a": 1 }');`
  },
  {
    id: 25, name: "UnboundLocalError", lang: "Python",
    desc: "Referenciar una variable local antes de asignarla dentro de una función.",
    causes: ["Intentar modificar una variable global sin 'global'"],
    solution: "Usa la palabra 'global' si necesitas modificar una variable externa.",
    bad: `x = 10; def f(): print(x); x += 1; f()`,
    good: `x = 10; def f(): global x; x += 1; f()`
  },
  {
    id: 26, name: "NumberFormatException", lang: "Java",
    desc: "Intentar convertir un String a número cuando no tiene formato numérico.",
    causes: ["Parsing de input de usuario vacío o con letras"],
    solution: "Usa try/catch al convertir o valida el string con regex.",
    bad: `Integer.parseInt('abc');`,
    good: `try { Integer.parseInt(str); } catch(Exception e) { /* handle */ }`
  },
  {
    id: 27, name: "401 Unauthorized", lang: "HTTP",
    desc: "El usuario no está autenticado.",
    causes: ["Token de sesión expirado", "Falta enviar cabecera Authorization"],
    solution: "Redirige al login o refresca el token de acceso.",
    bad: `Petición sin header Authorization.`,
    good: `Incluir Bearer token en cabecera.`
  },
  {
    id: 28, name: "403 Forbidden", lang: "HTTP",
    desc: "El usuario está autenticado pero no tiene permisos suficientes.",
    causes: ["Acceso a recursos de administrador siendo usuario normal"],
    solution: "Verifica los roles del usuario en el backend.",
    bad: `Servidor no valida permisos de rol.`,
    good: `if (user.role === 'admin') { /* proceso */ }`
  },
  {
    id: 29, name: "Read-only property error", lang: "JavaScript",
    desc: "Intentar modificar una propiedad que no es writable.",
    causes: ["Asignación a variable 'const' o propiedad definida con Object.defineProperty"],
    solution: "Cambia la variable a 'let' o revisa la definición del objeto.",
    bad: `const x = 1; x = 2; // Error`,
    good: `let x = 1; x = 2;`
  },
  {
    id: 30, name: "Memory Leak", lang: "C++/Java",
    desc: "Memoria asignada que nunca se libera.",
    causes: ["Objetos creados en bucles sin destruir", "Listeners no eliminados"],
    solution: "Usa smart pointers o asegúrate de cerrar recursos.",
    bad: `while(true) { new Object(); }`,
    good: `while(true) { Object o = new Object(); /* usar y dejar morir */ }`
  },
  {
    id: 31, name: "Deadlock", lang: "Multi-threading",
    desc: "Dos hilos se esperan mutuamente indefinidamente.",
    causes: ["Recursos bloqueados en orden circular"],
    solution: "Adquiere los bloqueos siempre en el mismo orden.",
    bad: `Hilo 1: bloquea A, espera B. Hilo 2: bloquea B, espera A.`,
    good: `Adquirir siempre locks en un orden jerárquico.`
  },
  {
    id: 32, name: "Float Precision Error", lang: "General",
    desc: "Errores de redondeo al operar con decimales.",
    causes: ["Representación binaria de números de punto flotante"],
    solution: "Usa tipos Decimal/BigDecimal para finanzas o redondeo al comparar.",
    bad: `if (0.1 + 0.2 === 0.3) // False`,
    good: `if (Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON)`
  },
  {
    id: 33, name: "Overlapping Event Listeners", lang: "JavaScript",
    desc: "Un evento se ejecuta múltiples veces por registrarlo repetidamente.",
    causes: ["Añadir event listener dentro de un bucle o render sin remover el anterior"],
    solution: "Remueve el listener anterior antes de añadir uno nuevo o usa 'once: true'.",
    bad: `btn.addEventListener('click', fn); // Añadido cada render`,
    good: `btn.addEventListener('click', fn, { once: true });`
  },
  {
    id: 34, name: "File Not Found", lang: "IO",
    desc: "La aplicación intenta leer un archivo que no existe en el path.",
    causes: ["Path relativo incorrecto", "Archivo borrado"],
    solution: "Usa rutas absolutas o verifica la existencia del archivo antes de abrir.",
    bad: `File f = new File('data.txt'); // Path incorrecto`,
    good: `if (f.exists()) { /* procesar */ }`
  },
  {
    id: 35, name: "Incorrect Date Format", lang: "JavaScript",
    desc: "Fecha parseada incorrectamente debido al formato regional.",
    causes: ["Diferencia entre MM/DD y DD/MM"],
    solution: "Usa bibliotecas como date-fns o dayjs y define el formato.",
    bad: `new Date('10/12/2025') // Depende del navegador`,
    good: `dayjs('2025-12-10').format()`
  },
  {
    id: 36, name: "Missing dependency", lang: "Package Manager",
    desc: "Un componente necesario no se ha descargado o instalado.",
    causes: ["Olvidar ejecutar npm install o composer install"],
    solution: "Correr el comando de instalación del gestor de paquetes.",
    bad: `Error al ejecutar app sin node_modules`,
    good: `npm install && npm start`
  },
  {
    id: 37, name: "Infinite Digest", lang: "AngularJS/Frameworks",
    desc: "El ciclo de detección de cambios no termina.",
    causes: ["Modificar el modelo dentro del ciclo de renderizado"],
    solution: "Evita cambios de estado en funciones que se llaman en cada ciclo de render.",
    bad: `$scope.val = $scope.val + 1; // en el template`,
    good: `Actualizar valores solo en eventos.`
  },
  {
    id: 38, name: "SQL Injection", lang: "SQL",
    desc: "Vulnerabilidad al incluir datos sin sanitizar en queries.",
    causes: ["Concatenar strings directamente en la query"],
    solution: "Usa siempre Prepared Statements o consultas parametrizadas.",
    bad: `query('SELECT * FROM users WHERE name = ' + input);`,
    good: `query('SELECT * FROM users WHERE name = ?', [input]);`
  },
  {
    id: 39, name: "XSS (Cross-Site Scripting)", lang: "Web",
    desc: "Ejecución de scripts maliciosos inyectados por usuarios.",
    causes: ["Renderizar HTML sin sanitizar el contenido"],
    solution: "Escapa siempre la salida de datos del usuario.",
    bad: `element.innerHTML = userInput;`,
    good: `element.textContent = userInput;`
  },
  {
    id: 40, name: "Buffer Overflow", lang: "C/C++",
    desc: "Escribir datos más allá del límite de un buffer.",
    causes: ["Usar funciones inseguras como gets o strcpy"],
    solution: "Usa versiones seguras como strncpy y verifica tamaños.",
    bad: `strcpy(buf, input); // Si input es muy largo, overflow`,
    good: `strncpy(buf, input, sizeof(buf) - 1);`
  },
  {
    id: 41, name: "Illegal Argument Exception", lang: "Java",
    desc: "Se pasa un argumento ilegal o inapropiado a un método.",
    causes: ["Valor negativo donde se espera positivo"],
    solution: "Valida los parámetros de entrada al inicio del método.",
    bad: `public void setAge(int age) { this.age = age; } // permite -5`,
    good: `if(age < 0) throw new IllegalArgumentException();`
  },
  {
    id: 42, name: "Callback Hell", lang: "JavaScript",
    desc: "Anidamiento excesivo de funciones callback que hace el código inmanejable.",
    causes: ["Operaciones asíncronas secuenciales con callbacks"],
    solution: "Usa Promesas o async/await.",
    bad: `getData(a, () => { getData(b, () => { ... }) });`,
    good: `await getData(a); await getData(b);`
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  { 
    id: "primera",  
    icon: "Sprout",       
    name: "Primera semana",   
    desc: "Registraste tu primera semana",       
    check: (weeks) => weeks.length >= 1 
  },
  { 
    id: "cinco",    
    icon: "Star",            
    name: "5 semanas",        
    desc: "Llevas 5 semanas registradas",         
    check: (weeks) => weeks.length >= 5 
  },
  { 
    id: "diez",     
    icon: "Flame",            
    name: "10 semanas",       
    desc: "10 semanas de constancia",             
    check: (weeks) => weeks.length >= 10 
  },
  { 
    id: "cincoh",   
    icon: "Clock",           
    name: "50 horas",         
    desc: "Acumulaste 50 horas de estudio",       
    check: (weeks) => weeks.reduce((acc, curr) => acc + (Number(curr.horas) || 0), 0) >= 50 
  },
  { 
    id: "cienh",    
    icon: "Zap",            
    name: "100 horas",        
    desc: "¡100 horas de aprendizaje!",           
    check: (weeks) => weeks.reduce((acc, curr) => acc + (Number(curr.horas) || 0), 0) >= 100 
  },
  { 
    id: "perfecto", 
    icon: "SmilePlus", 
    name: "Semana perfecta",  
    desc: "Registraste satisfacción 10/10",       
    check: (weeks) => weeks.some(s => Number(s.satisfaccion) === 10) 
  },
  { 
    id: "variedad", 
    icon: "Layers",     
    name: "Multitécnico",     
    desc: "Estudiaste 3 tecnologías distintas",   
    check: (weeks) => new Set(weeks.map(s => s.tech).filter(Boolean)).size >= 3 
  },
  { 
    id: "bugs3",    
    icon: "Bug",             
    name: "Cazador de bugs",  
    desc: "Guardaste 3 errores en tu biblioteca", 
    check: (_weeks, savedErrors) => savedErrors.length >= 3 
  },
];
