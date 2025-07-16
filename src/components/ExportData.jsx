//External Lib Import
import { Col, Button } from 'react-bootstrap';
import { BsFiletypeCsv } from 'react-icons/bs';
import { AiOutlineFilePdf, AiOutlineFileExcel, AiOutlinePrinter } from 'react-icons/ai';
import { BiImport } from 'react-icons/bi';
import { FaFilter } from 'react-icons/fa';

import { BsCalendar2Date } from 'react-icons/bs';

//Internal Lib Import
import exportFromJson from '../utils/exportFromJson';
import { t } from 'i18next';

const ExportData = ({ fileName, data, setShowToggle, showToggle, toggleImportModal, isFilter, showDateFilter}) => {
    return (
        <Col sm={7}>
            <div className="text-sm-end">
                <Button variant="success" className="mb-2 me-1" onClick={() => setShowToggle(!showToggle)}>
                    <i className="dripicons-toggles"></i>
                </Button>
                {
                    isFilter &&
                    <Button className="mb-2 me-1" style={{ backgroundColor: '#85f56c', border: 'none' }} onClick={showDateFilter}>
                        <div className="align-content-center fw-bold">
                            <FaFilter style={{ marginTop: '-10px' }} />
                            <BsCalendar2Date style={{ marginLeft: '-7px' }} />
                        </div>
                    </Button>
                }
                <Button variant="light" className="mb-2 me-1" onClick={toggleImportModal}>
                    <BiImport />
                    {t('import')}
                </Button>

                <Button variant="danger" className="mb-2 me-1" onClick={() => exportFromJson(data, fileName, 'pdf')}>
                    <AiOutlineFilePdf />
                </Button>
                <Button variant="primary" className="mb-2 me-1" onClick={() => exportFromJson(data, fileName, 'xls')}>
                    <AiOutlineFileExcel />
                </Button>
                <Button variant="warning" className="mb-2 me-1" onClick={() => exportFromJson(data, fileName, 'csv')}>
                    <BsFiletypeCsv />
                </Button>
                <Button variant="info" className="mb-2 me-1" onClick={() => exportFromJson(data, fileName, 'xls')}>
                    <AiOutlinePrinter />
                </Button>
            </div>
        </Col>
    );
};

export default ExportData;
