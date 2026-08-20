const express = require("express");

const app = express();

app.use(express.json());

const PORT = 3000;

// In-memory student storage
let students = [];
let currentId = 1;

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Student Record Management API is running"
    });
});

// Add a new student
app.post("/students", (req, res) => {
    const {
        name,
        usn,
        age,
        dob,
        course,
        department,
        year,
        hobbies
    } = req.body;

    // Validate required fields
    if (
        !name ||
        !usn ||
        !age ||
        !dob ||
        !course ||
        !department ||
        !year
    ) {
        return res.status(400).json({
            message: "All required fields must be filled"
        });
    }

    // Create student object
    const student = {
        id: currentId++,
        name: name,
        usn: usn,
        age: age,
        dob: dob,
        course: course,
        department: department,
        year: year,
        hobbies: hobbies || []
    };

    // Store student
    students.push(student);

    // Send response
    res.status(201).json({
        message: "Student added successfully",
        student: student
    });
});

// Get all students
app.get("/students", (req, res) => {
    res.status(200).json(students);
});

// Get a single student by ID
app.get("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.status(200).json(student);
});

// Update a student
app.put("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const studentIndex = students.findIndex(student => student.id === id);

    if (studentIndex === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const {
        name,
        usn,
        age,
        dob,
        course,
        department,
        year,
        hobbies
    } = req.body;

    students[studentIndex] = {
        id: id,
        name: name,
        usn: usn,
        age: age,
        dob: dob,
        course: course,
        department: department,
        year: year,
        hobbies: hobbies || []
    };

    res.status(200).json({
        message: "Student updated successfully",
        student: students[studentIndex]
    });
});

// Delete a student
app.delete("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const studentIndex = students.findIndex(student => student.id === id);

    if (studentIndex === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(studentIndex, 1);

    res.status(200).json({
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});