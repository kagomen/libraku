function ResponsiveWrapper({ children }) {
  return (
    <div className="mx-auto mt-6 mb-14 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]">
      {children}
    </div>
  )
}

export default ResponsiveWrapper