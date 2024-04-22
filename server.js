const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Add JSON parsing middleware

const db = mysql.createConnection({
    host: "sql6.freesqldatabase.com",
    user: 'sql6699810',
    password: 'hPlpRvY1DL',
    database: 'sql6699810'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

app.get('/', (req, res) => {
    return res.json("From Backend Side");
});

app.get('/users', (req, res) => {   
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ error: 'Error fetching users' });
        }
        return res.json(data);
    });
});

app.get('/course', (req, res) => {   
    const sql = "SELECT * FROM course";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ error: 'Error fetching users' });
        }
        return res.json(data);
    });
});

app.get('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    const sql = "SELECT * FROM users WHERE ID = ?";
    db.query(sql, [userId], (err, data) => {
        if (err) {
            console.error('Error fetching user data:', err);
            return res.status(500).json({ error: 'Error fetching user data' });
        }
        if (data.length > 0) {
            return res.json(data[0]); // Return user data
        } else {
            return res.status(404).json({ error: 'User not found' }); // User not found
        }
    });
});

app.get('/courses/:userId', (req, res) => {
    const userId = req.params.userId;
    const sql = "SELECT * FROM course WHERE ID = ?"; // Assuming the ID column in the course table is a foreign key referencing the ID column in the users table
    db.query(sql, [userId], (err, data) => {
        if (err) {
            console.error('Error fetching course data:', err);
            return res.status(500).json({ error: 'Error fetching course data' });
        }
        if (data.length > 0) {
            return res.json(data); // Return course data
        } else {
            return res.status(404).json({ error: 'No courses found for this user' }); // No courses found
        }
    });
});


app.post('/LoginScreen', (req, res) => {
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if(err) return res.json("Login Failed");
        if(data.length > 0){
            console.log(data);
            return res.json({ message: "Login Successfully", userId: data[0].ID }); // Include user ID in response
          } else {
            return res.json("No Record")
          }
    })
});

app.post('/SignupScreen', (req, res) => {
    const { studentID, email, firstName, lastName, password } = req.body;
  
    // Hash password before storing it in the database
  
    const query = 'INSERT INTO users (studentID, email, firstName, lastName, password) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [studentID, email, firstName, lastName, password], (err, result) => {
        if (err) {
            console.error('Error inserting user data:', err);
        }
        console.log('User data inserted successfully:', result);
        res.status(200).send('User data inserted successfully');
    });
});


app.post('/addcourse', (req, res) => {
    const { title, description, content, progress, ID } = req.body;
    const query = 'INSERT INTO course (title, description, content, progress, ID) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [title, description, content, progress, ID], (err, result) => {
        if (err) {
            console.error('Error inserting course data:', err);
            return res.status(500).send('Error inserting course data');
        }
        console.log('Course data inserted successfully:', result);
        res.status(200).send('Course data inserted successfully');
    });
});

app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { bio } = req.body;
    const sql = "UPDATE users SET bio = ? WHERE id = ?";
    db.query(sql, [bio, userId], (err, result) => {
        if (err) {
            console.error('Error updating user data:', err);
            return res.status(500).send('Error updating user data');
        }
        console.log('User data updated successfully:', result);
        return res.status(200).send('User data updated successfully');
    });
});


const PORT = process.env.PORT || 3306;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
