let express = require('express');
let app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://kcy96:nIPv1tq40O4ryH2c@cluster0.ktpncav.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const port = 3040;
let collection;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function runDBConnection() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (ex) {
        console.error(ex);
    }
}
runDBConnection(); // Ensure this runs at the start

app.get('/', function (req, res) {
    res.send('Welcome to the Express and MongoDB App');
});

const addTwoNumber = (n1, n2) => {
    return n1 + n2;
}

app.get("/addTwoNumber", (req, res) => {
    const n1 = 20;
    const n2 = 15;
    const result = addTwoNumber(n1, n2);
    res.json({ statusCode: 200, data: result });
});

app.get("/Display", (req, res) => {
    const n1 = "<html><body><H1>HELLO THERE </H1></body></html>";
    res.set('Content-Type', 'text/html');
    res.send(Buffer.from(n1));
})

app.post('/api/users', async (req, res) => {
    const { name, email, age } = req.body;

    if (!name || !email || isNaN(age)) {
        return res.json({ statusCode: 400, message: "Invalid input" });
    }

    try {
        const database = client.db('myAppDB');
        const users = database.collection('users');
        const result = await users.insertOne({ name, email, age });

        res.json({ statusCode: 201, data: result.insertedId, message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.json({ statusCode: 500, message: 'Internal Server Error' });
    }
});

app.post("/getUserByName", async (req, res) => {
    const userName = req.body.name;

    if (!userName) {
        return res.json({ statusCode: 400, message: "Invalid Name" });
    }

    try {
        const database = client.db('myAppDB');
        const users = database.collection('users');
        const query = { name: userName };
        const user = await users.findOne(query);

        if (user) {
            res.json({ statusCode: 200, data: user });
        } else {
            res.json({ statusCode: 404, message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.json({ statusCode: 500, message: "Internal Server Error" });
    }
});


app.get('/api/users', async (req, res) => {
    try {
        const database = client.db('myAppDB');
        const users = database.collection('users');
        const userList = await users.find({}).toArray();

        res.json({ statusCode: 200, data: userList });
    } catch (error) {
        console.error(error);
        res.json({ statusCode: 500, message: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log("Server is listening on port " + port);
});
