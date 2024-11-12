import express from "express";
import db from "../db";

const root = express.Router();

root.get("/", async (req, res) => {
  const sql = `
    select
      deptno as "id",
      deptname as "name",
      location as "location",
      mgrno as "manager"
    from sample.department
  `;

//   const sql = 'call depts()';

  const departments = await db.query(sql);

  res.json({
    length: departments.length,
    departments
  });
});

root.get("/:id", async (req, res) => {
    const sql = `
      select
        deptno as "id",
        deptname as "name",
        location as "location",
        mgrno as "manager"
      from sample.department
      where deptno = ?
      `;
    
    const department = await db.query(sql, [req.params.id]);

    if (department.length === 1) {
        res.json({department: department[0]});
    } else {
        res.status(404).json({ error: "Department Not Found"});
    }
})

export default root;
