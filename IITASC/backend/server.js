const express = require("express");
const cors = require("cors");
const pool = require("./database");

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', pool.students);
app.post('/login', pool.student_login);
app.get('/datapc/:id', pool.getdataofstudentpc);
app.get('/datacc/:id', pool.getdataofstudentcc);
app.delete('/drop/:id/:course_id', pool.dropcourse);
app.get('/course/running/:dept_name/', pool.coursedata);
app.get('/course/dept_name/', pool.coursedeptdata);
app.get('/course/:id/', pool.ciddata);
app.get('/instructor/', pool.insdata);
app.get('/instructor/:id/', pool.insiddata);
app.get('/search/', pool.searchdata);
app.get('/search/:text/', pool.searchlikedata);
app.post('/course/registration', pool.registration);

app.listen(4000, function check(error) {
    if (error) { console.log("ERROR............"); }
    else { console.log("started"); }
});