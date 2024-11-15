import express from "express";
import db from "../db";

const root = express.Router();

// gonna make the API defs here

root.get("/",async (req,res) =>{
    const sql = `
        select
            empno as "id",
            firstnme as "first",
            lastname as "last",
            job as "job",
            workdept as "workdept",
            salary as "salary"
        from sample.employee
    `;
    const employees = await db.query(sql);

    res.json({
        length: employees.length,
        employees
    });
});

export default root;
