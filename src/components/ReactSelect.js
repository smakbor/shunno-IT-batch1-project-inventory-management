// import { useForm, Controller } from 'react-hook-form';
// import Select from 'react-select';

// const ReactSelect = () => {
//     const {
//         register,
//         control,
//         formState: { errors },
//         handleSubmit,
//     } = useForm();

//     const handleChangeType = (option) => {
//         setItemType(option);
//         var options = getOptions(option.value);
//         setList(options);
//         setGender(null);
//     };

//     return (
//         <>
//             <Controller
//                 control={control}
//                 name="itemType"
//                 rules={{
//                     required: {
//                         value: assetType.value == 'item',
//                         message: 'Item type is required.',
//                     },
//                 }}
//                 render={({ field: { onChange, value, ref, name } }) => (
//                     <Select
//                         className={'react-select'}
//                         classNamePrefix={'react-select'}
//                         placeholder={'Item type'}
//                         options={itemTypeList}
//                         onChange={(val) => {
//                             onChange(val.value);
//                             handleChangeType(val);
//                         }}
//                     />
//                 )}
//             />
//             {errors.item?.message && <div class="validationText">{errors.item?.message}</div>}
//         </>
//     );
// };

// export default ReactSelect;
