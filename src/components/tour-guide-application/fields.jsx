import { Plus, Trash2, Upload } from 'lucide-react'
import { Reveal } from '../Reveal.jsx'

export const inputClass =
  'w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-primary placeholder:text-muted-foreground/70 focus-visible:outline-2 focus-visible:outline-copper'

/** One numbered card per step, matching the site's existing request-form look. */
export function SectionCard({ title, subtitle, children }) {
  return (
    <Reveal className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="bg-cream px-5 py-4 sm:px-6">
        <h2 className="text-base font-bold text-primary sm:text-lg">{title}</h2>
        {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="space-y-5 p-5 sm:p-6">{children}</div>
    </Reveal>
  )
}

export function Field({ label, required, hint, error, children }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-primary">
        {label}
        {required && <span className="text-copper"> *</span>}
      </span>
      <div className="mt-1.5">{children}</div>
      {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
      {error && <span className="mt-1 block text-xs font-semibold text-red-700">{error}</span>}
    </label>
  )
}

export function TextInput({ value, onChange, placeholder, type = 'text', ...rest }) {
  return (
    <input
      type={type}
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={inputClass}
      {...rest}
    />
  )
}

export function TextArea({ value, onChange, placeholder, rows = 4 }) {
  return (
    <textarea
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={`${inputClass} resize-y`}
    />
  )
}

export function Select({ value, onChange, options, placeholder = 'Select…' }) {
  return (
    <select value={value ?? ''} onChange={(e) => onChange(e.target.value)} className={inputClass}>
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  )
}

export function RadioGroup({ name, value, onChange, options }) {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2">
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-2 text-sm text-primary">
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={(e) => onChange(e.target.value)}
            className="size-4 accent-copper"
          />
          {opt}
        </label>
      ))}
    </div>
  )
}

export function CheckboxGroup({ value = [], onChange, options }) {
  const toggle = (opt) => {
    onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt])
  }
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-2 text-sm text-primary">
          <input
            type="checkbox"
            checked={value.includes(opt)}
            onChange={() => toggle(opt)}
            className="size-4 accent-copper"
          />
          {opt}
        </label>
      ))}
    </div>
  )
}

export function ConsentCheckbox({ checked, onChange, children }) {
  return (
    <label className="flex items-start gap-3 rounded-xl border border-border bg-cream p-4 text-sm text-primary">
      <input
        type="checkbox"
        checked={!!checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 size-4 shrink-0 accent-copper"
      />
      <span className="leading-relaxed">{children}</span>
    </label>
  )
}

/**
 * A single document upload. There is no backend in this project to store
 * files, so this keeps the File object in memory only (for this session's
 * PDF/summary) and shows the filename once chosen — real storage/transfer
 * of the document itself would need a server behind this form.
 */
export function FileUploadField({ value, onChange, required }) {
  const inputId = `file-${Math.random().toString(36).slice(2)}`
  return (
    <div>
      <label
        htmlFor={inputId}
        className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-border bg-background px-3.5 py-3 text-sm text-muted-foreground hover:border-copper"
      >
        <Upload className="size-4 shrink-0 text-copper" aria-hidden="true" />
        <span className="truncate">
          {value ? (
            <span className="font-semibold text-primary">{value.name}</span>
          ) : (
            'Choose a file — PDF, JPG, JPEG or PNG, max 10 MB'
          )}
        </span>
      </label>
      <input
        id={inputId}
        type="file"
        required={required}
        accept=".pdf,.jpg,.jpeg,.png"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (!file) return
          if (file.size > 10 * 1024 * 1024) {
            onChange(null, 'File is larger than 10 MB.')
            return
          }
          onChange(file, null)
        }}
      />
    </div>
  )
}

/**
 * A fixed-count set of short text inputs (e.g. "list five places") rather
 * than an add/remove list — count never changes.
 */
export function FixedList({ values, onChange, placeholder, count }) {
  const list = values?.length === count ? values : Array.from({ length: count }, (_, i) => values?.[i] ?? '')
  return (
    <div className="space-y-2">
      {list.map((v, i) => (
        <input
          key={i}
          type="text"
          value={v}
          onChange={(e) => {
            const next = [...list]
            next[i] = e.target.value
            onChange(next)
          }}
          placeholder={placeholder ? `${placeholder} ${i + 1}` : `Item ${i + 1}`}
          className={inputClass}
        />
      ))}
    </div>
  )
}

/**
 * An add/remove-able list of entries up to `max`, at least one required by
 * default — used for professional organization history and other languages.
 */
export function RepeatableGroup({ entries, onChange, max, emptyEntry, min = 1, renderEntry }) {
  const list = entries?.length ? entries : [emptyEntry()]

  const updateEntry = (i, patch) => {
    const next = list.map((e, idx) => (idx === i ? { ...e, ...patch } : e))
    onChange(next)
  }
  const addEntry = () => onChange([...list, emptyEntry()])
  const removeEntry = (i) => onChange(list.filter((_, idx) => idx !== i))

  return (
    <div className="space-y-4">
      {list.map((entry, i) => (
        <div key={i} className="rounded-xl border border-border p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wide text-copper">Entry {i + 1}</span>
            {list.length > min && (
              <button
                type="button"
                onClick={() => removeEntry(i)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-red-700"
              >
                <Trash2 className="size-3.5" aria-hidden="true" />
                Remove
              </button>
            )}
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {renderEntry(entry, (patch) => updateEntry(i, patch))}
          </div>
        </div>
      ))}
      {list.length < max && (
        <button
          type="button"
          onClick={addEntry}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-copper hover:underline"
        >
          <Plus className="size-4" aria-hidden="true" />
          Add another
        </button>
      )}
    </div>
  )
}
