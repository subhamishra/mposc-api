const express = require('express');
const router = express.Router();
const caseContact = require('../model/caseContact');


router.post('/add', async function (req, res) {
    const data = await caseContact.addCaseContact(req.body);
    if (data.isError) {
        res.send(data);
    } else {
        res.send(data);
    }
})

router.post('/update', async function (req, res) {
    const data = await caseContact.updateCaseContact(req.body);
    if (data.isError) {
        res.send(data);
    } else {
        res.send(data);
    }
})

router.get('/contactById', async function (req, res) {
    const data = await caseContact.getCaseContact(req.query);
    if (data.isError) {
        res.send(data);
    } else {
        res.send(data);
    }
})

router.get('/', async function (req, res) {
    const data = await caseContact.getAllCaseContact();
    if (data.isError) {
        res.send(data);
    } else {
        res.send(data);
    }
})

router.get('/delete', async function (req, res) {
    const data = await caseContact.deleteCaseContact(req.query);
    if (data.isError) {
        res.send(data);
    } else {
        res.send(data);
    }
})


module.exports = router;
