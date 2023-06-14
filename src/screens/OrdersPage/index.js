import React from 'react';
import { Table } from 'antd';
import { getColumns } from "../../utils";
import companyLogo from "../../assets/CompanyLogo1.png";
import "./ordersPage.css"

const OrdersPage = ({ orders }) => {
    const columns = getColumns()

    return (
        < div className='ordersPage_container' >
            <div className='ordersPage_heading'>
                <img src={companyLogo} className="ordersPage_logo" />
            </div>
            <Table columns={columns} dataSource={orders} pagination={false} className="transparent-table"
                rowClassName="table_row_class"
                locale={{
                    emptyText: "All Orders Completed !",
                }}
            />
        </div>

    );
};

export default OrdersPage;
