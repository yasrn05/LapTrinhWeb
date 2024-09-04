class Student {
    constructor(id, name, gender, dob, hometown) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.dob = dob;
        this.hometown = hometown;
    }
}

class StudentManager {
    constructor() {
        this.students = JSON.parse(localStorage.getItem('students')) || [];
        this.loadStudents();
    }

    addStudent(student) {
        this.students.push(student);
        this.saveStudents();
        this.loadStudents();
    }

    updateStudent(index, student) {
        this.students[index] = student;
        this.saveStudents();
        this.loadStudents();
    }

    deleteStudent(index) {
        this.students.splice(index, 1);
        this.saveStudents();
        this.loadStudents();
    }

    saveStudents() {
        localStorage.setItem('students', JSON.stringify(this.students));
    }

    loadStudents() {
        const studentTable = document.querySelector('#studentTable tbody');
        studentTable.innerHTML = '';

        this.students.forEach((student, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.gender}</td>
                <td>${student.dob}</td>
                <td>${student.hometown}</td>
                <td>
                    <button onclick="editStudent(${index})">Sửa</button>
                    <button onclick="deleteStudent(${index})">Xóa</button>
                </td>
            `;
            studentTable.appendChild(row);
        });
    }
}

const manager = new StudentManager();

document.querySelector('#studentForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const id = document.querySelector('#studentId').value;
    const name = document.querySelector('#name').value;
    const gender = document.querySelector('#gender').value;
    const dob = document.querySelector('#dob').value;
    const hometown = document.querySelector('#hometown').value;

    const student = new Student(id, name, gender, dob, hometown);

    if (document.querySelector('#submitBtn').style.display !== 'none') {
        manager.addStudent(student);
    } else {
        const index = document.querySelector('#submitBtn').getAttribute('data-index');
        manager.updateStudent(index, student);
        document.querySelector('#submitBtn').style.display = 'inline-block';
        document.querySelector('#updateBtn').style.display = 'none';
    }

    document.querySelector('#studentForm').reset();
});

function editStudent(index) {
    const student = manager.students[index];
    document.querySelector('#studentId').value = student.id;
    document.querySelector('#name').value = student.name;
    document.querySelector('#gender').value = student.gender;
    document.querySelector('#dob').value = student.dob;
    document.querySelector('#hometown').value = student.hometown;

    document.querySelector('#submitBtn').style.display = 'none';
    document.querySelector('#updateBtn').style.display = 'inline-block';
    document.querySelector('#submitBtn').setAttribute('data-index', index);
}

function deleteStudent(index) {
    if (confirm('Bạn có chắc chắn muốn xóa sinh viên này?')) {
        manager.deleteStudent(index);
    }
}
