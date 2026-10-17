## topic: Tables, keys and types | tables
A **relational database** stores data in **tables**. A table has **columns** (the fields) and **rows** (one record each). **SQL** is the language for asking for and changing that data. Almost every business system uses it, and Supabase is Postgres underneath, so SQL is also how you talk to a client's existing database.

Two kinds of key tie tables together:
- A **primary key** (usually `id`) identifies exactly one row in its own table.
- A **foreign key** (for example `customer_id` in `orders`) holds the `id` of a row in *another* table. It says "this order belongs to that customer".

Common column types in Postgres: `text`, `integer`, `numeric` (exact numbers such as money), `boolean`, `timestamptz` (a timestamp with time zone), `uuid` and `jsonb` (JSON data).

This step uses two practice tables:

```sql
create table customers (
  id serial primary key,
  name text,
  email text,
  city text
);

create table orders (
  id serial primary key,
  customer_id integer references customers(id),
  amount numeric,
  created_at timestamptz default now()
);
```

Run these in the Supabase **SQL Editor**. `references customers(id)` is the foreign key.
cmd: `CREATE TABLE` | makes a new table with its columns and types
know: Explain a table, a row and a column
know: Explain a primary key and a foreign key
know: Name five Postgres column types and what each holds
Q: What is the difference between a primary key and a foreign key?
A: A primary key identifies one row in its own table. A foreign key stores the id of a row in another table, linking the two.
Q: Which type do you use for money and which for a time with time zone?
A: `numeric` for money, `timestamptz` for a timestamp with time zone.
Q: In `orders`, which column is the foreign key and what does it point to?
A: `customer_id`; it points to `customers.id`.

## topic: Reading data: SELECT, WHERE, ORDER BY, LIMIT | select
`SELECT` reads rows. You say which columns, from which table, and optionally filter, sort and limit.

```sql
select * from orders;                          -- everything
select id, amount from orders where amount > 50;
select * from orders order by amount desc limit 3;
select * from orders where created_at > now() - interval '7 days';
```

- `WHERE` keeps only rows that match a condition. Operators: `=`, `<>` (not equal), `>`, `<`, `and`, `or`, `is null`, `in (...)`, `like 'A%'`.
- `ORDER BY column desc` sorts biggest first; leave `desc` off for smallest first.
- `LIMIT 3` keeps only the first three rows after sorting.
- In SQL, text is in **single quotes** (`'Rotterdam'`); double quotes are for column names.

`select` never changes data, so it is always safe to run.
cmd: `SELECT` | reads rows from a table
cmd: `WHERE` | filters rows by a condition
cmd: `ORDER BY` | sorts the result (add `desc` for biggest first)
cmd: `LIMIT` | keeps only the first N rows
know: Write a query with a filter, a sort and a limit
know: Write a query for the last 7 days
Q: Write a query for all orders over 50.
A: `select * from orders where amount > 50;`
Q: Write a query for the 3 biggest orders.
A: `select * from orders order by amount desc limit 3;`
Q: Write a query for the orders from the last 7 days.
A: `select * from orders where created_at > now() - interval '7 days';`

## topic: Counting and totals: aggregates and GROUP BY | aggregates
An **aggregate** turns many rows into one number: `count(*)`, `sum(amount)`, `avg(amount)`, `min(...)`, `max(...)`. `GROUP BY` makes one result row **per group**.

```sql
select count(*) from orders;                            -- how many orders
select customer_id, sum(amount) as total
from orders
group by customer_id;                                   -- total per customer
```

Rule: every column in the `select` list must either be inside an aggregate or appear in `group by`. `as total` just gives the result column a name.

To filter on a group's result (for example only customers with total over 100) use `having`, not `where`: `where` filters rows *before* grouping, `having` filters *after*.
cmd: `COUNT` | counts rows
cmd: `SUM` | adds up a numeric column
cmd: `GROUP BY` | makes one result row per group, for use with aggregates
know: Write the total per customer
know: Explain WHERE versus HAVING
Q: Write a query for the total amount per customer.
A: `select customer_id, sum(amount) as total from orders group by customer_id;`
Q: What is the difference between `where` and `having`?
A: `where` filters rows before grouping; `having` filters the groups after the aggregate is calculated.
Q: Which aggregates do you use to count rows and to add up amounts?
A: `count(*)` counts rows and `sum(amount)` adds up a numeric column.

