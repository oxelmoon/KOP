import * as yup from "yup";
import {
  BOARD_SIZES,
  BOT_SPEEDS,
  DIFFICULTIES,
  MAX_ROUNDS_TO_WIN,
  MAX_TURN_TIME,
  MIN_TURN_TIME,
  MIN_WIN_LENGTH,
  MODES,
} from "../config/settings";

// Порожнє поле number-інпуту приходить як "" → перетворюємо на undefined,
// щоб спрацювало повідомлення required, а не "must be a number".
const number = () =>
  yup
    .number()
    .transform((value, original) => (original === "" ? undefined : value))
    .typeError("Введіть число")
    .integer("Лише ціле число");

export const settingsSchema = yup.object({
  mode: yup.string().oneOf(Object.values(MODES)).required(),

  difficulty: yup
    .string()
    .oneOf(Object.values(DIFFICULTIES), "Оберіть рівень складності")
    .required(),

  boardSize: number()
    .oneOf(BOARD_SIZES, "Недопустимий розмір поля")
    .required("Оберіть розмір поля"),

  winLength: number()
    .required("Вкажіть довжину лінії")
    .min(MIN_WIN_LENGTH, `Мінімум ${MIN_WIN_LENGTH}`)
    .max(yup.ref("boardSize"), "Не може бути більшою за розмір поля"),

  turnTime: number()
    .required("Вкажіть час (0 — без таймера)")
    .min(0, "Не може бути від'ємним")
    .max(MAX_TURN_TIME, `Максимум ${MAX_TURN_TIME} с`)
    .test(
      "zero-or-min",
      `0 (вимкнено) або від ${MIN_TURN_TIME} с`,
      (value) => value === 0 || value >= MIN_TURN_TIME
    ),

  botSpeed: yup.string().oneOf(Object.keys(BOT_SPEEDS)).required(),

  roundsToWin: number()
    .required("Вкажіть кількість перемог")
    .min(1, "Мінімум 1")
    .max(MAX_ROUNDS_TO_WIN, `Максимум ${MAX_ROUNDS_TO_WIN}`),
});
