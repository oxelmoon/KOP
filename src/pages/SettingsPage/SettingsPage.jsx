import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import FormField from "../../components/FormField/FormField";
import useSettingsForm from "../../hooks/useSettingsForm";
import {
  BOARD_SIZES,
  BOT_SPEED_LABELS,
  DIFFICULTY_LABELS,
  MAX_ROUNDS_TO_WIN,
  MAX_TURN_TIME,
  MIN_WIN_LENGTH,
  MODE_LABELS,
} from "../../config/settings";
import "./SettingsPage.css";

export default function SettingsPage({ onBack }) {
  const { fields, errors, onSubmit, resetToDefaults, isPvc, maxWinLength, canSave } =
    useSettingsForm({ onSaved: onBack });

  return (
    <main className="page settings-page">
      <Header />
      <section className="settings-content">
        <p className="eyebrow">НАЛАШТУВАННЯ</p>
        <h1>Параметри гри</h1>

        <form className="settings-form" onSubmit={onSubmit} noValidate>
          <FormField id="mode" label="Режим гри">
            <div className="segmented" id="mode">
              {Object.entries(MODE_LABELS).map(([value, label]) => (
                <label key={value} className="segmented__option">
                  <input type="radio" value={value} {...fields.mode} />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </FormField>

          {isPvc && (
            <div className="settings-form__row">
              <FormField id="difficulty" label="Рівень складності" error={errors.difficulty?.message}>
                <select id="difficulty" className="form-control" {...fields.difficulty}>
                  {Object.entries(DIFFICULTY_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </FormField>

              <FormField id="botSpeed" label="Швидкість ходу комп'ютера" error={errors.botSpeed?.message}>
                <select id="botSpeed" className="form-control" {...fields.botSpeed}>
                  {Object.entries(BOT_SPEED_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </FormField>
            </div>
          )}

          <div className="settings-form__row">
            <FormField id="boardSize" label="Розмір поля" error={errors.boardSize?.message}>
              <select id="boardSize" className="form-control" {...fields.boardSize}>
                {BOARD_SIZES.map((size) => (
                  <option key={size} value={size}>{size} × {size}</option>
                ))}
              </select>
            </FormField>

            <FormField
              id="winLength"
              label="Фішок у ряд для перемоги"
              hint={`Від ${MIN_WIN_LENGTH} до ${maxWinLength}`}
              error={errors.winLength?.message}
            >
              <input
                id="winLength"
                className="form-control"
                type="number"
                min={MIN_WIN_LENGTH}
                max={maxWinLength}
                {...fields.winLength}
              />
            </FormField>
          </div>

          <div className="settings-form__row">
            <FormField
              id="turnTime"
              label="Час на хід, с"
              hint="0 — без обмеження часу"
              error={errors.turnTime?.message}
            >
              <input
                id="turnTime"
                className="form-control"
                type="number"
                min={0}
                max={MAX_TURN_TIME}
                {...fields.turnTime}
              />
            </FormField>

            <FormField
              id="roundsToWin"
              label="Перемог для виграшу матчу"
              hint={`Від 1 до ${MAX_ROUNDS_TO_WIN}`}
              error={errors.roundsToWin?.message}
            >
              <input
                id="roundsToWin"
                className="form-control"
                type="number"
                min={1}
                max={MAX_ROUNDS_TO_WIN}
                {...fields.roundsToWin}
              />
            </FormField>
          </div>

          <div className="settings-form__actions">
            <Button type="submit" disabled={!canSave}>Зберегти</Button>
            <Button variant="secondary" onClick={resetToDefaults}>Скинути до стандартних</Button>
            <Button variant="secondary" onClick={onBack}>Назад без збереження</Button>
          </div>
        </form>
      </section>
    </main>
  );
}
