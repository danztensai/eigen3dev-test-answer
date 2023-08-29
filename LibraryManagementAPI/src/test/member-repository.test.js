const MemberRepository = require('../domains/member/repository');
const Member = require('../domains/member/model');

// Mock the Member model
jest.mock('../domains/member/model');

describe('MemberRepository', () => {
  beforeEach(() => {
    // Clear all mock instances and calls
    jest.clearAllMocks();
  });

  it('should get all members', async () => {
    // Mock the Member.find() method to return an array of members
    Member.find.mockResolvedValue([
      { code: 'M001', name: 'Angga' },
      { code: 'M002', name: 'Ferry' },
      // Add more mock members as needed
    ]);

    // Call the getAllMembers() method
    const members = await MemberRepository.getAllMembers();

    // Verify that the correct members are returned
    expect(members).toEqual([
      { code: 'M001', name: 'Angga' },
      { code: 'M002', name: 'Ferry' },
      // Add more expected members as needed
    ]);
  });

  it('should find a member by code', async () => {
    const mockMember = { code: 'M001', name: 'Angga' };
    // Mock the Member.findOne() method to return a specific member
    Member.findOne.mockResolvedValue(mockMember);

    // Call the findMemberByCode() method
    const member = await MemberRepository.findMemberByCode('M001');

    // Verify that the correct member is returned
    expect(member).toEqual(mockMember);
  });

  it('should update member penalty', async () => {
    // Mock the Member.updateOne() method
    Member.updateOne.mockResolvedValue({ nModified: 1 });

    const memberId = 'someMemberId';
    const penalizedUntil = new Date();

    // Call the updatePenalty() method
    await MemberRepository.updatePenalty(memberId, penalizedUntil);

    // Verify that the updateOne() method was called with the correct arguments
    expect(Member.updateOne).toHaveBeenCalledWith(
      { _id: memberId },
      { isPenalized: true, penalizedUntil }
    );
  });

  // Add more test cases as needed
});
