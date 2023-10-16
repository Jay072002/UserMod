import { Container, Button } from "@chakra-ui/react";

const Login = () => {
  return (
    <Container
      h={"90vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Container
        border={"1px solid black"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        w={"60vw"}
        h={"60vh"}
      >
        <input type="text" placeholder="Email" className="input"></input>
        <input type="password" placeholder="password" className="input"></input>
        <Button
          cursor={"pointer"}
          size="sm"
          variant="outline"
          p={"5px 14px"}
          mt={"10px"}
        >
          submit
        </Button>
      </Container>
    </Container>
  );
};

export default Login;
