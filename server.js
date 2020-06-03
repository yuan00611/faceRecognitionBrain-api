const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const db = require('knex')({
	client: 'pg',
	connection: {
		connectionString: process.env.DATABASE_URL,
		ssl: true
	}
});

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

db.select('*').from('users').then(data => {
	console.log(data);
})

const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => { res.send('it is working!') })

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.post('/signin', (req, res) => {signin.handleSignIn(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

 app.listen(process.env.PORT || 3000, () => {
 	console.log('app is running on port 3000');
 })

 