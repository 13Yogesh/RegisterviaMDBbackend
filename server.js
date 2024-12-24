const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize app
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(
  'mongodb+srv://yogeshroro1306:Yogesh782696@yogesh-mango-dp-cluster.zfcr5.mongodb.net/RegisterviaMongoDB?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact: { type: String, required: true },
  age: { type: Number, required: true },
  favoritefood: { type: String, required: true },
});

// Define User Model
const User = mongoose.model('User', userSchema);

// Route to handle user registration
app.post('/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(400).send({
      message: 'Error registering user',
      error: error.message || error,
    });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }

    res.status(200).send({ message: 'Login successful!' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send({ message: 'Internal server error', error });
  }
});


// Start the server
const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
