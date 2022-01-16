import type { API } from '~/types/api';
import { PokerBankUser } from '~/types/cards/pokerbank';
import type { APIService } from './api-service.d';

class PokerBankService implements APIService {
  constructor(private readonly api: API) {}

  async get(): Promise<{ users: PokerBankUser[] }> {
    const users = await (
      await this.api(`https://poker-bank.fly.dev/api/users?limit=3`, {
        headers: {
          Authorization: `Bearer ${process.env.POKERBANK_TOKEN}`,
        },
      })
    ).json();

    return users;
  }
}

export default PokerBankService;
