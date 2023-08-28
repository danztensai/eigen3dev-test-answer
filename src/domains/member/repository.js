const Member = require('./model');

class MemberRepository {
    async getAllMembers() {
        return Member.find();
    }

    async findMemberByCode(memberCode) {
        return Member.findOne({ code: memberCode });
    }

    async updatePenalty(memberId, penalizedUntil) {
        await Member.updateOne({ _id: memberId }, { isPenalized: true, penalizedUntil });
    }
}

module.exports = new MemberRepository();
