import PropTypes from "prop-types";

import styles from "./Table.module.css";

function Table({ headers, data, className }) {
    const fullClassName = className ? `${styles.tableContainer} ${className}` : styles.tableContainer;

    for(const item of headers) {
        if(!item.align) item.align = "center";
    }

    return (
        <div className={fullClassName}>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.header}>
                        { headers.map(headerItem =>
                            <th key={headerItem.key} style={{ textAlign: headerItem.align }}>{ headerItem.title }</th>
                        ) }
                    </tr>
                </thead>
                <tbody>
                    { data.map((dataItem, dataItemIndex) =>
                        <tr key={dataItemIndex}>
                            { headers.map(headerItem =>
                                <td key={headerItem.key} style={{ textAlign: headerItem.align }}>
                                    { dataItem[headerItem.key] }
                                </td>
                            ) }
                        </tr>
                    ) }
                </tbody>
            </table>
        </div>
    );
}

Table.propTypes = {
    headers: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            key: PropTypes.string.isRequired,
            align: PropTypes.oneOf(["center", "left", "right"])
        })
    ).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    className: PropTypes.string
};

export default Table;
