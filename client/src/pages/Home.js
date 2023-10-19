import { Container, Select } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios";
import { MyContext } from "../context/context";
import toast from "react-hot-toast";
import { BiEditAlt } from "react-icons/bi";
import {
  AiFillDelete,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import Cookies from "js-cookie";

const Home = () => {
  const cellPadding = "10px";
  const {
    isLogin,
    loggedInUser,
    setAddUserButtonFlag,
    isDark,
    limit,
    setLimit,
    setIsLogin,
    setLoggedInUser,
  } = useContext(MyContext);

  const [users, setUsers] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);

  const [srNumber, setSrNumber] = useState(0);

  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        `/user?page=${pageIndex}&limit=${limit}`,
        {
          withCredentials: true,
        }
      );

      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (srNumber < 0) {
      setSrNumber(0);
    }
    if (!isLogin) {
      navigate("/login");
    }
    fetchUsers();
  }, [isLogin, pageIndex, limit, srNumber]);

  const handleDelete = async (item) => {
    try {
      await axios.delete(`/user/${item._id}`, { withCredentials: true });

      if (loggedInUser.isAdmin) {
        fetchUsers();
      } else {
        Cookies.remove("token");
        setIsLogin(false);
        setLoggedInUser({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          isAdmin: "",
        });
        navigate("/login");
      }

      // setUsers((prevUsers) =>
      //   prevUsers.filter((user) => user._id !== item._id)
      // );
      toast.success("User Deleted!");
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong!");
    }
  };

  const handleArrow = (event) => {
    if (event === "increment" && users.length === limit) {
      setSrNumber(srNumber + limit);
      setPageIndex(pageIndex + 1);
    } else if (event === "decrement" && pageIndex !== 1) {
      setSrNumber(srNumber - limit);
      setPageIndex(pageIndex - 1);
    }
  };

  const handleSelect = (e) => {
    const selectedLimit = parseInt(e.target.value, 10);
    setLimit(selectedLimit);
    setSrNumber(0);
    setPageIndex(1); // Reset pageIndex to 1 when changing the limit.
  };

  return (
    <Container p={"30px"}>
      <Container>
        <Container
          display={"flex"}
          flexDir={"row-reverse"}
          mr={"142px"}
          p={"0 20px"}
        >
          {loggedInUser.isAdmin && (
            <Link to="/adduserinfo">
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
          )}
        </Container>
        <Select
          placeholder={`limit - ${limit}`}
          cursor={"pointer"}
          onChange={handleSelect}
          p={"10px"}
          fontWeight={"bold"}
          size="md"
        >
          <option value="1">1</option>
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </Select>

        <Container
          p={"10px"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <AiOutlineArrowLeft
            size={"40px"}
            color="white"
            cursor={"pointer"}
            style={{ transition: "fill 0.4s" }}
            className="arrows"
            onClick={() => handleArrow("decrement")}
          />

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
              {users?.map((item, index) => (
                <Tr
                  key={item?._id}
                  bg={item?._id == loggedInUser?._id ? "grey" : null}
                >
                  <Td
                    borderRight={isDark ? "1px solid white" : "1px solid black"}
                    padding={cellPadding}
                    textAlign={"center"}
                  >
                    {srNumber + index + 1}
                  </Td>
                  <Td
                    borderRight={isDark ? "1px solid white" : "1px solid black"}
                    padding={cellPadding}
                    textAlign={"center"}
                  >
                    {item?.firstName + " " + item?.lastName || "-"}
                  </Td>
                  <Td
                    borderRight={isDark ? "1px solid white" : "1px solid black"}
                    padding={cellPadding}
                    textAlign={"center"}
                  >
                    {item?.email || "-"}
                  </Td>
                  <Td
                    borderRight={isDark ? "1px solid white" : "1px solid black"}
                    padding={cellPadding}
                    textAlign={"center"}
                  >
                    {item?.phoneNumber || "-"}
                  </Td>
                  {(loggedInUser._id === item._id || loggedInUser?.isAdmin) && (
                    <Td
                      borderWidth="1px"
                      padding={cellPadding}
                      textAlign={"center"}
                    >
                      <BiEditAlt
                        cursor={"pointer"}
                        onClick={() => navigate(`/updateuserinfo/${item?._id}`)}
                        size={"20px"}
                        fill="black"
                        style={{ marginRight: "10px", transition: "fill 0.4s" }}
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
                  )}
                </Tr>
              ))}
            </Tbody>
          </Table>
          <AiOutlineArrowRight
            size={"40px"}
            color="white"
            cursor={"pointer"}
            className="arrows"
            style={{ transition: "fill 0.4s" }}
            onClick={() => handleArrow("increment")}
          />
        </Container>
      </Container>
    </Container>
  );
};

export default Home;
