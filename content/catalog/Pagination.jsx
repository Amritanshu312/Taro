const Pagination = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex items-center gap-4 bg-red-500">
        <div>prev</div>
        <div className="flex items-center gap-3">
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div>
        <div>next</div>
      </div>
    </div>
  )
}

export default Pagination