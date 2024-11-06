// app/routes/my-form-page.jsx
import { useState } from "react";
import { Form, Input, DatePicker, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ActionFunction, json } from "@remix-run/node";

export default function MyFormPage() {
  const [form] = Form.useForm();

  const handleFinish = (values: Record<string, any>) => {
    console.log("Form Values:", values);
  };

  return (
    <div style={{ padding: "24px" }}>
      <h2>My Form Page</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        {/* TextArea Field */}
        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please input your description!" },
          ]}
        >
          <Input.TextArea rows={4} placeholder="Enter description here" />
        </Form.Item>

        {/* DateTime Picker Field */}
        <Form.Item
          label="Select Date and Time"
          name="dateTime"
          rules={[{ required: true, message: "Please select date and time!" }]}
        >
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm"
            style={{ width: "100%" }}
          />
        </Form.Item>

        {/* File Upload Field */}
        <Form.Item
          label="Upload File"
          name="file"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        >
          <Upload name="file" listType="text" beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
