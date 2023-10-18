import { Box, Button, Container } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useContext } from "react";
import { MyContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Header = () => {
  const { isLogin, setIsLogin } = useContext(MyContext);

  const navigate = useNavigate();

  const handleButton = () => {
    // remove the cookie from client side and setIsLogin to false

    if (isLogin) {
      Cookies.remove("token");
      setIsLogin(false);
      return toast.success("logout success");
    } else {
      navigate("/login");
    }
  };

  return (
    <Box border={"1px solid black"} py={25}>
      <Container display={"flex"} flexDir={"row-reverse"}>
        <Button
          mr={"20px"}
          p={"5px 17px"}
          cursor={"pointer"}
          bg="transparent"
          borderRadius={"12px"}
          _hover={{ bg: "teal", transition: "0.3s" }}
          fontSize={"16px"}
          onClick={() => {
            handleButton();
          }}
        >
          {isLogin ? "logout" : "login"}
        </Button>
      </Container>
    </Box>
  );
};

export default Header;
