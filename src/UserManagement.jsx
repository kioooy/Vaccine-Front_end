import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  Popconfirm,
  Table,
  Upload,
} from "antd";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { PlusOutlined } from "@ant-design/icons";
import uploadFile from "./utils/upload";

const UserManagement = () => {
  // xử lý JS
  // CRUD cho User => tương tác thông qua API

  const [UserList, setUserList] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => <Image src={avatar} width={100} />,
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, User) => {
        return (
          <>
            <Button
              type="primary"
              onClick={() => {
                setOpen(true);
                form.setFieldsValue(User);
                if (User.avatar) {
                  setFileList([
                    {
                      name: "image.png",
                      status: "done",
                      url: User.avatar,
                    },
                  ]);
                }
              }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Delete the User"
              description="Are you sure to delete this User?"
              onConfirm={() => handleDeleteUser(id)}
            >
              <Button danger type="primary">
                Delete
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const handleDeleteUser = async (id) => {
    await axios.delete(
      `https://67825c0ac51d092c3dcf2ce2.mockapi.io/User/${id}`
    );
    toast.success("Successfully delete User!");
    fetchUser();
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // get dữ liệu
  const fetchUser = async () => {
    // tạo ra 1 hành động để xử lý việc lấy danh sách học sinh
    console.log("fetching User!!!");

    // xuống back end lấy cái danh sách User

    // nhờ axios call api

    // promise
    // không xảy ra ngay lập tức => bất đồng bộ
    const response = await axios.get(
      "https://67825c0ac51d092c3dcf2ce2.mockapi.io/User"
    );

    // User data
    console.log(response.data);
    setUserList(response.data);

    console.log("done fetch User!!!");
  };

  // event => chạy khi page vừa load lên

  useEffect(() => {
    fetchUser(); // => lấy danh sách học sinh
    // chạy mỗi khi load trang lên
  }, []);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleSubmitForm = async (values) => {
    console.log(values);

    // upload tấm ảnh lên Firebase Storage trước
    if (values.avatar.file?.originFileObj) {
      const url = await uploadFile(values.avatar.file.originFileObj);
      values.avatar = url;
    }

    if (values.id) {
      // update
      await axios.put(
        `https://67825c0ac51d092c3dcf2ce2.mockapi.io/User/${values.id}`,
        values
      );
    } else {
      // create
      await axios.post(
        "https://67825c0ac51d092c3dcf2ce2.mockapi.io/User",
        values
      );
    }

    toast.success("Successfully create new User");
    handleCloseModal();
    fetchUser();
    form.resetFields();
  };

  return (
    <div>
      <ToastContainer />
      <h1>User Management</h1>
      <Button onClick={handleOpenModal}>Add new User</Button>
      <Table dataSource={UserList} columns={columns} />
      <Modal
        title="Create new User"
        open={isOpen}
        onClose={handleCloseModal}
        onCancel={handleCloseModal}
        onOk={() => form.submit()}
      >
        <Form
          labelCol={{
            span: 24,
          }}
          form={form}
          onFinish={handleSubmitForm}
        >
          <FormItem label="Id" name="id" hidden>
            <Input />
          </FormItem>
          <FormItem
            label="Code"
            name="code"
            rules={[
              {
                required: true,
                message: "Code can not be empty!",
              },
            ]}
          >
            <Input />
          </FormItem>
          <FormItem
            label="Full Name"
            name="fullName"
            rules={[
              {
                required: true,
                message: "Full name can not be empty!",
              },
            ]}
          >
            <Input />
          </FormItem>

          <FormItem label="Avatar" name="avatar">
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </FormItem>
        </Form>
      </Modal>

      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
};

export default UserManagement;
