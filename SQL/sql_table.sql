drop table if exists emp;

CREATE TABLE if not exists emp (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(50) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    event_date date default (current_date)
);
-- Add a new column to an existing table
ALTER TABLE emp ADD COLUMN department_id INT;

insert into emp(id, first_name, email, salary,department_id) values
     (10,'ravi1','jravindra.ski2@gmail.com',100.20,10),
     (20,'raja','jravindra.ski1@gmail.com',100.20,101);

update emp set salary = salary * 10 where department_id = 101;
select * from emp;

select id, first_name from emp where salary > 10 and first_name like 'r%';
select id, first_name from emp where salary > 10 and department_id in (10,20,30);

SELECT
    department_id,
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary,
    AVG(salary) AS average_salary
FROM emp
GROUP BY department_id;

SELECT department_id, first_name, AVG(salary) AS avg_salary, COUNT(*) AS staff_count
FROM emp
GROUP BY department_id 
HAVING avg_salary > 100;


-- JOINS WORKSPACE --
drop table if exists departments;

CREATE TABLE departments (
    id INTEGER PRIMARY KEY,
    department_name TEXT NOT NULL
);

INSERT INTO departments (id, department_name)
VALUES
    (10, 'IT'),
    (20, 'Finance');

select e.first_name, e.salary, d.department_name
from emp as e
inner join departments as d
on e.department_id == d.id;

select e.first_name, e.salary, d.department_name
from emp as e
inner join departments as d
on e.department_id == d.id where e.salary > 10;

select e.first_name, e.salary, d.department_name
from emp as e
inner join departments as d
on e.department_id == d.id 
order by e.first_name;

-- LEFT JOIN --
SELECT e.first_name, d.department_name
FROM emp AS e
LEFT JOIN departments AS d
    ON e.department_id = d.id;

PRAGMA table_info(emp);








