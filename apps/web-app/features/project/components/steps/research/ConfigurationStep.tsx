interface Props {
  setStep: (step: number) => void
}

export function ConfigurationStep({ setStep }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Research Configuration</h2>

      <select className="border p-2 w-full">
        <option>Journal</option>
        <option>Conference</option>
      </select>

      <button
        onClick={() => setStep(4)}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Review & Export
      </button>
    </div>
  )
}
