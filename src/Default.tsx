import { ChangeEvent, useState } from 'react'
import {
  chakra,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  ScaleFade,
  Stack,
  Text,
  Tooltip,
  useClipboard,
} from '@chakra-ui/react'
import { FaClipboardList, FaClipboardCheck } from 'react-icons/fa'
import { useToastMessage } from './hooks/useToastMessage'
import { PrimaryButton } from './components/PrimaryButton'

const CFaClipboardList = chakra(FaClipboardList)
const CFaClipboardCheck = chakra(FaClipboardCheck)

export const Default = () => {
  const { showMessage } = useToastMessage()

  const passwordNumeric = '1234567890'
  const passwordUppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const passwordLowercase = 'abcdefghijklmnopqrstuvwxyz'
  const passwordSymbol = '!"#$%&()=~|@[];:+-*<>?_>.,\''

  const [checkedNumeric, setCheckedNumeric] = useState(true)
  const [checkedUppercase, setCheckedUppercase] = useState(true)
  const [checkedLowercase, setCheckedLowercase] = useState(true)
  const [checkedSymbol, setCheckedSymbol] = useState(true)
  const [length, setLength] = useState(12)
  const [password, setPassword] = useState('')

  const { hasCopied, onCopy } = useClipboard(password)

  const handleCheckedChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case 'numeric':
        setCheckedNumeric(e.target.checked)
        break
      case 'uppercase':
        setCheckedUppercase(e.target.checked)
        break
      case 'lowercase':
        setCheckedLowercase(e.target.checked)
        break
      case 'symbol':
        setCheckedSymbol(e.target.checked)
        break
    }
  }

  const handleLengthChange = (valueString: string) => {
    const value = Number(valueString)
    if (value > 1000) {
      setLength(1000)
    } else if (value < 1) {
      setLength(0)
    } else {
      setLength(value)
    }
  }

  const handleGenerateClick = () => {
    let password = ''
    let passwordBase = ''

    if (checkedNumeric) passwordBase += passwordNumeric
    if (checkedUppercase) passwordBase += passwordUppercase
    if (checkedLowercase) passwordBase += passwordLowercase
    if (checkedSymbol) passwordBase += passwordSymbol

    for (let i = 0; i < length; i++) {
      password += passwordBase[Math.floor(Math.random() * passwordBase.length)]
    }

    if (
      ((checkedNumeric && !password.match(/[0-9]/)) ||
        (checkedUppercase && !password.match(/[A-Z]/)) ||
        (checkedLowercase && !password.match(/[a-z]/)) ||
        (checkedSymbol && !password.match(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/))) &&
      length >= 4
    ) {
      handleGenerateClick()
      return
    }

    setPassword(password)
    showMessage({
      title: 'パスワードを生成しました',
      description: null,
      status: 'success',
    })
  }

  const handleCopyClick = () => {
    onCopy()
    showMessage({
      title: 'クリップボードにコピーしました',
      description: null,
      status: 'info',
    })
  }

  return (
    <>
      <ScaleFade initialScale={0.9} in>
        <Flex alignItems="center" justifyContent="center" bg="gray.100" height="100vh">
          <Stack w={600} boxShadow="md" borderRadius={15} spacing={4} p={4} mb={60} bg="white">
            <Text fontSize="xl" fontWeight="bold" textAlign="center" mb="22px">
              Password Generator
            </Text>
            <Stack spacing={5} direction="row">
              <FormControl>
                <FormLabel>生成ルール</FormLabel>
                <CheckboxGroup>
                  <HStack spacing="12px">
                    <Checkbox id="numeric" defaultChecked onChange={handleCheckedChange}>
                      数字
                    </Checkbox>
                    <Checkbox id="uppercase" defaultChecked onChange={handleCheckedChange}>
                      英大文字
                    </Checkbox>
                    <Checkbox id="lowercase" defaultChecked onChange={handleCheckedChange}>
                      英小文字
                    </Checkbox>
                    <Checkbox id="symbol" defaultChecked onChange={handleCheckedChange}>
                      記号
                    </Checkbox>
                  </HStack>
                </CheckboxGroup>
              </FormControl>
            </Stack>
            <FormControl>
              <FormLabel>長さ</FormLabel>
              <NumberInput value={length === 0 ? '' : length} min={1} max={1000} onChange={handleLengthChange}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <PrimaryButton
              disabled={(!checkedNumeric && !checkedUppercase && !checkedLowercase && !checkedSymbol) || length < 1}
              onClick={handleGenerateClick}
            >
              パスワード生成
            </PrimaryButton>
            <Flex mb={2}>
              <Input value={password} readOnly />
              <Tooltip label={hasCopied ? 'コピーしました' : 'クリップボードにコピー'}>
                <IconButton
                  onClick={handleCopyClick}
                  ml={2}
                  aria-label="copy"
                  icon={hasCopied ? <CFaClipboardCheck /> : <CFaClipboardList />}
                />
              </Tooltip>
            </Flex>
          </Stack>
        </Flex>
      </ScaleFade>
    </>
  )
}
