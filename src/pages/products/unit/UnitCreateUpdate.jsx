import React from 'react';

//External Lib Import
import { useEffect, useMemo, useState } from 'react';
import { Card, Button, Modal, Spinner } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

//Internal Lib Import
import { FormInput, VerticalForm } from '../../../components';
import removeEmptyObj from '../../../helpers/removeEmptyObj';

//api services
import { useCategoryCreateMutation, useCategoryUpdateMutation } from '../../../redux/services/categoryService';
import { useSelector } from 'react-redux';
import { Controller, useForm, useWatch } from 'react-hook-form';
import Select from 'react-select';

// import handleFileUpload from '../../../helpers/handleFileUpload';

const UnitCreateUpdate = () => {
    return <div></div>;
};

export default UnitCreateUpdate;
