import Card from "../../components/Card/Card";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "../../components/Button/Button";
import FormField, { fieldStyles } from "../../components/FormField/FormField";
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
import styles from "./SettingsPage.module.css";

export default function SettingsPage() {
  const {
    fields,
    errors,
    onSubmit,
    resetToDefaults,
    discardChanges,
    goBack,
    notice,
    savedAt,
    currentSummary,
    hasActiveMatch,
    isDirty,
    isPvc,
    maxWinLength,
    canSave,
  } = useSettingsForm();

  return (
    <>
      <PageTitle eyebrow="Налаштування" title="Параметри гри" />

      <Card className={styles.current}>
        <div className={styles.currentHeader}>
          <h2 className={styles.currentTitle}>Збережені налаштування</h2>
          {savedAt && <span className={styles.savedAt}>змінено о {savedAt}</span>}
        </div>
        <ul className={styles.chips}>
          {currentSummary.map((item) => (
            <li key={item} className={styles.chip}>{item}</li>
          ))}
        </ul>
        {hasActiveMatch && (
          <p className={styles.hint}>Є незавершений матч — нові налаштування діятимуть з наступного.</p>
        )}
      </Card>

      <Card>
        <form className={styles.form} onSubmit={onSubmit} noValidate>
          <FormField id="mode" label="Режим гри">
            <div className={fieldStyles.segmented} id="mode">
              {Object.entries(MODE_LABELS).map(([value, label]) => (
                <label key={value} className={fieldStyles.option}>
                  <input type="radio" value={value} {...fields.mode} />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </FormField>

          {isPvc && (
            <div className={styles.row}>
              <FormField id="difficulty" label="Рівень складності" error={errors.difficulty?.message}>
                <select id="difficulty" className={fieldStyles.control} {...fields.difficulty}>
                  {Object.entries(DIFFICULTY_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </FormField>

              <FormField id="botSpeed" label="Швидкість ходу комп'ютера" error={errors.botSpeed?.message}>
                <select id="botSpeed" className={fieldStyles.control} {...fields.botSpeed}>
                  {Object.entries(BOT_SPEED_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </FormField>
            </div>
          )}

          <div className={styles.row}>
            <FormField id="boardSize" label="Розмір поля" error={errors.boardSize?.message}>
              <select id="boardSize" className={fieldStyles.control} {...fields.boardSize}>
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
                className={fieldStyles.control}
                type="number"
                min={MIN_WIN_LENGTH}
                max={maxWinLength}
                {...fields.winLength}
              />
            </FormField>
          </div>

          <div className={styles.row}>
            <FormField
              id="turnTime"
              label="Час на хід, с"
              hint="0 — без обмеження часу"
              error={errors.turnTime?.message}
            >
              <input
                id="turnTime"
                className={fieldStyles.control}
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
                className={fieldStyles.control}
                type="number"
                min={1}
                max={MAX_ROUNDS_TO_WIN}
                {...fields.roundsToWin}
              />
            </FormField>
          </div>

          {notice && <p className={styles.notice} role="status">✓ {notice}</p>}
          {isDirty && <p className={styles.unsaved}>Є незбережені зміни</p>}

          <div className={styles.actions}>
            <Button type="submit" disabled={!canSave}>Зберегти</Button>
            <div className={styles.secondaryActions}>
              <Button variant="secondary" onClick={discardChanges} disabled={!isDirty}>
                Скасувати зміни
              </Button>
              <Button variant="secondary" onClick={resetToDefaults}>Стандартні</Button>
            </div>
            <Button variant="ghost" onClick={goBack}>На головну</Button>
          </div>
        </form>
      </Card>
    </>
  );
}
