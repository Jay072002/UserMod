import {
  Container,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Grid,
  GridItem,
  Button,
  Input,
  Flex,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../context/context";
import { useLocation } from "react-router-dom";
import axios from "../axios";
import toast from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";

const UserAddress = ({ userId }) => {
  const { accordionItems, setAccordianItems, isDark } = useContext(MyContext);
  const gridItemStyle = {
    margin: "7px",
    backgroundColor: isDark ? "#EFEFEF" : "#D9D9D9",
    padding: "10px",
  };

  const [openItems, setOpenItems] = useState([]);
  const [addFlag, setAddFlag] = useState(true);
  const [add, setAdd] = useState(true);

  const location = useLocation();

  // Access the path and original URL from the location object
  const { pathname } = location;

  useEffect(() => {
    if (pathname.includes("update")) {
      setAddFlag(false);
    }
  }, [pathname]);

  const fetchAddresses = async () => {
    try {
      const { data } = await axios.get(`/address/${userId}`, {
        withCredentials: true,
      });
      setAccordianItems(data);
    } catch (error) {
      console.log(error);
      return toast.error("Something Went Wrong!");
    }
  };

  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [add]);

  const toggleAccordionItem = (index) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter((item) => item !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
  };

  const handleInputChange = (field, item, value) => {
    setAccordianItems((prev) => {
      const updatedItems = prev.map((elem) => {
        if (elem.title === item.title) {
          // Update the specified field for the matching item
          return { ...elem, [field]: value };
        }
        return elem;
      });

      return updatedItems;
    });
  };

  const addAccordian = async () => {
    try {
      setAdd(!add);
      setAccordianItems((prev) => {
        return [
          ...prev,
          {
            title: `Accordian ${prev?.length + 1}`,
            street: "",
            city: "",
            state: "",
            zipCode: "",
          },
        ];
      });

      // if userId then we can update the address
      if (userId) {
        await axios.post(
          `/address/${userId}`,
          {
            street: "",
            city: "",
            state: "",
            zipCode: "",
          },
          { withCredentials: true }
        );
      }

      return toast.success("Accordian Added!");
    } catch (error) {
      console.log(error);
      return toast.error("Somoething Went Wrong!");
    }
  };

  const handleUpdate = async (item) => {
    try {
      // {title: 'Accordian 2', street: '', city: '', state: 'afsa', zipCode: ''}
      const { ...data } = item;
      console.log(item, "item");

      if (userId) {
        await axios.put(`/address/${item?._id}/${userId}`, data, {
          withCredentials: true,
        });
        return toast.success("Accordian Updated!");
      }
    } catch (error) {
      console.log(error);
      return toast.error("Something Went Wrong!");
    }
  };

  const handleDelete = async (item) => {
    try {
      if (item?._id) {
        await axios.delete(`/address/${item?._id}/${userId}`, {
          withCredentials: true,
        });
        const updatedAccordionItems = accordionItems.filter(
          (accItem) => accItem._id !== item?._id
        );

        setAccordianItems(updatedAccordionItems);
      } else {
        // if add in the update section andnot created any address as such in db then just remove it from the accordianitems
        const updatedAccordianItem = accordionItems?.filter((elem) => {
          return item.title != elem?.title;
        });

        setAccordianItems(updatedAccordianItem);
      }

      return toast.success("Accordian Deleted!");
    } catch (error) {
      console.log(error);
      return toast.error("Something Went Wrong!");
    }
  };

  return (
    <Container p={"30px"} w={"73vw"} mx={"auto"} border={"1px solid black"}>
      <Accordion width={"70vw"} allowToggle>
        {accordionItems?.map((item, index) => (
          <Container
            display={"flex"}
            p={"10px"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <AccordionItem key={index} width={"93%"}>
              <h2>
                <AccordionButton
                  bg={"transparent"}
                  cursor={"pointer"}
                  p={"10px"}
                  borderRadius={"100px"}
                  onClick={() => toggleAccordionItem(index)}
                >
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    fontWeight={"bolder"}
                    color={isDark ? "white" : "black"}
                    fontSize={"15px"}
                  >
                    {`Accordian`}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Grid
                  w={"70vw"}
                  templateRows="repeat(2, 1fr)"
                  templateColumns="repeat(2, 1fr)"
                  gap={20}
                >
                  <GridItem style={gridItemStyle}>
                    <Input
                      p={"7px"}
                      onChange={(e) => {
                        handleInputChange("street", item, e.target.value);
                      }}
                      placeholder="Street Address"
                      value={item?.street}
                    />
                  </GridItem>
                  <GridItem style={gridItemStyle}>
                    <Input
                      p={"7px"}
                      onChange={(e) => {
                        handleInputChange("city", item, e.target.value);
                      }}
                      placeholder="City"
                      value={item?.city}
                    />
                  </GridItem>
                  <GridItem style={gridItemStyle}>
                    <Input
                      p={"7px"}
                      onChange={(e) => {
                        handleInputChange("state", item, e.target.value);
                      }}
                      placeholder="Select State"
                      value={item?.state}
                    />
                  </GridItem>
                  <GridItem style={gridItemStyle}>
                    <input
                      style={{ padding: "7px" }}
                      type="number"
                      maxLength="10"
                      onChange={(e) => {
                        handleInputChange("zipCode", item, e.target.value);
                      }}
                      placeholder="Zip Code"
                      value={item?.zipCode}
                    />
                  </GridItem>
                </Grid>
                {/* update option should only appear if any of the value of this item changes */}
                {!addFlag || pathname.includes("add") ? (
                  <Container
                    p={"20px"}
                    w={"10vw"}
                    mx={"auto"}
                    cursor={"pointer"}
                    display={"flex"}
                    gap={"5px"}
                  >
                    {userId ? (
                      <Button
                        cursor={"pointer"}
                        p={"5px 14px"}
                        onClick={() => handleUpdate(item)}
                      >
                        Update
                      </Button>
                    ) : null}

                    <Button
                      cursor={"pointer"}
                      p={"5px 14px"}
                      onClick={() => handleDelete(item)}
                    >
                      Delete
                    </Button>
                  </Container>
                ) : null}
              </AccordionPanel>
            </AccordionItem>
            <AiFillDelete
              size={"20px"}
              cursor={"pointer"}
              fill="black"
              style={{ transition: "fill 0.4s", marginRight: "17px" }}
              className="AiFillDelete"
              onClick={() => handleDelete(item)}
            />
          </Container>
        ))}
      </Accordion>

      <Container display={"flex"} flexDir={"row-reverse"}>
        <Button
          p={"2px 10px "}
          cursor={"pointer"}
          border={"none"}
          fontSize={"16px"}
          onClick={addAccordian}
          bg={"transparent"}
          color={isDark ? "white" : "dark"}
          fontWeight={"bolder"}
        >
          Add +
        </Button>
      </Container>
    </Container>
  );
};

export default UserAddress;
