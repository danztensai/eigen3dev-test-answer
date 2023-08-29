const MemberRepository = require('../domains/member/repository');
const Member = require('../domains/member/model');

jest.mock('../domains/member/model');

describe('MemberRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get all members', async () => {
    Member.find.mockResolvedValue([
      { code: 'M001', name: 'Angga' },
      { code: 'M002', name: 'Ferry' },
    ]);
    const members = await MemberRepository.getAllMembers();

    expect(members).toEqual([
      { code: 'M001', name: 'Angga' },
      { code: 'M002', name: 'Ferry' },
    ]);
  });

  it('should find a member by code', async () => {
    const mockMember = { code: 'M001', name: 'Angga' };

    Member.findOne.mockResolvedValue(mockMember);
    const member = await MemberRepository.findMemberByCode('M001');
    expect(member).toEqual(mockMember);
  });

  it('should update member penalty', async () => {
    Member.updateOne.mockResolvedValue({ nModified: 1 });

    const memberId = 'someMemberId';
    const penalizedUntil = new Date();
    await MemberRepository.updatePenalty(memberId, penalizedUntil);
    expect(Member.updateOne).toHaveBeenCalledWith(
      { _id: memberId },
      { isPenalized: true, penalizedUntil }
    );
  });
});
