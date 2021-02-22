const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');

//Gets all members
router.get('/', (req, res) => {
	res.json(members);
});

//Get single member
router.get('/:id', (req, res) => {
	const found = members.some(member => member.id === parseInt(req.params.id));

	if(found) {
		res.json(members.filter(member => member.id === parseInt(req.params.id)));
	} else {
		res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
	}
});

// Create member (can use same route as get because it is a post instead)
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'Name or email not included'})
    }

    members.push(newMember);
    res.json(members);
    //res.redirect('/');
});

// Update Member
router.put('/:id', (req, res) => {
	const found = members.some(member => member.id === parseInt(req.params.id));

	if (found) {
		const updatedMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)) {
                member.name = updatedMember.name ? updatedMember.name : member.name;
                member.email = updatedMember.email ? updatedMember.email : member.email;

                res.json({msg: "Member updated", member: member})
            }
        });
	} else {
		res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
	}
});

//Delete member
router.delete('/:id', (req, res) => {
	const found = members.some(member => member.id === parseInt(req.params.id));

	if(found) {
		res.json({ 
            msg: 'Member deleted', 
            members: members.filter(member => member.id !== parseInt(req.params.id))
        });
	} else {
		res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
	}
});

module.exports = router;