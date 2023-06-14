
import { Tag } from 'antd';
import {
    SyncOutlined,
} from '@ant-design/icons';

export const getColumns = (tags) => {

    const getStatusTag = (tag) => {

        let color;
        let icon;
        switch (tag) {

            case "Pending":
                color = "processing";
                icon = <SyncOutlined spin />
                break;

            case "Dough Chef":
                color = "warning";
                icon = <SyncOutlined spin />
                break;

            case "Topping Chef":
                color = "orange";
                icon = <SyncOutlined spin />
                break;

            case "Oven":
                color = "warning";
                icon = <SyncOutlined spin />
                break;

            case "Serving":
                color = "success";
                icon = <SyncOutlined spin />;
                break;

            case "Done":
                color = "success";

                break;

            default:
                break;
        }

        return (
            <Tag color={color} key={tag} icon={icon}>
                {tag.toUpperCase()}
            </Tag>
        )

    }

    let columns
    return columns = [
        {
            title: 'Token Number',
            dataIndex: 'tokenNumber',
            key: 'tokenNumber',
            render: (text) => <>{text}</>,
            className: 'bg-white',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <>{text}</>,
            className: 'bg-white',
        },


        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (tag) => getStatusTag(tag),
            className: 'bg-white',
        },

    ];
}