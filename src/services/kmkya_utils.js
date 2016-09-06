/**
 * Created by user on 06.09.2016.
 */
kmkya_client.service('kmkya_utils', function () {

    this.sJoin = (parentArr,subArr,parentArrConnectField,subArrConnectField,parentListField) =>
        R.map((parentItem) => R.assoc(parentListField,R.filter((subItem) => subItem[subArrConnectField]==parentItem[parentArrConnectField],subArr),parentItem),parentArr);

    this.findByField = (arrOfObjects,fieldName,fieldValue) =>
        R.find(R.propEq(fieldName, fieldValue))(arrOfObjects);

    this.findIndexByField = (arrOfObjects,fieldName,fieldValue) =>
        R.findIndex(R.propEq(fieldName, fieldValue))(arrOfObjects);

    return this;
});