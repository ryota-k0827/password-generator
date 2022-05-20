import { ChangeEvent, useState } from "react";
import {
  Button,
  chakra,
  ChakraProvider,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  useClipboard,
} from "@chakra-ui/react";
import { FaClipboardList, FaClipboardCheck } from "react-icons/fa";

const CFaClipboardList = chakra(FaClipboardList);
const CFaClipboardCheck = chakra(FaClipboardCheck);

function App() {
  const passwordNumeric = "1234567890";
  const passwordUppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const passwordLowercase = "abcdefghijklmnopqrstuvwxyz";
  const passwordSymbol = "!\"#$%&()=~|@[];:+-*<>?_>.,'";

  const [checkedNumeric, setCheckedNumeric] = useState(true);
  const [checkedUppercase, setCheckedUppercase] = useState(true);
  const [checkedLowercase, setCheckedLowercase] = useState(true);
  const [checkedSymbol, setCheckedSymbol] = useState(true);
  const [length, setLength] = useState(12);
  const [password, setPassword] = useState("");
  const { hasCopied, onCopy } = useClipboard(password);

  const onChangeCheckedNumeric = (e: ChangeEvent<HTMLInputElement>) =>
    setCheckedNumeric(e.target.checked);
  const onChangeCheckedUppercase = (e: ChangeEvent<HTMLInputElement>) =>
    setCheckedUppercase(e.target.checked);
  const onChangeCheckedLowercase = (e: ChangeEvent<HTMLInputElement>) =>
    setCheckedLowercase(e.target.checked);
  const onChangeCheckedSymbol = (e: ChangeEvent<HTMLInputElement>) =>
    setCheckedSymbol(e.target.checked);
  const onChangeLength = (valueString: string) =>
    setLength(Number(valueString));

  const onClickGenerate = () => {
    let password = "";
    let passwordBase = "";

    if (checkedNumeric) passwordBase += passwordNumeric;
    if (checkedUppercase) passwordBase += passwordUppercase;
    if (checkedLowercase) passwordBase += passwordLowercase;
    if (checkedSymbol) passwordBase += passwordSymbol;

    for (let i = 0; i < length; i++) {
      password += passwordBase[Math.floor(Math.random() * passwordBase.length)];
    }

    setPassword(password);
  };

  return (
    <ChakraProvider>
      <Flex
        alignItems="center"
        justifyContent="center"
        bg="gray.100"
        height="100vh"
      >
        <Stack
          w={600}
          boxShadow="md"
          borderRadius={15}
          spacing={4}
          p={4}
          mb={60}
          bg="white"
        >
          <Stack spacing={5} direction="row">
            <FormControl>
              <FormLabel>生成ルール</FormLabel>
              <Checkbox defaultChecked onChange={onChangeCheckedNumeric}>
                数字
              </Checkbox>
              <Checkbox defaultChecked onChange={onChangeCheckedUppercase}>
                英大文字
              </Checkbox>
              <Checkbox defaultChecked onChange={onChangeCheckedLowercase}>
                英小文字
              </Checkbox>
              <Checkbox defaultChecked onChange={onChangeCheckedSymbol}>
                記号
              </Checkbox>
            </FormControl>
          </Stack>
          <FormControl>
            <FormLabel>長さ</FormLabel>
            <NumberInput value={length} min={6} onChange={onChangeLength}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <Button
            colorScheme="blue"
            disabled={
              (!checkedNumeric &&
                !checkedUppercase &&
                !checkedLowercase &&
                !checkedSymbol) ||
              length < 6
            }
            onClick={onClickGenerate}
          >
            生成
          </Button>
          <Flex mb={2}>
            <Input disabled={password === ""} value={password} />
            <Button
              onClick={onCopy}
              ml={2}
              leftIcon={
                hasCopied ? <CFaClipboardCheck /> : <CFaClipboardList />
              }
            >
              {hasCopied ? "Copied" : "Copy"}
            </Button>
          </Flex>
        </Stack>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
