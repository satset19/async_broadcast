// app/routes/my-form-page.jsx
import { useState } from "react";
import { Form, Input, DatePicker, Upload, Button, Radio, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { processMessageQueue } from "~/services/processMsgQueue";
import { ActionFunction, json } from "@remix-run/node";
import { upload } from "~/services/upload";
import dayjs from "dayjs";
dayjs.locale("dayjs/locale/id");

export default function MyFormPage() {
  const [form] = Form.useForm();
  const [msgType, setMsgType] = useState("text");

  const handleFinish = async (values: Record<string, any>) => {
    try {
      const { phone, description, dateTime, file } = values;
      const jids = phone
        .split(",")
        .map((item: string) => `${item}@s.whatsapp.net`);

      const scheduledAt = dayjs(dateTime).locale("de").format();

      let msgs: { msg: any }[] = [
        {
          msg: {
            conversation: description,
          },
        },
      ];
      if (file) {
        const { ok, data } = await upload(file[0].originFileObj);

        if (ok) {
          switch (msgType) {
            case "media":
              msgs = [
                {
                  msg: {
                    imageMessage: {
                      url: data.url,
                      mimetype: file[0].type,
                      caption: description,
                    },
                  },
                },
              ];
              break;
            case "document":
              msgs = [
                {
                  msg: {
                    document: {
                      url: data.url,
                      mimetype: file[0].type,
                      fileName: file[0].name,
                    },
                  },
                },
              ];
              break;
            default:
              msgs = [
                {
                  msg: {
                    conversation: description,
                  },
                },
              ];
              break;
          }
        }
      }

      const userId = "daisi-dev01";

      const payload = {
        cluster: "BINDUNI",
        sender: "LARA1",
        jids,
        msgs,
        userId,
        scheduledAt,
      };

      const { data: res } = await processMessageQueue(payload);
      if (res.ok) {
        message.success(res.msg);
        form.resetFields();
        setMsgType("text");
      } else {
        message.error("Message Failed");
      }
    } catch (error) {
      console.log(error);
    }
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
        <Form.Item
          label="Phone"
          name={"phone"}
          rules={[{ required: true, message: "Please input Phone Numbers!" }]}
        >
          <Input
            // addonBefore="+62"
            placeholder="62984958900,628738949085"
          />
        </Form.Item>

        <Form.Item
          label="Message Type"
          name="messageType"
          rules={[{ required: true, message: "Please input Type Message!" }]}
        >
          <Radio.Group
            onChange={(e) => setMsgType(e.target.value)}
            // defaultValue={msgType || "text"}
          >
            <Radio value="text">Text</Radio>
            <Radio value="media">Media</Radio>
            {/* <Radio value="document">Document</Radio> */}
          </Radio.Group>
        </Form.Item>

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
        {msgType !== "text" ? (
          <Form.Item
            label="Upload File"
            name="file"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            rules={[{ required: true, message: "Please Upload your File!" }]}
          >
            <Upload name="file" listType="text" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        ) : (
          ""
        )}

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
