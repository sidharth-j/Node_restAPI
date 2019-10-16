const express = require('express')
const router = express.Router()
const Car = require('../models/car')


router.get('/',async(req,res)=>{
    try{
        const cars = await Car.find()
        res.json(cars)

    }catch{
        res.status(500).json({message: err.message})

    }

})


//get
router.get('/:id',getCar,(req,res)=>{
    res.json(res.car)
})


//create
router.post('/',async (req,res)=>{
    const car = new Car({
        name:req.body.name,
        carBooked: req.body.carBooked
    })
    try {
        const newCar = await car.save()
        res.status(201).json(newCar)

    }catch(err){
        res.status(400).json({ message: err.message })

    }
})


//update

router.patch('/:id',getCar,async (req,res)=>{
    if (req.body.name != null) {
        res.car.name = req.body.name
      }
      if (req.body.carBooked != null) {
        res.car.isAvailable = req.body.isAvailable
      }
      try {
        const updateCar = await res.car.save()
        res.json(updateCar)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
})


router.delete('/:id',async (req,res)=>{
    try {
        await res.car.remove()
        res.json({ message: 'Deleted car' })
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
})


async function getCar(req, res, next) {
    let car
    try {
      car = await Car.findById(req.params.id)
      if (car == null) {
        return res.status(404).json({ message: 'Cannot find car' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.car = car
    next()
  }


module.exports = router