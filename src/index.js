import express from 'express';

const data =[
{id: 1, username: 'Kevin Almario', email: 'Kevin@gmail.com', rol:'admin'},
{id: 2, username: 'Juan Almario', email: 'Juan@gmail.com', rol:'user'},
{id: 3, username: 'Pablo Almario', email: 'Pablo@gmail.com', rol:'user'}
];

const app = express()
const PORT = 3000

app.use(express.urlencoded({ extended: true }));
app.use("/", express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/users', (req, res) => {
  res.json(data)
})


app.get('/api/users/:id', (req, res) =>{
    const user = data.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
});

app.get('/api/users/:id/:rol', (req, res)=>{
    const user = data.find(u => u.id === parseInt(req.params.id) && u.rol === req.params.rol);
    if(!user){
        return res.status(404).json({message: 'Usuario No Encontrado'});
    }
    res.json(user);    
})


app.post('/api/users', (req, res) => {
    const { username, email, rol } = req.body;

    if (!username || !email || !rol) {
        return res.status(400).json({ message: 'username, email y rol son obligatorios' });
    }

    const id = data.length > 0 ? Math.max(...data.map(user => user.id)) + 1 : 1;
    const newUser = { id, username, email, rol };
    data.push(newUser);

    res.status(201).json(newUser);
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
});