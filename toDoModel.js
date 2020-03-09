const mongoose = require("mongoose");

var ToDoSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true
	},
	done: {
		type: Boolean,
		required: false,
		default: false
	}
});

ToDo = exports.ToDo = mongoose.model("ToDo", ToDoSchema);

const DATABASE_CONECTION = "mongodb://mongo/toDoApp";
exports.initializeMongo = function() {
	mongoose.connect(DATABASE_CONECTION, { useNewUrlParser: true }).catch(err => {
		console.log(`Unable to connect to Mongo: ${err}`);
	});

	console.log("Trying to connect to " + DATABASE_CONECTION);

	var db = mongoose.connection;
	db.on(
		"error",
		console.error.bind(
			console,
			"connection error: Connection to Mongo Server failed"
		)
	);

	db.once("open", function() {
		console.log("Connection to Mongo Server successful");
	});
};
