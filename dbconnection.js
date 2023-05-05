const { Pool } = require("pg");
 //console.log("process.env.DATABASE_URL" + process.env.DATABASE_URL);
 const pool = new Pool({
   connectionString:
     process.env.DATABASE_URL ||
     "postgres://edbxhigcddkupl:ecba0c5afaff09d9232b363b8e911328cd173c97faea2b9086988a26b0d5a989@ec2-3-219-137-162.compute-1.amazonaws.com:5432/dfvboslfl62tm6",
   // connectionString:
   //   "postgres://brp_admin:HmY82bcFF9RX8h@13.127.117.243:5432/brp",
 
   ssl: {
     rejectUnauthorized:false,
   },
 });

 module.exports =pool;