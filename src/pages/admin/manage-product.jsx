import React, { useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "../../services/api.product";
import { Button, Form, Input, Modal, Popconfirm, Select, Table } from "antd";
import { getCategories } from "../../services/api.category";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";

function ManageProduct() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = useForm();
  // them api vao
  // CRUD

  const fetchProduct = async () => {
    const data = await getProduct();
    setProducts(data);
  };

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  // get product
  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "descripton",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, record) => {
        return (
          <>
            <Button
              type="primary"
              onClick={() => {
                setOpen(true);
                form.setFieldsValue({
                  ...record,
                  categoryID: record?.categories
                    ? record?.categories?.map((item) => item.id)
                    : [],
                });
              }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Delete the product"
              description="Are you sure to delete this product?"
              onConfirm={() => handleDeteleProduct(id)}
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

  const handleDeteleProduct = async (id) => {
    const response = await deleteProduct(id);

    if (response) {
      fetchProduct();
    }
  };

  const handleSubmit = async (formValues) => {
    formValues.image = "123";
    // co id thi update
    if (formValues.id) {
      const response = await updateProduct({
        id: formValues.id,
        product: formValues,
      });
      console.log(response);
      toast.success("Successfilly update product");
    }
    // nguoc lai ko co thi la create
    else {
      const response = await createProduct(formValues);
      console.log(response);
      toast.success("Successfilly create new  product");
    }
    setOpen(false);
    form.resetFields();
    fetchProduct();
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Create new product
      </Button>
      <Table dataSource={products.filter(product => !product.deleted)} columns={columns} />

      <Modal
        title="Product"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
      >
        <Form
          labelCol={{
            span: 24,
          }}
          form={form}
          onFinish={handleSubmit}
        >
          <Form.Item label="Id" name="id" hidden>
            <Input />
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Name is required!",
              },
              {
                min: 3,
                message: "Name must be at least 3 characters!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Price is required!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[
              {
                required: true,
                message: "Quantity is required!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Category ID"
            name="categoryID"
            rules={[
              {
                required: true,
                message: "At least one category must be selected!",
              },
            ]}
          >
            <Select mode="multiple">
              {categories.map((category) => (
                <Select.Option value={category.id} key={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Description is required!",
              },
              {
                min: 5,
                message: "Description must be at least 5 characters!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManageProduct;
