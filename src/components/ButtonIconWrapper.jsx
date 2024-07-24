function ButtonIconWrapper(props) {
  const side = `${props.side}-3`
  return <span className={`absolute ${side} w-7 translate-y-[1px] pr-1`}>{props.children}</span>
}

export default ButtonIconWrapper
