import { ChangeEvent, useState } from "react";
import {
  Button,
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
} from "@chakra-ui/react";
import { FaClipboardList, FaClipboardCheck } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { useToastMessage } from "./hooks/useToastMessage";

const CFaClipboardList = chakra(FaClipboardList);
const CFaClipboardCheck = chakra(FaClipboardCheck);
const CMdPassword = chakra(MdPassword);

export const Default = () => {
  const { showMessage } = useToastMessage();

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
  const onChangeLength = (valueString: string) => {
    const value = Number(valueString);
    if (value > 1000) {
      setLength(1000);
    } else if (value < 1) {
      setLength(0);
    } else {
      setLength(value);
    }
  };

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
    showMessage({
      title: "????????????????????????????????????",
      description: null,
      status: "success",
    });
  };

  const onClickCopy = () => {
    onCopy();
    showMessage({
      title: "?????????????????????????????????????????????",
      description: null,
      status: "info",
    });
  };

  return (
    <>
      <ScaleFade initialScale={0.9} in>
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
            <Text fontSize="xl" fontWeight="bold" textAlign="center" mb="22px">
              Password Generator
            </Text>
            <Stack spacing={5} direction="row">
              <FormControl>
                <FormLabel>???????????????</FormLabel>
                <CheckboxGroup>
                  <HStack spacing="12px">
                    <Checkbox defaultChecked onChange={onChangeCheckedNumeric}>
                      ??????
                    </Checkbox>
                    <Checkbox
                      defaultChecked
                      onChange={onChangeCheckedUppercase}
                    >
                      ????????????
                    </Checkbox>
                    <Checkbox
                      defaultChecked
                      onChange={onChangeCheckedLowercase}
                    >
                      ????????????
                    </Checkbox>
                    <Checkbox defaultChecked onChange={onChangeCheckedSymbol}>
                      ??????
                    </Checkbox>
                  </HStack>
                </CheckboxGroup>
              </FormControl>
            </Stack>
            <FormControl>
              <FormLabel>??????</FormLabel>
              <NumberInput
                value={length === 0 ? "" : length}
                min={6}
                max={1000}
                onChange={onChangeLength}
              >
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
              leftIcon={<CMdPassword />}
            >
              ?????????????????????
            </Button>
            <Flex mb={2}>
              <Input value={password} readOnly />
              <Tooltip
                label={hasCopied ? "?????????????????????" : "?????????????????????????????????"}
              >
                <IconButton
                  onClick={onClickCopy}
                  ml={2}
                  aria-label="copy"
                  icon={
                    hasCopied ? <CFaClipboardCheck /> : <CFaClipboardList />
                  }
                />
              </Tooltip>
            </Flex>
          </Stack>
        </Flex>
      </ScaleFade>
    </>
  );
};
