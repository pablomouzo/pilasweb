var Actor = new Class({
    initialize: function(imagen) {
        this.imagen = new Bitmap(imagen)
        this.x = 10
        this.y = 10

        pilas.agregar_actor(this)
    },

    actualizar: function() {
    },

    dibujar: function(contexto) {
        contexto.translate(this.x, this.y)
        this.imagen.draw(contexto)
    },
});

var Texto = new Class({
    extends: Actor,
    initialize: function(texto) {
        this.texto = texto
        this.object = new Text(this.texto, "22px arial")
        this.object.textBaseline = "top";
        this.x = 0
        this.y = 0
        pilas.agregar_actor(this)
    },
    actualizar: function() {
    },

    dibujar: function(contexto) {
        contexto.translate(this.x, this.y)
        this.object.draw(contexto)
    },
});

var Pilas = new Class({
    initialize: function() {
    },

    iniciar: function(id_canvas) {
        this.canvas = document.id(id_canvas)
        this.stage = new Stage(this.canvas)
        this.contexto = this.canvas.getContext("2d")
        this.lista_actores = []
        Ticker.setFPS(60)
        Ticker.addListener(this)
    },

    /*
     * Agrega un actor a la lista de actores a dibujar y actualizar.
     */
    agregar_actor: function(actor) {
        this.lista_actores.push(actor)
    },

    actualizar_y_dibujar_actores: function(c) {
        this.limpiar(c)

        for (var i=0; i<this.lista_actores.length; i++) {
            var actor = this.lista_actores[i]

            c.save();
            actor.actualizar();
            actor.dibujar(c)
            c.restore();
        }
    },

    /* Borra toda la pantalla */
    limpiar: function(c) {
        c.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },

    /* 
     * Función de respuesta que se llama 60 veces por segundo.
     */
    tick: function() {
        pilas.actualizar_y_dibujar_actores(this.contexto)
    },

    /* Submodulo de actores */
    actores: {
        Actor: Actor,
        Texto: Texto,
        },
});