const { createAccount } = require('./utils/createAccount');
const { bootstrap } = require('./utils/bootstrap');

describe('Create account', () => {
  let context;

  beforeAll(async () => {
    const _context = await bootstrap();

    context = _context;
  });

  it('should create account successfully', async () => {
    await createAccount(context.page);
  });
});
