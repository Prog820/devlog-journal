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
