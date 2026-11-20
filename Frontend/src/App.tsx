import { Container } from '@chakra-ui/react/container'
import { Stack } from '@chakra-ui/react/stack'
import Navbar from './components/Navbar'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

function App() {

  return (
    <Stack h="100vh" >
     <Navbar />
     <Container>
      <TodoForm />
      <TodoList /> 
     </Container>
   </Stack>
  )
}

export default App
