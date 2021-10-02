import {BudgetService} from "./budgetService"

describe("Budget Service", () => {
  let budgetService = new BudgetService
  beforeEach(() => {
    budgetService = new BudgetService
  })

  function budgetShouldBe(start, end, expected) {
    expect(budgetService.query(start, end)).toBe(expected)
  }

  it("no budget", () => {
    budgetService.getAll = () => []
    budgetShouldBe("2021-10-01", "2021-11-30", 0)
  })

  it("full month", () => {
    budgetService.getAll = () => ([{yearMonth: "202110", amount: 310}])
    budgetShouldBe("2021-10-01", "2021-10-31", 310)
  })

  it("full month 11", () => {
    budgetService.getAll = () => [{yearMonth: "202111", amount: 150}]
    budgetShouldBe("2021-11-01", "2021-11-30", 150)
  })

})
