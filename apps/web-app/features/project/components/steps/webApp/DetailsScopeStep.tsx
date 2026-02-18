interface Props {
  setStep: (step: number) => void
}

export function DetailsScopeStep({ setStep }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Web App - Details & Scope</h2>

      <textarea
        placeholder="Describe Features"
        className="border p-2 w-full"
      />

      <button
        onClick={() => setStep(4)}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Review
      </button>
    </div>
  )
}
