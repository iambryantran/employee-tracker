INSERT INTO departments (name)
VALUES  (leadership)
        (operations),
        (tech),
        (finance);

INSERT INTO roles (title, salary, department_id)
VALUES  ('CEO', 140000, 1),
        ('Ops', 40000, 2),
        ('IT', 90000, 3),
        ('Accountant', 75000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ('Leed', 'Leader', 1, 1),
        ('Ops', 'Opsman', 2, 1),
        ('Tek', 'Nology', 3, 1),
        ('Fy', 'Nance', 4, 1);