// eslint-disable-next-line @typescript-eslint/no-var-requires
const { body } = require('express-validator');

export const createReservationRules = () => [
  body('partySize').isNumeric().withMessage("Param 'partySize' must be a valid number"),
  body('customerName').isString().withMessage("Param 'customerName' must be a valid string"),
  body('customerEmail').isEmail().withMessage("Param 'customerEmail' must be a valid email"),
  body('datetime').isISO8601().withMessage("Param 'datetime' must be a valid datetime")
];

const allowUpdateValues = ['customerName', 'customerEmail'];

export const updateReservationRules = () => [
  body('customerName').isString().withMessage("Param 'customerName' must be a valid string"),
  body('customerEmail').isEmail().withMessage("Param 'customerEmail' must be a valid email"),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body().custom((_: any, { req }: any) => {
    const sentFields = Object.keys(req.body);
    const extraFields = sentFields.filter((field) => !allowUpdateValues.includes(field));

    if (extraFields.length > 0) {
      throw new Error(`Unexpected fields: ${extraFields.join(', ')}`);
    }

    return true;
  })
];
