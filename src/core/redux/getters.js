import moment from 'moment';

export const getExpense = (expenses, date) => {
  return expenses.filter((expense) => {
    return moment(expense.date).isSame(date, 'day');
  });
};

export const getTotalExpenseByDate = (expenses, date) => {
  const filterExpense = expenses.filter((expense) => {
    return moment(expense.date).isSame(date, 'day');
  });
  return filterExpense.reduce((total, item) => {
    return total + parseInt(item.price);
  }, 0);
};

export const getIncome = (incomes, date) => {
  return incomes.filter((income) => {
    return moment(income.date).isSame(date, 'day');
  });
};

export const getTotalIncomeByDate = (incomes, date) => {
  const filterIncomes = incomes.filter((income) => {
    return moment(income.date).isSame(date, 'day');
  });
  return filterIncomes.reduce((total, item) => {
    return total + parseInt(item.price);
  }, 0);
};

export const getMonthIncome = (incomes, month) => {
  const filterIncomes = incomes.filter((income) => {
    return moment(income.date).isSame(month, 'month');
  });
  return filterIncomes.reduce((total, item) => {
    return total + parseInt(item.price);
  }, 0);
};

export const getMonthExpense = (expense, month) => {
  const filterExpenses = expense.filter((income) => {
    return moment(income.date).isSame(month, 'month');
  });
  return filterExpenses.reduce((total, item) => {
    return total + parseInt(item.price);
  }, 0);
};

export const isLoading = (state) => state.expense !== [] && state.income !== [];

export const isNewUser = (state) => state.balance === null;
