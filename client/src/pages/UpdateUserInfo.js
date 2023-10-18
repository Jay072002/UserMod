import { useContext, useEffect, useState } from "react";
import axios from "../axios";
import { useNavigate, useParams } from "react-router-dom";
import { MyContext } from "../context/context";
import { Button, Container, Tab, TabList, Tabs } from "@chakra-ui/react";
import UserProfile from "../Components/UserProfile";
import UserAddress from "../Components/UserAddress";
import toast from "react-hot-toast";

const UpdateUserInfo = () => {
  const [tabFlag, setTabFlag] = useState(true);
  const { setUserProfile, isLogin, setAccordianItems, userProfile, isDark } =
    useContext(MyContext);

  const { userId } = useParams();

  const navigate = useNavigate();

  const fetchUserData = async () => {
    const { data } = await axios.get(`/user/${userId}`, {
      withCredentials: true,
    });

    setUserProfile((prev) => {
      return { ...prev, ...data?.user };
    });

    setAccordianItems(data?.addresses);
  };

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin]);

  useEffect(() => {
    fetchUserData();
  }, []);

  // handle submit
  const handleSubmit = async () => {
    // when submitted just update the user profile addresses are managed in the addresses tab

    const updatedBody = {
      firstName: userProfile?.firstName,
      lastName: userProfile?.lastName,
      email: userProfile?.email,
      phoneNumber: userProfile?.phoneNumber,
    };

    try {
      await axios.put(`/user/${userId}`, updatedBody, {
        withCredentials: true,
      });
      toast.success("User Profile Updated!");
      navigate("/home");
    } catch (error) {
      console.log(error);
      return toast.error("Something Went Wrong!");
    }
  };

  return (
    <Container h={"80vh"} p={"15px"}>
      <Container p={"40px 100px"}>
        <Tabs position="relative" variant="unstyled">
          <TabList>
            <Tab
              p={"6px"}
              mr={"10px"}
              w={"7rem"}
              cursor={"pointer"}
              onClick={() => {
                setTabFlag(true);
              }}
              style={{
                background: tabFlag ? null : "none", // If tabFlag is true, set the background to none
              }}
            >
              Profile
            </Tab>
            <Tab
              onClick={() => {
                setTabFlag(false);
              }}
              cursor={"pointer"}
              w={"7rem"}
              style={{
                background: tabFlag ? "none" : null, // If tabFlag is true, set the background to none
              }}
            >
              {" "}
              Addresses
            </Tab>
          </TabList>
        </Tabs>
      </Container>

      {/* conditional rendering according to tab */}
      {tabFlag ? <UserProfile /> : <UserAddress userId={userId} />}

      <Container p={"20px"} display={"flex"} flexDir={"row-reverse"}>
        <Button
          onClick={handleSubmit}
          p={"4px 18px"}
          cursor={"pointer"}
          mr={"163px"}
          _hover={{ bg: isDark ? "black" : "grey", transition: "0.2s" }}
          color={isDark ? "white" : "black"}
          fontWeight={"bolder"}
          bg="transparent"
          borderRadius={"10px"}
          fontSize={"15px"}
        >
          submit
        </Button>
      </Container>
    </Container>
  );
};

export default UpdateUserInfo;
