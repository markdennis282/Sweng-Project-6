import { useEffect, useState } from "react";

import Button from "../components/Button";
import ModalDeleteSource from "../components/ModalDeleteSource";
import Table from "../components/Table";

import styles from "./ManageSourcesPage.module.css";
import ModalAddSource from "../components/ModalAddSource";

function ManageSourcesPage() {

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [openDeleteModalSourceId, setOpenDeleteModalSourceId] = useState(null);

    const handleEdit = sourceId => {
        console.log(`Edit source ${sourceId}.`);
    };

    const loadData = () => {
        console.log("Load data.");
    };

    useEffect(loadData, []);

    const handleDeletion = () => {
        setOpenDeleteModalSourceId(null);
        loadData();
    };

    const handleAdding = () => {
        setIsAddModalOpen(false);
        loadData();
    };

    const handleManualRefresh = sourceId => {
        console.log(`Manual refresh for source ${sourceId}.`);
    };

    const tableHeaders = [
        { title: "Name", key: "name", align: "left" },
        { title: "Source URL", key: "sourceUrl", align: "left" },
        { title: "Section", key: "section", align: "left" },
        { title: "Refresh interval", key: "refreshInterval", align: "left" },
        { title: "Manual refresh", key: "manualRefresh" },
        { title: "Edit", key: "edit" },
        { title: "Delete", key: "delete" }
    ];

    const data = [
        { sourceId: "id1", name: "Name1", sourceUrl: "http://source1.com", section: "Tech", refreshInterval: "30 min" },
        { sourceId: "id2", name: "Name2", sourceUrl: "http://source2.com", section: "Compliance", refreshInterval: "30 min" },
        { sourceId: "id3", name: "Name3", sourceUrl: "http://source3.com", section: "Tech", refreshInterval: "30 min" },
        { sourceId: "id4", name: "Name4", sourceUrl: "http://source4.com", section: "HR", refreshInterval: "30 min" },
        { sourceId: "id5", name: "Name5", sourceUrl: "https://www.kaggle.com/datasets/julien040/hacker-news-openai-embeddings", section: "Tech", refreshInterval: "30 min" },
    ];

    for(const item of data) {
        item.manualRefresh = <Button text="Refresh" onClick={() => handleManualRefresh(item.sourceId)} />;
        item.edit = <Button text="Edit" onClick={() => handleEdit(item.sourceId)} />;
        item.delete = <Button text="Delete" onClick={() => setOpenDeleteModalSourceId(item.sourceId)} />;
    }

    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.heading}>Manage sources</h1>
                <div className={styles.menu}>
                    <Button text="Add new source" onClick={() => setIsAddModalOpen(true)} />
                    <Button text="Refresh all sources" />
                </div>
                <Table headers={tableHeaders} data={data} />
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
