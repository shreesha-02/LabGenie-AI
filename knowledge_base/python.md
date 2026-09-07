# Python Knowledge Base

## Python Basics

### Concept
Python is a high-level, interpreted programming language known for its simple syntax and readability. It supports procedural, object-oriented, and functional programming.

### Working Principle
Python programs are generally executed by the Python interpreter. Python source code is converted into bytecode and executed by the Python Virtual Machine.

### Important Features
- Simple and readable syntax
- Dynamically typed
- Interpreted
- Object-oriented
- Large standard library
- Supports multiple programming paradigms

### Laboratory Requirements
- Python 3.x
- VS Code, PyCharm, IDLE, or Jupyter Notebook
- Basic programming knowledge

### Common Precautions
- Use correct indentation.
- Use meaningful variable names.
- Check syntax carefully.
- Use the correct Python version.

### Viva Topics
- What is Python?
- What are the advantages of Python?
- What is an interpreted language?
- What is dynamic typing?
- What is indentation in Python?


## Lists and Tuples

### Concept
Lists and tuples are sequence data types used to store collections of values. Lists are mutable, while tuples are immutable.

### Working Principle
A list is created using square brackets, while a tuple is created using parentheses.

Example:
numbers = [10, 20, 30]
coordinates = (10, 20, 30)

Lists can be modified after creation using operations such as append(), insert(), remove(), and pop(). Tuple elements cannot be modified after creation.

### Important Properties
- Lists are mutable.
- Tuples are immutable.
- Both support indexing and slicing.
- Both can store multiple data types.

### Laboratory Requirements
- Python 3.x
- Python IDE or code editor

### Common Precautions
- Remember that indexing starts from 0.
- Do not attempt to modify tuple elements.
- Use the appropriate data structure based on whether modification is required.

### Viva Topics
- What is a list?
- What is a tuple?
- What is the difference between a list and tuple?
- What does mutable mean?
- How do you access an element using an index?


## Functions

### Concept
A function is a reusable block of code designed to perform a specific task. Functions improve code organization, reusability, and maintainability.

### Working Principle
A function is defined using the def keyword. It can accept parameters and return a result using the return statement.

Example:
def add(a, b):
    return a + b

result = add(10, 20)

### Important Properties
- Functions can accept parameters.
- Functions can return values.
- Functions reduce code duplication.
- Functions can be called multiple times.

### Laboratory Requirements
- Python 3.x
- Python IDE or code editor

### Common Precautions
- Use meaningful function names.
- Pass the correct number of arguments.
- Maintain proper indentation.
- Use return when a result needs to be sent back.

### Viva Topics
- What is a function?
- Why are functions used?
- What is a parameter?
- What is the difference between parameter and argument?
- What is the purpose of return?


## File Handling

### Concept
File handling in Python allows programs to create, read, write, append, and modify files stored on a computer.

### Working Principle
Python provides the open() function to work with files.

Common file modes:
- r - read
- w - write
- a - append
- x - create

Example:
file = open("example.txt", "r")
content = file.read()
file.close()

The preferred approach is using the with statement because it automatically closes the file.

Example:
with open("example.txt", "r") as file:
    content = file.read()

### Important Operations
- read() - reads the complete file
- readline() - reads one line
- readlines() - reads multiple lines
- write() - writes data
- writelines() - writes multiple lines

### Laboratory Requirements
- Python 3.x
- A text file for testing
- Python IDE or code editor

### Common Precautions
- Check whether the file exists before reading.
- Use the correct file mode.
- Avoid accidentally overwriting important files.
- Prefer the with statement for safe file handling.
- Close files properly when not using with.

### Viva Topics
- What is file handling?
- What is the purpose of open()?
- What is the difference between r, w, and a modes?
- Why is the with statement used?
- What is the difference between read() and readline()?


## Exception Handling

### Concept
Exception handling allows a Python program to handle runtime errors without terminating unexpectedly.

### Working Principle
Python uses try, except, else, and finally blocks to handle exceptions.

Example:
try:
    number = int(input("Enter a number: "))
    result = 10 / number
except ValueError:
    print("Invalid input")
except ZeroDivisionError:
    print("Cannot divide by zero")
finally:
    print("Program completed")

### Important Properties
- try contains code that may cause an exception.
- except handles the exception.
- else executes when no exception occurs.
- finally executes regardless of whether an exception occurs.

### Laboratory Requirements
- Python 3.x
- Python IDE or code editor

### Common Precautions
- Handle only expected exceptions.
- Avoid using a broad except block unnecessarily.
- Provide meaningful error messages.
- Keep exception-handling code simple.

### Viva Topics
- What is an exception?
- What is exception handling?
- What is the purpose of try?
- What is the purpose of finally?
- Difference between syntax error and runtime exception?


## Object-Oriented Programming

### Concept
Object-Oriented Programming (OOP) is a programming approach based on classes and objects. It helps organize programs into reusable and manageable components.

### Working Principle
A class acts as a blueprint for creating objects. Objects contain data and methods that operate on that data.

Example:
class Student:
    def __init__(self, name):
        self.name = name

    def display(self):
        print(self.name)

student = Student("Alex")
student.display()

### Important Concepts
- Class
- Object
- Encapsulation
- Inheritance
- Polymorphism
- Abstraction

### Laboratory Requirements
- Python 3.x
- Python IDE or code editor

### Common Precautions
- Define classes and methods with proper indentation.
- Use meaningful class and method names.
- Initialize object attributes correctly.
- Understand the difference between class and object.

### Viva Topics
- What is OOP?
- What is a class?
- What is an object?
- What is inheritance?
- What is polymorphism?
- What is encapsulation?