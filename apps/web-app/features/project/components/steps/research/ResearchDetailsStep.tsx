interface Props {
  setStep: (step: number) => void
}

export function ResearchDetailsStep({ setStep }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Research Details</h2>

      <input
        type="text"
        placeholder="Research Title"
        className="border p-2 w-full"
      />

      <textarea
        placeholder="Background"
        className="border p-2 w-full"
      />

      <button
        onClick={() => setStep(3)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Next
      </button>
    </div>
  )
}
