import { useEffect, useState } from "react";
import axios from "axios";

import Button from "../components/Button";
import ModalDeleteSource from "../components/ModalDeleteSource";
import Table from "../components/Table";

import styles from "./ManageSourcesPage.module.css";
import ModalAddSource from "../components/ModalAddSource";
import { apiUrl } from "../utils/apiAccess";
import ModalEditSource from "../components/ModalEditSource";

function ManageSourcesPage() {

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [openDeleteModalSourceId, setOpenDeleteModalSourceId] = useState(null);
    const [openEditModalSourceId, setOpenEditModalSourceId] = useState(null);
    const [tableData, setTableData] = useState([]);

    const handleManualRefresh = async sourceId => {
        await axios.post(apiUrl(`/refresh/${sourceId}`));
    };

    const loadData = async () => {
        const res = await axios.get(apiUrl("/source"));
        const data = res.data;
        for(const item of data) {
            item.manualRefresh = <Button text="Refresh" onClick={() => handleManualRefresh(item.source_id)} />;
            item.edit = <Button text="Edit" onClick={() => setOpenEditModalSourceId(item.source_id)} />;
            item.delete = <Button text="Delete" onClick={() => setOpenDeleteModalSourceId(item.source_id)} />;
        }
        setTableData(data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const getSourceById = sourceId => tableData.find(item => item.source_id === sourceId);
    const currentlyEditedSource = openEditModalSourceId !== null ? getSourceById(openEditModalSourceId) : null;

    const handleRefreshAll = async () => {
        await axios.post(apiUrl("/refresh"));
    };

    const handleDeletion = async () => {
        await axios.delete(apiUrl(`/source/${openDeleteModalSourceId}`));
        setOpenDeleteModalSourceId(null);
        loadData();
    };

    const handleAdding = () => {
        setIsAddModalOpen(false);
        loadData();
    };

    const handleEdit = () => {
        setOpenEditModalSourceId(null);
        loadData();
    };

    const tableHeaders = [
        { title: "Name", key: "name", align: "left" },
        { title: "Source URL", key: "url", align: "left" },
        { title: "Section", key: "section", align: "left" },
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
                    <Button text="Refresh all sources" onClick={handleRefreshAll} />
                </div>
                <Table headers={tableHeaders} data={tableData} />
            </div>
            { isAddModalOpen &&
                <ModalAddSource
                    onCancel={() => setIsAddModalOpen(false)}
                    onSubmit={handleAdding}
                />
            }
            { openDeleteModalSourceId !== null &&
                <ModalDeleteSource
                    sourceId={openDeleteModalSourceId}
                    onCancel={() => setOpenDeleteModalSourceId(null)}
                    onDelete={handleDeletion}
                />
            }
            { openEditModalSourceId !== null &&
                <ModalEditSource
                    initialSourceId={openEditModalSourceId}
                    initialName={currentlyEditedSource.name}
                    initialUrl={currentlyEditedSource.url}
                    initialSection={currentlyEditedSource.section}
                    initialRefreshInterval={currentlyEditedSource.refresh_interval}
                    sourceId={openEditModalSourceId}
                    onCancel={() => setOpenEditModalSourceId(null)}
                    onSubmit={handleEdit}
                />
            }
        </>
    );
}

export default ManageSourcesPage;
