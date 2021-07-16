import { validateFormatDate } from "../services/pagos";

describe("Test for services", () => {
  beforeAll(() => jest.setTimeout(90 * 1000));

  test("ValidateFormatDate is valid", () => {
    const newDate = "05/05/2021";
    const res = validateFormatDate(newDate);
    expect(res).toEqual(new Date("05/05/2021"));
  });

  test("ValidateFormatDate is no valid", () => {
    const newDate = "2021-05/01";
    const res = validateFormatDate(newDate);
    expect(res).toEqual(false);
  });
});
