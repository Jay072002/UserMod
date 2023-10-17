import { Button, Container } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { MyContext } from "../context/context";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { isLogin, setIsLogin, setLoggedInUser } = useContext(MyContext);

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post("/auth/login", user);
      if (data?.token) {
        Cookies.set("token", data?.token);
        setIsLogin(true);
        setLoggedInUser(data?.payload?._doc);
        navigate("/home");
      } else {
        console.error("No token received in the response");
      }
    } catch (error) {
      console.log(error);
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
        border={"1px solid black"}
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
        ></input>
        <input
          type="password"
          placeholder="password"
          className="input"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        ></input>
        <Button
          cursor={"pointer"}
          size="sm"
          variant="outline"
          p={"5px 14px"}
          mt={"10px"}
          onClick={handleSubmit}
        >
          submit
        </Button>
      </Container>
    </Container>
  );
};

export default Login;
