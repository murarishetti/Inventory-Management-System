var express = require('express');
var Request = require('tedious').Request
var TYPES = require('tedious').TYPES;
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var path = require('path');
var ejs = require('ejs');

var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
	extended: true
})); // for parsing       application/x-www-form-urlencoded
app.use(serveStatic(__dirname, {
	'index': ['Main.html']
}))

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, "/App")))
app.use(express.static(path.join(__dirname, "/script")))

app.engine('html', require('ejs').renderFile);
var port = process.env.PORT || 8080;
var Connection = require('tedious').Connection;
var resssss = "";

var config = {
	userName: 'darasandeep',
	password: 'Vijayawada$91',
	server: 'darasandeep.database.windows.net',
	// If you are on Microsoft Azure, you need this:  
	options: {
		encrypt: true,
		database: 'mySampleDatabase'
	}
};
var connection = new Connection(config);
connection.on('connect', function (err) {

	if (err) {
		console.log(err)

	}
	// If no error, then good to proceed.  
	console.log("Connected");
	//executeStatement();
});

function executeStatement() {
	request = new Request("SELECT * FROM IDBMS;", function (err) {
		if (err) {
			console.log(err);
		}
	});
	var result = "";
	request.on('row', function (columns) {

		columns.forEach(function (column) {
			console.log(column.colName)
			if (column.value === null) {
				console.log('NULL');
			} else {
				result += column.value + " ";
			}
		});
		console.log(result);
		result = "";
	});

	request.on('done', function (rowCount, more) {
		console.log(rowCount + ' rows returned');
	});
	connection.execSql(request);
}


app.get('/', function (req, res) {
	res.sendfile("Main.html"); // load the single view file (angular will handle the page changes on the front-end)
});

app.get("/GetItem", function(req, res) {
	// if (err) console.log(err);
	var Product = "Dove";
	console.log("Search for product: "  +Product);
	GetItems(Product, function(response){
        console.log("response:", response);
//        res.render("GetItem", {response:response});
        return res.json({response: response});
    });
});

app.post("/EditItem", function (err, req, res, next) {

	var ID = Math.floor((Math.random() * 100) + 1);
	var NAME = req.body.Name;
	var SALE_PRICE = req.body.SalePrice;
	var MSRP = req.body.MSRP;
	var MODEL_NUMBER = req.body.ModelNumber;
	var UPC = req.body.UPC;
	var QUANTITY = req.body.Quantity;
	InsertIntoItems(MODEL_NUMBER, NAME, SALE_PRICE, MSRP, UPC, QUANTITY)

});

function GetItems(ProductName, callback)
{
	var req = "select * from PRODUCTS where Name like" + "'%" + ProductName + "%'"
	console.log(req)
	
	request = new Request(req, function (err) {
		if (err) {
			console.log(err);
		} 
	});
	
	 request.on('row', function(columns) {  
		 
			console.log(columns);
            var result = JSON.stringify(columns)
//            console.log(result); 
            callback(result);
             
        });  

        request.on('done', function(rowCount, more) {  
        console.log(rowCount + ' rows returned');  
        });  
        connection.execSql(request); 
}
function InsertIntoItems(Model_Number, Name, SalePrice, MSRP, UPC, Quantity) {

	var req = "Insert into PRODUCTS values(" + "'" + Model_Number + "'" + "," + "'" +
		Name + "'" + "," +
		SalePrice + "," +
		MSRP + "," +
		UPC + "," +
		Quantity + ")"

	console.log(req)
	request = new Request(req, function (err, rowcount) {
		if (err) {
			console.log(err);
		} else if (rowcount) {
			console.log("Rows Effected" + rowcount);
		}
	});

	connection.execSql(request);
}


app.listen(port, function (Err) {

	console.log("Running Server on Port " + port);
});