var express = require('express');
var cors = require('cors');
var router = express.Router();

// Cliente de Mongo
var MongoClient = require('mongodb').MongoClient;
var ruta = 'mongodb+srv://luisolivaabel:LuisOlivaAbel2021@cluster0.jrtwl.mongodb.net/videoclub?retryWrites=true&w=majority';

//Entidad Pelicula
function Pelicula (titulo, descripcion, anio, director) {
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.anio = anio;
    this.director = director;
}

//Entidad Discos
function Disco (titulo, autor, anio) {
    this.titulo = titulo;
    this.autor = autor;
    this.anio = anio;
}

router.use(cors());

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

//Obtener todas las peliculas
router.get('/pelicula', function (req, res) {

    // Abrir el cliente
    MongoClient.connect(ruta,function(err, client) {
            var dbo = client.db("videoclub");
            dbo.collection("pelicula").find({}).toArray(function(err, result) {
                if (err) {
                    res.status(500);
                    res.json({
                        mensaje : "Error al listar las peliculas",
                        listado : false
                    });
                } else {
                    res.status(200);
                    res.send(result);
                }
                client.close();
            });
        }
    );
})

//Insertar pelicula
router.post('/pelicula', function (req, res) {
    MongoClient.connect(ruta,
        function(err, client) {
            var dbo = client.db("videoclub");

            var pelicula1 = new Pelicula(req.body.titulo, req.body.descripcion, req.body.anio,
                req.body.director);

            dbo.collection("pelicula").insert(pelicula1, function (err, result) {
                if (err) {
                    res.status(500);
                    res.json({
                        mensaje : "Error al insertar la pelicula",
                        insertado : false
                    });
                } else {
                    res.status(201);
                    res.json({
                        insertado : true
                    });
                }
                client.close();
            });
        });
})

//Obtener una pelicula
router.get('/pelicula/:id', function (req, res) {
    var IDpelicula = require('mongodb').ObjectID(req.params.id);

    MongoClient.connect(ruta, function(err, client) {
        var dbo = client.db("videoclub");

        dbo.collection("pelicula").find({ _id : IDpelicula }).toArray(function (err, result) {
            if (err) {
                res.status(500);
                res.json({
                    mensaje : "Error al obtener la pelicula",
                    localizado : false
                });
            } else {
                res.status(200);
                res.send(result[0]);
            }
            client.close();
        });
    });
})

//Eliminar pelicula
router.delete('/pelicula/:id', function (req, res) {
    var IDpelicula = require('mongodb').ObjectID(req.params.id);

    MongoClient.connect(ruta, function(err, client) {
        var dbo = client.db("videoclub");

        dbo.collection("pelicula").remove({ _id : IDpelicula }, function (err, result) {
            if (err) {
                res.status(500);
                res.json({
                    mensaje : "Error al eliminar la pelicula",
                    eliminado : false
                });
            } else {
                res.status(200);
                res.json({
                    eliminado : true,
                });
            }
            client.close();
        });
    });
})

//Modificar pelicula
router.put('/pelicula/:id', function (req, res) {
    var IDpelicula = require('mongodb').ObjectID(req.params.id);

    MongoClient.connect(ruta,
        function(err, client) {
            var dbo = client.db("videoclub");

            var pelicula1 = new Pelicula(req.body.titulo, req.body.descripcion, req.body.anio,
                req.body.director);

            dbo.collection("pelicula").update({ _id : IDpelicula }, pelicula1, function (err, result) {
                if (err) {
                    res.status(500);
                    res.json({
                        mensaje : "Error al modificar la pelicula",
                        modificado : false
                    });
                } else {
                    res.status(201);
                    res.json({
                        modificado : true
                    });
                }
                client.close();
            });

        });
})

//Obtener todos los discos
router.get('/disco', function (req, res) {

    // Abrir el cliente
    MongoClient.connect(ruta,function(err, client) {
            var dbo = client.db("videoclub");
            dbo.collection("disco").find({}).toArray(function(err, result) {
                if (err) {
                    res.status(500);
                    res.json({
                        mensaje : "Error al listar los discos",
                        listado : false
                    });
                } else {
                    res.status(200);
                    res.send(result);
                }
                client.close();
            });
        }
    );
})

//Insertar disco
router.post('/disco', function (req, res) {
    MongoClient.connect(ruta,
        function(err, client) {
            var dbo = client.db("videoclub");

            var disco1 = new Disco(req.body.titulo, req.body.autor, req.body.anio);

            dbo.collection("disco").insert(disco1, function (err, result) {
                if (err) {
                    res.status(500);
                    res.json({
                        mensaje : "Error al insertar el disco",
                        insertado : false
                    });
                } else {
                    res.status(201);
                    res.json({
                        insertado : true
                    });
                }
                client.close();
            });
        });
})

//Obtener un disco
router.get('/disco/:id', function (req, res) {
    var IDdisco = require('mongodb').ObjectID(req.params.id);

    MongoClient.connect(ruta, function(err, client) {
        var dbo = client.db("videoclub");

        dbo.collection("disco").find({ _id : IDdisco }).toArray(function (err, result) {
            if (err) {
                res.status(500);
                res.json({
                    mensaje : "Error al obtener el disco",
                    localizado : false
                });
            } else {
                res.status(200);
                res.send(result[0]);
            }
            client.close();
        });
    });
})

//Eliminar disco
router.delete('/disco/:id', function (req, res) {
    var IDdisco = require('mongodb').ObjectID(req.params.id);

    MongoClient.connect(ruta, function(err, client) {
        var dbo = client.db("videoclub");

        dbo.collection("disco").remove({ _id : IDdisco }, function (err, result) {
            if (err) {
                res.status(500);
                res.json({
                    mensaje : "Error al eliminar el disco",
                    eliminado : false
                });
            } else {
                res.status(200);
                res.json({
                    eliminado : true,
                });
            }
            client.close();
        });
    });
})

//Modificar disco
router.put('/disco/:id', function (req, res) {
    var IDdisco = require('mongodb').ObjectID(req.params.id);

    MongoClient.connect(ruta,
        function(err, client) {
            var dbo = client.db("videoclub");

            var disco1 = new Disco(req.body.titulo, req.body.autor, req.body.anio);

            dbo.collection("disco").update({ _id : IDdisco }, disco1, function (err, result) {
                if (err) {
                    res.status(500);
                    res.json({
                        mensaje : "Error al modificar la pelicula",
                        modificado : false
                    });
                } else {
                    res.status(201);
                    res.json({
                        modificado : true
                    });
                }
                client.close();
            });

        });
})

module.exports = router;