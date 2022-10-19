import { ChakraProvider } from '@chakra-ui/react'
import { Default } from './Default'

function App() {
  return (
    <ChakraProvider>
      <Default />
    </ChakraProvider>
  )
}

export default App
