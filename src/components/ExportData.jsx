//External Lib Import
import { Col, Button } from 'react-bootstrap';
import { GrDocumentCsv } from 'react-icons/gr';
import { SiMicrosoftexcel } from 'react-icons/si';
import { BiImport } from 'react-icons/bi';

//Internal Lib Import
import exportFromJson from '../utils/exportFromJson';
import { useTranslation } from 'react-i18next';

const ExportData = ({ fileName = 'data', data = [] }) => {
    const { t } = useTranslation();
    return (
        <Col sm={7}>
            <div className="text-sm-end">
                <Button variant="success" className="mb-2 me-1">
                    <i className="mdi mdi-cog"></i>
                </Button>

                <Button variant="light" className="mb-2 me-1">
                    <BiImport />
                    {t('import')}
                </Button>

                <Button variant="light" className="mb-2 me-1" onClick={() => exportFromJson(data, fileName, 'xls')}>
                    <SiMicrosoftexcel />
                    {t('export')}
                </Button>
                <Button variant="light" className="mb-2 me-1" onClick={() => exportFromJson(data, fileName, 'csv')}>
                    <GrDocumentCsv /> {t('export')}
                </Button>
            </div>
        </Col>
    );
};

export default ExportData;
