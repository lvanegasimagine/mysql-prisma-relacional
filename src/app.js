const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const app = express();
const postRouter = require('./routes/post.routes');
const userRouter = require('./routes/user.routes');

app.use(helmet());
app.use(cors());
app.use('*',cors());
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.use('/api/post', postRouter);
app.use('/api/user', userRouter);

const port = process.env.PORT || 4001

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))