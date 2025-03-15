import { Img, Section } from '@react-email/components'

const Logo = () => {
  return (
    <Section className='mb-6'>
      <Img
        src='https://yuricunha.com/images/avatar.png'
        alt="Nelson Lai's logo"
        width='48'
        height='48'
        className='rounded-full'
      />
    </Section>
  )
}

export default Logo
