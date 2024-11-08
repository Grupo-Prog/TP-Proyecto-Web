* Aún le faltan pequeños detalles, como por ejemplo el "Acerca de:", donde iré probando otras formas de hacerlo. No tenía sentido retrasarte con Javascript por cosas así.

*Los comportamientos como resultado de acciones dinámicas propias de JavaScript no los pude personalizar por razones obvias, por lo que cuando tengas la conexión hecha entre el front y back y quieras ir probando cosas, seguramente los resultados se van a ver mal y desorganizados. Me ocuparé de eso una vez terminado todo lo otro.

*También faltan otros comportamientos como un mensaje confirmando si querés cerrar una sesión, o si un dato se cargó con éxito, etc. Todos resultado de código en JavaScript. Si lo querés implementar, hacelo y luego yo los igualo a la estética del resto. Pero si no, no hay drama. Esos pequeños detalles en Java los hago yo una vez termines con la parte gruesa de la implementación.

*Si algo no se ve bien, o da conflictos de cualquier forma con el código que estás escribiendo, no te rompas la cabeza viendo cómo podés hacer. Es más fácil y preferible adecuar el HTML y CSS al JavaScript que al revés. Me decías dónde están los problemas y yo adecúo el front después.

*Los campos de las tablas los puse de forma orientativa pero aún no sabemos bien cuáles van a ser. Si en el transcurso que haces lo de JavaScript, confirmamos cuáles serían, vos escribí el código como si estuvieran (o ignorá si alguna está y no se usa) yo después agrego o saco. Es decir, si parte del código en Java está escrito pero no está referenciado a ninguna parte del HTML, no importa. Lo uno yo después.

*Recomiendo abrir la api desde la página "start" porque sería el órden en el que está pensado que se muestre, pasa que como no hay verificaciones de si ingresó un usuario, etc, te va a dejar abrir cualquier página en cualquier punto. Al abrir desde "start" irías en el órden lógico.

*Falta información en el DASHBOARD además de las tarjetas que hay, que la agregaré una vez esté la base de datos conectada; cosas como, había pensado, los mayores compradores, las ventas más grandes, etc.

*En la pantalla de "ventas" y "clientes" notarás que hay un gran espacio vacío antes de acceder al crud, que podría ser utilizado. Planeo que se muestren las últimas ventas y los últimos clientes añadidos, pero, otra vez, será cuando ya esté todo conectado para yo poder ir viendo visualmente cómo va quedando. Sin base de datos, no puedo ver nada.

*Avisame por algún lado de cualquier duda o sugerencia así lo veo, porque la idea no es pasarte un HTML ya terminado, si no la base de uno e ir cambiando lo que sea necesario desde ahí.

*En los inputs referentes a clientes, yo había comentado que estaba bueno que se desplegara una lista con los clientes cargados y elegir así. Queda lindo, sí, pero se me ocurrió que si tuvieses 100 clientes cargados, sería tremenda paja tener que andar buscando visualmente entre todos. Mejor puse otro tipo de input que te deja escribir y te va sugiriendo nombres de la base de datos que coincidan con lo que pones. Y si no está, simplemente te toma lo que escribiste como una una carga. Está muy bueno, pero se hace desde JavaScript. No es algo complicado pero obviamente no lo pude ver bien. Fijate si lo podés implementar y si no, luego lo hago yo. Y si hubiese una complicación muy grande, se cambia por otra cosa y fue.

*Fuera de éso, en los HTML no hay en absoluto nada raro, solo botones e inputs, por lo que no deberías tener ningún conflicto. Todo lo complicado está en CSS puesto que saqué todo de Bootstrap pero creo que no debe haber un solo elemento que no le haya cambiado la clase a "custom" y modificado yo