export default function Error(props) {
  function retry() {
    props.resetErrorBoundary()
    props.reset()
  }

  return (
    <div className="my-12">
      <h2 className="mb-1 text-lg font-semibold">予期せぬエラーが発生しました。</h2>
      <p className="">再試行するか、時間を置いてからやり直してください。</p>
      <p>エラーが頻発する場合は、お問い合わせページからご連絡ください。</p>
      <button onClick={retry} className="my-4 rounded bg-emerald-500 px-3 py-1.5 font-medium text-white">
        再試行する
      </button>
    </div>
  )
}
