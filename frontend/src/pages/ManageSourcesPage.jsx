import { useEffect, useState } from "react";
import axios from "axios";

import Button from "../components/Button";
import ModalDeleteSource from "../components/ModalDeleteSource";
import Table from "../components/Table";

import styles from "./ManageSourcesPage.module.css";
import ModalAddSource from "../components/ModalAddSource";
import { apiUrl } from "../utils/apiAccess";

function ManageSourcesPage() {

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [openDeleteModalSourceId, setOpenDeleteModalSourceId] = useState(null);
    const [tableData, setTableData] = useState([]);

    const handleEdit = sourceId => {
        console.log(`Edit source ${sourceId}.`);
    };

    const handleManualRefresh = sourceId => {
        console.log(`Manual refresh for source ${sourceId}.`);
    };

    const loadData = async () => {
        const res = await axios.get(apiUrl("/source"));
        const data = res.data;
        for(const item of data) {
            item.manualRefresh = <Button text="Refresh" onClick={() => handleManualRefresh(item.sourceId)} />;
            item.edit = <Button text="Edit" onClick={() => handleEdit(item.sourceId)} />;
            item.delete = <Button text="Delete" onClick={() => setOpenDeleteModalSourceId(item.sourceId)} />;
        }
        setTableData(data);
    };

    useEffect(() => loadData(), []);

    const handleDeletion = () => {
        setOpenDeleteModalSourceId(null);
        loadData();
    };

    const handleAdding = () => {
        setIsAddModalOpen(false);
        loadData();
    };

    const tableHeaders = [
        { title: "Name", key: "name", align: "left" },
        { title: "Source URL", key: "url", align: "left" },
        { title: "Section", key: "source_section", align: "left" },
        { title: "Refresh interval", key: "refresh_interval", align: "left" },
        { title: "Manual refresh", key: "manualRefresh" },
        { title: "Edit", key: "edit" },
        { title: "Delete", key: "delete" }
    ];

    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.heading}>Manage sources</h1>
                <div className={styles.menu}>
                    <Button text="Add new source" onClick={() => setIsAddModalOpen(true)} />
                    <Button text="Refresh all sources" />
                </div>
                <Table headers={tableHeaders} data={tableData} />
            </div>
            { isAddModalOpen &&
                <ModalAddSource
                    onCancel={() => setIsAddModalOpen(false)}
                    onSubmit={handleAdding}
                />
            }
            { openDeleteModalSourceId &&
                <ModalDeleteSource
                    sourceId={openDeleteModalSourceId}
                    onCancel={() => setOpenDeleteModalSourceId(null)}
                    onDelete={handleDeletion}
                />
            }
        </>
    );
}

export default ManageSourcesPage;
