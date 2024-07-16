const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const connection = mysql.createPool({
  host: "sql7.freemysqlhosting.net",
  user: "sql7709612",
  password: "NWUQXXqWdI",
  database: "sql7709612",
});

const app = express();

app.use(bodyParser.json());


app.get("/medicine", function (req, res) {
  connection.query("SELECT * FROM medicine", function (error, results, fields) {
    if (error) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(results);
    }
  });
});


app.get("/customers", function (req, res) {
  connection.query("SELECT * FROM customers", function (error, results, fields) {
    if (error) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(results);
    }
  });
});


app.get("/pharmacy", function (req, res) {
  connection.query("SELECT * FROM pharmacy", function (error, results, fields) {
    if (error) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(results);
    }
  });
});


app.get("/orders", function (req, res) {
  
  connection.query("SELECT * FROM orders", function (error, results, fields) {
    if (error) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(results);
    }
  });
});

app.get("/order", function (req, res) {
  const { pharmacy_name } = req.query;

  if (!pharmacy_name) {
    return res.status(400).json({ error: "Missing pharmacy_name parameter" });
  }

  connection.query("SELECT * FROM orders WHERE pharmacy_name = ?", [pharmacy_name], function (error, results, fields) {
    if (error) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(results);
    }
  });
});



app.get("/stock", function (req, res) {
  connection.query("SELECT * FROM stock", function (error, results, fields) {
    if (error) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(results);
    }
  });
});


app.post("/pharmacy_signup", function (req, res) {
  const { username, password, phoneNumber, location } = req.body;

  if (!username || !password || !phoneNumber || !location) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  connection.query(
    "INSERT INTO pharmacy (name, password, phone_number, location) VALUES (?, ?, ?, ?)",
    [username, password, phoneNumber, location],
    function (error, results, fields) {
      if (error) {
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(200).json({ message: "User signed up successfully" });
    }
  );
});

app.post("/customer_signup", function (req, res) {
  const { username, password, phoneNumber } = req.body;

  if (!username || !password || !phoneNumber) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  connection.query(
    "INSERT INTO customers (name, password, phone_number) VALUES (?, ?, ?)",
    [username, password, phoneNumber],
    function (error, results, fields) {
      if (error) {
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(200).json({ message: "User signed up successfully" });
    }
  );
});


app.post("/reserve", function (req, res) {
  const {
    customer_name,
    pharmacy_name,
    medicine_name,
    quantity,
    reservation_date,
    status,
    price
  } = req.body;

  console.log("Received reservation data:", req.body);

  if (!customer_name || !pharmacy_name || !medicine_name || !quantity || !reservation_date || !status || !price) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  connection.query(
    "INSERT INTO orders (customer_name, pharmacy_name, medicine_name, quantity, reservation_date, status, price) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [customer_name, pharmacy_name, medicine_name, quantity, reservation_date, status, price],
    function (error, results, fields) {
      if (error) {
        console.error("Database insertion error:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(200).json({ message: "Reservation successful"});
    }
  );
});


app.put("/orders/:orderId", function (req, res) {
  const orderId = req.params.orderId;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Missing status field" });
  }

  connection.query(
    "UPDATE orders SET status = ? WHERE id = ?",
    [status, orderId],
    function (error, results, fields) {
      if (error) {
        console.error("Database update error:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.status(200).json({ message: "Order status updated successfully" });
    }
  );
});




app.listen(3306, () => {
  console.log("Server is running on port 3306");
});
