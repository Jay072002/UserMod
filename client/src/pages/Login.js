import { Button, Container } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { MyContext } from "../context/context";
import toast from "react-hot-toast";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const buttonRef = useRef(null);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      buttonRef.current.click();
    }
  };

  const navigate = useNavigate();
  const { isLogin, setIsLogin, setLoggedInUser, isDark } =
    useContext(MyContext);

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post("/auth/login", user);

      console.log(data, "datttttaa");

      if (data?.token) {
        Cookies.set("token", data?.token);
        setIsLogin(true);
        setLoggedInUser(data?.payload);
        toast.success("login success!");
        navigate("/home");
      } else {
        console.error("No token received in the response");
        return toast.error("login failed!");
      }
    } catch (error) {
      console.log(error);
      return toast.error("login failed!");
    }
  };

  return (
    <Container
      h={"90vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Container
        border={isDark ? "1px solid white" : "1px solid black"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        w={"60vw"}
        h={"60vh"}
      >
        <input
          type="email"
          placeholder="Email"
          className="input"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          onKeyPress={handleKeyPress}
        ></input>
        <input
          type="password"
          placeholder="password"
          className="input"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          onKeyPress={handleKeyPress}
        ></input>
        <Button
          cursor={"pointer"}
          size="sm"
          variant="outline"
          p={"5px 14px"}
          mt={"10px"}
          onClick={handleSubmit}
          _hover={{ bg: isDark ? "black" : "grey", transition: "0.2s" }}
          borderRadius={"10px"}
          ref={buttonRef}
          fontWeight={"bold"}
          color={isDark ? "white" : "black"}
          bg="transparent"
        >
          submit
        </Button>
      </Container>
    </Container>
  );
};

export default Login;
