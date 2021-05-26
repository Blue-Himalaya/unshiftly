const app = require('./index.js');
app.listen(8080, () => {
  console.log('server listening on port 8080');
});

// INSERT INTO employees (name, phone, birthday, password, start_date, is_active) VALUES ('John', 5658987452, '1991-11-14', '$2b$10$PRKw8VqDjUtFSAO4HVcpdOA0h7mCptpr9sbKzZBfq/NrhU4mbhkCC', '2021-05-25', 8);
//  insert into employee_roles (id_employee, id_role) VALUES (21, 2);