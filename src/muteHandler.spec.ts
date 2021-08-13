import { CustomMocks } from '@lambocreeper/mock-discord.js';
import { Message, Role } from 'discord.js';

import { muteHandler } from './muteHandler';

jest.useFakeTimers();

describe('MuteHandler', () => {
  it('does nothing to normal message', async () => {
    const message = CustomMocks.getMessage({
      content: 'hello world',
    });

    const {
      mockMessageReply,
      mockMessageDelete,
      mockAddRole,
      mockRemoveRole,
    } = mockFunctions(message);

    await muteHandler(message);

    expect(mockMessageReply).not.toHaveBeenCalled();
    expect(mockMessageDelete).not.toHaveBeenCalled();
    expect(mockAddRole).not.toHaveBeenCalled();

    jest.runOnlyPendingTimers();

    expect(mockRemoveRole).not.toHaveBeenCalled();
  });

  it("delete any messages with 'knife', and mutes the user", async () => {
    // Setup
    const message = CustomMocks.getMessage({
      content: 'i have a knife for free.',
    });

    const {
      mockMessageReply,
      mockMessageDelete,
      mockAddRole,
      mockRemoveRole,
    } = mockFunctions(message);

    // Execute
    await muteHandler(message);

    // Assert
    expect(mockMessageReply).toHaveBeenCalled();
    expect(mockMessageDelete).toHaveBeenCalled();
    expect(mockAddRole).toHaveBeenCalled();

    jest.runOnlyPendingTimers();
    expect(mockRemoveRole).toHaveBeenCalled();
  });

  it("mutes any messages with '.ru', and mutes the user", async () => {
    const message = CustomMocks.getMessage({
      content: 'steamcommunity.ru',
    });

    const {
      mockMessageReply,
      mockMessageDelete,
      mockAddRole,
      mockRemoveRole,
    } = mockFunctions(message);

    await muteHandler(message);

    expect(mockMessageReply).toHaveBeenCalled();
    expect(mockMessageDelete).toHaveBeenCalled();
    expect(mockAddRole).toHaveBeenCalled();

    jest.runOnlyPendingTimers();

    expect(mockRemoveRole).toHaveBeenCalled();
  });

  it("mutes any messages with 'discorcl', and mutes the user", async () => {
    const message = CustomMocks.getMessage({
      content: 'get discord nitro at discorcl.com',
    });

    const {
      mockMessageReply,
      mockMessageDelete,
      mockAddRole,
      mockRemoveRole,
    } = mockFunctions(message);

    await muteHandler(message);

    expect(mockMessageReply).toHaveBeenCalled();
    expect(mockMessageDelete).toHaveBeenCalled();
    expect(mockAddRole).toHaveBeenCalled();

    jest.runOnlyPendingTimers();

    expect(mockRemoveRole).toHaveBeenCalled();
  });
});

function mockFunctions(message: Message) {
  const mockMessageDelete = jest
    .spyOn(message, 'delete')
    .mockResolvedValue(message);

  const mockMessageReply = jest.spyOn(message, 'reply').mockReturnThis();

  const mockMutedRole = ('foo' as unknown) as Role;

  jest.spyOn(message.guild!.roles.cache, 'find').mockReturnValue(mockMutedRole);

  // Have to mock .roles & then mock .add
  jest.spyOn(message.member!, 'roles', 'get').mockReturnValue(({
    add: jest.fn(),
    remove: jest.fn(),
  } as unknown) as any);

  const mockAddRole = jest
    .spyOn(message.member!.roles, 'add')
    .mockImplementation(async () => message.member!);

  const mockRemoveRole = jest
    .spyOn(message.member!.roles, 'remove')
    .mockImplementation(async () => message.member!);

  return { mockMessageReply, mockMessageDelete, mockAddRole, mockRemoveRole };
}
