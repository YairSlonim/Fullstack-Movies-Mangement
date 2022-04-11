const express = require('express')
var cors = require('cors')
let app = express();

app.use(cors())
app.use(express.json()) //For JSON requests

app.use(express.urlencoded({extended: true}));
require('./config/database')
//require('./BL/MembersFromSiteBl')
//require('./BL/moviesDal')

app.use('/api/members',require('./routers/membersRouter'))
app.use('/api/movies',require('./routers/moviesRouter'))
app.use('/api/subscriptions',require('./routers/subscriptionsRouter'))
app.use('/api/users',require('./routers/usersRouter'))
app.use('/api/permissions',require('./routers/permissionsRouter'))

app.listen(8000);