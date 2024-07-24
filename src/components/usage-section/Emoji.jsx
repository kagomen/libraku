import step1 from '@/assets/usage-emojis/emoji_u1f50d.svg'
import step2 from '@/assets/usage-emojis/emoji_u1f516.svg'
import step3 from '@/assets/usage-emojis/emoji_u1f522.svg'
import step4 from '@/assets/usage-emojis/emoji_u1f3c3_200d_2640.svg'
import step5 from '@/assets/usage-emojis/emoji_u1f4f1.svg'

const usageEmojis = [step1, step2, step3, step4, step5]

function Emoji(props) {
  const src = usageEmojis[props.step - 1]
  return (
    <img src={src} alt="" width="56" height="56" className="mx-auto">
      {props.children}
    </img>
  )
}

export default Emoji
