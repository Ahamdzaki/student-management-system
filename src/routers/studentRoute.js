import express from 'express';
import { Student } from '../model/student.js';

const router = new express.Router();

/**
 * CREATE student
 */
router.post('/students', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();

        res.status(201).send({
            message: 'Student created successfully',
            student
        });
    } catch (e) {
        res.status(400).send({
            error: 'Failed to create student',
            details: e.message
        });
    }
});

/**
 * GET all students
 */
router.get('/students', async (req, res) => {
    try {
        const students = await Student.find({});
        res.status(200).send(students);
    } catch (e) {
        res.status(500).send(e);
    }
});

/**
 * GET student by ID
 */
router.get('/students/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).send({ error: 'Student not found' });
        }

        res.send(student);
    } catch (e) {
        res.status(400).send(e);
    }
});

/**
 * DELETE student
 */
router.delete('/students/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).send({
                error: 'Student not found. Unable to delete.'
            });
        }

        res.send({
            message: 'Student deleted successfully',
            student
        });
    } catch (e) {
        res.status(400).send(e);
    }
});

/**
 * UPDATE student
 */
router.patch('/students/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'age', 'email', 'password'];

    const isValid = updates.every(update =>
        allowedUpdates.includes(update)
    );

    if (!isValid) {
        return res.status(400).send({ error: 'Invalid update fields' });
    }

    if (updates.length === 0) {
        return res.status(400).send({ error: 'No update data provided' });
    }

    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!student) {
            return res.status(404).send({ error: 'Student not found' });
        }

        res.send({
            message: 'Student updated successfully',
            student
        });
    } catch (e) {
        res.status(400).send(e);
    }
});

export default router;