## topic: Joining tables | joins
A **JOIN** combines rows from two tables by following the foreign key. `ON` says which columns must match.

```sql
-- the 3 biggest orders with the customer's name
select c.name, o.amount
from orders o
join customers c on c.id = o.customer_id
order by o.amount desc
limit 3;

-- customers with NO orders
select c.name
from customers c
left join orders o on o.customer_id = c.id
where o.id is null;
```

- `JOIN` (an inner join) keeps only rows that have a match on **both** sides. A customer with no orders disappears.
- `LEFT JOIN` keeps **every** row from the left table. Where there is no match the right side's columns are `null`. Filtering on `is null` therefore finds customers with no orders.
- `c` and `o` are short **aliases** for the table names.
cmd: `JOIN ... ON` | combines two tables where the key columns match
cmd: `LEFT JOIN` | keeps every row from the left table, with nulls where nothing matches
know: Write a join that follows the foreign key
know: Find rows with no match using LEFT JOIN and IS NULL
Q: Write a query for the 3 biggest orders with the customer's name.
A: `select c.name, o.amount from orders o join customers c on c.id = o.customer_id order by o.amount desc limit 3;`
Q: How do you find customers who have no orders?
A: `left join` orders and keep rows where the order side `is null`.
Q: What does a plain JOIN do with a customer who has no orders?
A: Drops them; an inner join keeps only rows that match on both sides.

## topic: Changing data safely | writing
```sql
insert into customers (name, email, city) values ('Ana', 'ana@example.com', 'Utrecht');
update customers set city = 'Rotterdam' where email = 'ana@example.com';
delete from customers where email = 'ana@example.com';
```

- `INSERT` adds a row. `UPDATE` changes values. `DELETE` removes rows.
- **`UPDATE` and `DELETE` without a `WHERE` change every row in the table.** There is no undo button.

The safe way, every time:
1. Write a `select` with the `where` you intend: `select * from customers where email = 'ana@example.com';`
2. Check that the rows returned are exactly the ones you meant.
3. Then turn the same `where` into the `update` or `delete`.

> Warning: never run an `UPDATE` or `DELETE` on a client's real database that you haven't first tested with a `select`.

> Note: the database may refuse a `DELETE` with a foreign-key error if other rows still point at that row, for example a customer who still has orders. That is the database protecting you; delete the orders first or leave the customer.
cmd: `INSERT` | adds a new row
cmd: `UPDATE` | changes values in existing rows (always with WHERE)
cmd: `DELETE` | removes rows (always with WHERE)
know: Run the select-first routine before an UPDATE or DELETE
know: Say what happens to an UPDATE with no WHERE
Q: What happens if you run `update customers set city = 'X';` with no WHERE?
A: Every customer's city is changed to X.
Q: What is the safe way to do an UPDATE?
A: First run a `select` with the same `where` to see which rows match, then run the `update` with that `where`.
Q: Which three statements add, change and remove rows?
A: `insert`, `update` and `delete`.

## topic: RLS and SQL injection | security
**Row Level Security (RLS)** is a Supabase/Postgres feature that decides which rows each user may see or change. You switch it on per table (`alter table public.customers enable row level security;`) and add policies. With RLS on and no policy, a publishable key sees nothing. The **secret key** (service_role) skips RLS, which is why it must stay inside n8n or a trusted server (p4-1).

**SQL injection** happens when you build a query by pasting user text into a string:

```
"select * from customers where name = '" + name + "'"
```

If `name` is `x' or '1'='1`, the query now matches everything; worse input can delete data. The defence: **use parameters**, where the database receives the query and the values separately and never treats the values as SQL. n8n's database nodes and Python's database libraries support parameters. Never glue text into a query.
know: Explain what RLS does and which key skips it
know: Explain SQL injection and the defence
Q: What does Row Level Security do?
A: It decides which rows each user can see or change; policies are attached to a table. The secret (service_role) key bypasses it.
Q: Why is gluing user text into a SQL string dangerous, and what do you do instead?
A: The text can contain SQL that changes the query (SQL injection). Use parameters so values are never run as SQL.
