import React, { useState } from 'react';
import { Form, Input, Button, Select, message, Modal, Empty } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Option } = Select;
const { confirm } = Modal;

interface Field {
    fieldType: string;
    fieldName: string;
    fieldOptions: string[];
}

const DynamicForm: React.FC = () => {
    const [form] = Form.useForm();
    const [fields, setFields] = useState<Field[]>([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [currentFieldType, setCurrentFieldType] = useState<string>('');

    const handleAddField = () => {
        form.validateFields().then((values) => {
            if (!currentFieldType) {
                messageApi.error('Please select a field type');
                return;
            }

            if (!values.fieldName || values.fieldName.trim() === '') {
                messageApi.error('Please enter a field name');
                return;
            }

            if (['dropdown', 'checkbox', 'radio'].includes(currentFieldType) && (!values.fieldOptions || values.fieldOptions.length < 2)) {
                messageApi.error('Please add at least 2 options');
                return;
            }

            if (values.fieldOptions && values.fieldOptions.some((option: string) => !option.trim())) {
                messageApi.error('Options cannot be empty');
                return;
            }

            const newField: Field = {
                fieldType: currentFieldType,
                fieldName: values.fieldName,
                fieldOptions: values.fieldOptions || [],
            };

            setFields((prevFields) => [...prevFields, newField]);
            form.resetFields();
            setCurrentFieldType('');
        });
    };

    const handleDeleteField = (index: number) => {
        confirm({
            title: 'Delete Field',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure you want to delete this field?',
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk() {
                setFields((prevFields) => prevFields.filter((_, i) => i !== index));
            },
        });
    };

    return (
        <div className='form-container'>
            {contextHolder}
            <Form className='form-fields' form={form} layout="vertical">
                <Form.Item label="Field Type" name="fieldType">
                    <Select placeholder='Please select a field type' onChange={(value: string) => setCurrentFieldType(value)}>
                        <Option value="text">Text</Option>
                        <Option value="checkbox">Checkbox</Option>
                        <Option value="dropdown">Dropdown</Option>
                        <Option value="date">Date Picker</Option>
                        <Option value="textarea">Text Area</Option>
                        <Option value="radio">Radio</Option>
                    </Select>
                </Form.Item>

                {(currentFieldType === 'text' || currentFieldType === 'textarea' || currentFieldType === 'date' || currentFieldType === 'checkbox' || currentFieldType === 'dropdown' || currentFieldType === 'radio') && (
                    <Form.Item label="Field Name" name="fieldName" rules={[{ required: true, message: 'Please enter a field name' }]}>
                        <Input />
                    </Form.Item>
                )}


                {['checkbox', 'dropdown', 'radio'].includes(currentFieldType) && (
                    <Form.List name="fieldOptions">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field, index) => (
                                    <Form.Item label={index === 0 ? 'Options' : ''} required={false} key={field.key}>
                                        <Form.Item {...field} validateTrigger={['onChange', 'onBlur']} noStyle>
                                            <Input placeholder="Option" style={{ width: '60%' }} />
                                        </Form.Item>
                                        {fields.length > 1 ? (
                                            <Button type="danger" className="dynamic-delete-button" onClick={() => remove(field.name)}>
                                                Remove
                                            </Button>
                                        ) : null}
                                    </Form.Item>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} style={{ width: '60%' }}>
                                        Add Option
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                )}

                <Form.Item>
                    <Button type="primary" onClick={handleAddField}>
                        Add Field
                    </Button>
                    {fields.length > 0 && (
                        <Button className='update' type="default">
                            Update
                        </Button>
                    )}
                </Form.Item>
            </Form>
            {fields.length === 0 && <Empty description={false} />}
            {fields.length > 0 && (
                <ul className='result-fields'>
                    {fields.map((field, index) => (
                        <li key={index}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', width: '450px' }}>
                                <p className='field-name'>{field.fieldName} ({field.fieldType}) :</p>
                                {['dropdown', 'checkbox', 'radio'].includes(field.fieldType) && (
                                    <ul className='list-options'>
                                        {field.fieldOptions.map((option, optionIndex) => (
                                            <li key={optionIndex}>{option}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <Button type="link" danger onClick={() => handleDeleteField(index)}>
                                Delete
                            </Button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DynamicForm;