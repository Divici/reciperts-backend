const cors = require('cors')
const router = require('express').Router()
const Users = require('./user-model')

router.options('*', cors())

router.get('/', async (req, res, next) => {
    try {
        const users = await Users.get()
        res.json(users)
    }
    catch (err) {
        next(err)
    }
})

router.get('/:user_id', async (req, res, next) => {
    try {
        const users = await Users.getById(req.params.user_id)
        res.json(users)
    } catch (err) {
        next(err)
    }
})

router.get('/:user_id/recipes', async (req, res, next) => {
    try {
      const recipes = await Users.getRecipesByUserId(req.params.user_id)
      res.json(recipes)
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const newUser = await Users.create(req.body)
        res.status(201).json(newUser)
    } catch (err) {
        next(err)
    }
})

router.put('/:user_id', async (req, res, next) => {
    try {
        const { user_id } = req.params
        await Users.update(user_id, req.body)
        const updated = await Users.getById(user_id)
        res.json(updated)
    } catch (err) {
        next(err)
    }
})

module.exports = router