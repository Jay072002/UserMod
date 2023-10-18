import { Container } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios";
import { MyContext } from "../context/context";
import toast from "react-hot-toast";
import { BiEditAlt } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const Home = () => {
  const cellPadding = "10px"; // Adjust the padding value as needed\
  const { isLogin, loggedInUser, setAddUserButtonFlag, isDark } =
    useContext(MyContext);

  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/user", {
        withCredentials: true,
      });

      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch all the users when component mounts
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
    fetchUsers();
  }, [isLogin]);

  const handleDelete = async (item) => {
    try {
      await axios.delete(`/user/${item._id}`, { withCredentials: true });

      setUsers((prevUsers) =>
        prevUsers.filter((user) => {
          return user._id !== item._id;
        })
      );
      return toast.success("User Deleted!");
    } catch (error) {
      console.log(error);
      return toast.error("Something Went Wrong!");
    }
  };

  return (
    <Container p={"30px"}>
      <Container>
        <Container
          display={"flex"}
          flexDir={"row-reverse"}
          mr={"142px"}
          p={"20px"}
        >
          {loggedInUser.isAdmin ? (
            <Link to={"/adduserinfo"}>
              <Button
                p={"5px 10px"}
                cursor={"pointer"}
                onClick={() => {
                  setAddUserButtonFlag(true);
                  navigate("/adduserinfo");
                }}
              >
                Add User
              </Button>
            </Link>
          ) : null}
        </Container>
        <Container
          p={"10px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Table
            w={"70vw"}
            border={isDark ? "1px solid white" : "1px solid black"}
            variant="striped"
            colorScheme="teal"
            borderWidth="2px"
            color={isDark ? "white" : "black"}
            fontWeight={"bold"}
          >
            <Thead>
              <Tr>
                <Th
                  borderRight={isDark ? "1px solid white" : "1px solid black"}
                  padding={cellPadding}
                >
                  Sr.No
                </Th>
                <Th
                  borderRight={isDark ? "1px solid white" : "1px solid black"}
                  padding={cellPadding}
                >
                  Name
                </Th>
                <Th
                  borderRight={isDark ? "1px solid white" : "1px solid black"}
                  padding={cellPadding}
                >
                  Email
                </Th>
                <Th
                  borderRight={isDark ? "1px solid white" : "1px solid black"}
                  padding={cellPadding}
                >
                  Phone Number
                </Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users?.map((item, index) => {
                return (
                  <Tr key={item?._id}>
                    <Td
                      borderRight={
                        isDark ? "1px solid white" : "1px solid black"
                      }
                      padding={cellPadding}
                      textAlign={"center"}
                    >
                      {index + 1}
                    </Td>
                    <Td
                      borderRight={
                        isDark ? "1px solid white" : "1px solid black"
                      }
                      padding={cellPadding}
                      textAlign={"center"}
                    >
                      {item?.firstName + " " + item?.lastName || "-"}
                    </Td>
                    <Td
                      borderRight={
                        isDark ? "1px solid white" : "1px solid black"
                      }
                      padding={cellPadding}
                      textAlign={"center"}
                    >
                      {item?.email || "-"}
                    </Td>
                    <Td
                      borderRight={
                        isDark ? "1px solid white" : "1px solid black"
                      }
                      padding={cellPadding}
                      textAlign={"center"}
                    >
                      {item?.phoneNumber || "-"}
                    </Td>
                    {loggedInUser._id == item._id || loggedInUser?.isAdmin ? (
                      <Td
                        borderWidth="1px"
                        padding={cellPadding}
                        textAlign={"center"}
                      >
                        <BiEditAlt
                          cursor={"pointer"}
                          onClick={() =>
                            navigate(`/updateuserinfo/${item?._id}`)
                          }
                          size={"20px"}
                          fill="black"
                          style={{
                            marginRight: "10px",
                            transition: "fill 0.4s",
                          }}
                          className="BiEditAlt"
                        >
                          Edit
                        </BiEditAlt>

                        <AiFillDelete
                          size={"20px"}
                          cursor={"pointer"}
                          fill="black"
                          style={{ transition: "fill 0.4s" }}
                          className="AiFillDelete"
                          onClick={() => handleDelete(item)}
                        />
                      </Td>
                    ) : null}
                  </Tr>
                );
              })}

              {/* Add more rows as needed */}
            </Tbody>
          </Table>
        </Container>
      </Container>
    </Container>
  );
};

export default Home;
