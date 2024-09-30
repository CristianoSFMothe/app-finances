import prismaClient from "../../prisma";

interface UserRequest {
  user_id: string;
  date: string;
}

interface ItemProp {
  id: string;
  description: string;
  value: number;
  type: string;
  date: string;
  user_id: string;
}

class ListUserBalanceService {
  async execute({ user_id, date }: UserRequest) {
    if (!user_id) {
      throw new Error("Invalid user");
    }

    const dashboard = [];
    const findUser = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
    });

    if (!findUser) {
      throw new Error("Usuário não encontrado.");
    }

    const findReceive = await prismaClient.receive.findMany({
      where: {
        date: date,
        user_id: user_id,
        type: 'receita',
      },
    });

    const findExpenses = await prismaClient.receive.findMany({
      where: {
        date: date,
        user_id: user_id,
        type: 'despesa',
      },
    });

    const resultRevenue = findReceive.reduce((total, num: ItemProp) => total + num.value, 0);
    const resultExpenses = findExpenses.reduce((total, num: ItemProp) => total + num.value, 0);

    const saldo = resultRevenue - resultExpenses;

    const data = {
      tag: 'saldo',
      saldo: saldo,
    };

    const sumDailyRevenue = {
      tag: 'receita',
      saldo: resultRevenue,
    };

    const sumDailyExpense = {
      tag: 'despesa',
      saldo: resultExpenses,
    };

    dashboard.push(data, sumDailyRevenue, sumDailyExpense);

    return dashboard;
  }
}

export { ListUserBalanceService };
