# DBMS Knowledge Base

## SQL Queries

### Concept
SQL (Structured Query Language) is used to create, retrieve, update, and manage data stored in relational databases.

### Working Principle
SQL commands are used to interact with tables in a database. Common SQL operations include SELECT, INSERT, UPDATE, and DELETE.

Example:
SELECT name, age
FROM Student
WHERE age > 18;

### Important SQL Commands
- SELECT - retrieves data
- INSERT - adds new records
- UPDATE - modifies existing records
- DELETE - removes records
- CREATE - creates database objects
- ALTER - modifies database objects
- DROP - removes database objects

### Laboratory Requirements
- MySQL, PostgreSQL, Oracle, or another relational database
- SQL client or database management tool
- Basic knowledge of relational databases

### Common Precautions
- Use WHERE carefully with UPDATE and DELETE.
- Verify table and column names.
- Use appropriate data types.
- Avoid deleting records without checking the condition.

### Viva Topics
- What is SQL?
- What is the difference between DDL and DML?
- What is a primary key?
- What is a foreign key?
- What is the purpose of the WHERE clause?


## SQL Joins

### Concept
SQL joins are used to combine rows from two or more tables based on a related column.

### Working Principle
A join uses a relationship between tables to retrieve related data. The most common joins are INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN.

Example:
SELECT Student.name, Department.department_name
FROM Student
INNER JOIN Department
ON Student.department_id = Department.id;

### Types of Joins
- INNER JOIN - returns matching records from both tables.
- LEFT JOIN - returns all records from the left table and matching records from the right table.
- RIGHT JOIN - returns all records from the right table and matching records from the left table.
- FULL OUTER JOIN - returns matching and non-matching records from both tables where supported.

### Important Properties
- Joins are useful for retrieving related information stored in different tables.
- Join conditions commonly use primary-key and foreign-key relationships.
- Incorrect join conditions can produce duplicate or incorrect results.

### Laboratory Requirements
- MySQL, PostgreSQL, Oracle, or another relational database
- Two or more related tables
- SQL client or database management tool

### Common Precautions
- Use the correct join condition.
- Check column names carefully.
- Avoid unnecessary joins.
- Verify results for duplicate rows.

### Viva Topics
- What is a join?
- What is an INNER JOIN?
- Difference between INNER JOIN and LEFT JOIN?
- What is a foreign key?
- When is a join required?


## Normalization

### Concept
Normalization is a database design technique used to organize data and reduce data redundancy and update anomalies.

### Working Principle
Normalization divides large tables into smaller related tables and establishes relationships between them.

Common normal forms include:
- First Normal Form (1NF)
- Second Normal Form (2NF)
- Third Normal Form (3NF)
- Boyce-Codd Normal Form (BCNF)

### Important Properties
- 1NF requires atomic values and eliminates repeating groups.
- 2NF satisfies 1NF and removes partial dependency on a composite key.
- 3NF satisfies 2NF and removes transitive dependency.
- Normalization improves data consistency.

### Laboratory Requirements
- Relational database system
- Database design tool or SQL environment
- Understanding of keys and functional dependencies

### Common Precautions
- Identify candidate and primary keys correctly.
- Check functional dependencies before decomposing tables.
- Maintain relationships between normalized tables.
- Avoid unnecessary decomposition.

### Viva Topics
- What is normalization?
- Why is normalization required?
- What is 1NF?
- What is 2NF?
- What is 3NF?
- What is data redundancy?


## ER Diagram

### Concept
An Entity-Relationship (ER) diagram is a visual representation of entities, attributes, and relationships in a database system.

### Working Principle
ER diagrams are used during database design to represent how entities are connected.

Main components:
- Entity
- Attribute
- Relationship
- Primary Key
- Cardinality

Example:
A Student entity can have attributes such as student_id, name, and email. A Student can belong to a Department through a relationship.

### Important Properties
- Entities represent real-world objects.
- Attributes describe entities.
- Relationships describe associations between entities.
- Cardinality represents how many instances participate in a relationship.

### Laboratory Requirements
- ER diagram tool or drawing software
- Knowledge of database entities and relationships

### Common Precautions
- Identify entities correctly.
- Select appropriate primary keys.
- Represent relationships clearly.
- Check cardinality carefully.

### Viva Topics
- What is an ER diagram?
- What is an entity?
- What is an attribute?
- What is a relationship?
- What is cardinality?


## Database Transactions

### Concept
A transaction is a logical unit of database operations that should be completed successfully as a whole.

### Working Principle
Transactions follow the ACID properties:

- Atomicity - all operations are completed or none are applied.
- Consistency - the database remains in a valid state.
- Isolation - concurrent transactions do not improperly interfere with each other.
- Durability - committed changes are preserved.

Common transaction commands include:
- COMMIT
- ROLLBACK
- SAVEPOINT

Example:
START TRANSACTION;

UPDATE Account
SET balance = balance - 500
WHERE account_id = 1;

UPDATE Account
SET balance = balance + 500
WHERE account_id = 2;

COMMIT;

### Important Properties
- COMMIT permanently saves a transaction.
- ROLLBACK undoes changes since the relevant transaction point.
- SAVEPOINT creates a point to which a transaction can be rolled back.

### Laboratory Requirements
- Relational database system
- SQL client
- Database containing transaction-based operations

### Common Precautions
- Verify transaction operations before COMMIT.
- Use ROLLBACK when an operation fails.
- Maintain consistency between related operations.
- Understand transaction boundaries.

### Viva Topics
- What is a transaction?
- What are ACID properties?
- What is COMMIT?
- What is ROLLBACK?
- What is a SAVEPOINT?


## PL/SQL

### Concept
PL/SQL (Procedural Language/SQL) is Oracle's procedural extension to SQL. It combines SQL statements with programming constructs such as variables, conditions, loops, procedures, and exception handling.

### Working Principle
A PL/SQL program is organized into blocks. A basic block contains declaration, execution, and exception-handling sections.

Example:
DECLARE
    total NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO total
    FROM Student;

    DBMS_OUTPUT.PUT_LINE(total);
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('An error occurred');
END;

### Important Features
- Supports variables and constants.
- Supports conditional statements.
- Supports loops.
- Supports procedures and functions.
- Provides exception handling.
- Allows SQL statements inside procedural code.

### Laboratory Requirements
- Oracle Database or compatible environment
- SQL Developer or another Oracle SQL tool
- Basic SQL knowledge

### Common Precautions
- Use correct PL/SQL syntax.
- Declare variables with suitable data types.
- Handle exceptions appropriately.
- Verify SQL statements inside PL/SQL blocks.

### Viva Topics
- What is PL/SQL?
- Difference between SQL and PL/SQL?
- What is a PL/SQL block?
- What is exception handling in PL/SQL?
- What are procedures and functions?