const MemberRepository = require('./repository');

class MemberService {
    async getAllMembers() {
        return MemberRepository.getAllMembers();
    }

    async getMemberByCode(memberCode) {
        return MemberRepository.findMemberByCode(memberCode);
    }

    async penalizeMember(memberId, penalizedUntil) {
        return MemberRepository.updatePenalty(memberId, penalizedUntil);
    }
}

module.exports = new MemberService();
