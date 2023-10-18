import { Button, Container, Tab, TabList, Tabs } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserAddress from "../Components/UserAddress";
import UserProfile from "../Components/UserProfile";
import { MyContext } from "../context/context";
import axios from "../axios";
import toast from "react-hot-toast";

const AddUserInfo = () => {
  const [tabFlag, setTabFlag] = useState(true);
  const {
    userProfile,
    accordionItems,
    isLogin,
    setUserProfile,
    setAccordianItems,
    addUserButtonFlag,
    setAddUserButtonFlag,
  } = useContext(MyContext);
  const [createUserData, setCreateUserData] = useState();

  useEffect(() => {
    setCreateUserData({
      ...userProfile,
      addresses: accordionItems,
    });
  }, [accordionItems, userProfile]);

  const navigate = useNavigate();

  // handle submit
  const handleSubmit = async () => {
    try {
      // hit the create user api
      await axios.post("/user", createUserData, {
        withCredentials: true,
      });
      setUserProfile({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
      });

      setAccordianItems([
        {
          title: "Accordion 1",
          street: "",
          city: "",
          state: "",
          zipCode: "",
        },
      ]);
      toast.success("User Profile Added!");
      navigate("/home");
    } catch (error) {
      toast.error("Something Went Wrong!");
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }

    if (addUserButtonFlag) {
      setAccordianItems([]);
      setUserProfile({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
      });

      setAddUserButtonFlag(false);
    }
  }, [isLogin]);

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
      {tabFlag ? <UserProfile /> : <UserAddress />}

      <Container p={"20px"} display={"flex"} flexDir={"row-reverse"}>
        <Button
          onClick={handleSubmit}
          p={"4px 18px"}
          cursor={"pointer"}
          mr={"163px"}
        >
          submit
        </Button>
      </Container>
    </Container>
  );
};

export default AddUserInfo;
