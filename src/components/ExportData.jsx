//External Lib Import
import { Col, Button } from 'react-bootstrap';
import { BsFiletypeCsv } from 'react-icons/bs';
import { AiOutlineFilePdf, AiOutlineFileExcel, AiOutlinePrinter } from 'react-icons/ai';
import { BiImport } from 'react-icons/bi';

//Internal Lib Import
import exportFromJson from '../utils/exportFromJson';
import { useTranslation } from 'react-i18next';

const ExportData = ({ fileName = 'data', data = [], setShowToggle, showToggle }) => {
    const { t } = useTranslation();
    return (
        <Col sm={7}>
            <div className="text-sm-end">
                <Button variant="success" className="mb-2 me-1" onClick={() => setShowToggle(!showToggle)}>
                    <i className="mdi mdi-cog"></i>
                </Button>

                <Button variant="light" className="mb-2 me-1">
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
