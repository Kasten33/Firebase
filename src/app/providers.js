import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Auth from "../components/Auth";

function App() {
  return (
    <ChakraProvider>
      <Auth />
    </ChakraProvider>
  );
}

export default App;
