import { Box, Button, Container } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useContext, useEffect } from "react";
import { MyContext } from "../context/context";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Header = () => {
  const {
    isLogin,
    setIsLogin,
    isDark,
    setIsDark,
    loggedInUser,
    setLoggedInUser,
  } = useContext(MyContext);

  const navigate = useNavigate();

  const handleButton = () => {
    if (isLogin) {
      Cookies.remove("token");
      setIsLogin(false);
      setLoggedInUser({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        isAdmin: "",
      });
      return toast.success("Logout success");
    } else {
      navigate("/login");
    }
  };

  const location = useLocation();

  const { pathname } = location;

  useEffect(() => {
    // Check the user's preference for dark mode in local storage and update the checkbox accordingly
    const checkbox = document.getElementById("checkbox");
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setIsDark(isDarkMode); // Update isDark value in context
    checkbox.checked = isDarkMode;
    document.body.classList.toggle("dark", isDarkMode);
  }, [setIsDark]);

  const toggleDarkMode = () => {
    const checkbox = document.getElementById("checkbox");
    const isDarkMode = checkbox.checked;
    setIsDark(isDarkMode); // Update isDark value in context
    document.body.classList.toggle("dark", isDarkMode);
    localStorage.setItem("darkMode", isDarkMode);
  };

  return (
    <Box border={isDark ? "1px solid white" : "1px solid black"} py={25}>
      <Container display={"flex"} flexDir={"row-reverse"}>
        <div
          style={{ marginRight: "10px", alignItems: "center", display: "flex" }}
        >
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            onChange={toggleDarkMode}
          />
          <label htmlFor="checkbox" className="checkbox-label">
            <i className="fas fa-moon"></i>
            <i className="fas fa-sun"></i>
            <span className="ball"></span>
          </label>
        </div>
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
          color={isDark ? "whitesmoke" : "black"}
          fontWeight={"bold"}
        >
          {isLogin ? "Logout" : "Login"}
        </Button>
        {loggedInUser?._id && !pathname?.includes("update") ? (
          <Button
            mr={"20px"}
            p={"5px 17px"}
            cursor={"pointer"}
            bg="transparent"
            borderRadius={"12px"}
            _hover={{ bg: "teal", transition: "0.3s" }}
            fontSize={"16px"}
            onClick={() => navigate(`/updateuserinfo/${loggedInUser._id}`)}
            color={isDark ? "whitesmoke" : "black"}
            fontWeight={"bold"}
          >
            view profile
          </Button>
        ) : (
          <Button
            mr={"20px"}
            p={"5px 17px"}
            cursor={"pointer"}
            bg="transparent"
            borderRadius={"12px"}
            _hover={{ bg: "teal", transition: "0.3s" }}
            fontSize={"16px"}
            onClick={() => navigate(`/home`)}
            color={isDark ? "whitesmoke" : "black"}
            fontWeight={"bold"}
          >
            home
          </Button>
        )}
      </Container>
    </Box>
  );
};

export default Header;
