import { Button, chakra } from '@chakra-ui/react'
import { MdPassword } from 'react-icons/md'

type Props = {
  disabled: boolean
  onClick: () => void
  children: React.ReactNode
}

const CMdPassword = chakra(MdPassword)

export const PrimaryButton = ({ disabled, onClick, children }: Props) => {
  return (
    <Button colorScheme="blue" disabled={disabled} onClick={onClick} leftIcon={<CMdPassword />}>
      {children}
    </Button>
  )
}
