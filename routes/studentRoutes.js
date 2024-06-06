const Student = require('../models/Student');
const {  verifyTokenAndAdmin} = require('../utils/jwt');
const router = require('express').Router();


//create 
router.post('/create',verifyTokenAndAdmin, async (req, res) => {
    const { firstName, lastName, gender, age, phoneNumber, course} = req.body;
    try {
        const student = await Student.create({ firstName, lastName, gender, age, phoneNumber, course })
        res.status(200).send(student)
    } catch (error) {
        res.status(400).json(error)
    }
})

//read
router.get('/allstudents',verifyTokenAndAdmin, async (req, res) => {
    try {
        const students = await Student.find({})
        res.status(200).json(students)
    } catch (error) {
        res.status(400).json(error)
    }
})

//upate
router.put("/:id",verifyTokenAndAdmin, async (req, res) => {
    try {
        const updateStudent = await Student.findByIdAndUpdate(req.params.id,{$set:req.body}, { new: true })
        res.status(200).json(updateStudent )

    } catch (error) {
        res.status(400).json(error)

    }
})

//delete
router.delete('/:id',verifyTokenAndAdmin, async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id)
        res.status(201).json("student deleted")
    } catch (error) {
        res.status(400).json(error)
    }
})


module.exports = router;