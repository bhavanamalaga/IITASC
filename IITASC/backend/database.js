const data = require("./config.js");
const Pool = require("pg").Pool;
const bcrypt = require("bcrypt");

console.log(data);
const pool = new Pool({
    user: data.user,
    password: data.password,
    host: data.host,
    port: data.port,
    database: data.database
})
var year, sem;
const current_semester_details = async () => {
    await pool.query('SELECT semester,year FROM reg_dates WHERE start_time = (SELECT MAX(start_time) FROM reg_dates WHERE start_time <= CURRENT_DATE)', (error, result) => {
        if (result) { console.log(result.rows); year = result.rows[0].year; sem = result.rows[0].semester; }
        console.log(year, sem);
    }
    );
}
const students = (req, res) => {
    console.log(year,sem);
    pool.query('select * from student', (error, result) => {
        if (error) { console.log("error occured while fetching student data", error); }
        res.status(200).json(result.rows);
    })
}

const student_login = async (req, res) => {
    const { id, name } = req.body;
    if (id && name) {
        const hashedPassword = await bcrypt.hash(name, data.saltedrounds);
        pool.query('select * from user_password where ID=$1 and  hashed_password= $2', [id, hashedPassword], (error, result) => {
            if (error) { console.log("error occured while fetching student data", error); }
            if (result.rowCount ==1) {
                res.status(200).json(result.rows[0]);
            }
            else { res.status(200).json("id and name do not match"); }
        })
    }
    else { res.json("invalid credentials"); }
}

const getdataofstudentpc = async (req, res) => {
    console.log(req.params.id,year);
    await pool.query('with b as (with b as (select * from reg_dates order by year,semester limit 1) select a.year,a.semester from (select * from reg_dates order by year desc,semester desc) a,b where (a.year, a.semester) between (b.year,b.semester) and ($2,$3) offset 1) select * from student,takes,b where student.id=$1 and student.id=takes.id and (takes.year=b.year and takes.semester=b.semester) order by takes.year desc, takes.semester desc', [req.params.id,year,sem], (error, result) => {
        if (error) { console.log("error occured while fetching student data", error); }
        res.status(200).json(result.rows);
    })
}

const getdataofstudentcc = async (req, res) => {
    console.log(req.params.id, year);
    await pool.query('select * from student,takes where student.id=$1 and student.id=takes.id and takes.year=$2 and takes.semester=$3 order by takes.year desc, takes.semester desc', [req.params.id, year, sem], (error, result) => {
        if (error) { console.log("error occured while fetching student data", error); }
        res.status(200).json(result.rows);
    })
}

const dropcourse = (req, res) => {
    //const { id, course_id } = req.;
    console.log("request received");
    console.log(req.params.id, req.params.course_id);
    pool.query('delete from takes where id = $1 and course_id = $2', [req.params.id, req.params.course_id], (error, result) => {
        if (error) { console.log("error occured while drpping a course", error); }
        else { res.send([result]); }
    })
}

const coursedeptdata = (req, res) => {
    pool.query('select course.dept_name from course,section where course.course_id=section.course_id and section.year=$1 and section.semester=$2 order by course.dept_name ASC', [year,sem], (error, result) => {
        if (error) { console.log("cannot retrieve course data", error); }
        else { res.status(200).json(result.rows); }
    })
}

const coursedata = (req, res) => {
    pool.query('select course.course_id from course,section where course.course_id=section.course_id and course.dept_name = $1 and section.year=$2 and section.semester=$3 order by course_id ASC', [req.params.dept_name, year, sem], (error, result) => {
        if (error) { console.log("cannot retrieve course data", error); }
        else { res.status(200).json(result.rows); }
    })
}

const ciddata = (req, res) => {
    pool.query('select * from course left join prereq on course.course_id = prereq.course_id where course.course_id = $1', [req.params.id], (error, result) => {
        if (error) { console.log("cannot retrieve  specific course data", error); }
        else { res.status(200).json(result.rows); }
    })
}

const insdata = (req, res) => {
    pool.query('select id from instructor order by id ASC', (error, result) => {
        if (error) { console.log("cannot retrieve course data", error); }
        else { res.status(200).json(result.rows); }
    })
}

const insiddata = (req, res) => {
    pool.query('select instructor.id,instructor.name,instructor.dept_name,a.course_id,a.title,a.semester,a.year from instructor left join (select teaches.id,course.course_id,course.title,teaches.semester,teaches.year from teaches,course where teaches.course_id = course.course_id) a on instructor.id = a.id where instructor.id = $1 order by year DESC,semester;', [req.params.id], (error, result) => {
        if (error) { console.log("cannot retrieve  specific course data", error); }
        else { res.status(200).json(result.rows); }
    })
}

const searchdata = (req, res) => {
    pool.query('select course.course_id,course.title,section.sec_id from course,section where course.course_id = section.course_id and section.year=$1 and section.semester=$2 order by course.course_id, section.sec_id',[year,sem], (error, result) => {
        if (error) { console.log("cannot retrieve  specific course data", error); }
        else { res.status(200).json(result.rows); }
    })
}

const searchlikedata = (req, res) => {
    console.log(req.params.text);
    pool.query('select course.course_id,course.title,section.sec_id from course,section where course.course_id = section.course_id  and (course.course_id ILIKE $1 or course.title ILIKE $1) and section.year=$2 and section.semester=$3 order by course.course_id, section.sec_id', ['%' + req.params.text + '%', year, sem], (error, result) => {
        if (error) { console.log("cannot retrieve  specific course data", error); }
        else { res.status(200).json(result.rows); console.log("datasent"); }
    })
}

const registration = (req, res) => {
    console.log(req.body);
    const sid = req.body.sid;
    const course_id = req.body.cid;
    const sec_id = req.body.secid;
    console.log(sid, course_id, sec_id);
    if (course_id && sec_id) {
        pool.query('Insert into takes(id, course_id, sec_id, semester, year) select $1, $2, $3, $4, $5 where NOT EXISTS(with a as ( select takes.id,takes.course_id,takes.sec_id,section.time_slot_id from takes,section where takes.year=$5 and takes.semester = $4 and takes.year= section.year and takes.semester = section.semester and takes.course_id = section.course_id and takes.id = $1) select * from section where course_id = $2 and sec_id = $3 and year = $5 and semester = $4 and NOT EXISTS (select * from a where a.time_slot_id = section.time_slot_id))', [sid, course_id, sec_id, sem, year], (error, result) => {
            if (error) { console.log("error occured while fetching student data", error); }
            else{
                res.status(200).json(result);
            }
        })
    }
    else { res.json("invalid credentials"); }
}



module.exports = { current_semester_details,students, student_login, getdataofstudentpc, getdataofstudentcc, dropcourse, coursedeptdata, coursedata, ciddata, insdata, insiddata, searchdata, searchlikedata, registration };