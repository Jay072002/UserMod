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
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../context/context";
import { useLocation } from "react-router-dom";

const UserAddress = () => {
  const gridItemStyle = {
    margin: "7px",
    backgroundColor: "#D9D9D9",
    padding: "10px",
  };

  const { accordionItems, setAccordianItems } = useContext(MyContext);
  const [openItems, setOpenItems] = useState([]);
  const [addFlag, setAddFlag] = useState(true);

  const location = useLocation();

  // Access the path and original URL from the location object
  const { pathname } = location;

  useEffect(() => {
    if (pathname.includes("update")) {
      setAddFlag(false);
    }
  }, [pathname]);

  const toggleAccordionItem = (index) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter((item) => item !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
  };

  // update the accordian which matches the title as title is unique
  const handleInputChange = (field, item, value) => {
    setAccordianItems((prev) => {
      // Find the accordion item by matching the title
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

  const addAccordian = () => {
    setAccordianItems((prev) => {
      return [
        ...prev,
        {
          title: `Accordian ${prev.length + 1}`,
          street: "",
          city: "",
          state: "",
          zipCode: "",
        },
      ];
    });
  };

  return (
    <Container p={"30px"} w={"70vw"} mx={"auto"} border={"1px solid black"}>
      <Accordion width={"70vw"} allowToggle>
        {accordionItems.map((item, index) => (
          <AccordionItem key={index}>
            <h2>
              <AccordionButton
                bg={"transparent"}
                cursor={"pointer"}
                p={"10px"}
                borderRadius={"100px"}
                onClick={() => toggleAccordionItem(index)}
              >
                <Box as="span" flex="1" textAlign="left">
                  {item.title}
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
                    onChange={(e) => {
                      handleInputChange("street", item, e.target.value);
                    }}
                    placeholder="Street Address"
                    value={item?.street}
                  />
                </GridItem>
                <GridItem style={gridItemStyle}>
                  <Input
                    onChange={(e) => {
                      handleInputChange("city", item, e.target.value);
                    }}
                    placeholder="City"
                    value={item?.city}
                  />
                </GridItem>
                <GridItem style={gridItemStyle}>
                  <Input
                    onChange={(e) => {
                      handleInputChange("state", item, e.target.value);
                    }}
                    placeholder="Select State"
                    value={item?.state}
                  />
                </GridItem>
                <GridItem style={gridItemStyle}>
                  <input
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
              {!addFlag ? (
                <Container p={"20px"} w={"10vw"} mx={"auto"} cursor={"pointer"}>
                  <Button p={"5px 14px"}>Update</Button>
                </Container>
              ) : null}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>

      <Container display={"flex"} flexDir={"row-reverse"}>
        <Button
          p={"2px 10px "}
          cursor={"pointer"}
          border={"none"}
          fontSize={"16px"}
          onClick={addAccordian}
        >
          Add +
        </Button>
      </Container>
    </Container>
  );
};

export default UserAddress;
