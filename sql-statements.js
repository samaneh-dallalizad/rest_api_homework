const { Pool } = require('pg')

const connection_string = process.env.DATABASE_URL || 'postgresql://postgres:secret@localhost:5432/postgres'
const pool = new Pool({
  connectionString: connection_string
})

pool.query('CREATE TABLE IF NOT EXISTS person (id serial, first_name varchar(255), last_name varchar(255), eye_color varchar(255))')
  .then(() => pool.query('INSERT INTO person(first_name,last_name,eye_color) values ($1,$2,$3),($4,$5,$6),($7,$8,$9)',[
      "James", "Smith", "brown", "Frank", "Jones", "brown","Rebecca", "Andrews", "blue"]))
  .then(()=>pool.query("UPDATE person set eye_color='blue' where eye_color='brown'"))
  .then(()=>{
    const name = "James";
    return pool.query('SELECT * FROM person WHERE first_name = $1',[name])
  })
  .then((res)=>{
    console.log(res.rows)
  })
  .catch(err => console.error('Error executing query', err.stack))
