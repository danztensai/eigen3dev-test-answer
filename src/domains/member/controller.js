const MemberService = require('./service');

const getAllMembers = async (req, res) => {
    try {
        const members = await MemberService.getAllMembers();
        res.json(members);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message });
    }
};

const getMemberByCode = async (req, res) => {
    const { memberCode } = req.params;
    try {
        const member = await MemberService.getMemberByCode(memberCode);
        if (member) {
            res.json(member);
        } else {
            res.status(404).json({ error: 'Member not found' });
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message });
    }
};

const penalizeMember = async (req, res) => {
    const { memberId } = req.params;
    const { penalizedUntil } = req.body;

    try {
        await MemberService.penalizeMember(memberId, penalizedUntil);
        res.json({ message: 'Member penalized successfully' });
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllMembers,
    getMemberByCode,
    penalizeMember,
};
